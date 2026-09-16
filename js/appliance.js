// ==========================================
// PowerWise Appliance Manager
// appliance.js
// ==========================================



// ===============================
// Appliance Database
// ===============================

const today = new Date().toISOString().split("T")[0];
const applianceData = {


    "LED Bulb":{

        power:10,

        image:"images/bulb.png"

    },


    "Fan":{

        power:75,

        image:"images/fan.png"

    },


    "AC":{

        power:1500,

        image:"images/ac.png"

    },


    "TV":{

        power:120,

        image:"images/tv.png"

    },


    "Refrigerator":{

        power:200,

        image:"images/fridge.png"

    },


    "Washing Machine":{

        power:500,

        image:"images/washing-machine.png"

    },


    "Laptop":{

        power:65,

        image:"images/laptop.png"

    },


    "Heater":{

        power:2000,

        image:"images/heater.png"

    }


};




// ===============================
// HTML Elements
// ===============================


let applianceName =
document.getElementById("applianceName");


let power =
document.getElementById("power");


let quantity =
document.getElementById("quantity");


let hours =
document.getElementById("hours");


let applianceImage =
document.getElementById("applianceImage");


let selectedName =
document.getElementById("selectedName");


let addButton =
document.getElementById("addAppliance");


let table =
document.getElementById("applianceTable");




// ===============================
// Load Appliance Selection
// ===============================


applianceName.addEventListener(
"change",
function(){


    let selected =
    applianceName.value;



    if(selected && applianceData[selected]){


        power.value =
        applianceData[selected].power;



        applianceImage.src =
        applianceData[selected].image;



        selectedName.innerText =
        selected;


    }

});




// ===============================
// Get Existing Appliances
// ===============================


let appliances =
JSON.parse(
localStorage.getItem("appliances")
) || [];




// ===============================
// Add Appliance
// ===============================


addButton.addEventListener(
"click",
function(){



    let name =
    applianceName.value;



    let watt =
    Number(power.value);



    let qty =
    Number(quantity.value);



    let hour =
    Number(hours.value);




    if(
        name=="" ||
        hour<=0
    ){

        alert("Please select appliance and usage hours");

        return;

    }




    // Unit Calculation

    let units =
    (watt * qty * hour) / 1000;




  let appliance = {

    date: today,

    name: name,

    power: watt,

    quantity: qty,

    hours: hour,

    units: units,

    image: applianceData[name].image

};




    appliances.push(appliance);




    localStorage.setItem(

        "appliances",

        JSON.stringify(appliances)

    );




    displayAppliances();







});




// ===============================
// Display Appliance Table
// ===============================


function displayAppliances(){


    table.innerHTML="";



    if(appliances.length===0){


        table.innerHTML=

        `
        <tr>

        <td colspan="7">

        No appliances added

        </td>

        </tr>
        `;


        return;


    }





    appliances.forEach(

    function(item,index){



        table.innerHTML +=


        `

        <tr>


        <td>

        ${index+1}

        </td>



        <td>

        <img 

        src="${item.image}"

        width="50">


        </td>




        <td>

        ${item.name}

        </td>




        <td>

        ${item.power} W

        </td>




        <td>

        ${item.hours}

        hrs

        </td>




        <td>

        ${item.units.toFixed(2)}

        kWh

        </td>




        <td>


        <button

        class="btn btn-danger btn-sm"

        onclick="deleteAppliance(${index})">


        <i class="bi bi-trash"></i>


        </button>



        </td>



        </tr>


        `;



    });


}




// ===============================
// Delete Appliance
// ===============================


function deleteAppliance(index){



    appliances.splice(index,1);



    localStorage.setItem(

        "appliances",

        JSON.stringify(appliances)

    );



    displayAppliances();


}



// ===============================
// Initial Load
// ===============================


displayAppliances();
