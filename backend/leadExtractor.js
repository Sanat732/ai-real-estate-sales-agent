const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();


const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);


async function extractLead(message){


const model = genAI.getGenerativeModel({

    model:"gemini-2.5-flash"

});


const prompt = `

Extract real estate lead information from this full conversation.

Analyze customer and Sophia messages.

Extract all available information.

Return ONLY valid JSON.

Never guess missing customer contact information.

Lead score must always be a number between 0-100.

Fields:

{
"name":"",
"email":"",
"phone":"",
"interest":"",
"location":"",
"propertyType":"",
"bedrooms":"",
"budget":"",
"timeline":"",
"leadScore":"",
"leadStatus":"",
"summary":"",
"salesNotes":""
}


Lead status rules:

HOT LEAD:
- Timeline immediately or within 1 month
- Serious buyer

Score:
90-100


WARM LEAD:
- Timeline around 3 months

Score:
60-89


COLD LEAD:
- Timeline 6+ months
- Research stage

Score:
Below 60


Create salesNotes:
Short next action suggestion for sales team.


Full Conversation:

${JSON.stringify(message)}

`;


const result = await model.generateContent(prompt);


let text = result.response.text();


text = text
.replace(/```json/g,"")
.replace(/```/g,"")
.trim();


try{

return JSON.parse(text);

}
catch(error){

console.log("Lead JSON Error:", error.message);

return {};

}


}


module.exports = extractLead;