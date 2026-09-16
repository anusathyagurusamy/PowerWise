// =====================================================
// PowerWise Dashboard
// dashboard.js
// Part 1
// =====================================================

// ==============================
// Logged-in User
// ==============================

const user = JSON.parse(localStorage.getItem("powerwiseUser"));

if (user) {

    const userName = document.getElementById("userName");

    if (userName) {

        userName.innerText = user.name;

    }

}





// ==============================
// Monthly Budget
// ==============================

let budget = 3000;

if (user && user.budget) {

    budget = Number(user.budget);

}



// ==============================
// Electricity Rate
// ==============================

const RATE_PER_UNIT = 8;

// ==============================
// Daily Reset
// ==============================

const today = new Date().toISOString().split("T")[0];

const lastDate = localStorage.getItem("lastDate");

let appliances =
JSON.parse(localStorage.getItem("appliances")) || [];

let usageHistory =
JSON.parse(localStorage.getItem("usageHistory")) || [];

if(lastDate !== today){

    // Save yesterday's usage
    let yesterdayUnits = 0;

    appliances.forEach(item=>{

        yesterdayUnits += Number(item.units);

    });

    if(appliances.length > 0){

        usageHistory.push({

            date:lastDate,
            units:yesterdayUnits

        });

        localStorage.setItem(
            "usageHistory",
            JSON.stringify(usageHistory)
        );

    }

    // Clear today's appliances
    appliances = [];

    localStorage.setItem(
        "appliances",
        JSON.stringify(appliances)
    );

    // Save today's date
    localStorage.setItem(
        "lastDate",
        today
    );

}

// ==============================
// Today's Total Units
// ==============================

let todayUnits = 0;

appliances.forEach(item => {

    todayUnits += Number(item.units || 0);

});



const todayCard =

document.getElementById("todayUnits");

if (todayCard) {

    todayCard.innerText =

    todayUnits.toFixed(2);

}



const currentDay =

new Date().getDate();

let monthlyUnits = todayUnits;

usageHistory.forEach(day=>{

    monthlyUnits += Number(day.units);

});



const monthlyCard =

document.getElementById("monthlyUnits");

if (monthlyCard) {

    monthlyCard.innerText =

    monthlyUnits.toFixed(2);

}



// ==============================
// Estimated Bill
// ==============================

let estimatedBill =

monthlyUnits * RATE_PER_UNIT;



const billCard =

document.getElementById("estimatedBill");

if (billCard) {

    billCard.innerText =

    "₹" + estimatedBill.toFixed(0);

}



// ==============================
// Remaining Budget
// ==============================

let remainingBudget =

budget - estimatedBill;



const remainCard =

document.getElementById("budgetRemaining");

if (remainCard) {

    remainCard.innerText =

    "₹" + remainingBudget.toFixed(0);

}



// ==============================
// Budget Amount
// ==============================

const budgetAmount =

document.getElementById("budgetAmount");

if (budgetAmount) {

    budgetAmount.innerText =

    "₹" + budget;

}



// ==============================
// Budget Progress Bar
// ==============================

let percentage =

(estimatedBill / budget) * 100;

if (percentage > 100) {

    percentage = 100;

}

const budgetBar =

document.getElementById("budgetBar");

if (budgetBar) {

    budgetBar.style.width =

    percentage.toFixed(0) + "%";

    budgetBar.innerText =

    percentage.toFixed(0) + "%";

    if (percentage < 60) {

        budgetBar.className =

        "progress-bar bg-success";

    }

    else if (percentage < 90) {

        budgetBar.className =

        "progress-bar bg-warning";

    }

    else {

        budgetBar.className =

        "progress-bar bg-danger";

    }

}
// ==============================
// Recently Added Appliances
// ==============================

const recentTable =
document.getElementById("recentAppliances");

if(recentTable){

    recentTable.innerHTML = "";

    if(appliances.length === 0){

        recentTable.innerHTML = `

        <tr>

            <td colspan="6" class="text-center">

                No appliances added yet.

            </td>

        </tr>

        `;

    }else{

        // Show latest 5 appliances first
        const recent =
        appliances.slice(-5).reverse();

        recent.forEach((item,index)=>{

            recentTable.innerHTML += `

            <tr>

                <td>${index+1}</td>

                <td>${item.name}</td>

                <td>${item.power} W</td>

                <td>${item.quantity}</td>

                <td>${item.hours} hrs</td>

                <td>${Number(item.units).toFixed(2)} kWh</td>

            </tr>

            `;

        });

    }

}
// ==========================================
// Smart Suggestions
// ==========================================

function generateSuggestions(){

    const suggestionBox =
    document.getElementById("suggestionList");

    if(!suggestionBox) return;

    suggestionBox.innerHTML = "";

    if(appliances.length === 0){

        suggestionBox.innerHTML = `

        <li>Add appliances to get personalized suggestions.</li>

        `;

        return;

    }

    let highest = appliances[0];

    appliances.forEach(item=>{

        if(item.units > highest.units){

            highest = item;

        }

    });

    suggestionBox.innerHTML += `

    <li>⚡ <strong>${highest.name}</strong> consumes the highest electricity.</li>

    `;

    if(highest.name === "AC"){

        suggestionBox.innerHTML += `

        <li>❄ Set AC temperature to 24°C to save electricity.</li>

        `;

    }

    if(highest.name === "Fan"){

        suggestionBox.innerHTML += `

        <li>🌀 Reduce fan speed when the room is cool.</li>

        `;

    }

    if(highest.name === "TV"){

        suggestionBox.innerHTML += `

        <li>📺 Turn off the TV completely instead of leaving it on standby.</li>

        `;

    }

    if(highest.name === "Refrigerator"){

        suggestionBox.innerHTML += `

        <li>🧊 Avoid opening the refrigerator door frequently.</li>

        `;

    }

    if(highest.name === "Washing Machine"){

        suggestionBox.innerHTML += `

        <li>🧺 Wash clothes only with a full load.</li>

        `;

    }

    if(estimatedBill > budget){

        suggestionBox.innerHTML += `

        <li>🚨 Your estimated bill exceeds your monthly budget.</li>

        `;

    }
    else if(estimatedBill > budget * 0.8){

        suggestionBox.innerHTML += `

        <li>⚠ You have used over 80% of your monthly budget.</li>

        `;

    }
    else{

        suggestionBox.innerHTML += `

        <li>✅ Great! Your electricity usage is within budget.</li>

        `;

    }

}
generateSuggestions();
