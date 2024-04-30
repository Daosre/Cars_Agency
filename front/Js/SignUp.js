async function Register() {
    const first_name = document.querySelector('.Name').value
    const last_name = document.querySelector('.last_name').value
    const email = document.querySelector('.email').value
    const password = document.querySelector('.password').value

    let user = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password
    }

    let request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(user),
    }

    let apiRequest = fetch('http://localhost:3108/User/Add_User', request)
    let response = await apiRequest
    console.log(response)
    if (response.status === 200) {
        setTimeout(() => {
            alert('Register Sucessfull')
            window.location.href = './LogIn.html'
        }, 2000);
    } else {
        alert('Wrong id')
    }

}