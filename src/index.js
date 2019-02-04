  let allDogs = []
  let tableContainer
  let formContainer

document.addEventListener('DOMContentLoaded', () => {

  const createDog = document.querySelector("#create-dog-form")
  formContainer = document.querySelector("#form-container")
  createDog.addEventListener('submit', function(e){
    e.preventDefault()
    const newName = createDog.querySelector("#newName").value
    const newBreed = createDog.querySelector("#newBreed").value
    const newSex = createDog.querySelector("#newSex").value
    console.log(newName, newBreed, newSex)
    apiCreate(newName, newBreed, newSex)
  })

  function apiCreate(newName, newBreed, newSex){
    fetch("http://localhost:3006/dogs", {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify ( {
        name: newName,
        breed: newBreed,
        sex: newSex
      })
    }).then(function(response){
      return response.json()
    }).then(function(response){
      name = response.name
      breed = response.breed
      sex = response.sex
      addToDom(name, breed, sex)
    })


  }




  function apiFetch(){
    fetch("http://localhost:3006/dogs", {method:"GET"}
    ).then ( function(response){
      return response.json()
    }).then (function(response){
      allDogs = response
    }).then (function (response){
      renderDogs(allDogs)
    })
  }
  apiFetch();


  function renderDogs(allDogs){
    console.log("Hey")
    tableContainer = document.querySelector("#table-body")

    for( let dog of allDogs){
    tableContainer.innerHTML += `
    <tr>
    <td class="name"> ${dog.name}</td>
    <td class="breed"> ${dog.breed}</td>
    <td class="sex">${dog.sex}</td>
    <td><button class="edit-button" data-id = "${dog.id}"> Edit </button>
    </td></tr>
    `
      }
    }

function addToDom(name, breed, sex){
  temporaryId = ++allDogs.length
  tableContainer.innerHTML +=
  `<tr><td> ${name}</td>
  <td> ${breed}</td>
  <td>${sex}</td>
  <td><button class="edit-button" data-id = "${temporaryId}"> Edit </button>
  </td></tr>
  `
}


document.querySelector("#table-body").addEventListener('click', function(event){
  if (event.target.className === "edit-button"){
    let name = event.target.parentElement.parentElement.querySelector(".name").innerText
    let breed = event.target.parentElement.parentElement.querySelector(".breed").innerText
    let sex = event.target.parentElement.parentElement.querySelector(".sex").innerText
    let id = event.target.dataset.id
    // renderEditForm()
  renderEditForm(name, breed, sex, id)
  }

function renderEditForm(name, breed, sex, id){
  document.querySelector("#form-container").innerHTML +=
  `
  <form id='edit-dog-form' data-id="${id}" class="padding margin border-round border-grey">
    <input type="name" id="editName" name="name" placeholder="name" value="${name}">
    <input type="breed" id="editBreed" name="breed" placeholder="breed" value="${breed}">
    <input type="sex" id="editSex" name="sex" placeholder="sex" value="${sex}">
    <input type="submit"value="Submit">
  </form>
  `
}

  document.querySelector("#form-container").addEventListener("submit", function (e){
    e.preventDefault()

    let name = document.querySelector("#editName").value
    let breed = document.querySelector("#editBreed").value
    let sex = document.querySelector("#editSex").value
    let id = document.querySelector("#edit-dog-form").dataset.id
    console.log(name, breed, id )

      apiPatch(name, breed, sex, id);
  })



  })


  function apiPatch (name, breed, sex, id) {

  fetch(`http://localhost:3006/dogs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: name,
      breed: breed,
      sex: sex
    })

  }).then (function(response){
    return response.json()
  })

  }


}) //end dom
