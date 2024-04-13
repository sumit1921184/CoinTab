let allUserButton = document.getElementById("all-user");
let allUserContainer = document.getElementById("all-user-container");

allUserButton.addEventListener("click", fetchUsers);

//Function to fetch the user from the link

async function fetchUsers() {
    try {
        let res = await fetch("https://jsonplaceholder.typicode.com/users");
        let data = await res.json();
        console.log(data);
        displayUser(data);
    }
    catch (err) {
        console.log(err);
    }
}



//function to display the user

function displayUser(data) {
    data.forEach(async (elem) => {
        let card = document.createElement("div");
        card.className = "user-card";
        
        let name = document.createElement("p");
        name.innerHTML = `Name: ${elem.name}`;
        
        let email = document.createElement("p");
        email.innerHTML = `Email: ${elem.email}`;
        
        let phone = document.createElement("p");
        phone.innerHTML = `Phone: ${elem.phone}`;
        
        let website = document.createElement("p");
        website.innerHTML = `Website: ${elem.website}`;
        
        let city = document.createElement("p");
        city.innerHTML = `City: ${elem.address.city}`;
        
        let company = document.createElement("p");
        company.innerHTML = `Company: ${elem.company.name}`;
        
        let addBtnn = document.createElement("button");
        addBtnn.innerHTML = "Add user";
        addBtnn.className = "addBtn";

        let openBtn = document.createElement("button");
        openBtn.innerHTML = "Open";
        openBtn.className = "addBtn";
        
        let obj = {id:elem.id, name:elem.name, email:elem.email, phone:elem.phone, website:elem.website,city:elem.address.city,company:elem.company.name};

        addBtnn.addEventListener("click", () => addBtnFunction(obj, addBtnn, openBtn));

        let isPresent = await databaseFetch(elem.id);
        openBtn.addEventListener('click', () => {
            window.location.href = `/post.html?id=${elem.id}`;
        });
        console.log("ispresent value", isPresent);
        if (!isPresent) {
            addBtnn.style.display = "block";
            openBtn.style.display = "none";
        }
        else {
            addBtnn.style.display = "none";
            openBtn.style.display = "block";

        }
        card.append(name, email, phone, website, city, company, addBtnn, openBtn);
        allUserContainer.append(card);

    })

}


//Function to check whether the user is present in database or not

async function databaseFetch(id) {
    try{
        let res = await fetch(`https://cointab-yqqo.onrender.com/user/${id}`);
        let data = await res.json();
        console.log(data);
        if(data.error){
           
            console.log("false");
            return false;
        }
        else{
            
            console.log("true");
            return true;

        }
    }
    catch(err){
        console.log(err);
    }
}


//Function to add the user to database

async function addBtnFunction(obj,addBtnn,openBtn) {
    try{
        let res = await fetch("https://cointab-yqqo.onrender.com/user/",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(obj)
        })
        let data= await res.json();
        console.log(data);
        addBtnn.style.display = "none";
         openBtn.style.display = "block";

    }
    catch(err){
        console.log(err);
    }
    
}
