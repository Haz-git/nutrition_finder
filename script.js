//Grabbing necessary variables

const form = document.getElementById('form');
const resultsContainer = document.getElementById('srcResultsContainer');
const searchBox = document.getElementById('searchBox');
const resultsText = document.getElementById('resultsText');

//Functions// :)

function accessProperty(obj, accessVar) {
    //Since API returns Data as Object holding an array of objects --> Access Property in Obj --> Access Array (via Index) --> Access Property in Obj.

    let arr = [];

	for (const prop in obj) { //access branded and unbranded
		for (let x = 0; x < obj[prop].length; x++) { //access all objects in array
            arr.push(obj[prop][x][accessVar]); //access individual objects, and access a specific property
		}
    }
    return arr;
}

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
                console.log(data); //data is an object holding an array of objects
                resultsText.innerHTML = `Results for : ${foodTerm}`;
            
                //Check if results are already displayed. If yes, delete them to make room for new ones.
                if (resultsContainer.innerHTML.trim() !== '') {
                    resultsContainer.innerHTML = '';
                } 

                //Iterate through the properties of data and check if all values are empty.
                for (let properties in data) { //access branded and unbranded
                    if (data[properties].length == 0) { //access every object in array
                        resultsText.innerHTML = `Sorry! There are no results for : ${foodTerm}`;
                    } else {
                        for (let x = 0; x < data[properties].length; x++) { //access every object in array
                            resultsContainer.innerHTML += `
                                <div class="indiv-result-container">
                                    <img src="${data[properties][x].photo.thumb}" alt="food image"/>
                                    <div class="indiv-result" id="resultContainer">
                                        <h2>${data[properties][x].food_name.toUpperCase()}</h2>
                                        <h3> Serving Size: ${data[properties][x].serving_qty + ' ' + data[properties][x].serving_unit} </h3>
                                    </div>
                                    <div class="calorie-container">
                                        <h2> Calories: ${data[properties][x].nf_calories}</h2>
                                    </div>
                                </div>`
                            ;
                        }
                    }
                    searchBox.value = '';
                }     
            });
    }
}

//adding Event Listeners

form.addEventListener('submit', fetchFood);