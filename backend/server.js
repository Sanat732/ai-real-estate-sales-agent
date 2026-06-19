const express = require("express");
const session = require("express-session");
const cors = require("cors");

require("dotenv").config();


// imports

const askSophia = require("./ai");

const handleConversation =
require("./conversationManager");

const saveLead = require("./lead");

const extractLead =
require("./leadExtractor");

const matchProperties =
require("./propertyMatcher");

const validateLead =
require("./validator");

const handleFallbackLead =
require("./fallbackLead");

const handleLeadCapture =
require("./leadCaptureManager");

const getProperties =
require("./sheets");


// app

const app = express();


app.use(cors({

origin:"http://localhost:5173",

credentials:true

}));


app.use(express.json());


app.use(session({

secret:"sophia-ai-secret",

resave:false,

saveUninitialized:true

}));



// Test Route

app.get("/",(req,res)=>{


res.send(
"Sophia Backend Running"
);


});

// RESET CHAT ROUTE

app.post("/reset-chat",(req,res)=>{


req.session.destroy((error)=>{


if(error){


return res.status(500).json({

message:"Reset failed"

});


}



res.clearCookie("connect.sid");


res.json({

message:"Chat reset successfully"

});



});


});


// Property Route

app.get("/properties", async(req,res)=>{


try{


const properties =
await getProperties();


res.json(properties);


}

catch(error){


console.log(error);


res.status(500).json({

error:"Failed to load properties"

});


}


});






// CHAT ROUTE


app.post("/chat", async(req,res)=>{


try{


const userMessage =
req.body.message;




// fallback timeout reset


if(
req.session.fallbackMode &&
Date.now() -
req.session.fallbackStartedAt >
300000
){


req.session.fallbackMode =
false;


}




// fallback lead capture


if(req.session.fallbackMode){


const fallbackResult =
await handleFallbackLead(

userMessage,

req.session

);



if(fallbackResult.done){


req.session.fallbackMode =
false;


}



return res.json({

reply:fallbackResult.reply

});


}





// session initialize


if(!req.session.chatHistory){


req.session.chatHistory = [];


}



if(!req.session.leadSaved){


req.session.leadSaved = false;


}


// LOCAL LEAD CAPTURE

const leadCaptureResult =
handleLeadCapture(
userMessage,
req.session
);


if(
leadCaptureResult.handled
){



if(
leadCaptureResult.done
){


await saveLead({


...req.session.leadData,


meetingStatus:"Pending",


salesNotes:
"Captured automatically by Sophia AI"


});



req.session.leadSaved =
true;


req.session.leadCapture =
false;



console.log(
"✅ Lead saved locally"
);


}




return res.json({

reply:
leadCaptureResult.reply

});



}


// save customer message


req.session.chatHistory.push({

role:"Customer",

message:userMessage

});


if(
aiReply.includes(
"full name"
)
){


req.session.leadCapture =
true;


console.log(
"📞 Lead capture mode ON"
);


}


// LOCAL SOPHIA BRAIN
// avoids unnecessary Gemini calls


const localResponse =
handleConversation(

req.session.chatHistory

);



if(localResponse.handled){


console.log(
"🧠 Sophia local brain used"
);



req.session.chatHistory.push({

role:"Sophia",

message:localResponse.reply

});



return res.json({

reply:localResponse.reply

});


}







// ONLY REACH HERE WHEN AI NEEDED


const properties =
await getProperties();



const matchedProperties =
matchProperties(

JSON.stringify(
req.session.chatHistory
),

properties

);





const aiReply =
await askSophia(

req.session.chatHistory,

matchedProperties

);

if(
aiReply
.toLowerCase()
.includes("full name")
){


req.session.leadCapture =
true;


console.log(
"📞 Lead capture mode ON"
);


}


req.session.chatHistory.push({

role:"Sophia",

message:aiReply

});





// Lead checking


const fullConversation =
JSON.stringify(

req.session.chatHistory

);




const hasEmail =
/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
.test(fullConversation);



const hasPhone =
/\+?[0-9]{8,15}/
.test(fullConversation);



const hasTimeline =
/immediately|1 month|3 months|6 months|within/i
.test(fullConversation);






if(

hasEmail &&

hasPhone &&

hasTimeline &&

!req.session.leadSaved

){



const leadData =
await extractLead(

req.session.chatHistory

);




if(
validateLead(leadData)
){



await saveLead({


...leadData,


meetingStatus:"Pending",


salesNotes:
"Captured automatically by Sophia AI"


});




req.session.leadSaved =
true;



console.log(
"✅ Lead saved successfully"
);



}



}

else{


console.log(
"⏳ Waiting for valid lead details"
);


}






res.json({

reply:aiReply

});




}



catch(error){



console.log(

"Sophia Error:",

error.message

);



// activate emergency mode


req.session.fallbackMode =
true;


req.session.fallbackStartedAt =
Date.now();


req.session.fallbackLead = {

name:"",
email:"",
phone:""

};




res.json({


reply:
`I apologize, I'm experiencing a temporary delay.

Our Dubai luxury property team can still assist you personally.

Could you please share your full name?`


});



}



});






// Manual lead save test route


app.post("/save-lead",
async(req,res)=>{


try{


const result =
await saveLead({


name:"Test Customer",

email:"test@gmail.com",

phone:"+971501234567",

interest:"Buy",

location:"Dubai Marina",

propertyType:"Apartment",

bedrooms:"2",

budget:"2 Million AED",

timeline:"3 months",

leadScore:"90",

leadStatus:"HOT LEAD",

summary:
"Interested in Marina apartment",

meetingStatus:"Pending",

salesNotes:"AI generated lead"


});




res.json({

message:result

});



}

catch(error){



console.log(error);



res.status(500).json({

error:"Lead saving failed"

});


}



});




// START SERVER


app.listen(

process.env.PORT,

()=>{


console.log(

`Server running on port ${process.env.PORT}`

);


}

);