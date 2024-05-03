let logout = document.querySelector('.Logout');
let button = document.querySelector('.delete');

logout.addEventListener('click', () => {
        alert('Disconnected')
        window.localStorage.clear()
        setTimeout(() => {
            window.location.href = '../LogIn . SignUp/LogIn.html'
        }, 1000);
    })

async function All_Cars() {

        let response = await fetch('http://localhost:3108/Cars/All_Cars')
        let client = await response.json()
        let stock = document.querySelector('.main-container')
        let localUser = localStorage.getItem('jwt')

        for (const Cars of client) {
            let newCars = document.querySelector('div')
            newCars.classList.add('car-container')
            newCars.innerHTML += `<div class="location"><h2 class="name">${Cars.name}</h2>
            <img src="${Cars.image}" class="img" />
            <p class="quantity">Quantity: ${Cars.quantity}</p>
            <p class="description">Description: ${Cars.description}</p>
            <p class="price">Price: ${Cars.price}€</p></div>`
            stock.appendChild(newCars)
    }
}
async function delete_Cars() {
    let jwt = window.localStorage.getItem('jwt')
    let name = document.querySelector(".namesupp").value
    let data = {
        name: name
    }
    let request = {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=utf-8",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(data)
      }
      let response =  await fetch('http://localhost:3108/Cars/Delete_Cars', request)
      window.location.reload()
}

button.addEventListener('click', () => {
    let namedelete = document.querySelector('.namedelete')
    namedelete.innerHTML = `<input type="text" class="namesupp" placeholder="Name a Car for Delete">
    <button class="Supprimer">Delete</button>`


let supr = document.querySelector('.Supprimer')

supr.addEventListener('click', () => {
delete_Cars()
})
})

async function searchByTitle(){
    const title= document.querySelector('#title').value
    

    let apiCall = await fetch(`http://localhost:3108/Cars/All_Cars/${title}`)
    let newCars = document.querySelector('div')
    newCars.classList.add('car-container')

    let response = await apiCall.json()
    
    
    newCars.innerHTML=""
    response.forEach(Cars => {
        newCars.innerHTML += `<div class="location"><h2 class="name">${Cars.name}</h2>
            <img src="${Cars.image}" class="img" />
            <p class="quantity">Quantity: ${Cars.quantity}</p>
            <p class="description">Description: ${Cars.description}</p>
            <p class="price">Price: ${Cars.price}€</p>
            <button onclick="ok('${Cars.id}')">Update</button></div>`
    })
}
async function ok(id) {
    let jwt = window.localStorage.getItem('jwt')
    let name = document.querySelector('.upname').value
    let description = document.querySelector('.updescription').value
    let quantity = document.querySelector('.quantity').value
    let price = document.querySelector('.upprice').value
    
    let Update_Cars = {
        name: name,
        quantity: quantity,
        description: description,
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
        let apirequest = await fetch(`http://localhost:3108/Cars/Update_Cars/${id}`, request)
        let response = await apirequest.json()
            window.location.reload()
        

        

    }
    let update = document.querySelector('.update');
    update.addEventListener('click', () => {
        ok1()
    })
    async function ok1() {

        let updatename = document.querySelector('.updatecar')
        updatename.innerHTML = 
        `<input type="text" class="upname" placeholder="Update Name">
        <input type="text" class="updescription" placeholder="Update Description">
        <input type="number" class="upprice" placeholder="Update price">
        <input type="text" class="quantity" placeholder="Update quantity">`
    }
    
All_Cars()