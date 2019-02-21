/* This function makes a post request to the below endpoint*/
function login(username, password) {
    const data = {
        username, password
    }

    fetch("/api/auth/login", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + localStorage.authToken
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

// registers user on signUp
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
        .then(response => {
            $('.jSsignUP1').text(response.location + ":   " + response.message);
        })
        .catch(error => console.log('Oops something went wrong in index.js /api/users POST request'));
};


function watchForm() {
    $('.js-login-form').on('click', '.logIn', function(event) {
        event.preventDefault();
        let user = {};
        const userName = $('.u-name').val();
        const password = $('.p-word').val();
        login(userName, password);
        $('.u-name').val('');
        $('.p-word').val('');
    });
    $(".submitPost").submit(event => {
        event.preventDefault();
        const categoryName = $('.my-category').val();
        const commentsText = $('.my-notes').val();
        createGoal(categoryName, commentsText);
    });
}

/*Makes a POST request to the below endpoint then a GET request to generate the posted information*/
/*function createGoal(categoryName, commentsText) {
    const data = {
        category: categoryName,
        comments: commentsText
    }

    return fetch('/api/goals/posts',
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.authToken
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(fetch('/api/goals/posts', {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + localStorage.authToken }
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error(response.statusText);
                })
                .then((goals) => {
                     goals.forEach((option) => {
                         $('.post-results').append(`
                         <li>
                         <h3>HELLO IT WORKED</h3>
                         <button>Edit Goal</button><button>Delete Goal</button>
                         <label for="${option._id}">
                         <input title="checkBox" id="${option._id}" class="answerOption1" type="checkbox" value="${option._id}" name="answer" >
                         <p>${option.category}</p>
                         <p>${option.comments}</p>
                     </li>
         
                     `)
                     })
                 })
                .catch(err => {
                    $('#js-error-message').text(`Oops! Something went wrong: ${err.message}`);
                }));
            }*/

/*function displayGoals(responseJson) {
    for (let i = 0; i < responseJson.length; i++) {
        $('.post-results').append(`
                <li>
            <h3>HELLO IT WORKED</h3>
                <button>Edit Goal</button><button>Delete Goal</button>
                
            </li>

			`)
            };
        };*/


// This GET request loads the data results on the pick-goals page.
function getAllGoals() {
    $('.dashboaresults1').html("");
    $.ajax({
        method: 'GET',
        url: '/api/goals',
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json',
           'Authorization': 'bearer ' + localStorage.authToken
        }
    })
        .done((goals) => {
            goals.forEach((option) => {
            $('.dashboaresults1').append(`
            <div class="formCss">
                <section class="dbDisplay">
                <label for="${option._id}">
                <input title="checkBox" id="${option._id}" class="answerOption1" type="checkbox" value="${option._id}" name="answer" >
                <p class="dbGoals">${option.category}</p>
                <p class="dbGoals1">${option.goal}</p>
                </label>
                </section>
            </div> 
			`)
            })
        })
}

// This function is for an input submit button on the pick-goals.html page, when submitted the myVisionPage function will run and the closest div 'not' checked will be hidden. 
function selectedData(){
    $('.pickGoals').on('click', function (event) {
    myVisionPage();
    event.preventDefault();
    $.each($("input[name='answer']:not(:checked)"), function() {
    $(this).closest('div').hide();
  });
 })
}

// This function will remove the h1 code from the secondView div and then show the h1 code for the thirdView class div. It also displays the main page content.
function myVisionPage() { 
    $('.secondView').remove();
    $('.thirdView').show();
    $('.hiddenForm').css('display', 'block');
}

// The box class is associated with the six category divs on the pick-goals page. When a user clicks on any of the div's with the class box then the original list of categories/goals will generate.
function additionalOptions(){
    $('.box').on('click', function (event) {
    event.preventDefault();
    $.each($("input[name='answer']"), function() {
    $(this).closest('div').show();
   });
 })
}

$(watchForm);

    $(() => {
       getAllGoals();
        selectedData();
        additionalOptions();
    });



// Original Code
/*
function login(username, password) {
    const data = {
        username, password
    }

    fetch("/api/auth/login", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + localStorage.authToken
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
    $('.js-login-form').on('click', '.logIn', function(event) {
        event.preventDefault();
        let user = {};
        const userName = $('.u-name').val();
        const password = $('.p-word').val();
        login(userName, password);
        $('.u-name').val('');
        $('.p-word').val('');
    });
}

$(".submitPost").submit(event => {
    event.preventDefault();
    const categoryName = $('.my-category').val();
    const commentsText = $('.my-notes').val();
    createGoal(categoryName, commentsText);
});


function createGoal(categoryName, commentsText) {
    const data = {
        goal: categoryName,
        comments: commentsText
    }

    return fetch('/api/goals/posts',
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.authToken
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(function getGoals() {
    fetch('/api/goals/posts', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + localStorage.authToken }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayGoals(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Oops! Something went wrong: ${err.message}`);
        });
    })
}

function displayGoals(responseJson) {
    responseJson.forEach((option) => {
                $('.post-results ').append(`
            

        <div class="viewPort formCss">
        <section class="formCss3">
          <label for="${option._id}">
          <input title="checkBox" id="${option._id}" class="answerOption1" type="checkbox" value="${option._id}" name="answer" >
          <p>${option.category}</p>
          <p>${option.comments}</p>
          </label>
          </section>
        </div> 
			`)
            })
        }


// registers user on signUp
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
        .then(response => {
            $('.jSsignUP1').text(response.location + ":   " + response.message);
        })
        .catch(error => console.log('Oops something went wrong in index.js /api/users POST request'));
};


// This GET request loads the data results on the pick-goals page.
function getAllGoals() {
    $('.dashboaresults1').html("");
    $.ajax({
        method: 'GET',
        url: '/api/goals',
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + localStorage.authToken
        }
    })
        .done((goals) => {*/
           /* console.log(goals);*/
            /*goals.forEach((option) => {*/
               /* $('.dashboaresults1').append(
            

        <div class="viewPort formCss">
        <section class="formCss3">
          <label for="${option._id}">
          <input title="checkBox" id="${option._id}" class="answerOption1" type="checkbox" value="${option._id}" name="answer" >
          <p>${option.category}</p>
          <p>${option.goal}</p>
          </label>
          </section>
        </div> 
			`)
            })
        })
}*/

// This function is for an input submit button on the pick-goals.html page, when submitted the myVisionPage function will run and the closest div 'not' checked will be hidden. 
/*function selectedData(){
    $('.pickGoals').on('click', function (event) {
    myVisionPage();
    event.preventDefault();
    $.each($("input[name='answer']:not(:checked)"), function() {
    $(this).closest('div').hide();
  });
 })
}*/

// This function will remove the h1 code from the secondView div and then show the h1 code for the thirdView class div. It also displays the main page content.
/*function myVisionPage() { 
    $('.secondView').remove();
    $('.thirdView').show();
    $('.hiddenForm').css('display', 'block');
}

// The box class is associated with the six category divs on the pick-goals page. When a user clicks on any of the div's with the class box then the original list of categories/goals will generate.
function additionalOptions(){
    $('.box').on('click', function (event) {
    event.preventDefault();
    $.each($("input[name='answer']"), function() {
    $(this).closest('div').show();
   });
 })
}


$(watchForm);

    $(() => {
       getAllGoals();
        selectedData();
        additionalOptions();
    });*/