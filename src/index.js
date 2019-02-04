let dogs = []


document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.getElementById("table-body")
  const dogForm = document.getElementById('dog-form')

  getDogs()

  tableBody.addEventListener('click', e => {
    let found = dogs.find( dog => {
      return parseInt(e.target.dataset.id) === dog.id
    })

    dogForm.name.value = found.name
    dogForm.breed.value = found.breed
    dogForm.sex.value = found.sex
    dogForm.dogId.value = found.id

  })

  dogForm.addEventListener('submit', e => {
    e.preventDefault()
    const newName = dogForm.name.value
    const newBreed = dogForm.breed.value
    const newSex = dogForm.sex.value
    const dogID = dogForm.dogId.value
    let find = dogs.find( dog => {
      return parseInt(dogID) === dog.id
    })


    fetch(`http://localhost:3000/dogs/${dogID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: newName,
        breed: newBreed,
        sex: newSex
      })
    }).then(response => {
      find.name = newName
      find.breed = newBreed
      find.sex = newSex
      tableBody.innerHTML = createHTML(dogs)
    })

    e.target.reset()
  })


}) // end DOMContentLoaded

function getDogs(){
  const tableBody = document.getElementById("table-body")
  fetch("http://localhost:3000/dogs")
    .then(response => response.json())
    .then(data => {
      dogs = data
      tableBody.innerHTML = createHTML(dogs)
    })
}
function createHTML(dogsArray) {
  return dogsArray.map(dog => {
    return `<tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-id="${dog.id}">Edit</button></td></tr>`
  }).join('')
}
