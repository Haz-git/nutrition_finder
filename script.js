//Grabbing necessary variables

const form = document.getElementById('form');
const resultsContainer = document.getElementById('srcResultsContainer');
const searchBox = document.getElementById('searchBox');

//Functions// :)

function fetchFood(e) {
    //fetch results from api and display:
    e.preventDefault();
    let foodTerm = searchBox.value; //grab search term
    
    if (foodTerm == '') {
        alert('Please Enter Something!');
    } else {
        fetch(`https://trackapi.nutritionix.com/v2/search/instant/?query=${foodTerm}`, {
            headers : {
                'x-app-id' : 'aaa5b532',
                'x-app-key' : '38e211a7488cfb018c583066686e3104',
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            });
    }
}

//adding Event Listeners

form.addEventListener('submit', fetchFood);