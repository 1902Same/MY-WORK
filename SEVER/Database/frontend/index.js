// const url = 'http://localhost:5000';

// function Signup() {
//     var userSData = {
//         name: document.getElementById("sname").value,
//         email: document.getElementById("semail").value,
//         password: document.getElementById("spassword").value,
//         phone: document.getElementById("snumber").value,
//         gender: document.getElementById("sgender").value
//     }
//     const Http = new XMLHttpRequest();

//     Http.open("POST", url + "/signup");
//     Http.setRequestHeader("Content-Type", "application/json");
//     if (!userSData.name
//         || !userSData.email
//         || !userSData.password
//         || !userSData.phone
//         || !userSData.gender) {
//         alert("Dont left any field")
//     }
//     else {
//         Http.send(JSON.stringify(userSData));
//         console.log(userSData);
//     }
//     Http.onreadystatechange = (e) => {

//         if (Http.readyState === 4) {
//             let JSONres = JSON.parse(Http.responseText);
//             if (JSONres.status === 200) {
//                 alert(JSONres.message);
//             }
//             else {
//                 alert(JSONres.message);
//             }
//         }
//     }
//     return false;
// }

// function Login() {

//     email = document.getElementById("lemail").value;
//     password = document.getElementById("lpassword").value;

//     const Http = new XMLHttpRequest();

//     Http.open("POST", url + "/login");
//     Http.setRequestHeader("Content-Type", "application/json");

//     if (!userLData.email || !userLData.password) {
//         alert("Dont left any field")
//     }
//     else {
//         Http.send(JSON.stringify({
//             Lemail: email,
//             Lpassword: password
//         }));
//         console.log(userLData);
//     }
//     Http.onreadystatechange = (e) => {

//         if (Http.readyState === 4) {
//             let JSONres = JSON.parse(Http.responseText);
//             if (JSONres.status === 200) {
//                 alert(JSONres.message);
//             }
//             else {
//                 alert(JSONres.message);
//             }
//         }
//     }
//     return false;
// }