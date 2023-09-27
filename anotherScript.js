const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')

const leaves = ['a', 'b', 'c'].map(x => SHA256(x))
const tree = new MerkleTree(leaves, SHA256)
const root = tree.getRoot().toString('hex')
const leaf = SHA256('a')
const proof = tree.getProof(leaf)
console.log(tree.verify(proof, leaf, root)) // true



const voteCounts = {
    A: 0,
    B: 0,
    C: 0,
};

const votedEmails = {};

function vote(email, number, cand){
    if (!email) {
        alert("Please enter a valid email address.");
        return;
    }

    if (votedEmails[email]) {
        alert("You have already voted.");
        return;
    }

    const leaf = SHA256(email, number)
    const proof = tree.getProof(leaf)
    if(tree.verify(proof, leaf, root) == false){
        alert("invalid user")
    }

    voteCounts[cand]++;
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