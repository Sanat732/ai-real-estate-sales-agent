function handleLeadCapture(
message,
session
){


if(!session.leadCapture){

return {
handled:false
};

}


// create storage

if(!session.leadData){

session.leadData = {};

}



// NAME

if(!session.leadData.name){


session.leadData.name =
message;


return {

handled:true,

done:false,

reply:
"Thank you. Could you please share your email address?"

};


}




// EMAIL


if(!session.leadData.email){


const emailRegex =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;



if(
!emailRegex.test(message)
){


return {

handled:true,

done:false,

reply:
"Please enter a valid email address."

};

}



session.leadData.email =
message.toLowerCase();



return {

handled:true,

done:false,

reply:
"Great. Could you please share your phone number?"

};


}





// PHONE


if(!session.leadData.phone){


const phoneRegex =
/^\+?[0-9]{8,15}$/;



if(
!phoneRegex.test(message)
){


return {

handled:true,

done:false,

reply:
"Please enter a valid phone number."

};


}



session.leadData.phone =
message;



return {

handled:true,

done:true,

reply:
"Thank you. Your private consultation request has been received. Our luxury property advisor will contact you shortly."

};


}



}



module.exports =
handleLeadCapture;