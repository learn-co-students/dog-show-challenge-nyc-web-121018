document.addEventListener('DOMContentLoaded', () => {

  fetch("http://localhost:3000/dogs")
  .then(resp=> resp.json())
  .then(parsed => showAllDogs(parsed))


  function showDog(dog){
    return `<tr>
      <td> Name: ${dog.name}</td>
      <td> ID: ${dog.id}</td>
      <td> Breed: ${dog.breed}</td>
      <td> Sex: ${dog.sex}</td>
      <td><button class= "edit" >Edit</button></td>
    </tr>`
  }

  dogContainer = document.querySelector(".blue")

  function showAllDogs(dogs){
    let hString = ``
    dogs.forEach(function(dog){
      hString += showDog(dog)
    })
    dogContainer.innerHTML = hString
  }

  let dogForm = document.getElementById('dog-form')

  document.addEventListener("click", function(e){
    if(e.target.className === "edit"){
      let elements = e.target.parentNode.parentNode.cells
      let name = elements[0].innerText.split(":")[1]
      let id= elements[1].innerText.split(":")[1]
      let breed= elements[2].innerText.split(":")[1]
      let sex= elements[3].innerText.split(":")[1]

      dogForm.children[0].value = name
      dogForm.children[1].value = breed
      dogForm.children[2].value = sex

    dogForm.addEventListener("submit", e =>{
      e.preventDefault()
      let newName = dogForm.children[0].value
      let newBreed = dogForm.children[1].value
      let newSex = dogForm.children[2].value

      let dogId = parseInt(id)
      fetch(`http://localhost:3000/dogs/${dogId}`, {
        method: "PATCH",
        headers: {
          "Content-Type" : "application/json",
          "Accept" : "application/json"
        },
        body: JSON.stringify({
          name: newName,
          breed: newBreed,
          sex: newSex
        })//end of body
      }).then(resp => resp.json())
      .then(dog => console.log(dog))
      elements[0].innerText = "Name: "+newName
      elements[2].innerText = "Breed: "+newBreed
      elements[3].innerText = "Sex: "+newSex
    })
    //end of event listener
  }//end of if
  })




})
