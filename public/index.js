/* This function makes a post request to the below endpoint when a user logs in*/
function login(username, password) {
    const data = {
        username, password
    }
    fetch("/api/auth/login", {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
    'Content-Type': 'application/json',
    // This line was removed because your login is being dynamically generated
    //'Authorization': 'Bearer ' + localStorage.authToken
     }
    })
    .then(response => {
    console.log(response);
    if (response.status === 401) {
    alert("Incorrect username or password")
    }else{
    return response.json()
    }
    })
    .then(responseJson => {
    localStorage.authToken = responseJson.authToken;
    window.location = 'pick-goals.html';        
    })
    .catch(err => {
    alert(`Oops oh no! Something went wrong: ${err.message}`);
    });
}

function watchForm() {
// event-listener for login-form
$('.js-login-form').on('click', '.logIn', function(event) {
    event.preventDefault();
    const userName = $('.u-name').val();
    const password = $('.p-word').val();
    login(userName, password);
    $('.u-name').val('');
    $('.p-word').val('');
    });     
}

$(watchForm);


    