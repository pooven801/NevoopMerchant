const productionURL = "https://nevoapi.azurewebsites.net";
const localURL = "http://169.254.50.71:3000";
let currentURLProduction = false;
const finalURL = currentURLProduction ? productionURL : localURL;

//Run this in terminal if IP address failed
// ifconfig | grep inet

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

// Regional Merchant

export async function createMerchant(params) {
  console.log(finalURL + "/merchant/createMerchant");
  return fetch(finalURL + "/merchant/createMerchant", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  }).then((data) => data.json());
}

export async function login(params) {
  console.log("merchantSignin/signin", params);
  return fetch(finalURL + "/merchantSignin/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  }).then((data) => data.json());
}

//Regional End
