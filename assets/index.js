const url = "http://api.weatherapi.com/v1/current.json?key=e9651d29e9f94d85bce61916222502&q=";

var apiData =
{
    "regions":
    {
        "amazon":
            [{ "id": "us-east-1", "name": "US Virginia" },
            { "id": "us-west-1", "name": "California" },
            { "id": "us-east-2", "name": "Ohio" },
            { "id": "us-west-2", "name": "Oregon" },
            { "id": "ca-central-1", "name": "Montreal" },
            { "id": "eu-west-1", "name": "Ireland" },
            { "id": "eu-central-1", "name": "Frankfurt" },
            { "id": "eu-west-2", "name": "London" },
            { "id": "eu-south-1", "name": "Milan" },
            { "id": "eu-west-3", "name": "Paris" },
            { "id": "eu-north-1", "name": "Stockholm" },
            { "id": "ap-southeast-1", "name": "Singapore" },
            { "id": "ap-southeast-2", "name": "Sydney" },
            { "id": "ap-northeast-1", "name": "Tokyo" },
            { "id": "ap-northeast-2", "name": "Seoul" },
            { "id": "ap-south-1", "name": "Mumbai" },
            { "id": "ap-east-1", "name": "Hong Kong" },
            { "id": "me-south-1", "name": "Bahrain" },
            { "id": "af-south-1", "name": "Cape Town" },
            { "id": "sa-east-1", "name": "Sao Paulo" }],
        "do":
            [{ "id": "lon1", "name": "London" },
            { "id": "sfo3", "name": "San Francisco" },
            { "id": "sgp1", "name": "Singapore" },
            { "id": "nyc1", "name": "New York" },
            { "id": "ams3", "name": "Amsterdam" },
            { "id": "fra1", "name": "Frankfurt" },
            { "id": "tor1", "name": "Toronto" },
            { "id": "blr1", "name": "Bangalore" }],
        "linode":
            [{ "id": "us-east", "name": "Newark" },
            { "id": "us-central", "name": "Dallas" },
            { "id": "us-west", "name": "Fremont" },
            { "id": "us-southeast", "name": "Atlanta" },
            { "id": "eu-west", "name": "London" },
            { "id": "eu-central", "name": "Frankfurt" },
            { "id": "ap-south", "name": "Singapore" },
            { "id": "ap-northeast", "name": "Tokyo" },
            { "id": "ca-central", "name": "Toronto" },
            { "id": "ap-west", "name": "Mumbai" },
            { "id": "ap-southeast", "name": "Sydney" }],
        "gce":
            [{ "id": "us-central1", "name": "Iowa" },
            { "id": "us-east1", "name": "Carolina" },
            { "id": "us-west1", "name": "Oregon" },
            { "id": "us-east4", "name": "Virginia" },
            { "id": "us-west4", "name": "Las Vegas" },
            { "id": "europe-west1", "name": "Belgium" },
            { "id": "europe-west4", "name": "Netherlands" },
            { "id": "europe-west2", "name": "London" },
            { "id": "europe-north1", "name": "Finland" },
            { "id": "europe-west3", "name": "Frankfurt" },
            { "id": "northamerica-northeast1", "name": "Montreal" },
            { "id": "asia-south1", "name": "Mumbai" },
            { "id": "asia-east2", "name": "Hong kong" },
            { "id": "asia-east1", "name": "Taiwan" },
            { "id": "asia-southeast1", "name": "Singapore" },
            { "id": "asia-northeast1", "name": "Tokyo" },
            { "id": "australia-southeast1", "name": "Sydney" },
            { "id": "southamerica-east1", "name": "Sao Paulo" }],
        "vultr":
            [{ "id": "4", "name": "Seattle" },
            { "id": "12", "name": "Silicon Valley" },
            { "id": "5", "name": "Los Angeles" },
            { "id": "3", "name": "Dallas" },
            { "id": "2", "name": "Chicago" },
            { "id": "6", "name": "Atlanta" },
            { "id": "39", "name": "Miami" },
            { "id": "1", "name": "New York (NJ)" },
            { "id": "8", "name": "London" },
            { "id": "7", "name": "Amsterdam" },
            { "id": "24", "name": "Paris" },
            { "id": "9", "name": "Frankfurt" },
            { "id": "41", "name": "Stockholm" },
            { "id": "25", "name": "Tokyo" },
            { "id": "34", "name": "Seoul" },
            { "id": "19", "name": "Sydney" },
            { "id": "40", "name": "Singapore" },
            { "id": "22", "name": "Toronto" },
            { "id": "42", "name": "Mexico City" }]
    }
}

