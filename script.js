
async function convert() {
    let amount = parseFloat(document.getElementById("Amount").value);
    let from = document.getElementById("From").value;
    let to = document.getElementById("To").value;
    let result = document.getElementById("result");

    if (!amount || amount <= 0) {
        result.innerText = "Enter a valid amount.";
        return;
    }

    if (!from || !to) {
        result.innerText = "Select both currencies.";
        return;
    }

    try {
        let data = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
            .then(res => res.json());

        let converted = amount * data.rates[to];
        result.innerText = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
    } catch (error) {
        result.innerText = "Error fetching exchange rates.";
        console.error(error);
    }
}

