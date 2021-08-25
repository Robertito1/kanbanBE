const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;

const sendRemainderEmail = async (to) => {
   const email = to; 
   let apikey = process.env.SENDINBLUE_API_KEY
   let apiKey = defaultClient.authentications['api-key']; 
   apiKey.apiKey = apikey; 

   var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
   var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

    sendSmtpEmail = {
      to: [{
         email: to,
         name: to
      }],
      templateId: 3,
      params: {
         name: '',
         surname: ''
      },
      headers: {
         'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2'
      }
   };

   apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
      console.log('API called successfully. Returned data: ' + data);
   }, function(error) {
      console.error(error);
   });

};

module.exports = sendRemainderEmail;