console.log('Countries Data', apiData);


var combine = {};
var swap = {};

for (var key in apiData.regions) {
    var obj = apiData.regions[key];
    // console.log("api key :", obj)

    let cities = [];
    var firstObj;
    obj.forEach(element => {
        firstObj = cities.push(element.name);
    });

    combine[key] = cities;

}

console.log('combine', combine)

var citydata;
for (var [key, value] of Object.entries(combine)) {
    value.forEach(items => {
        citydata = items.toLocaleUpperCase();
        if (citydata in swap) {
            swap[citydata].push(key)
        } else {
            swap[citydata] = [key]
        }
        //   keyObject[items] = [key];

    })
    //getData(value);
}
console.log('Swap', swap);


let finalDataArray = [];
for (var [key, value] of Object.entries(swap)) {
    let tempObj = {
        city: key,
        provider: value
    }
    //  finalDataArray.push(tempObj1)
    //  console.log('key', key, value);
    fetch(url + key)
        .then(responce => responce.json())
        .then((data) => {
            //console.log('Success', data);
            let countryData = data.location.country;
            let splitRegionData = data.location.tz_id;
            const regionData = splitRegionData.split('/')[0];

            // console.log("Countries with region : ", regionData, ',', countryData);
            let tempObj1 = {
                region: regionData,
                country: countryData,
            }

            let objData = {
                ...tempObj,
                ...tempObj1
            }
            finalDataArray.push(objData)
        })

        .catch((error) => {
            console.log("error", error)
        })

    // console.log(data)

}
console.log('final data', finalDataArray);


document.querySelectorAll(".nav-link").forEach((item) => {
    item.addEventListener("click", function (event) {
        let multiTab = event.target.getAttribute("data-bs-target");
        console.log('data-bs-target', multiTab);
        const filTab = finalDataArray.filter(comapareHostingdata => comapareHostingdata.region == multiTab);

        if (multiTab == 'all-Locations') {
            displayDataCenter(finalDataArray);
        } else {
            displayDataCenter(filTab);
        }

        //  console.log('final data Array', finalDataArray);
        //    document.querySelector('.cardsWrap').innerHTML = ' ';




    })
})

