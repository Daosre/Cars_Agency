let logout = document.querySelector('.Logout')

    logout.addEventListener('click', () => {
        alert('Disconnected')
        window.localStorage.clear()
        setTimeout(() => {
            window.location.href = '../LogIn . SignUp/LogIn.html'
        }, 1000);
    })