const merkle = require('./merkle'); 
const SHA256 = require('crypto-js/sha256');

const voteCounts = {
  A: 0,
  B: 0,
  C: 0,
};

 let votedEmails = {};

function voteforCandidate(cand, email, number) {

  if (!email) {
    alert("Please enter a valid email address.");
    return;
  }

if (votedEmails[email] == undefined || votedEmails[email] == false){

    merkle.buildMerkleTree((tree, root) => { 

        const leaf = SHA256(email + number).toString();
        const proof = tree.getProof(leaf);


        console.log(tree.verify(proof, leaf, root))
      
        if (!tree.verify(proof, leaf, root)) {
          console.log("Invalid user");
          return;
        }
        console.log("true boiii")
        voteCounts[cand]++;
        votedEmails[email] = true;
        emailInput.disabled = true;
        updateResults();
    
    
      })

  } else{
    alert("You have already voted.");
    return;
  }

}

function updateResults() {
  for (const option in voteCounts) {
    const resultElement = document.getElementById(`result${option}`);
    resultElement.querySelector('span').textContent = `${voteCounts[option]} votes`;
  }
}

voteforCandidate("A", "isaac", 10)

