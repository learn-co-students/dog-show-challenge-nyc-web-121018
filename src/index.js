
document.addEventListener('DOMContentLoaded', () => {
const dogTable = document.querySelector("#table-body")
const editDog = document.querySelector("#dog-form")
const dogsURL = "http://localhost:3000/dogs"

fetch(dogsURL)
.then(r => r.json())
.then(dogData => {
  let dogHTML = dogData.map(dog =>{
    return `
    <tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button class="edit" data-id=${dog.id}>Edit</button></td></tr>
    `
  })//end map
  dogTable.innerHTML = dogHTML.join("")
  })//end then

dogTable.addEventListener("click", (e)=>{
  //console.log(e.target);
  if(e.target.className === "edit"){
    // console.log(e.target.dataset.id)
    // console.log(editDog)
    //console.log(editDog.children[4])
    let targetId = e.target.dataset.id
    let submitButton = editDog.children[4]
    submitButton.id = targetId
    let targetRow = e.target.parentElement.parentElement
    // console.log(targetRow)
    let targetName = targetRow.children[0].innerHTML
    let targetBreed = targetRow.children[1].innerHTML
    let targetSex = targetRow.children[2].innerHTML
    //console.log((chosenDogId));
    let editForm = document.getElementById("dog-form")
    // console.log(editForm)
    editForm.children[0].value = targetName
    editForm.children[1].value = targetBreed
    editForm.children[2].value = targetSex
  }//end if statement
})//end addEventListener

editDog.addEventListener("submit", (e)=>{
e.preventDefault()
  let newName = e.target.name.value
  let newBreed = e.target.breed.value
  let newSex = e.target.sex.value
  let dogId = e.target.children[4].id
  //console.log(newName, newBreed, newSex)
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
  .then(r => r.json())
  .then(dogData =>{
    fetch(dogsURL)
      .then(r => r.json())
      .then(dogData => {
      let dogHTML = dogData.map(dog =>{
        return `
        <tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button class="edit" data-id=${dog.id}>Edit</button></td></tr>
        `
    })//end map
    dogTable.innerHTML = dogHTML.join("")
    })//end then
    editDog.reset()
  })

})//end addEventListener

})//end Domcontent loaded
