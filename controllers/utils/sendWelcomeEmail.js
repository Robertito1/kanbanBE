const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;

const sendWelcomeEmail = async (to) => {
    const email = to; 
    let apikey = process.env.SENDINBLUE_API_KEY
    let apiKey = defaultClient.authentications['api-key']; 
    apiKey.apiKey = apikey; 

    let apiInstance = new SibApiV3Sdk.ContactsApi(); 
    let createContact = new SibApiV3Sdk.CreateContact(); 
    createContact.email = email; 
    createContact.listIds = [2]; 

    apiInstance.createContact(createContact).then((data) => {
        // success 
    }, function (error) {
        // error
        console.log(error);
    });
};

module.exports = sendWelcomeEmail;
