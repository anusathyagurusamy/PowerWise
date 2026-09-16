// =====================================================
// PowerWise Profile
// profile.js
// =====================================================



// ===============================
// Load User Data
// ===============================


const user =

JSON.parse(
localStorage.getItem("powerwiseUser")
);





// ===============================
// Display User Details
// ===============================


const profileName =

document.getElementById("profileName");


const profileEmail =

document.getElementById("profileEmail");


const userName =

document.getElementById("userName");


const userEmail =

document.getElementById("userEmail");




if(user){



    if(profileName){

        profileName.innerText =
        user.name;

    }



    if(profileEmail){

        profileEmail.innerText =
        user.email;

    }



    if(userName){

        userName.innerText =
        user.name;

    }



    if(userEmail){

        userEmail.innerText =
        user.email;

    }


}







// ===============================
// Load Budget
// ===============================


let budget =

localStorage.getItem("monthlyBudget");



if(!budget){

    budget = 3000;

    localStorage.setItem(
    "monthlyBudget",
    budget
    );

}




const budgetInput =

document.getElementById("budgetInput");



if(budgetInput){

    budgetInput.value =
    budget;

}







// ===============================
// Save Budget
// ===============================



const saveBudget =

document.getElementById("saveBudget");



const budgetMessage =

document.getElementById("budgetMessage");





if(saveBudget){


saveBudget.addEventListener(
"click",
function(){



let newBudget =

Number(
budgetInput.value
);



if(newBudget <= 0){


    budgetMessage.innerText =

    "Enter a valid budget";


    budgetMessage.style.color =
    "red";


    return;


}




// Save budget


localStorage.setItem(

"monthlyBudget",

newBudget

);





// Also update user object


if(user){


    user.budget =
    newBudget;



    localStorage.setItem(

    "powerwiseUser",

    JSON.stringify(user)

    );


}





budgetMessage.innerText =

"✅ Budget updated successfully";



budgetMessage.style.color =

"green";



});


}








// ===============================
// Logout
// ===============================



const logoutBtn =

document.getElementById("logoutBtn");



if(logoutBtn){



logoutBtn.addEventListener(
"click",
function(){



let confirmLogout =

confirm(
"Are you sure you want to logout?"
);



if(confirmLogout){



localStorage.removeItem(
"powerwiseUser"
);



window.location.href =
"login.html";


}



});


}