const displayDataCenter = (switchTAbs) => {
    console.log('SwitchTabs', switchTAbs);
    console.log(document.querySelector('.cardsWrap').innerHTML = "");

    switchTAbs.map((data) => {
        //    console.log('mapping dataa', data);
        let cardBox = ``;
        cardBox = `
    <div class="card">
    <div class="cardDetails">
        <div class="countriesDetails">
            <h4>${data.country}</h4>
            <p>${data.city}</p>
        </div>
        <div class="flag">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjM1IDY1MCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KPGRlZnM+DQo8ZyBpZD0idW5pb24iPg0KPHVzZSB5PSItLjIxNiIgeGxpbms6aHJlZj0iI3g0Ii8+DQo8dXNlIHhsaW5rOmhyZWY9IiN4NCIvPg0KPHVzZSB5PSIuMjE2IiB4bGluazpocmVmPSIjczYiLz4NCjwvZz4NCjxnIGlkPSJ4NCI+DQo8dXNlIHhsaW5rOmhyZWY9IiNzNiIvPg0KPHVzZSB5PSIuMDU0IiB4bGluazpocmVmPSIjczUiLz4NCjx1c2UgeT0iLjEwOCIgeGxpbms6aHJlZj0iI3M2Ii8+DQo8dXNlIHk9Ii4xNjIiIHhsaW5rOmhyZWY9IiNzNSIvPg0KPC9nPg0KPGcgaWQ9InM1Ij4NCjx1c2UgeD0iLS4yNTIiIHhsaW5rOmhyZWY9IiNzdGFyIi8+DQo8dXNlIHg9Ii0uMTI2IiB4bGluazpocmVmPSIjc3RhciIvPg0KPHVzZSB4bGluazpocmVmPSIjc3RhciIvPg0KPHVzZSB4PSIuMTI2IiB4bGluazpocmVmPSIjc3RhciIvPg0KPHVzZSB4PSIuMjUyIiB4bGluazpocmVmPSIjc3RhciIvPg0KPC9nPg0KPGcgaWQ9InM2Ij4NCjx1c2UgeD0iLS4wNjMiIHhsaW5rOmhyZWY9IiNzNSIvPg0KPHVzZSB4PSIuMzE1IiB4bGluazpocmVmPSIjc3RhciIvPg0KPC9nPg0KPGcgaWQ9InN0YXIiPg0KPHVzZSB4bGluazpocmVmPSIjcHQiIHRyYW5zZm9ybT0ibWF0cml4KC0uODA5MDIgLS41ODc3OSAuNTg3NzkgLS44MDkwMiAwIDApIi8+DQo8dXNlIHhsaW5rOmhyZWY9IiNwdCIgdHJhbnNmb3JtPSJtYXRyaXgoLjMwOTAyIC0uOTUxMDYgLjk1MTA2IC4zMDkwMiAwIDApIi8+DQo8dXNlIHhsaW5rOmhyZWY9IiNwdCIvPg0KPHVzZSB4bGluazpocmVmPSIjcHQiIHRyYW5zZm9ybT0icm90YXRlKDcyKSIvPg0KPHVzZSB4bGluazpocmVmPSIjcHQiIHRyYW5zZm9ybT0icm90YXRlKDE0NCkiLz4NCjwvZz4NCjxwYXRoIGZpbGw9IiNmZmYiIGlkPSJwdCIgZD0iTS0uMTYyNSwwIDAtLjUgLjE2MjUsMHoiIHRyYW5zZm9ybT0ic2NhbGUoLjA2MTYpIi8+DQo8cGF0aCBmaWxsPSIjYmYwYTMwIiBpZD0ic3RyaXBlIiBkPSJtMCwwaDEyMzV2NTBoLTEyMzV6Ii8+DQo8L2RlZnM+DQo8cGF0aCBmaWxsPSIjZmZmIiBkPSJtMCwwaDEyMzV2NjUwaC0xMjM1eiIvPg0KPHVzZSB4bGluazpocmVmPSIjc3RyaXBlIi8+DQo8dXNlIHk9IjEwMCIgeGxpbms6aHJlZj0iI3N0cmlwZSIvPg0KPHVzZSB5PSIyMDAiIHhsaW5rOmhyZWY9IiNzdHJpcGUiLz4NCjx1c2UgeT0iMzAwIiB4bGluazpocmVmPSIjc3RyaXBlIi8+DQo8dXNlIHk9IjQwMCIgeGxpbms6aHJlZj0iI3N0cmlwZSIvPg0KPHVzZSB5PSI1MDAiIHhsaW5rOmhyZWY9IiNzdHJpcGUiLz4NCjx1c2UgeT0iNjAwIiB4bGluazpocmVmPSIjc3RyaXBlIi8+DQo8cGF0aCBmaWxsPSIjMDAyODY4IiBkPSJtMCwwaDQ5NHYzNTBoLTQ5NHoiLz4NCjx1c2UgeGxpbms6aHJlZj0iI3VuaW9uIiB0cmFuc2Zvcm09Im1hdHJpeCg2NTAgMCAwIDY1MCAyNDcgMTc1KSIvPg0KPC9zdmc+DQo="
                alt="" class="img-fluid">
        </div>
    </div>
    <div class="providerBox">
        <ul class="providers list-unstyled">
            <li>${data.provider}</li>
        </ul>
    </div>
    </div>`
        document.querySelector('.cardsWrap').innerHTML += cardBox;
    })


}


// async function getData(value) {
//     var countriesArray = []
//     //    console.log('value of cities object', value)
//     for (var i = 0; i < value.length; i++) {
//         try {
//             const responce = await fetch(url + value[i]);
//             const data = await responce.json()
//             //   console.log('All Countries data', data);
//             const countryData = data.location.country;
//             console.log('abc', countryData);

//         } catch (error) {
//             console.log('Error', error)
//         }
//     }

// }
// var megreData;
// for (var [key, value] of Object.entries(getData(value))) {
//     megreData = value[swap].push(key)
// }
// console.log('merge', megreData)

// const countriesObj = JSON.parse(getData(data));
// const cityObj = JSON.parse(swap);

// const mergedObject = {
//     ...countriesObj,
//     ...cityObj
// };

// console.log(JSON.stringify(mergedObject))

// const entries = Object.entries(apiData.regions);

// entries.forEach(element => {
//     console.log('>>>>>>>>>>>>>>>>>>>>>>', element)
// const amazonEntries = Object.entries(element[1])
// console.log('amazon', amazonEntries)
// });



// const entries = apiData.entries();
// console.log(entries);

// const filterData = (entries) => {
//     var countriesData = entries.filter(function (data) {
//         console.log(">>>>>>>>", data.amazon.name);
//         console.log('how wins', countriesData.amazon.name)
//     });
// }
// filterData();

