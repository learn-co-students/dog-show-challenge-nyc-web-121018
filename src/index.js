document.addEventListener('DOMContentLoaded', () => {
  let allDogs = []
  const dogsTable = document.querySelector('#table-body')
  const dogForm = document.querySelector('#dog-form')
  let currentDog = null

  function getDogs() {
    fetch('http://localhost:3000/dogs')
    .then(r => r.json())
    .then(dogs => {
      allDogs = dogs
      dogsTable.innerHTML = renderAllDogs(allDogs)
    })
  } // end of fetch get Fn

  getDogs()

  dogsTable.addEventListener('click', (e) => {
    if (e.target.innerText === 'Edit') {
      currentDog = allDogs.find(dog => dog.id == e.target.dataset.id)
      dogForm.name.value = currentDog.name
      dogForm.breed.value = currentDog.breed
      dogForm.sex.value = currentDog.sex
    }
  })

  dogForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let updatedName = e.target.name.value
    let updatedBreed = e.target.breed.value
    let updatedSex = e.target.sex.value
    // console.log(updatedSex, updatedBreed, updatedName);

    fetch(`http://localhost:3000/dogs/${currentDog.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: updatedName,
        breed: updatedBreed,
        sex: updatedSex
      })
    })
    .then(r => r.json())
    .then(dog => {
      let dogIndex = allDogs.findIndex(dog => dog.id === currentDog.id)
      allDogs[dogIndex] = dog
      dogForm.reset();
      getDogs()
    })
  })

  function renderDog(dog) {
    return `
    <tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-id=${dog.id}>Edit</button></td></tr>`
  }

  function renderAllDogs(dogs) {
    return dogs.map(renderDog).join('')
  }


}) // end of DOMContentLoaded
