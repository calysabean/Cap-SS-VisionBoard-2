

function nextPage() {
    $('.submit').submit(function (event) {
        event.preventDefault();
        $('.results').load('index.html')
    })
}

function getAllGoals() {
    $('.dashboaresults1').html("");
    $.ajax({
        method: 'GET',
        url: '/goals',
        dataType: 'json'
    })
        .done((goals) => {
            console.log(goals);
            goals.forEach((option) => {
                $('.dashboaresults1').append(`
            

        <div class="viewPort formCss">
        <section class="formCss3">
        // <form action="/my-vision" class="finalResults">
        //   <fieldset>
          <label for="${option._id}">
          <input title="checkBox" id="${option._id}" class="answerOption1" type="checkbox" value="${option.goal}" name="answer" >
          </label>
//        </fieldset>
<label for="${option._id}">
<input title="checkBox" id="${option._id}" class="answerOption1" type="checkbox" value="${option.goal}" name="answer" >
<p>${option.category}</p>
<p>${option.goal}</p>
</label>
        //   <p>${option.category}</p>
        //   <p>${option.goal}</p>
          </section>
        //   </form>
        </div> 
			`)
            })
        })
}



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

$(() => {
    getAllGoals();
    nextPage();
    getAllGoals1();
});

/* const answerOption = document.getElementById("answerOption");

 answerOption.addEventListener("submit", (e) => {
     e.preventDefault();

     console.log("form has been submitted")
 })*/

/*$(document).ready(function() {
$('.pickGoals').on('click', function(){
    var text = "";
$('#answerOption:checked').each(function() {
    text += $(this).val() + ',';
});
text=text.substring(0, text.length-1);
$('#selectedtext').val(text);
})

})*/

/*$('.js-row"').on('click', function(event) {
event.preventDefault();
return document.html(`Are you sure you want to return to the options page?`    
});
      use modal?*/

/* function for pick-goals page*/

/*function selectedData(){
  $('.pickGoals').on('click', function (event) {
    event.preventDefault();
 
    $.each($("input[name='answer'](:checked)"), function() {
for (let i = 0; i < )
  });
    }) */

/* function displayResult(result) {
   return `
   <div class="viewPort formCss">
   <section class="formCss3">
   <form class="finalResults">
     <fieldset>
     <label for="answerOption">
     <input title="checkBox" class="answerOption" type="checkbox" value="${result.goal}" name="answer" >
     </label>
     </fieldset>
     </form>
     <p>${result.category}</p>
     <p>${result.goal}</p>
     </section>
   </div> 
   `;
 }*/


/*function getAllGoals1() {
   $('.my-chosen-results').html("");
   $.ajax({
           method: 'POST',
           url: '/my-vision',
           dataType: 'json'
       })
       .done((goals) => {
           console.log(goals);
           goals.forEach((option) => {
               $('.my-chosen-results').append(`
       <div action="my-vision.html" method="POST" class="viewPort formCss">
       <section class="formCss3">
       <form action="pick-goals.html" class="finalResults">
         <fieldset>
         <label for="answerOption">
         <input title="checkBox" id="answerOption" class="theClass" type="checkbox" value="${option.goal}" name="answer" >
         </label>
         </fieldset>
         <p>${option.category}</p>
         <p>${option.goal}</p>
         </section>
         </form>
       </div> 
           `)
                   })
   }
   */

function getAllGoals1() {
    $('.my-chosen-results').html("");
    $.ajax({
        method: 'POST',
        url: '/my-vision',
        dataType: 'json'
    })
    .done((goals) => {
        console.log(goals);
        goals.forEach((option) => {
            for (let i = 0; i < option.length; i++) {
                if ($('.answerOption1:checkbox:checked')) {
                    $('.answerOption1:checkbox:checked').map(function () {
                        $('.my-chosen-results').append(`
                            <div class="viewPort formCss">
                            <section class="formCss3">
                            <form action="pick-goals.html" class="finalResults">
                            <fieldset>
                            <label for="answerOption">
                            <input title="checkBox" id="answerOption" class="theClass" type="checkbox" value="${option.goal}" name="answer" >
                            </label>
                            </fieldset>
                            <p>${option.category}</p>
                            <p>${option.goal}</p>
                            </section>
                            </form>
                            </div> 
                        `)
                    })
                }
            }
        })
    })
}