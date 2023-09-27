const { MerkleTree } = require('merkletreejs');
const SHA256 = require('crypto-js/sha256');
const fs = require('fs');
const csv = require('csv-parser');

const inputFilePath = 'myAddresses.csv'; // Change to the path of your CSV file

function buildMerkleTree(callback) {
  const Allhashed = [];

  // Read the CSV file and hash the email and number columns
  fs.createReadStream(inputFilePath)
    .pipe(csv())
    .on('data', (row) => {
      if (row.email && row.number) {

        const hashed = SHA256(row.email + row.number).toString()

        Allhashed.push(hashed);

      }
    })
    .on('end', () => {
      // Create a Merkle tree from the hashed addresses
      //const leaves = Allhashed.map(({ email, number }) => SHA256(email + number));
      const tree = new MerkleTree(Allhashed, SHA256, {
        sortPairs: true,
      });
      const root = tree.getHexRoot();

      console.log(Allhashed, "Allhashed")
    
      callback(tree, root);
    });

}

module.exports = { buildMerkleTree };
