// src/pages/api/send-email-direct.js
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" })
  }

  // Enhanced debugging - will show in Vercel logs
  console.log("==== EMAIL DEBUGGING (DIRECT) ====")
  console.log("EMAIL_USER exists:", !!process.env.EMAIL_USER)
  console.log("EMAIL_USER value:", process.env.EMAIL_USER || "not set")
  console.log("BREVO_API_KEY exists:", !!process.env.BREVO_API_KEY)
  console.log(
    "BREVO_API_KEY first 5 chars:",
    process.env.BREVO_API_KEY ? process.env.BREVO_API_KEY.substring(0, 5) + "..." : "not set",
  )
  console.log("Request body:", JSON.stringify(req.body))

  try {
    const { name, email, phone, date, time, guests, message } = req.body

    // Validate required fields
    if (!name || !email || !phone) {
      console.log("Missing required fields:", { name, email, phone })
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and phone number",
      })
    }

    // Check for environment variables and provide clear error if missing
    if (!process.env.BREVO_API_KEY) {
      console.error("ERROR: BREVO_API_KEY environment variable is not set")
      return res.status(500).json({
        success: false,
        message: "Server configuration error: Missing API key",
        debug: "BREVO_API_KEY is not set in environment variables",
      })
    }

    if (!process.env.EMAIL_USER) {
      console.error("ERROR: EMAIL_USER environment variable is not set")
      return res.status(500).json({
        success: false,
        message: "Server configuration error: Missing email configuration",
        debug: "EMAIL_USER is not set in environment variables",
      })
    }

    // Format the date for better readability
    const formattedDate = date ? new Date(date).toLocaleDateString() : "Not specified"

    // Format the time for better readability
    const formattedTime = time || "Not specified"

    // Helper function to send email using Brevo API directly
    async function sendEmailDirect(options) {
      try {
        console.log(`Preparing to send email to: ${options.to}`)

        // Create email data
        const emailData = {
          sender: { name: options.senderName || "Tonle Mekong Restaurant", email: process.env.EMAIL_USER },
          to: [{ email: options.to, name: options.toName || options.to }],
          subject: options.subject,
          htmlContent: options.html,
        }

        if (options.text) {
          emailData.textContent = options.text
        }

        console.log("Email configuration complete, sending now...")

        // Send email using fetch API
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            accept: "application/json",
            "api-key": process.env.BREVO_API_KEY,
            "content-type": "application/json",
          },
          body: JSON.stringify(emailData),
        })

        const responseText = await response.text()
        let responseData
        try {
          responseData = JSON.parse(responseText)
        } catch (e) {
          responseData = { rawResponse: responseText }
        }

        if (!response.ok) {
          console.error("Brevo API error response:", responseData)
          throw new Error(`Brevo API error: ${response.status} - ${JSON.stringify(responseData)}`)
        }

        console.log("Email sent successfully:", JSON.stringify(responseData))
        return responseData
      } catch (error) {
        console.error("Error sending email with Brevo:", error)
        throw error
      }
    }

    // Create a nicely formatted HTML email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h1 style="color: #e67e22; border-bottom: 2px solid #e67e22; padding-bottom: 10px;">New Reservation Request - Tonle Mekong Restaurant</h1>
        
        <div style="margin: 20px 0;">
          <h2 style="color: #333;">Customer Information</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
        </div>
        
        <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
          <h2 style="color: #333;">Reservation Details</h2>
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Time:</strong> ${formattedTime}</p>
          <p><strong>Number of Guests:</strong> ${guests}</p>
          <p><strong>Special Requests:</strong> ${message || "None"}</p>
        </div>
        
        <div style="margin-top: 20px; font-size: 14px; color: #666; border-top: 1px solid #e0e0e0; padding-top: 10px;">
          <p>This reservation was submitted through the Tonle Mekong Restaurant website.</p>
        </div>
      </div>
    `

    // Plain text version
    const textContent = `
      New Reservation Request - Tonle Mekong Restaurant
      
      Customer Information:
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      
      Reservation Details:
      Date: ${formattedDate}
      Time: ${formattedTime}
      Number of Guests: ${guests}
      Special Requests: ${message || "None"}
      
      This reservation was submitted through the Tonle Mekong Restaurant website.
    `

    // Generate a unique confirmation code for this reservation
    const confirmationCode = "MK-" + Math.random().toString(36).substring(2, 8).toUpperCase()

    // Create confirmation email for customer
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h1 style="color: #e67e22; border-bottom: 2px solid #e67e22; padding-bottom: 10px;">Reservation Confirmation - Tonle Mekong Restaurant</h1>
        
        <div style="margin: 20px 0;">
          <p>Dear ${name},</p>
          <p>Thank you for choosing Tonle Mekong Restaurant. Your reservation has been received and is being processed.</p>
        </div>
        
        <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
          <h2 style="color: #333;">Your Reservation Details</h2>
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Time:</strong> ${formattedTime}</p>
          <p><strong>Number of Guests:</strong> ${guests}</p>
          <p><strong>Confirmation Code:</strong> ${confirmationCode}</p>
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
    `

    // Confirmation email plain text
    const confirmationText = `
      Reservation Confirmation - Tonle Mekong Restaurant
      
      Dear ${name},
      
      Thank you for choosing Tonle Mekong Restaurant. Your reservation has been received and is being processed.
      
      Your Reservation Details:
      Date: ${formattedDate}
      Time: ${formattedTime}
      Number of Guests: ${guests}
      Confirmation Code: ${confirmationCode}
      
      If you need to modify or cancel your reservation, please contact us at:
      Phone: 063 964 667
      Email: tonlemekong@cambodiarestaurants.com
      
      We look forward to serving you at Tonle Mekong Restaurant!
    `

    console.log("Sending notification email to restaurant...")
    // Send notification to restaurant
    try {
      await sendEmailDirect({
        to: process.env.EMAIL_USER,
        subject: `New Reservation Request from ${name}`,
        html: htmlContent,
        text: textContent,
        senderName: "Tonle Mekong Restaurant",
      })
      console.log("Restaurant notification email sent successfully")
    } catch (notifyError) {
      console.error("Failed to send notification email to restaurant:", notifyError)
      // Continue to send confirmation email even if notification fails
    }

    console.log("Sending confirmation email to customer...")
    // Send confirmation to customer
    try {
      await sendEmailDirect({
        to: email,
        toName: name,
        subject: "Your Reservation at Tonle Mekong Restaurant is Confirmed",
        html: confirmationHtml,
        text: confirmationText,
        senderName: "Tonle Mekong Restaurant",
      })
      console.log("Customer confirmation email sent successfully")
    } catch (confirmError) {
      console.error("Error sending confirmation email:", confirmError)
      // Continue even if confirmation email fails
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Thank you! Your reservation request has been received. We will contact you shortly to confirm.",
      confirmationCode: confirmationCode,
    })
  } catch (error) {
    console.error("Error processing reservation:", error)

    // Return error response with more details
    return res.status(500).json({
      success: false,
      message: "There was an error submitting your reservation. Please try again or call us directly.",
      details: process.env.NODE_ENV === "development" ? error.message : "Server error",
    })
  }
}