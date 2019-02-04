allDogs =[]

document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector("#table-body")
  const dogForm = document.querySelector("#dog-form")

  fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(data => {
      allDogs = data
      let allDogsHTML = allDogs.map(addHTMLforDog).join('')
      tableBody.innerHTML = allDogsHTML
    })

  tableBody.addEventListener('click', e =>{

    if (e.target.innerHTML === 'click to edit'){
      console.log(e.target.dataset.id)

      const dogObject = allDogs.find(d => d.id === parseInt(e.target.dataset.id))

      dogForm.name.value = `${dogObject.name}`
      dogForm.breed.value = `${dogObject.breed}`
      dogForm.sex.value = `${dogObject.sex}`
      dogForm.id.value = `${dogObject.id}`
    }
  })

  dogForm.addEventListener('submit', e => {
    e.preventDefault()
    let newName = e.target.name.value
    let newBreed = e.target.breed.value
    let newSex = e.target.sex.value
    let id = e.target.id.value

    const dogObject = allDogs.find(d => d.id === parseInt(id))
    const indexOfDogObject = allDogs.indexOf(dogObject)

    fetch(`http://localhost:3000/dogs/${id}`, {
      method:"PATCH",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: newName,
          breed: newBreed,
          sex: newSex,
        })
    })//end ftech
    .then(resp => resp.json())
    .then(data => {
      allDogs[indexOfDogObject].name = newName
      allDogs[indexOfDogObject].breed = newBreed
      allDogs[indexOfDogObject].sex = newSex
      let allDogsHTML = allDogs.map(addHTMLforDog).join('')
      tableBody.innerHTML = allDogsHTML
    })
  })

})

function addHTMLforDog(dog) {
  return `<tr>
            <td>${dog.name}</td>
            <td>${dog.breed}</td>
            <td>${dog.sex}</td>
            <td><button data-id=${dog.id} type="button" name="edit">click to edit</button></td>
          </tr>`
}
