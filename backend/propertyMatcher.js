function matchProperties(chatHistory, properties){


const conversation = JSON.stringify(chatHistory)
.toLowerCase();


const scoredProperties = properties.map((property)=>{


let score = 0;


// Location
if(
property.Location &&
conversation.includes(
String(property.Location).toLowerCase()
)
){

score += 5;

}


// Type
if(
property.Property_Type &&
conversation.includes(
String(property.Property_Type).toLowerCase()
)
){

score += 3;

}


// Bedrooms
if(
property.Bedrooms &&
conversation.includes(
String(property.Bedrooms).toLowerCase()
)
){

score += 2;

}



return {

...property,

matchScore:score

};


});


const matches = scoredProperties
.filter(property=>property.matchScore > 0)
.sort((a,b)=>b.matchScore - a.matchScore);



return matches.length > 0
?
matches.slice(0,3)
:
properties.slice(0,3);


}


module.exports = matchProperties;