
// allUsers = {}
// function generateUniquecode(email){
//         var uniqueCode = Math.floor(Math.random() * 1000000000);
//         var email = email;
//         var uniqueCode = uniqueCode.toString();
//         var email = email.toString();
//         var uniqueCode = uniqueCode.concat(email);

//         if(email in allUsers){
//             return "User already exists"
//         }

//         users= {
//             email: email,
//             uniqueCode: uniqueCode
//         }
//         allUsers[email]= users;

//         return uniqueCode;
// }

// function vote(uniquCode, candidate){
//     if (allUsers[uniquCode].email){
//         if (candidate == "A"){
//             candidateA++;
//         }
//         else if (candidate == "B"){
//             candidateB++;
//         }
//         else if (candidate == "C"){
//             candidateC++;
//         }
//         else if (candidate == "D"){
//             candidateD++;
//         }
//         else{
//             console.log("Invalid candidate");
//         }
//     }

// }

const voteCounts = {
    A: 0,
    B: 0,
    C: 0,
};

const votedEmails = {};

function voteforCandidate(option, emailId) {
    const emailInput = document.getElementById(emailId);
    const email = emailInput.value.trim().toLowerCase();

    if (!email) {
        alert("Please enter a valid email address.");
        return;
    }

    if (votedEmails[email]) {
        alert("You have already voted with this email address.");
        return;
    }

    voteCounts[option]++;
    votedEmails[email] = true;
    emailInput.disabled = true; 
    updateResults();
}





function updateResults() {
    for (const option in voteCounts) {
        const resultElement = document.getElementById(`result${option}`);
        resultElement.querySelector('span').textContent = `${voteCounts[option]} votes`;
    }
}


window.onload = function () {
    updateResults();
}