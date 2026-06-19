import { useEffect } from "react";
import SophiaWidget from "./components/SophiaWidget";
import "./App.css";

function App(){


useEffect(()=>{

window.scrollTo(0,0);

},[]);


return (

<div className="website">


<nav className="navbar">

<h2>Elite Dubai Properties</h2>

<div>

<span
onClick={()=>
document
.getElementById("home")
.scrollIntoView({
behavior:"smooth"
})
}
>
Home
</span>


<span
onClick={()=>
document
.getElementById("properties")
.scrollIntoView({
behavior:"smooth"
})
}
>
Properties
</span>


<span
onClick={()=>
document
.getElementById("contact")
.scrollIntoView({
behavior:"smooth"
})
}
>
Contact
</span>


</div>

</nav>



<section 
id="home"
className="hero"
>


<div>

<h1>
Find Your Luxury Home In Dubai
</h1>


<p>
Premium villas and apartments powered by AI property assistance.
</p>


<button>
Explore Properties
</button>


</div>


</section>



<section
id="properties"
className="properties"
>


<h2>
Featured Luxury Properties
</h2>


<div className="cards">


<div className="card">


<img
src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
/>


<div className="card-content">

<h3>
Marina Crown Residence
</h3>


<p>
📍 Dubai Marina
</p>


<p>
💰 AED 2.1 Million
</p>


<button>
View Details
</button>


</div>


</div>





<div className="card">


<img
src="https://images.unsplash.com/photo-1613490493576-7fde63acd811"
/>


<div className="card-content">


<h3>
Palm Signature Villa
</h3>


<p>
📍 Palm Jumeirah
</p>


<p>
💰 AED 12 Million
</p>


<button>
View Details
</button>


</div>


</div>




<div className="card">


<img
src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
/>


<div className="card-content">


<h3>
Downtown Elite Tower
</h3>


<p>
📍 Downtown Dubai
</p>


<p>
💰 AED 4.5 Million
</p>


<button>
View Details
</button>


</div>


</div>



</div>


</section>


<section className="why-section">

<h2>
Why Choose Elite Dubai Properties?
</h2>


<div className="why-grid">


<div className="why-card">

<h3>🤖 AI Powered Assistance</h3>

<p>
Sophia AI helps customers discover matching luxury properties instantly.
</p>

</div>



<div className="why-card">

<h3>🏡 Verified Properties</h3>

<p>
Explore premium villas and apartments from trusted Dubai locations.
</p>

</div>



<div className="why-card">

<h3>⚡ Fast Consultation</h3>

<p>
Connect quickly with property experts for private viewing and guidance.
</p>

</div>


</div>


</section>




<section
id="contact"
className="contact-section"
>

<h2>
Start Your Dubai Property Journey
</h2>


<p>
Find your dream home with AI-powered property assistance.
</p>


<button>
Contact Our Team
</button>


</section>




<footer>

<p>
© 2026 Elite Dubai Properties | Powered by Sophia AI
</p>

</footer>


<SophiaWidget />


</div>

)

}


export default App;