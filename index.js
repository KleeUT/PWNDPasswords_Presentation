const http = require("http");
const axios = require("axios");
const sha1 = require("sha1");
const hash = sha1("Password1").toUpperCase();
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
    return results.find(result => result.suffix == suffix);
  })
  .then(result => {
    if (result) {
      console.log(result);
    } else {
      console.log("none found");
    }
    console.log(Date.now() - startTime);
  });

function extractDataFromResponse(response) {
  return response.data.split("\r\n").map(row => {
    const elements = row.split(":");
    return { suffix: elements[0], count: elements[1] };
  });
}
