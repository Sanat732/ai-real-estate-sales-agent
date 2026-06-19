function handleConversation(chatHistory){


const lastMessage =
chatHistory[chatHistory.length - 1]
.message
.toLowerCase();


let customerData = {};


// Analyze full chat

chatHistory.forEach(chat=>{


const msg =
chat.message.toLowerCase();


// Intent

if(
msg.includes("buy") ||
msg.includes("rent") ||
msg.includes("invest")
){

customerData.intent = msg;

}



// Property Type

if(msg.includes("apartment")){

customerData.propertyType =
"Apartment";

}


if(msg.includes("villa")){

customerData.propertyType =
"Villa";

}



// Bedrooms

const bedroomMatch =
msg.match(/\d+/);


if(bedroomMatch){

customerData.bedrooms =
bedroomMatch[0];

}



// Budget

if(
msg.includes("million") ||
msg.includes("aed") ||
msg.includes("m")
){

customerData.budget =
msg;

}



// Timeline

if(
msg.includes("immediately") ||
msg.includes("1 month") ||
msg.includes("3 months") ||
msg.includes("6+")
){

customerData.timeline =
msg;

}


});



// Normal flow replies


if(!customerData.intent){

return {

handled:true,

reply:
"Welcome to Elite Dubai Properties 👋 Are you looking to buy, rent, or invest?"

};

}



if(!customerData.propertyType){


return {

handled:true,

reply:
"Great. Which Dubai location are you interested in?"

};

}



if(!customerData.bedrooms){

return {

handled:true,

reply:
"Excellent choice. Are you looking for an apartment or a villa?"

};

}



if(!customerData.budget){

return {

handled:true,

reply:
"Perfect. How many bedrooms would you prefer?"

};

}



if(!customerData.timeline){

return {

handled:true,

reply:
`Great. When are you planning to proceed?

• Immediately
• Within 1 month
• 3 months
• 6+ months`

};

}


// Everything collected
// now AI can recommend property

return {

handled:false

};


}



module.exports =
handleConversation;