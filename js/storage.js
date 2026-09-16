// ==========================================
// PowerWise Storage Manager
// storage.js
// ==========================================



// ===============================
// Save Data
// ===============================

function saveData(key, data){

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );

}



// ===============================
// Get Data
// ===============================

function getData(key){

    return JSON.parse(
        localStorage.getItem(key)
    );

}



// ===============================
// User Data
// ===============================

function getUser(){

    return getData("powerwiseUser");

}



// ===============================
// Appliance Storage
// ===============================


function saveAppliances(appliances){

    saveData(
        "appliances",
        appliances
    );

}



function getAppliances(){

    return getData("appliances") || [];

}



// ===============================
// Daily Usage Storage
// ===============================


function saveDailyUsage(data){

    saveData(
        "usageHistory",
        data
    );

}



function getDailyUsage(){

    return getData("usageHistory") || [];

}



// ===============================
// Add Today's Usage
// ===============================


function addDailyUsage(units){


    let history =
    getDailyUsage();



    let today =
    new Date();



    let date =
    today.getDate();



    history.push({

        date:date,

        units:units

    });



    saveDailyUsage(history);


}



// ===============================
// Calculate Monthly Units
// ===============================


function calculateMonthlyUnits(){


    let history =
    getDailyUsage();



    let total = 0;



    history.forEach(day=>{


        total += Number(day.units);


    });



    return total;


}



// ===============================
// Budget
// ===============================


function saveBudget(amount){


    localStorage.setItem(

        "monthlyBudget",

        amount

    );


}



function getBudget(){


    return Number(

        localStorage.getItem("monthlyBudget")

    ) || 3000;


}



// ===============================
// Monthly Reset
// ===============================


function checkNewMonth(){


    let currentMonth =
    new Date().getMonth();



    let savedMonth =
    localStorage.getItem("currentMonth");



    if(savedMonth === null){


        localStorage.setItem(

            "currentMonth",

            currentMonth

        );


        return;


    }



    if(Number(savedMonth)!==currentMonth){



        // Save previous month report


        let oldData =
        {


            month:savedMonth,

            units:calculateMonthlyUnits(),

            bill:
            calculateMonthlyUnits()*8

        };



        let reports =
        getData("monthlyReports") || [];



        reports.push(oldData);



        saveData(
            "monthlyReports",
            reports
        );



        // Clear new month data


        localStorage.removeItem(
            "usageHistory"
        );



        localStorage.setItem(

            "currentMonth",

            currentMonth

        );


    }



}



// ===============================
// Initialize Storage
// ===============================


checkNewMonth();