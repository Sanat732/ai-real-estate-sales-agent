const { google } = require("googleapis");
require("dotenv").config();


async function saveLead(data) {

    const auth = new google.auth.GoogleAuth({

        keyFile: process.env.GOOGLE_SERVICE_KEY,

        scopes: [
            "https://www.googleapis.com/auth/spreadsheets"
        ]

    });


    const client = await auth.getClient();


    const sheets = google.sheets({

        version: "v4",

        auth: client

    });


    await sheets.spreadsheets.values.append({

        spreadsheetId: process.env.CRM_SHEET_ID,

        range: "Leads!A:O",

        valueInputOption: "USER_ENTERED",

        resource: {

            values: [

                [

                    new Date().toLocaleString(),

                    data.name || "",

                   data.email
                    ? data.email.toLowerCase()
                    : "",

                    data.phone || "",

                    data.interest || "",

                    data.location || "",

                    data.propertyType || "",

                    data.bedrooms || "",

                    data.budget || "",

                    data.timeline || "",

                    data.leadScore || "",

                    data.leadStatus || "",

                    data.summary || "",

                    data.meetingStatus || "",

                    data.salesNotes || ""

                ]

            ]

        }

    });


    return "Lead Saved Successfully";


}


module.exports = saveLead;