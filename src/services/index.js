const productionURL = "https://nevoapi.azurewebsites.net";
const localURL = "http://169.254.13.33:3000";
// const localURL = "http://localhost:3000";

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
  console.log(localURL + "/merchantSignin/signin", params);
  return fetch(finalURL + "/merchantSignin/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  }).then((data) => data.json());
}

//Regional End

// Regional Services

export async function createServices(params, formType) {
  console.log(finalURL + `/service/${formType}`, params);
  return fetch(finalURL + `/service/${formType}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  }).then((data) => data.json());
}

export async function getServiceList(pagination, serviceType, merchantId) {
  console.log(
    finalURL +
      `/service/${serviceType}?pageNum=${pagination?.pagination?.pageNum}&docPerPage=${pagination.pagination?.docPerPage}&merchantIdApp=${merchantId}`
  );
  return fetch(
    finalURL +
      `/service/${serviceType}?pageNum=${pagination?.pagination?.pageNum}&docPerPage=${pagination.pagination?.docPerPage}&merchantIdApp=${merchantId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  ).then((data) => data.json());
}

export async function editService(serviceType, params) {
  console.log(finalURL + `/service/${serviceType}` + params);
  return fetch(finalURL + `/service/${serviceType}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  }).then((data) => data.json());
}

export async function searchService(serviceType, params) {
  console.log(finalURL + `/service/${serviceType}`, params);
  return fetch(finalURL + `/service/${serviceType}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  }).then((data) => data.json());
}

//Regional End
