
let logout = document.querySelector('.Logout')

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
            newCars.classList.add = ('.Event')
            newCars.innerHTML += `<h2 class="name">${Cars.name}</h2>
            <img src="${Cars.image}" class="img" />
            <p class="quantity">${Cars.quantity}</p>
            <p class="description">${Cars.description}</p>
            <p class="price">${Cars.price}</p>`
            stock.appendChild(newCars)
        }
    }
All_Cars()