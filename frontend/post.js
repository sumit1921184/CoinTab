const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');
let buttonContainer = document.getElementById("button-cont");

fetchPosts(userId);
let isCheck = checkPost(userId);
buttonFunc();

let posts=0;
let userName = "";
let company = "";



let bulkAddBtn = document.createElement("button");
bulkAddBtn.innerHTML = "Add Bulk";
bulkAddBtn.className =  "addBtn";
bulkAddBtn.style.display="none";
buttonContainer.append(bulkAddBtn);

let excelBtn = document.createElement("button");
excelBtn.innerHTML = "Download Excel";
excelBtn.className =  "addBtn";
excelBtn.style.display="none";
buttonContainer.append(excelBtn);


//fetching the user details

fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => response.json())
    .then(user => {
        userName = `${user.name}`;
        company=`${user.company.name}`;
        let nameCont = document.getElementById("name-cont");
        let username = document.createElement("h3");
        username.innerHTML=`Name: ${user.name}`;
       
        let companyName = document.createElement("h3");
        companyName.innerHTML=`Company: ${user.company.name}`;
        nameCont.append(username, companyName);
    })
    .catch(error => {
        console.error('Error fetching user details:', error);
    });



// Fetching the posts

async function fetchPosts(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        posts = await response.json();
        console.log( "from post",posts);
        displayPosts(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}



//Displaying the posts

 function displayPosts(posts){
    let post = document.getElementById("post");
    posts.forEach((elem)=>{
        let card = document.createElement("div");
        card.className = "user-card";

        let title = document.createElement("p");
        title.innerHTML = `Title: ${elem.title}`;

        let body = document.createElement("p");
        body.innerHTML = `${elem.body}`;

        card.append(title, body);
        post.append(card);
    });

    
    
}

// Button function for displaying two buttons on conditioins

async function buttonFunc(){
    try{
        let check = await isCheck;
        if(!check){
            bulkAddBtn.style.display="block";
            bulkAddBtn.addEventListener("click",()=>addBulkFunc(bulkAddBtn,excelBtn));
        }
        else{
            excelBtn.style.display="block";
            bulkAddBtn.style.display="none";
            excelBtn.addEventListener("click",()=>downloadExcel());
        }
    }
    catch(err){
        console.log(err);
    }
    
}



//Function for making the download in excel

function downloadExcel() {
    try {
        const data = [['Title', 'Body']];
        posts.forEach(post => {
            data.push([post.title, post.body]);
        });

        const csv = data.map(row => row.join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'posts.csv';
        document.body.appendChild(a);

        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        console.log('Download in Excel completed');
    } catch (err) {
        console.log('Error downloading Excel file:', err);
    }
}



//Function to add the data in bulk

 function addBulkFunc(bulkAddBtn,excelBtn){
    try{
        posts.forEach(async (post) => {
            const { id, userId, title, body} = post;
            await addPostToDatabase(userId, id, title, body, userName, company);
        });

        isCheck=true;
        buttonFunc();

    }
    catch(err){
        console.log(err);
    }
}


//Function to add the post to database

async function addPostToDatabase(userId, id, title, body, userName, company) {
    const data = {userId, id, title, body, name:userName, company};
    console.log(name);
   try{
        let res = await fetch(`http://localhost:8080/post/`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        });
        let dataa = await res.json();
        console.log(dataa);
   }
   catch(err){
        console.log(err);
   }
}


//function to check whether the post is present in database or not

async function checkPost(id){
    try{
        let res = await fetch(`http://localhost:8080/post/${id}`);
        let data = await res.json();
        console.log(data);

        if(data.error){
            return false;
        }
        else{
            return true;
        }
    }
    catch(err){
        console.log(err);
    }
}
