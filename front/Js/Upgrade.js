
async function Upgrade_Cars() {
    let first_name = document.querySelector('.First_name').value
    let name = document.querySelector('.name').value
    let description = document.querySelector('.description').value
    let image = document.querySelector('.image').value
    let quantity = document.querySelector('.quantity').value
    let price = document.querySelector('.price').value

    let sucess = document.querySelector('.succes')
    let jwt = window.localStorage.getItem('jwt')
    
    first_name.body.id

    let Update_Cars = {
        name: name,
        quantity: quantity,
        description: description,
        image: image,
        price: price
    }
    let request = {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=utf-8",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(Update_Cars),
      };

    let response = await fetch('http://localhost:3108/Cars/Update_Cars/:id', request)
    let client = await response.json()
    if(client.status === 200) {
        sucess.innerHTML = 'Sucess Change'
    }  
}