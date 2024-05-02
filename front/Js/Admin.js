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
            newCars.classList.add = ('.Event')
            newCars.innerHTML += `<h2 class="name">${Cars.name}</h2>
            <img src="${Cars.image}" class="img" />
            <p class="quantity">${Cars.quantity}</p>
            <p class="description">${Cars.description}</p>
            <p class="price">${Cars.price}</p>`
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






All_Cars()