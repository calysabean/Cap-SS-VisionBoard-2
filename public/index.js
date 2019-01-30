
/*function getAllGoals() {
  $('form').submit(function (event) {
    event.preventDefault();
	$('.results').load('/goals')
})
}

getAllGoals();*/


fetch('/goals')
	.then((goals) => {document.getElementsByClassName('results').appendChild(`
    <div class="display">							
    <h6> ${goals.category}</h6>
    
    </div>  `)
    
});
/*function getAllGoals() {
	$('.results').html("");
	$.ajax({
			method: 'GET',
			url: '/goals',
			dataType: 'json'
		})
		.done((goals) => {
			category.forEach((status) => {
			$('.results').append(`
			<div class="display">							
            <h6> ${goals.category}</h6>
            
            </div>
														`)
			})

			$('form#new-status :input').val("");
			$('#new-entry').addClass('hide-display');
		})
}

getAllGoals();

$(document).ready(() => {
	getAllGoals()
}); 

function displayResults(data) {
    const searchResults = data.category.map((item, index) => displayResult(item));
    $('.results').html(searchResults);
   }
   
   function watchSubmit() {
    function getAllGoals() {
        $('form').submit(function (event) {
          event.preventDefault();
          $('.results').load('/goals')
      })
      }
    }

   $(watchSubmit);*/