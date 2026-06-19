const { google } = require("googleapis");
require("dotenv").config();


async function getProperties() {

    const auth = new google.auth.GoogleAuth({

        keyFile: process.env.GOOGLE_SERVICE_KEY,

        scopes:[
 "https://www.googleapis.com/auth/spreadsheets"
]

    });


    const client = await auth.getClient();


    const sheets = google.sheets({

        version:"v4",

        auth:client

    });



    const response = await sheets.spreadsheets.values.get({

        spreadsheetId: process.env.SHEET_ID,

        range:"'Elite Dubai Properties Inventor'!A:K"

    });



    const rows = response.data.values;


    if(!rows || rows.length === 0){

        return [];

    }


    const headers = rows[0];


    const properties = rows.slice(1).map(row=>{

        let obj = {};


        headers.forEach((header,index)=>{

            obj[header] = row[index] || "";

        });


        return obj;

    });

    


    return properties;

}



module.exports = getProperties;