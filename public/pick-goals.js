
// This GET request loads the initial data results on the pick-goals page.
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
        .done((goals) => {
            goals.forEach((option) => {
            $('.dashboaresults1').append(`
     
            <div class="formCss">
            <section class="dbDisplay">
            <label for="${option.id}">
            <input title="checkBox" id="${option.id}" class="answerOption1" value="${option.id}" name="answer" >
            <p class="dbGoals">${option.category}</p>
            <p class="dbGoals1">${option.goal}</p>
            </label>
            </section>
        </div> 

        </div>

</div>

			`)
            })
        })
}

// This GET request loads the posts data results on the pick-goals page.
function getPosts() {
    $('.post-results').html("");
$.ajax({
   method: 'GET',
   url: '/api/goals/posts/',
   dataType: 'json',
   headers: {
   'Content-Type': 'application/json',
   'Authorization': 'bearer ' + localStorage.authToken
   }
})
.done((goalposts) => {
   goalposts.forEach((option) => {
      // console.log(option);
   $('.post-results').append(`
   <form class="formCss js-submit">
       <section class="dbDisplay">
       <label for="${option.id}">
       <input title="checkBox" id="${option.id}" class="answerOption1" value="${option.id}" name="answer" >
       <p id"${option.category}" class="dbGoals">${option.category}</p>
       <p id"${option.comments}" class="dbGoals1">${option.comments}</p>
       </label>
       <button id="${option.id}" type="submit" class="deleteButton">Delete</button>  
       <button  class="editButton" type="submit" id="${option.id}">Edit</button>  
       </section>
   </form> 
   `)
   })
})}

function hideDreamsButton() {
    $('.js-pickGoals').hide();
}


// this function captures a particular ID and deletes the posts
function deleteGoal(id) {
console.log(id);
fetch(`/api/goals/posts/${id}`, {
   method: 'DELETE',
   headers: {
        "Content-Type": "application/json" ,
       'Authorization': 'Bearer ' + localStorage.authToken
   }
})
   .then(response => {
       if (response.ok) {
           getPosts();
       }
   })
}

/*Makes a POST request to the below endpoint then a GET request to generate the posted information*/
function createPagePost(categoryName, notesForCategory) {
const data = {
   category: categoryName,
   comments: notesForCategory
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
           .then( (goals => displayGoals(goals)))
           .catch(err => {
               alert(`Something went wrong while posting, did you select a category and enter a note?`);
           });
       }

// Once a successful request POST is made, the response is returned and then this function runs posting the category and comments on the page            
function displayGoals(goalposts) { 
$('.post-results').append(`
<form class="formCss1">
<section class="dbDisplay2">
<label for="${goalposts.id}">
<input title="checkBox" id="${goalposts.id}" class="answerOption12" value="${goalposts.id}" name="answer1" >
<p class="dbGoals2">${goalposts.category}</p>
<p class="dbGoals12">${goalposts.comments}</p>
</label>
<input id="${goalposts.id}" type="submit" class="deleteButton1">Delete</button>  
</section>
</form> 
`)
}
   
$(".reloadButton").on('click', function(){
localStorage.clear();
window.location = 'index.html'
})

// This function is for an input submit button on the pick-goals.html page, when submitted the myVisionPage function will run and the closest div 'not' checked will be hidden. 
function selectedData(){
$('.pickGoals').on('click', function (event) {
myVisionPage();
event.preventDefault();
$.each($("input[name='answer']"), function() {
$(this).closest('div').hide();
$('.js-pickGoals').hide();
});
$(window).scrollTop(0);
})
}

// This function will remove the h1 code from the secondView div and then show the h1 code for the thirdView class div. It also displays the main page content.
function myVisionPage() { 
$('.secondView').remove();
$('.thirdView').show();
$('.hiddenForm').css('display', 'block');
getPosts();
}

// The box class is associated with the six category divs on the pick-goals page. When a user clicks on any of the div's with the class box then the original list of categories/goals will generate.
function additionalOptions(){
$('.box').on('click', function (event) {
event.preventDefault();
getAllGoals();
$(window).scrollTop(0);
$.each($("input[name='answer']"), function() {
$(this).closest('div').show();
$('.js-pickGoals').show();
});
})
}

function watchForm() {
    // event listener for Posting comments
    $(".goal-notes").on('click', '.submitPost', function(event) {
        event.preventDefault();
        const categoryName = $('.my-category').val();
        const notesForCategory = $('.my-notes').val();
        createPagePost(categoryName, notesForCategory);
        $('.my-category').val('');
        $('.my-notes').val('');
    }); 

  // event listener for delete button  
   $('body').on( 'click', '.deleteButton', function(event) {
   event.preventDefault();
      const id = $(event.target).attr("id");
        //console.log(id);
        deleteGoal(id);
    });

    $('body').on( 'click', '.editButton', function(event) {
    event.preventDefault();
    let id = $(event.target).attr("id");
    localStorage.setItem('id', JSON.stringify(id));
    window.location = 'edit-goal.html'
    });      
}

        $(watchForm);

        

        $(() => {
            getPosts();
            selectedData();
            additionalOptions();
            hideDreamsButton();
            });

        