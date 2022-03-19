// Coinranking CORS Docs stackoverflow cors reverse proxy
// Coinranking Docs go to cors-anywhere.herokuapp.com and click on the "request temporary access to demo server" button. Then go back and refresh your page.
// https://api-project-2-d8574.web.app/
var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
var alertTrigger = document.getElementById('liveAlertBtn')

function alert(message, type) {
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    alertPlaceholder.append(wrapper)
}

if (alertTrigger) {
    alertTrigger.addEventListener('click', function () {
    alert('Click the top left where it says "Click Me!" or Go to cors-anywhere.herokuapp.com and click on the "request temporary access to demo server" button. Then go back and refresh your page. ')
    })
}

fetch('https://cors-anywhere.herokuapp.com/https://api.coinranking.com/v2/coins', {
    method: "GET",
    mode: 'cors',
    headers: {
        // Coinranking Docs
        "Content-Type": "Application/Json",
        "x-access-token" : `${config}`,
        "Access-Control-Allow-Origin": "*"
    }
})
.then(function (result) { // waiting for the results/promise similar to async/await. wait for promise resolver.
    console.log(result)
    return result.json(); // returning json data, data is converted to json via json method
})
.then(function (json) { // after data get jsonified, and json variable now contains all of our data
    console.log(json)
    console.log(json.data.coins);
    let coinsData = json.data.coins
    console.log(coinsData)
    if (coinsData.length > 0) { //if json.data.coins array length is greater than 0 create variable cryptoCoins
        // let cryptoCoins= ''
        var cryptoCoins = '' // create empty variable for next loop
    } else {
        alert("Shit is hitting the fan we got a huge error")
    }
    
    // .forEach function Looping over JSON array in JavaScript https://zetcode.com/javascript/jsonforeach/
    coinsData.forEach(coins => { // loop adds data from json.data.coins to the table body from the api.
        cryptoCoins += '<tr>'
        cryptoCoins += `<td> ${coins.rank} </td>`;
        // cryptoCoins += `<td style=`(${coins.change})? color: "red": color: "green"`> ${coins.change} </td>`; 
        cryptoCoins += `<td> ${coins.name} </td>`;
        cryptoCoins += `<td id="coinsChange" > ${coins.change}% </td>`;
        cryptoCoins += `<td> $${Math.round(coins.price * 100) / 100} </td>`; // Stack overflow to find Math.round then to make it nearest .00 decimal (num * 100) /100
        cryptoCoins += `<td> ${coins.symbol} </td>`;
        cryptoCoins += '</tr>';
        document.getElementById("apiData").innerHTML = cryptoCoins
        })

        var coinsChange = document.querySelectorAll("#coinsChange")
        for (let index = 0; coinsChange.length; index++) {
            if (parseFloat(coinsChange[index].textContent) >= 0) {
                coinsChange[index].classList.add("positive")
            } else {
                coinsChange[index].classList.add("negative")
            }
        }
})
    
