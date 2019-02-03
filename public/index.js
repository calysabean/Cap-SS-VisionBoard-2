

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
    /*.then(response => {
      $('.js-signup-status').text(response.location +":   "+ response.message);
    })
    .catch(error => console.log('Bad request'));*/
};

   $(() => {
    getAllGoals();
    nextPage(); 
  });
 