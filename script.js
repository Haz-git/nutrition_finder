//Grabbing necessary variables

const form = document.getElementById('form');
const resultsContainer = document.getElementById('srcResultsContainer');
const searchBox = document.getElementById('searchBox');
const resultsText = document.getElementById('resultsText');

//Functions// :)

function accessFoodName(obj, accessVar) {
    //Since API returns Data as Object holding an array of objects --> Access Property in Obj --> Access Array (via Index) --> Access Property in Obj.
	for (const prop in obj) {
		for (let x = 0; x < obj[prop].length; x++) {
			for (const access in obj[prop][x]) {
				console.log(obj[prop][x][accessVar]);
			}
		}
	}
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
                console.log(data); //Data is an object holding an array of objects
                resultsText.innerHTML = `Results for : ${foodTerm}`;
                
                //Iterate through the properties of data and check if all values are empty.
                for (let properties in data) {
                    if (data[properties].length == 0) {
                        resultsText.innerHTML = `Sorry! There are no results for : ${foodTerm}`;
                    } else {
                        console.log(accessFoodName(data, 'food_name'));
                    }
                }     
            });
    }
}

//adding Event Listeners

form.addEventListener('submit', fetchFood);