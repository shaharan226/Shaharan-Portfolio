
/*
1. Variables
2. Functions
3. Loops
4. Conditional St.
5. Error Handling
6. Event Listeners
7. Pop Ups
8. DOM
*/

//Keywords are reserved words in prog. lang. that you as a developer cannot use for anything else expect for what they have already been assigned for.

//const, var, let will let you define variables.
//number, decimals, char, sentence, Boolean (true/false), 

// let result_Of_Student = "pass";
// let age = 19;

//Functions

/*2 parts of the function
1. Function definition
2. Function CALL

Arguments/Parameters - Extra information you pass to the functions.
*/

// function greet_user( name ) {
//   console.log("Hello, welcome to my first website!! " + name);
// }

// greet_user("Ifrah");


// function add ( a , b ) {
//   let result = a + b;
//   return result;
// }

// let answer = add(20, 34);
// console.log("The answer is " + answer);

// let marks = 93; //number
// let attendance = "clear";

// if (marks > 90 && attendance == "clear") {
//   console.log("Congratulations, you have passed!!");
// }
  
// else if (marks > 80) {
//   console.log("You have passed, but work harder!!");
// }
  
// else {
//   console.log("Hard Luck, you failed!");
// }

//1. User - defined 
//2. In-built function

//3 types of pops that you can raise.

// alert("Welcome to my web page");

// let response = confirm("Do you want to continue?");
// console.log(response);

// let response = prompt("what is your name habibi?");
// console.log(response);


//DONKEY WORK
// console.log("1");
// console.log("2");
// console.log("3");
// console.log("4");
// console.log("5");

// console.log("Donkey work ends!!");

//SMART - LOOPS

// for (let i=2; i<=20;i=i+2) {
//   console.log(i);
// }

// let control_of_togglebtn = document.getElementById("toggle-theme");

// let control_of_edu = document.getElementById("edu");

// control_of_togglebtn.addEventListener("click", function(){
//   console.log("Toggle button was clicked!!!");
//   control_of_edu.innerHTML= "MASTI";
// });





/*Tasks that need JavaScript Implementation 
1. Make Toggle Theme Button work
2. Make the contact me Section work 
  2a. Make the form collect all the information entered by the user.
  2b. Create a Database backend and connect this app via API.

3. Make Admin Login Button work
4. Make Admin Login Section work
  4a. Checking the Username and password, only show user responses if the credentials are correct. 
  4b. Make Admin login section disappear and User responses section should be visible.

5. Fetch all messages from the DB and show them in the user responses section.
*/

//Task - Making Toggle Btn work
let control_of_toggleBtn = document.getElementById("toggle-theme");
//we can now use this variable to create an event listener on top of it.

control_of_toggleBtn.addEventListener('click', function(){
  document.body.classList.toggle("dark-theme");
});


//Task - Making Admin Login Btn work.

let control_of_admin_login_section = document.getElementById("admin-login");


function showAdminLogin(){
  control_of_admin_login_section.style.display = "block";
}


let db_url = "https://script.google.com/macros/s/AKfycbxRw2guWAFrmBmuNmFvzrvvIP8MMMBBmykI6SCyn_YoyZAVIOrkVjw_OSRzAS-w3sHyow/exec";


let control_of_contactform = document.getElementById("contact-form");

control_of_contactform.addEventListener("submit", async function( event ){
  event.preventDefault();

  let name = document.getElementById("name_input").value;
  let email = document.getElementById("email_input").value;
  let msg = document.getElementById("msg_input").value;

  //Error handling code
  try {
    let response = await fetch (
      db_url,
      {
        method: "POST",
        headers:{
          "Content-Type": "text/plain; charset=utf-8"
        },
        body: JSON.stringify({
          action:"save_message",
          name: name,
          email: email,
          msg: msg
        })
      }
    );

    let result = await response.json();

    if(result.success){
      alert("Message Submitted!");
      control_of_contactform.reset();
    }
    else{
      alert("Message could not be sent!");
    }
  }

  catch (error) {
    console.error(error);
    alert("Something went wrong, please try again later!");
  }
  
});


//Task - Making Admin Login work

let control_of_admin_login_form = document.getElementById("admin-login-form");

control_of_admin_login_form.addEventListener("submit", async function(event){

  event.preventDefault();

  let username = document.getElementById("username_input").value;
  let password = document.getElementById("password_input").value;

  try {

    let response = await fetch(
      db_url,
      {
        method: "POST",
        headers: {
          "Content-Type": "text/plain; charset=utf-8"
        },
        body: JSON.stringify({
          action: "login",
          username: username,
          password: password
        })
      }
    );

    let result = await response.json();

    if(result.success){

      alert("Login Successful!");

      //Hide Admin Login Section
      control_of_admin_login_section.style.display = "none";

      //Show User Responses Section
      let control_of_user_responses = document.getElementById("user-responses");
      control_of_user_responses.style.display = "block";

      //Fetch and display all messages
      let control_of_user_messages = document.getElementById("user-messages");

      control_of_user_messages.innerHTML = "";

      let messages = result.messages;

      if(messages.length <= 1){
        control_of_user_messages.textContent = "No messages found.";
      }
      else{

        //First row contains column headings, so skip it
        for(let i = 1; i < messages.length; i++){

          let message = messages[i];

          let message_block = document.createElement("div");

          let name_text = document.createElement("p");
          name_text.textContent = "Name: " + message[0];

          let email_text = document.createElement("p");
          email_text.textContent = "Email: " + message[1];

          let msg_text = document.createElement("p");
          msg_text.textContent = "Message: " + message[2];

          let date_text = document.createElement("p");
          date_text.textContent = "Date: " + message[3];

          message_block.appendChild(name_text);
          message_block.appendChild(email_text);
          message_block.appendChild(msg_text);
          message_block.appendChild(date_text);

          control_of_user_messages.appendChild(message_block);
        }
      }

    }
    else{
      alert("Incorrect Username or Password!");
    }

  }

  catch(error){
    console.error(error);
    alert("Something went wrong. Please try again!");
  }

});

