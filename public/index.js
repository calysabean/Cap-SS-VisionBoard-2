

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
			goals.forEach((status) => {
			$('.dashboaresults1').append(`
			<div class="display">							
            <h2> ${status.category}</h6>
            <h2> ${status.goal}</h6>
            </div>
														`)
			})
		})
} 

$('.jSsignUpForm').on('click', '.jSsignUP1', function(event) {
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
      $('.jSsignUP1').text(response.location +":   "+ response.message);
    })
    .catch(error => console.log('Oops something went wrong'));
};

   $(() => {
    getAllGoals();
    nextPage(); 
  });
 
  /* function for pick-goals page*/

  /*function selectedData(){
    $('.pickGoals').on('click', function (event) {
      event.preventDefault();
  
      $.each($("input[name='answer']:not(:checked)"), function() {
    $(this).closest('div').hide();
      });
      }) */

/*$('.js-row"').on('click', function(event) {
event.preventDefault();
return document.html(`Are you sure you want to return to the options page?`    
});
      use modal?*/