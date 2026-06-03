const amountInput = document.getElementById("Amount");
const fromCurrency = document.getElementById("From");
const toCurrency = document.getElementById("To");
const result = document.getElementById("result");

const convertBtn = document.getElementById("convertBtn");
const swapBtn = document.getElementById("swapBtn");
const themeBtn = document.getElementById("themeBtn");

/* Currency Conversion */

async function convert() {

    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount) || amount <= 0) {
        result.innerText = "⚠️ Enter a valid amount.";
        return;
    }

    if (!from || !to) {
        result.innerText = "⚠️ Select both currencies.";
        return;
    }

    if (from === to) {
        result.innerText = `${amount} ${from} = ${amount} ${to}`;
        return;
    }

    result.innerText = "⏳ Converting...";

    try {

        const response = await fetch(
            `https://open.er-api.com/v6/latest/${from}`
        );

        const data = await response.json();

        if (!data.rates[to]) {
            result.innerText = "Currency not supported.";
            return;
        }

        const convertedAmount = amount * data.rates[to];

        result.innerHTML =
            `${amount.toLocaleString()} ${from} = 
            <strong>${convertedAmount.toLocaleString(undefined,{
                minimumFractionDigits:2,
                maximumFractionDigits:2
            })}</strong> ${to}`;

    } catch (error) {

        console.error(error);

        result.innerText =
            "❌ Failed to fetch exchange rates.";
    }
}

/* Convert Button */

convertBtn.addEventListener("click", convert);

/* Enter Key Support */

amountInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        convert();
    }
});

/* Swap Currency */

swapBtn.addEventListener("click", () => {

    const temp = fromCurrency.value;

    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
});

/* Dark Mode Toggle */

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        themeBtn.innerHTML = "☀️ Light Mode";
        localStorage.setItem("theme", "dark");

    } else {

        themeBtn.innerHTML = "🌙 Dark Mode";
        localStorage.setItem("theme", "light");
    }
});

/* Load Saved Theme */

window.addEventListener("load", () => {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");
        themeBtn.innerHTML = "☀️ Light Mode";
    }
});
