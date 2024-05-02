
async function Add_Cars() {
    let addCars = document.querySelector('.addCars')
    let name = document.querySelector('.name').value
    let description = document.querySelector('.description').value
    let image = document.querySelector('.image').value
    let quantity = document.querySelector('.quantity').value
    let price = document.querySelector('.price').value

    let sucess = document.querySelector('.succes')
    let jwt = window.localStorage.getItem('jwt')
    
    let Add_Cars = {
        name: name,
        quantity: quantity,
        description: description,
        image: image,
        price: price
    }
    let request = {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=utf-8",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(Add_Cars),
      };

    let response = await fetch('http://localhost:3108/Cars/Add_Cars', request)
    let client = await response.json()
    if(client.status === 200) {
        sucess.innerHTML = 'Sucess Create'
        setTimeout(() => {
            window.location.href = '../Admin/Admin.html'
        }, 1000);
    }
    addCars.addEventListener('click', () => {
        Add_Cars()
    })
}
