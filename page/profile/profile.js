const links = document.getElementsByClassName("links")[0];
const dateLi = document.getElementsByClassName("date")[0];
const access_token = JSON.parse(localStorage?.getItem("access_token"));
const myName = document.getElementsByClassName("name");
const email = document.getElementsByClassName("email");
const dateCreated = document.getElementsByClassName("date-created")[0];
const avatar = document.getElementsByClassName("avatar")[0];
let isImage = ''

if (!access_token) {
    window.location.href = "../auth/login.html";
}

function logOut() {
    localStorage.removeItem("access_token");
}

function openMenu() {
    if (links.style.display === "flex") {
        links.style.display = "none";
    } else {
        links.style.display = "flex";
    }
}

window.onload = function showDate() {
    const now = new Date();
    dateLi.innerHTML = "It's currently " + now.getHours() + " : " + now.getMinutes() + " here";
    // setInterval(() => showDate(), 1000 * 60);
};

window.onload = async function getProfileData() {
    const response = await fetch("https://azam-app-tj-js.herokuapp.com/profile", {
        headers: { Authorization: "Bearer " + access_token },
    });
    const data = await response.json();

    if (data.image) {
        isImage = "/" + data.image
        avatar.src = 'https://azam-app-tj-js.herokuapp.com/' + data.image
    }

    dateCreated.innerHTML = new Date(data.dateCreated).toLocaleString().split(',')[0]
    for (let i = 0; i < myName.length; i++) {
        myName[i].innerHTML = data?.name;
        email[i].innerHTML = data?.username;
    }
};

async function uploadImage(event) {
    const files = event.target.files
    const formData = new FormData()
    formData.append('image', files[0])
    var requestOptions = {
        method: isImage ? 'PUT' : 'POST',
        headers: { Authorization: "Bearer " + access_token },
        body: formData,
        redirect: 'follow'
    };

    const response = await fetch("https://azam-app-tj-js.herokuapp.com/image" + isImage, requestOptions)
    const data = await response.text();
    if (data) {
        avatar.src = 'https://azam-app-tj-js.herokuapp.com/' + data
        updateUser(data)
    }
}

async function updateUser(image) {
    await fetch('https://azam-app-tj-js.herokuapp.com/auth/update/user', {
        method: 'PUT',
        body: JSON.stringify({ image }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + access_token
        }
    })
}
