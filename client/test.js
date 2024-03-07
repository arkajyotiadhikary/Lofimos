// const axios = require("axios");
// const { v4: uuidv4 } = require("uuid");

// exports.main = async (event, callback) => {
//     try {
//         // Extract the authToken from event
//         const authToken = event.fields.authToken;
//         console.log(event);

//         // Generate random UUID for the project
//         const project = uuidv4();

//         let data = JSON.stringify({
// contact: {
// salutation: event.fields.salutation,
// forename: event.fields.forename,
// surname: event.fields.surname,
// companyname: event.fields.companyname,
// dob: event.fields.dob,
// email: event.fields.email,
// phone: event.fields.phone,
// address: {
//     street: event.fields.street,
//     postal_code: event.fields.postal_code,
//     city: event.fields.city,
//     country: event.fields.country,
// },
// },
//             project: project,
//             payout_account: {
//                 iban: "DE37503240001000000524",
//                 bic: "",
//                 owner: "Place Holder",
//             },
//             payin_account: true,
//         });

//         let config = {
//             method: "post",
//             maxBodyLength: Infinity,
//             url: "https://connect-testing.secupay-ag.de/api/v2/Payment/Contracts/GCR_8BV9EV88K03UXXZ87Z65NWC9W2C9OP/RequestId",
//             headers: {
//                 Authorization: `Bearer ${authToken}`,
//                 "Content-Type": "application/json",
//             },
//             data: data,
//         };

//         axios
//             .request(config)
//             .then((response) => {
//                 // Extract iban and contract id from response data
//                 const responseData = response.data;
//                 const outputFields = {
//                     iban: responseData.payin_account.iban,
//                     id: responseData.contract.id,
//                 };

