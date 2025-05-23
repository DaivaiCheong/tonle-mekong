"use strict";(()=>{var e={};e.id=596,e.ids=[596],e.modules={3480:(e,o,t)=>{e.exports=t(5600)},4726:(e,o,t)=>{t.r(o),t.d(o,{config:()=>c,default:()=>l,routeModule:()=>u});var n={};t.r(n),t.d(n,{default:()=>a});var r=t(3480),s=t(8667),i=t(6435);async function a(e,o){if("POST"!==e.method)return o.status(405).json({success:!1,message:"Method not allowed"});console.log("==== EMAIL DEBUGGING (DIRECT) ===="),console.log("EMAIL_USER exists:",!!process.env.EMAIL_USER),console.log("EMAIL_USER value:",process.env.EMAIL_USER||"not set"),console.log("BREVO_API_KEY exists:",!!process.env.BREVO_API_KEY),console.log("BREVO_API_KEY first 5 chars:",process.env.BREVO_API_KEY?process.env.BREVO_API_KEY.substring(0,5)+"...":"not set"),console.log("Request body:",JSON.stringify(e.body));try{let{name:n,email:r,phone:s,date:i,time:a,guests:l,message:c}=e.body;if(!n||!r||!s)return console.log("Missing required fields:",{name:n,email:r,phone:s}),o.status(400).json({success:!1,message:"Please provide name, email, and phone number"});if(!process.env.BREVO_API_KEY)return console.error("ERROR: BREVO_API_KEY environment variable is not set"),o.status(500).json({success:!1,message:"Server configuration error: Missing API key",debug:"BREVO_API_KEY is not set in environment variables"});if(!process.env.EMAIL_USER)return console.error("ERROR: EMAIL_USER environment variable is not set"),o.status(500).json({success:!1,message:"Server configuration error: Missing email configuration",debug:"EMAIL_USER is not set in environment variables"});let u=i?new Date(i).toLocaleDateString():"Not specified",d=a||"Not specified";async function t(e){try{let o;console.log(`Preparing to send email to: ${e.to}`);let t={sender:{name:e.senderName||"Tonle Mekong Restaurant",email:process.env.EMAIL_USER},to:[{email:e.to,name:e.toName||e.to}],subject:e.subject,htmlContent:e.html};e.text&&(t.textContent=e.text),console.log("Email configuration complete, sending now...");let n=await fetch("https://api.brevo.com/v3/smtp/email",{method:"POST",headers:{accept:"application/json","api-key":process.env.BREVO_API_KEY,"content-type":"application/json"},body:JSON.stringify(t)}),r=await n.text();try{o=JSON.parse(r)}catch(e){o={rawResponse:r}}if(!n.ok)throw console.error("Brevo API error response:",o),Error(`Brevo API error: ${n.status} - ${JSON.stringify(o)}`);return console.log("Email sent successfully:",JSON.stringify(o)),o}catch(e){throw console.error("Error sending email with Brevo:",e),e}}let p=`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h1 style="color: #e67e22; border-bottom: 2px solid #e67e22; padding-bottom: 10px;">New Reservation Request - Tonle Mekong Restaurant</h1>
        
        <div style="margin: 20px 0;">
          <h2 style="color: #333;">Customer Information</h2>
          <p><strong>Name:</strong> ${n}</p>
          <p><strong>Email:</strong> ${r}</p>
          <p><strong>Phone:</strong> ${s}</p>
        </div>
        
        <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
          <h2 style="color: #333;">Reservation Details</h2>
          <p><strong>Date:</strong> ${u}</p>
          <p><strong>Time:</strong> ${d}</p>
          <p><strong>Number of Guests:</strong> ${l}</p>
          <p><strong>Special Requests:</strong> ${c||"None"}</p>
        </div>
        
        <div style="margin-top: 20px; font-size: 14px; color: #666; border-top: 1px solid #e0e0e0; padding-top: 10px;">
          <p>This reservation was submitted through the Tonle Mekong Restaurant website.</p>
        </div>
      </div>
    `,g=`
      New Reservation Request - Tonle Mekong Restaurant
      
      Customer Information:
      Name: ${n}
      Email: ${r}
      Phone: ${s}
      
      Reservation Details:
      Date: ${u}
      Time: ${d}
      Number of Guests: ${l}
      Special Requests: ${c||"None"}
      
      This reservation was submitted through the Tonle Mekong Restaurant website.
    `,m="MK-"+Math.random().toString(36).substring(2,8).toUpperCase(),f=`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h1 style="color: #e67e22; border-bottom: 2px solid #e67e22; padding-bottom: 10px;">Reservation Confirmation - Tonle Mekong Restaurant</h1>
        
        <div style="margin: 20px 0;">
          <p>Dear ${n},</p>
          <p>Thank you for choosing Tonle Mekong Restaurant. Your reservation has been received and is being processed.</p>
        </div>
        
        <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
          <h2 style="color: #333;">Your Reservation Details</h2>
          <p><strong>Date:</strong> ${u}</p>
          <p><strong>Time:</strong> ${d}</p>
          <p><strong>Number of Guests:</strong> ${l}</p>
          <p><strong>Confirmation Code:</strong> ${m}</p>
        </div>
        
        <div style="margin: 20px 0;">
          <p>If you need to modify or cancel your reservation, please contact us at:</p>
          <p>Phone: 063 964 667</p>
          <p>Email: tonlemekong@cambodiarestaurants.com</p>
        </div>
        
        <div style="margin-top: 20px; font-size: 14px; color: #666; border-top: 1px solid #e0e0e0; padding-top: 10px;">
          <p>We look forward to serving you at Tonle Mekong Restaurant!</p>
        </div>
      </div>
    `,v=`
      Reservation Confirmation - Tonle Mekong Restaurant
      
      Dear ${n},
      
      Thank you for choosing Tonle Mekong Restaurant. Your reservation has been received and is being processed.
      
      Your Reservation Details:
      Date: ${u}
      Time: ${d}
      Number of Guests: ${l}
      Confirmation Code: ${m}
      
      If you need to modify or cancel your reservation, please contact us at:
      Phone: 063 964 667
      Email: tonlemekong@cambodiarestaurants.com
      
      We look forward to serving you at Tonle Mekong Restaurant!
    `;console.log("Sending notification email to restaurant...");try{await t({to:process.env.EMAIL_USER,subject:`New Reservation Request from ${n}`,html:p,text:g,senderName:"Tonle Mekong Restaurant"}),console.log("Restaurant notification email sent successfully")}catch(e){console.error("Failed to send notification email to restaurant:",e)}console.log("Sending confirmation email to customer...");try{await t({to:r,toName:n,subject:"Your Reservation at Tonle Mekong Restaurant is Confirmed",html:f,text:v,senderName:"Tonle Mekong Restaurant"}),console.log("Customer confirmation email sent successfully")}catch(e){console.error("Error sending confirmation email:",e)}return o.status(200).json({success:!0,message:"Thank you! Your reservation request has been received. We will contact you shortly to confirm.",confirmationCode:m})}catch(e){return console.error("Error processing reservation:",e),o.status(500).json({success:!1,message:"There was an error submitting your reservation. Please try again or call us directly.",details:"Server error"})}}let l=(0,i.M)(n,"default"),c=(0,i.M)(n,"config"),u=new r.PagesAPIRouteModule({definition:{kind:s.A.PAGES_API,page:"/api/send-email-direct",pathname:"/api/send-email-direct",bundlePath:"",filename:""},userland:n})},5600:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6435:(e,o)=>{Object.defineProperty(o,"M",{enumerable:!0,get:function(){return function e(o,t){return t in o?o[t]:"then"in o&&"function"==typeof o.then?o.then(o=>e(o,t)):"function"==typeof o&&"default"===t?o:void 0}}})},8667:(e,o)=>{Object.defineProperty(o,"A",{enumerable:!0,get:function(){return t}});var t=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})}};var o=require("../../webpack-api-runtime.js");o.C(e);var t=o(o.s=4726);module.exports=t})();