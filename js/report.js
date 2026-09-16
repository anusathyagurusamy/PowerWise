// ==========================================
// PowerWise Report
// report.js
// ==========================================

// ==============================
// Load Data
// ==============================

const user =
JSON.parse(localStorage.getItem("powerwiseUser")) || {};

const appliances =
JSON.parse(localStorage.getItem("appliances")) || [];

const usageHistory =
JSON.parse(localStorage.getItem("usageHistory")) || [];

const RATE_PER_UNIT = 8;

const budget =
Number(user.budget) || 3000;


// ==============================
// Today's Units
// ==============================

let todayUnits = 0;

appliances.forEach(item => {

    todayUnits += Number(item.units || 0);

});


// ==============================
// Monthly Units
// ==============================

let monthlyUnits = todayUnits;

usageHistory.forEach(day => {

    monthlyUnits += Number(day.units || 0);

});


// ==============================
// Estimated Bill
// ==============================

let estimatedBill =
monthlyUnits * RATE_PER_UNIT;


// ==============================
// Remaining Budget
// ==============================

let remainingBudget =
budget - estimatedBill;


// ==============================
// Update Summary Cards
// ==============================

document.getElementById("monthlyUnitsReport").innerText =
monthlyUnits.toFixed(2) + " kWh";

document.getElementById("billReport").innerText =
"₹" + estimatedBill.toFixed(0);

document.getElementById("budgetReport").innerText =
"₹" + budget;

document.getElementById("remainingReport").innerText =
"₹" + remainingBudget.toFixed(0);


// ==============================
// Budget Progress
// ==============================

let percentage =
(estimatedBill / budget) * 100;

if (percentage > 100) {

    percentage = 100;

}

const progress =
document.getElementById("budgetProgress");

progress.style.width =
percentage.toFixed(0) + "%";

progress.innerText =
percentage.toFixed(0) + "%";

if (percentage < 60) {

    progress.className =
    "progress-bar bg-success";

}
else if (percentage < 90) {

    progress.className =
    "progress-bar bg-warning";

}
else {

    progress.className =
    "progress-bar bg-danger";

}


// ==============================
// Budget Status
// ==============================

const status =
document.getElementById("budgetStatus");

if (estimatedBill > budget) {

    status.innerHTML =
    "🚨 Your estimated bill has exceeded your monthly budget.";

}
else if (estimatedBill > budget * 0.8) {

    status.innerHTML =
    "⚠ You have already used more than 80% of your budget.";

}
else {

    status.innerHTML =
    "✅ Great! Your electricity usage is within budget.";

}


// ==============================
// Highest Consuming Appliance
// ==============================

const highestDiv =
document.getElementById("highestAppliance");

if (appliances.length === 0) {

    highestDiv.innerHTML =
    "No appliance data available.";

}
else {

    appliances.sort((a, b) => b.units - a.units);

    const highest = appliances[0];

    highestDiv.innerHTML =

    `
    <h4>${highest.name}</h4>

    <p>
    Daily Usage :
    <strong>${highest.hours}</strong> hrs
    </p>

    <p>
    Daily Consumption :
    <strong>${highest.units.toFixed(2)}</strong> kWh
    </p>
    `;

}


// ==============================
// Appliance Consumption Chart
// ==============================

const ctx =
document.getElementById("consumptionChart");

if (ctx && appliances.length > 0) {

    new Chart(ctx, {

        type: "bar",

        data: {

            labels:
            appliances.map(item => item.name),

            datasets: [{

                label: "Daily Units (kWh)",

                data:
                appliances.map(item => item.units),

                borderWidth: 1,

                backgroundColor: [
                    "#4CAF50",
                    "#66BB6A",
                    "#81C784",
                    "#A5D6A7",
                    "#388E3C",
                    "#43A047",
                    "#2E7D32",
                    "#1B5E20"
                ]

            }]

        },

        options: {

            responsive: true,

            scales: {

                y: {

                    beginAtZero: true

                }

            }

        }

    });

}


// ==============================
// Smart Suggestions
// ==============================

const suggestionBox =
document.getElementById("reportSuggestions");

suggestionBox.innerHTML = "";

if (appliances.length === 0) {

    suggestionBox.innerHTML =
    "<li>Add appliances to get smart suggestions.</li>";

}
else {

    appliances.forEach(item => {

        const name =
        item.name.toLowerCase();

        if (name.includes("ac") && item.hours > 5) {

            suggestionBox.innerHTML +=
            "<li>❄ Reduce AC temperature to 24°C to save electricity.</li>";

        }

        if (name.includes("fan") && item.hours > 12) {

            suggestionBox.innerHTML +=
            "<li>🌀 Reduce fan speed whenever possible.</li>";

        }

        if (name.includes("tv") && item.hours > 4) {

            suggestionBox.innerHTML +=
            "<li>📺 Switch off the TV completely instead of standby mode.</li>";

        }

        if (name.includes("refrigerator")) {

            suggestionBox.innerHTML +=
            "<li>🧊 Avoid opening the refrigerator door frequently.</li>";

        }

        if (name.includes("washing")) {

            suggestionBox.innerHTML +=
            "<li>🧺 Use the washing machine with full load.</li>";

        }

        if (name.includes("heater")) {

            suggestionBox.innerHTML +=
            "<li>🔥 Turn off the water heater immediately after use.</li>";

        }

    });

    if (estimatedBill > budget) {

        suggestionBox.innerHTML +=
        "<li>🚨 Your estimated bill has exceeded your monthly budget.</li>";

    }

}