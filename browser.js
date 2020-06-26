function itemTemplate(item){
  return  `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
  <span class="item-text">${item.text}</span>
  <div>
    <button data-id="${item._id}"class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
    <button data-id="${item._id}"class="delete-me btn btn-danger btn-sm">Delete</button>
  </div>
</li>`
}
let ourHTML=items.map(function(item){
  return itemTemplate(item)
}).join('')
document.getElementById("itemlist").insertAdjacentHTML("beforeend",ourHTML)
let createfield=document.getElementById("createfield")
document.getElementById("createform").addEventListener("submit",function(e){
  e.preventDefault()
  axios.post('/createitem', {text: createfield.value}).then(function (response) {

   document.getElementById("itemlist").insertAdjacentHTML("beforeend",itemTemplate(response.data))
   createfield.value = ""
   createfield.focus()
  }).catch(function() {
    console.log("Please try again later.")
  })
})
document.addEventListener("click", function(e) {
  if (e.target.classList.contains("delete-me")){
    if(confirm("Do you want to delete item")){
      axios.post('/delete-item', {id: e.target.getAttribute("data-id")}).then(function () {
        e.target.parentElement.parentElement.remove()
      }).catch(function() {
        console.log("Please try again later.")
      })
    }
  }



  //updatefeature
  if (e.target.classList.contains("edit-me")) {
    let userInput = prompt("Enter your desired new text", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
    if (userInput) {
      axios.post('/update-item', {text: userInput, id: e.target.getAttribute("data-id")}).then(function () {
        e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput
      }).catch(function() {
        console.log("Please try again later.")
      })
    }
  }
})