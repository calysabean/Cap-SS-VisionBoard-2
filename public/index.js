$(() => {
    getAllGoals();
    nextPage(); 
    watchSubmit(); 
  });

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

 