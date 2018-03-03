const http = require("http");
const axios = require("axios");
const sha1 = require("sha1");

if (process.argv.length !== 3) {
  conosle.log("Pass a password as the first parameter");
  return;
}

const password = process.argv[2];

const hash = sha1(password).toUpperCase();
const prefix = hash.slice(0, 5);
const suffix = hash.slice(5, hash.length);
console.log(prefix, suffix);
const startTime = Date.now();
axios
  .get(`https://api.pwnedpasswords.com/range/${prefix}`)
  .then(response => {
    console.log(Date.now() - startTime);
    return response;
  })
  .then(response => extractDataFromResponse(response))
  .then(allData => {
    return allData;
  })
  .then(results => {
    return results.find(result => result.suffix === suffix);
  })
  .then(result => {
    if (result) {
      console.log(
        `Password ${password} with hash ${hash} has appeared ${
          result.count
        } times in Pwnd Passwords.`
      );
    } else {
      console.log("Password not found");
    }
    console.log(Date.now() - startTime);
  });

function extractDataFromResponse(response) {
  return response.data.split("\r\n").map(row => {
    const elements = row.split(":");
    return { suffix: elements[0], count: elements[1] };
  });
}
