const form = {
    username: '',
    password: '',


}

const errorInner = document.getElementsByClassName('error')[0]

const access_token = localStorage.getItem('access_token')




if (access_token) {
    window.location.href = '../../index.html'
}

function changeValue(event) {
    form[event.target.name] = event.target.value
}

async function login(event) {
    event.preventDefault()
    const response = await fetch('https://azam-app-tj-js.herokuapp.com/auth/login', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json()
    if (data?.access_token) {
        localStorage.setItem('access_token', JSON.stringify(data?.access_token))
        window.location.href = '../../index.html'
    }

    if (data?.message) {
        errorInner.innerHTML = data?.message
        setTimeout(() => errorInner.innerHTML = '', 3000)

    }
}


