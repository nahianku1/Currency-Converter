let selects = document.querySelectorAll('select');
let getbtn = document.querySelector('#ratebtn');
let api = '786345408f5bef7f52ca3247';
let amountinput = document.querySelector('#amount');
let ares = document.querySelector('#ares');
let icon = document.querySelector('#icon');
amountinput.value = 1;

icon.addEventListener('click', function (e) {
    e.preventDefault();
    let swapval = selects[0].value;
    selects[0].value = selects[1].value;
    selects[1].value = swapval;
    loadFlag(selects[0], selects[1]);
    getExchangeRate();
})

for (let i = 0; i < selects.length; i++) {
    let selected;
    for (let currency_code in country_list) {
        if (i === 0) {
            selected = currency_code == 'USD' ? 'selected' : '';
        } else if (i === 1) {
            selected = currency_code == 'BDT' ? 'selected' : '';
        }
        options = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        selects[i].insertAdjacentHTML('beforeend', options);
        
    }
    selects[i].addEventListener('change', function(e) {
        console.log(e.target);
        loadFlag(e.target);
    });
}

function loadFlag(element, element2='') {
    for(let code in country_list){
        if(code == element.value){
            let img=element.parentElement.querySelector('img');
            img.src = `https://countryflagsapi.com/png/${country_list[code]}`;
        }
    }
    for(let code in country_list){
        if(code == element2.value){
            let img=element2.parentElement.querySelector('img');
            img.src = `https://countryflagsapi.com/png/${country_list[code]}`;
        }
    }
}

getbtn.addEventListener('click', function (e) {
    e.preventDefault();
    getExchangeRate()
});

amountinput.addEventListener('keyup', function (e) {
    if(e.keyCode == 13){
        e.preventDefault();
        getExchangeRate();
    }
   
})

function getExchangeRate() {
    let amountval = amountinput.value;

    let from = selects[0].value;
    let to = selects[1].value;
    let url = `https://v6.exchangerate-api.com/v6/${api}/latest/${from}`;
    fetch(url).then(res => res.json()).then(data => {
        let rate = data.conversion_rates[to];
        console.log(rate);
        let total = amountval * rate;

        ares.innerHTML = `${amountval} ${from} = ${total.toFixed(2)} ${to}`;

    })
}

getExchangeRate();

