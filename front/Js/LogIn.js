async function Login() {
    let email = document.querySelector('.email').value
    let password = document.querySelector('.password').value

    let user = {
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

    let apiRequest = fetch('http://localhost:3108/User/Log_User', request)
    let response = await apiRequest
    let data = await response.json()
    if (response.status === 200) {
        let jwt = data.jwt
        let role = data.role
        window.localStorage.setItem('jwt, jwt')
        if (role === 'admin') {
            window.location.href = './Admin.html'
        } else {
            window.location.href = './User.html'
        }
    } else {
        alert('Wrong Id')
    }
}