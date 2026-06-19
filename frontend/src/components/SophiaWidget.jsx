import { useState, useRef, useEffect } from "react";
import "./SophiaWidget.css";


function SophiaWidget() {

const [open,setOpen] = useState(false);
const [preview,setPreview] = useState(true);


const resetChat = async()=>{


localStorage.removeItem(
"sophia_messages"
);


setMessages(
defaultMessages
);


await fetch(

`${import.meta.env.VITE_API_URL}/reset-chat`,

{

method:"POST",

credentials:"include"

}

);


};


const defaultMessages = [

{

sender:"bot",

text:
"Hello 👋 Welcome to Elite Dubai Properties. I'm Sophia, your property assistant. Are you looking to Buy, Rent, or Invest?"

}

];


const [messages,setMessages] = useState(()=>{


const savedMessages =
localStorage.getItem(
"sophia_messages"
);


return savedMessages
?
JSON.parse(savedMessages)
:
defaultMessages;


});


const messagesRef = useRef(null);


useEffect(()=>{


localStorage.setItem(

"sophia_messages",

JSON.stringify(messages)

);



if(messagesRef.current){

messagesRef.current.scrollTop =
messagesRef.current.scrollHeight;

}


},[messages]);



const [input,setInput] = useState("");
const [typing,setTyping] = useState(false);

const widgetRef = useRef(null);


const startDrag = (e)=>{


let startX = e.clientX;

let startY = e.clientY;


const move = (event)=>{


const dx =
event.clientX - startX;


const dy =
event.clientY - startY;


const widget =
widgetRef.current;


const rect =
widget.getBoundingClientRect();


widget.style.left =
rect.left + dx + "px";


widget.style.top =
rect.top + dy + "px";


widget.style.right =
"auto";


widget.style.bottom =
"auto";


startX =
event.clientX;


startY =
event.clientY;


};



const stop = ()=>{


document.removeEventListener(
"mousemove",
move
);


};



document.addEventListener(
"mousemove",
move
);


document.addEventListener(
"mouseup",
stop,
{once:true}
);


};

// keeping for future use

const [lead,setLead] = useState({

intent:"",
location:"",
propertyType:"",
bedrooms:"",
budget:"",
name:"",
email:"",
phone:""

});



const [step,setStep] = useState("intent");




const sendMessage = async(text)=>{


if(!text.trim()) return;



setMessages(prev=>[

...prev,

{
sender:"user",
text:text
}

]);



setInput("");



try{

setTyping(true);


// response time measure

const startTime =
Date.now();


const response = await fetch(
`${import.meta.env.VITE_API_URL}/chat`,

{

method:"POST",

credentials:"include",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

message:text

})

}

);




const data =
await response.json();




// smart human typing delay

const responseTime =
Date.now() - startTime;


let delay = 0;


// only fast replies need human delay

if(responseTime < 1000){


delay =
Math.floor(
Math.random() * 1500
)
+ 1000;


}




setTimeout(()=>{



setMessages(prev=>[

...prev,

{

sender:"bot",

text:data.reply

}

]);



setTyping(false);



},delay);




}



catch(error){



console.log(error);



setTyping(false);



setMessages(prev=>[

...prev,

{

sender:"bot",

text:
"Sorry, I am having trouble connecting right now."

}

]);



}



};







return (

<div

className="widget-container"

ref={widgetRef}

>



{

open && (

<div className="app">


<div className="chat-box">



<div

className="header"

onMouseDown={startDrag}

>

<span>
Sophia AI 🏡
</span>


<div className="header-actions">


<button

className="chat-reset"

onMouseDown={(e)=>e.stopPropagation()}

onClick={resetChat}

>

↻

</button>



<button

className="chat-close"

onMouseDown={(e)=>e.stopPropagation()}

onClick={()=>setOpen(false)}

>

×

</button>


</div>


</div>




<div

className="messages"

ref={messagesRef}

>



{


messages.map((msg,index)=>{



const imageMatch =
msg.text.match(

/https?:\/\/[^\s]+/i

);


return (


<div

key={index}

className={`message ${msg.sender}`}

>


<div>

{
msg.text.replace(
/https?:\/\/[^\s]+/g,
""
)
}

</div>




{


imageMatch && (


<img

src={imageMatch[0]}

alt="Property"

className="property-image"

onError={(e)=>{

console.log(
"Image failed:",
e.target.src
);

}}

/>

)


}



</div>


)


})


}





{


typing && (

<div className="message bot typing">


<span></span>

<span></span>

<span></span>


</div>


)

}



</div>







<div className="buttons">



<button onClick={()=>sendMessage("Buy")}>

Buy

</button>



<button onClick={()=>sendMessage("Rent")}>

Rent

</button>



<button onClick={()=>sendMessage("Invest")}>

Invest

</button>



</div>






<div className="input-area">



<input


value={input}


onChange={(e)=>
setInput(e.target.value)
}


onKeyDown={(e)=>{


if(e.key==="Enter"){

sendMessage(input)

}


}}


placeholder="Message Sophia..."


/>





<button

onClick={()=>sendMessage(input)}

>

Send

</button>




</div>





</div>


</div>


)

}






{


!open && preview && (

<div

className="chat-preview"

onMouseDown={startDrag}

>



<div className="preview-header">



<span>

Sophia AI Assistant

</span>




<button

className="preview-close"

onClick={()=>
setPreview(false)
}

>

</button>




</div>




<p>

Need help finding your perfect Dubai property?

</p>





<div

className="preview-action"

onClick={()=>setOpen(true)}

>


Start conversation →


</div>



</div>


)

}






{

!open && (

<button

className="chat-toggle"

onClick={()=>{


setOpen(true);


setPreview(true);


}}

>

🏡

</button>

)

}





</div>


)


}




export default SophiaWidget;