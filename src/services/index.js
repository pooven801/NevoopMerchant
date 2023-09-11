const productionURL = "https://nevoapi.azurewebsites.net";
const localURL = "http://169.254.167.200:3000";
let currentURLProduction = false;
const finalURL = currentURLProduction ? productionURL : localURL;

// Regional Store Image in Azure Storage

export async function storeBlobGetURL(params) {
  let newParams = { ...params, container: "blobstore" };
  console.log(newParams, "/storeBlob/storeBlobGetURL");
  return fetch(finalURL + "/storeBlob/storeBlobGetURL", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newParams)
  }).then((data) => data.json());
}

//Regional End
