// This function registers user on signUp
$('.jSsignUpForm').on('click', '.jSsignUP1', function (event) {
    event.preventDefault();
    let registeredUser = {};
    registeredUser.username = $('.jsUserName').val();
    registeredUser.password = $('.jsPassword').val();
    registeredUser.firstName = $('.jsFirstName').val();
    registeredUser.lastName = $('.jsLastName').val();
    processUser(registeredUser)
    $('.jsUserName').val('');
    $('.jsPassword').val('')
    $('.jsFirstName').val('');
    $('.jsLastName').val('');
});

// This function verifies the user and then the response loads the pick-goals.html page.
function processUser(registeredUser) {
    fetch('/api/users',
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(registeredUser)
        })
        .then(response => {
            if (response.status === 201) {
                window.location.href = "pick-goals.html";
                
            }
            else {
                return response.json()
            }

        })
        // provides message when client doesn't enter First Name, Last Name, Username or password information according to specifications.
        .then(response => {
            $('.jSsignUP1').text(response.location + ":   " + response.message);
        })
        .catch(error => console.log('Something went wrong when trying to sign up'));
};
