async function Add_Cars() {
    let name = document.querySelector('.title').value
    let description = document.querySelector('.description').value
    let image = document.querySelector('.image').value
    let quantity = document.querySelector('.quantity').value
    let price = document.querySelector('.price').value
    let error = document.querySelectorAll('.error')
    let sucess = document.querySelector('.succes')
    let jwt = window.localStorage.getItem('jwt')
     
    let Add_Cars = { 
        name: name,
        image: image,
        quantity: quantity,
        description: description,
        price: price
    }

    let response = await fetch('http://localhost:3108/Cars/Add_Cars')
    let client = await response.json()
}