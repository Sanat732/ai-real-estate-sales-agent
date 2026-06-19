function validateLead(lead){


if(!lead.name){

return false;

}


const emailRegex =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const phoneRegex =
/^\+?[0-9]{8,15}$/;



if(!lead.email || !emailRegex.test(lead.email)){

return false;

}



if(!lead.phone || !phoneRegex.test(lead.phone)){

return false;

}



return true;


}


module.exports = validateLead;