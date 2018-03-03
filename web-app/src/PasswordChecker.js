import sha1 from "sha1";

export default async password => {
  if (!password) {
    return { err: "No passwod provided" };
  }
  //   return { err: "Not Implemented" };
  let data = { hash: sha1(password).toUpperCase() };
  const prefix = data.hash.slice(0, 5);
  const suffix = data.hash.slice(5, data.hash.length);
  data = {
    ...data,
    url: `https://api.pwnedpasswords.com/range/${prefix}`,
    prefix,
    suffix
  };
  return await fetch(data.url)
    .then(response => {
      if (response.status !== 200) {
        throw `Non 200 status returned ${response.status}`;
      }
      return response.text();
    })
    .then(text => {
      return { ...data, allRows: extractDataFromResponse(text) };
    })
    .then(data => {
      return {
        ...data,
        count: (data.allRows.find(x => x.suffix === suffix) || { count: 0 })
          .count
      };
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