//                 // Output the extracted fields
//                 callback({
//                     outputFields: outputFields,
//                 });
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     } catch (error) {
//         // Handle errors
//         console.error("Error making POST request:", error.message);
//         callback({
//             outputFields: {
//                 error: error.message,
//             },
//         });
//     }
// };

// 222
// const axios = require("axios");

// exports.main = async (event, callback) => {
//     try {
//         // Construct the request payload
//         const requestData = {
//             is_demo: true,
//             intent: "sale",
//             contract: {
//                 id: event.fields.id,
//             },
//             customer: {
//                 contact: {
//                     forename: event.fields.forename,
//                     surname: event.fields.surname,
//                     email: event.fields.email,
//                 },
//                 transactionRef: "veniam sequi tempora",
//                 basket_info: {
//                     currency: "EUR",
//                     sum: 449,
//                 },
//                 payment_context: {
//                     auto_capture: true,
//                 },
//                 application_context: {
//                     return_urls: {
//                         url_push: "https://shop.example.org/PUSH?order=12345",
//                     },
//                 },
//             },
//         };

//         // Define the configuration for the HTTP request
//         const config = {
//             method: "post",
//             url: "https://connect-testing.secupay-ag.de/api/v2/Smart/Transactions",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${event.fields.authToken}`, // Using authToken from event.fields
//             },
//             data: requestData,
//         };

//         // Make the HTTP request
//         const response = await axios(config);

//         // Output the response data
//         callback({
//             outputFields: response.data,
//         });
//     } catch (error) {
//         // Handle errors if any
//         console.error("Error occurred:", error.message);
//         callback({
//             outputFields: {
//                 error: error.message,
//             },
//         });
//     }
// };

exports.main = async (event, callback) => {
    try {
        const id = event.fields.id;
        let config = {
            method: "post",
            url: `https://connect-testing.secupay-ag.de/api/v2/Smart/Transactions/${id}/start/prepaid`,
            headers: {
                Authorization: `Bearer ${event.fields.authToken}`, // Assuming 'authorizationToken' is the field name for the token
                Accept: "application/json",
            },
            // You can add more properties like data or params if needed
        };

        // Making the HTTP request using Axios
        const response = await axios.request(config);

        // Output the extracted email and response data
        callback({
            outputFields: {
                response: response.data, // You might want to refine this based on the structure of the response
            },
        });
    } catch (error) {
        // Handle errors if any
        console.error("Error occurred:", error.message);
        callback({
            outputFields: {
                error: error.message,
            },
        });
    }
};

//

const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

exports.main = async (event, callback) => {
    try {
        // Extract the authToken from event
        const authToken = event.fields.authToken;
        console.log(event);

        // Generate random UUID for the project
        const project = uuidv4();

        let data = JSON.stringify({
            contact: {
                salutation: "Herr",
                title: "Miss",
                forename: "Mia ",
                surname: "Mitchell",
                companyname: "Ullrich Group",
                dob: "1961-02-03",
                email: "Orin.Metz@example.net",
                phone: "0049-123-456789",
                address: {
                    street: "Berniece Shoal",
                    street_number: "1",
                    postal_code: "56479 ",
                    city: "East Nicklaus",
                    country: "DE",
                },
            },
            project: project,
            payout_account: {
                iban: "DE37503240001000000524",
                bic: "",
                owner: "Place Holder",
            },
            payin_account: true,
        });

        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "https://connect-testing.secupay-ag.de/api/v2/Payment/Contracts/GCR_8BV9EV88K03UXXZ87Z65NWC9W2C9OP/RequestId",
            headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios
            .request(config)
            .then((response) => {
                // Extract iban and contract id from response data
                const responseData = response.data;
                const outputFields = {
                    iban: responseData.payin_account.iban,
                    id: responseData.contract.id,
                };

                // Output the extracted fields
                callback({
                    outputFields: outputFields,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    } catch (error) {
        // Handle errors
        console.error("Error making POST request:", error.message);
        callback({
            outputFields: {
                error: error.message,
            },
        });
    }
};

// sdfsdfsdf
const axios = require("axios");

exports.main = async (event, callback) => {
    try {
        // Construct the request payload
        const requestData = {
            is_demo: true,
            intent: "sale",
            contract: {
                id: event.fields.id,
            },
            transactionRef: "veniam sequi tempora",
            basket_info: {
                currency: "EUR",
                sum: 449,
            },
            customer: {
                contact: {
                    forename: event.fields.forename,
                    surname: event.fields.surname,
                    email: event.fields.email,
                },
                payment_context: {
                    auto_capture: true,
                },
                application_context: {
                    return_urls: {
                        url_push: "https://shop.example.org/PUSH?order=12345",
                    },
                },
            },
        };

        // Define the configuration for the HTTP request
        const config = {
            method: "post",
            url: "https://connect-testing.secupay-ag.de/api/v2/Smart/Transactions",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${event.fields.authToken}`, // Using authToken from event.fields
            },
            data: requestData,
        };

        // Make the HTTP request
        const response = await axios(config);

        // Output the response data
        callback({
            outputFields: response.data,
        });
    } catch (error) {
        // Handle errors if any
        console.error("Error occurred:", error.message);
        callback({
            outputFields: {
                error: error.message,
            },
        });
    }
};

const axios = require("axios");

exports.main = async (event, callback) => {
    try {
        // Extract the authToken and transaction ID from event fields
        const authToken = event.fields.authToken;
        const id = event.fields.id;

        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: `https://connect-testing.secupay-ag.de/api/v2/Smart/Transactions/${id}/start/prepaid`,
            headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
            },
        };

        // Making the HTTP request using Axios
        const response = await axios.request(config);

        // Extract all values from the outer object
        const outerValues = {};
        for (const key in response.data) {
            if (response.data.hasOwnProperty(key)) {
                outerValues[key] = response.data[key];
            }
        }

        // Output the response data
        callback({
            outputFields: outerValues,
        });
    } catch (error) {
        // Handle errors
        console.error("Error making POST request:", error.message);
        callback({
            outputFields: {
                error: error.message,
            },
        });
    }
};

const axios = require("axios");

exports.main = async (event, callback) => {
    try {
        // Extract the authToken and transaction ID from event fields
        const authToken = event.fields.authToken;
        const id = event.fields.id;

        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: `https://connect-testing.secupay-ag.de/api/v2/Smart/Transactions/${id}/start/prepaid`,
            headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
            },
        };

        // Making the HTTP request using Axios
        const response = await axios.request(config);

        // Extracting specific fields from the response data
        const outputFields = {
            merchant_companyname: response.data.merchant.companyname,
            transactions_id: response.data.transactions[0].id, // Assuming there's only one transaction
            created: response.data.created,
            sum: response.data.basket_info.sum,
            currency: response.data.basket_info.currency,
            payment_instructions: response.data.payment_instructions,
            transactionRef: response.data.transactionRef,
        };

        // Output the extracted fields
        callback({
            outputFields: outputFields,
        });
    } catch (error) {
        // Handle errors
        console.error("Error making POST request:", error.message);
        callback({
            outputFields: {
                error: error.message,
            },
        });
    }
};
