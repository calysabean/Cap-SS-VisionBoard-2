
function nextPage() {
  $('.submit').submit(function (event) {
    event.preventDefault();
	$('.results').load('index.html')
})
}

/*getAllGoals();*/


/*fetch('/goals')
	.then((goals) => {document.getElementsByClassName('results').appendChild(`
    <div class="display">	
    <p> Hello </p>						
    <h6> ${goals.category}</h6>
    
    </div>  `)
    
});*/


function getAllGoals() {
	$('.results').html("");
	$.ajax({
			method: 'GET',
			url: '/goals',
			dataType: 'json'
		})
		.done((goals) => {
            console.log(goals);
			goals.forEach((status) => {
			$('.results1').append(`
			<div class="display">							
            <h2> ${status.category}</h6>
            <h2> ${status.goal}</h6>
            </div>
														`)
			})
		})
} 

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

   $(watchSubmit);

   $(() => {
    getAllGoals();
nextPage()  
  });