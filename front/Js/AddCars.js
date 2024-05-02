let addCars = document.querySelector('.AddEvent')

async function Add_Cars() {
    let sucess = document.querySelector('.succes')

    let response = await fetch('http://localhost:3108/Cars/Add_Cars')
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