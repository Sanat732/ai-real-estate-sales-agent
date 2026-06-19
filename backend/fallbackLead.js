const saveLead = require("./lead");


async function handleFallbackLead(message, session){


if(!session.fallbackLead){

session.fallbackLead = {

name:"",
email:"",
phone:""

};

}


// save name

if(!session.fallbackLead.name){

session.fallbackLead.name = message;


return {

done:false,

reply:
`Thank you ${message}. Could you please share your email address?`

};

}



// save email

if(!session.fallbackLead.email){


const emailRegex =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;


if(!emailRegex.test(message)){


return {

done:false,

reply:
"Please enter a valid email address."

};


}


session.fallbackLead.email =
message.toLowerCase();


return {

done:false,

reply:
"Thank you. Could you please share your phone number?"

};


}



// save phone


if(!session.fallbackLead.phone){


const phoneRegex =
/^\+?[0-9]{8,15}$/;


if(!phoneRegex.test(message)){


return {

done:false,

reply:
"Please enter a valid phone number."

};


}


session.fallbackLead.phone = message;



await saveLead({


name:session.fallbackLead.name,

email:session.fallbackLead.email,

phone:session.fallbackLead.phone,


leadStatus:"RECOVERY LEAD",

summary:
"Lead captured during AI fallback mode",


meetingStatus:"Pending",

salesNotes:
"AI unavailable. Follow up manually."


});



return {

done:true,

reply:
`Thank you. Your consultation request has been successfully received.

Our property specialist will contact you shortly.`

};


}


}



module.exports = handleFallbackLead;