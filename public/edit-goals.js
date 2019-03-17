
function watchForm() {
    let retrievedObject = localStorage.getItem('id');
    let editID = JSON.parse(retrievedObject);
    getGoal(editID);
    };

$('body').on('click', '.submitEditPost', function(event) {
    event.preventDefault();
    console.log(event);
    const categoryName = $('.my-Editcategory').val();
    const notesForCategory = $('.my-editnotes').val();
    updatePagePost(categoryName, notesForCategory);
    $('.my-Editcategory').val('');
    $('.my-editnotes').val('');
    }); 
        
function updatePagePost (categoryName, notesForCategory) {
    let retrievedObject = localStorage.getItem('id');
    let editID = JSON.parse(retrievedObject);
    const data = {
    id: editID,
    category: categoryName,
    comments: notesForCategory
    }
    console.log(data);

    return fetch(`/api/goals/posts/${editID}`,
    {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.authToken
    }
    })
    .then(response => {
    if (response.ok) {
    window.location = 'pick-goals.html'
    }

    throw new Error(response.statusText);
    })
    .catch(err => {
    $('#js-error-message').text(`Oops! Something went wrong: ${err.message}`);
    });
    }

    function getGoal(editID) {
    //console.log(editID);
    fetch(`/api/goals/posts/${editID}`, {
    method: 'GET',
    headers: {
    "Content-Type": "application/json" ,
    'Authorization': 'Bearer ' + localStorage.authToken
     }
     })
     .then(response => {
     if (response.ok) {
     return response.json();         
     }
     // throw new Error(response.statusText);
     })
     .then((goals => displayGoals1(goals)))
     }
    
           
    function displayGoals1(goalposts) { 
    $('.editBox').append(`
    <form class="editPage-notes" role="form" action="#">
    <legend>Notes to reach my goals, choose a category.</legend>
    <label class="category" for="${goalposts.id}"></label>
      <select id="${goalposts.id}" type="text" title="category" class="my-Editcategory"  placeholder="Enter Category" required>
        <option value="${goalposts.category}" selected>${goalposts.category}</option>
        <option value="Career">Career</option>
        <option value="Financial">Financial</option>
        <option value="Physical">Physical</option>
        <option value="Personal-development">Personal-development</option>
        <option value="Spiritual">Spiritual</option>
        <option value="Experiential">Experiential</option>
      </select>
             
    <label for="notes">
    <input id="notes" title="notes" value="${goalposts.comments}" type="text" class="my-editnotes" placeholder="Enter Notes" required>
    </label>
    
<input id="${goalposts.id}" type="submit" class="deleteButton1">

<input type="submit" id="${goalposts.id}" class="submitEditPost">
        
</form>
`)
} 
     
$(watchForm);

           
