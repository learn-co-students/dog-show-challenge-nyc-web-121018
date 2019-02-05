let allDogs = []
document.addEventListener('DOMContentLoaded', () => {
const dogForm = document.querySelector("#dog-form")
const dogContainer = document.querySelector('#table-body')
//console.log(dogContainer)
const editForm = document.querySelector('#dog-form')
//console.log(editForm)
fetch("http://localhost:3000/dogs")
  .then( response => response.json())
  .then(dogData => {
    allDogs = dogData
    //take my dogs array to make HTML with them in order to add them to DOM
   let dogsHTML = dogData.map(function(dog){
     return  `
    <tr><td class="tblName">${dog.name}  </td> <td class="tblBreed">${dog.breed}</td> <td class="tblSex">${dog.sex}</td> <td><button data-id="${dog.id}" data-action="edit">Edit</button></td></tr>

    `
    })
    dogContainer.innerHTML = dogsHTML.join('')
  })//end fetch all dogs

  dogContainer.addEventListener("click", (e)=>{
  //console.log(e.target)
  let currDog = allDogs.find(dog => {
  return dog.id === parseInt(e.target.dataset.id)
  })

  dogForm.name.value = currDog.name
  dogForm.breed.value = currDog.breed
  dogForm.sex.value = currDog.sex
  dogForm.dogId.value  = currDog.id
  //console.log(dogForm)



})//end dog container

dogForm.addEventListener("submit", (e) =>{
    e.preventDefault()


const newName = e.target.name.value
const newBreed = e.target.breed.value
const newSex = e.target.sex.value
const dogId = e.target.dogId.value
//console.log(dogId)


fetch(`http://localhost:3000/dogs/${dogId}`,{

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
  })
  .then(res => res.json())
  .then(dogData => {
    fetch("http://localhost:3000/dogs")
      .then( response => response.json())
      .then(dogData => {
        allDogs = dogData
        //take my dogs array to make HTML with them in order to add them to DOM
       let dogsHTML = dogData.map(function(dog){
         return  `
        <tr><td class="tblName">${dog.name}  </td> <td class="tblBreed">${dog.breed}</td> <td class="tblSex">${dog.sex}</td> <td><button data-id="${dog.id}" data-action="edit">Edit</button></td></tr>

        `
        })
        dogContainer.innerHTML = dogsHTML.join('')
      })//end fetch all dogs
  })
})




})

//end Domcontent loaded
