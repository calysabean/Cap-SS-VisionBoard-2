let url = 'https://murmuring-temple-70944.herokuapp.com/goals/';

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
        .catch(error => console.log('Oops something went wrong'));
};

// This GET request loads the data results on the pick-goals page.
function getAllGoals() {
    $('.dashboaresults1').html("");
    $.ajax({
        method: 'GET',
        url: '/goals',
        dataType: 'json'
    })
        .done((goals) => {
           /* console.log(goals);*/
            goals.forEach((option) => {
                $('.dashboaresults1').append(`
            

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


// This function makes a Post request
function createGoal(goalName, journalEntry) {
    const data = {
        goal: goalName,
        comments: journalEntry
        
}
console.log(data);
return fetch('/goals',
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response);
        })
        .catch(err => {
            console.log('something went wrong');
        });
    }

    // This function deals with the notes box on pick-goals.html, once values are entered then a POST request will be sent to the server and GET request will populate the text on the page.

function watchForm() {
        $(".new-goal").submit(event => {
        event.preventDefault();
        const categoryName = $('.my-category').val();
        const commentText = $('.my-notes').val();            createGoal(categoryName, commentText);
     });
    }
    
function getGoals() {
        fetch('/goals/', {
            method: 'GET',
        })
            .then(response => {
                if (response.ok) {
                return response.json();
                }
                throw new Error(response);
            })
            .then(responseJson => displayGoals(responseJson))
            .catch(err => {
               console.log('something went wrong');
            });
    }
    
    function displayGoals(responseJson) {
        for (let i = 0; i < responseJson.length; i++) {
            $(".post-results").append(
                `<li>
                    <h2>${responseJson.category[i]}/h2>
                    <p>${responseJson.comments[i]}</p>
                </li>`
            )
        };
    };

    $(() => {
        getAllGoals();
        selectedData();
        additionalOptions();
        getGoals();
        watchForm();
    });