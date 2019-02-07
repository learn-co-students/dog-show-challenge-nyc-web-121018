document.addEventListener('DOMContentLoaded', () => {

  // would love to have less in the DOMContentLoaded but
  // these variables are inaccessible outside it
  let tableBody = document.querySelector("#table-body")
  let breedField = document.querySelector("#dog-form").children.breed
  let nameField = document.querySelector("#dog-form").children.name
  let sexField = document.querySelector("#dog-form").children.sex

  //both click and submit event listeners need access to this
  let dogRow = "no dog selected to edit"
  let dogName = ""
  let dogBreed = ""
  let dogSex = ""


  fetch("http://localhost:3000/dogs")
  .then(res => res.json())
  .then(parsed => renderAllDogs(parsed))

  function renderSingleDog(dog){
    // html supplied by lab
    return `<tr id = "row-${dog.id}"><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button class = "edit-btn" id="${dog.id}-edit-btn">Edit Dog</button></td></tr>`
  }

  function renderAllDogs(dogs){
    dogs.map(function(dog){
      // the table is made up of all the dogs rendered iteratively
      tableBody.innerHTML += renderSingleDog(dog)
    }).join("")
  }

document.addEventListener("click", (e)=>{
  if(e.target.className === "edit-btn"){
    console.log(e.target.id)
    // the button is the grandchild of a row that represents a dog
    dogRow = e.target.parentElement.parentElement
    // the three values for the dog are grabbed here
    dogName = dogRow.children[0]
    dogBreed = dogRow.children[1]
    dogSex = dogRow.children[2]
    nameField.value = dogName.innerText
    breedField.value = dogBreed.innerText
    sexField.value = dogSex.innerText
  }
})

document.addEventListener("submit", (e)=>{
  e.preventDefault()
  if (typeof(dogRow) === "object"){
    //debugger
    dogName.innerText = nameField.value
    dogBreed.innerText = breedField.value
    dogSex.innerText = sexField.value
    console.log(dogName.innerText, nameField.value)
    fetch(`http://localhost:3000/dogs/${dogName.parentElement.id.slice(4)}`, {
      // this is goofy lol but it works! I'm done.
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json",
        Accept : "application/json"
      },
      body: JSON.stringify({
          name: `${nameField.value}`,
          breed: `${breedField.value}`,
          sex: `${sexField.value}`
      })
    })


  }
    //console.log(dogRow)
  })
}) // end of DOMContentLoaded
