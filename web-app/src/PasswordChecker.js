import sha1 from "sha1";

export default async password => {
  if (!password) {
    return { err: "No passwod provided" };
  }
  const hash = sha1(password).toUpperCase();
  const prefix = hash.slice(0, 5);
  const suffix = hash.slice(5, hash.length);
  const data = {
    url: `https://api.pwnedpasswords.com/range/${prefix}`,
    hash,
    prefix,
    suffix
  };
  return await fetch(data.url)
    .then(response => handleFetchResponse(response))
    .then(text => {
      console.log(text);
      return { ...data, allRows: extractDataFromResponse(text) };
    })
    .then(data => {
      const count = (
        data.allRows.find(x => x.suffix === suffix) || { count: 0 }
      ).count;
      return { ...data, count };
    })
    .catch(err => {
      return { ...data, err };
    });
};

function extractDataFromResponse(response) {
  return response.split("\r\n").map(row => {
    const elements = row.split(":");
    return { suffix: elements[0], count: elements[1] };
  });
}

function handleFetchResponse(response) {
  if (response.status !== 200) {
    throw `Non 200 status returned ${response.status}`;
  }
  return response.text();
}
