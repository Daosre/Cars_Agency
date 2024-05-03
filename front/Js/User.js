let logout = document.querySelector('.Logout');

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
All_Cars()