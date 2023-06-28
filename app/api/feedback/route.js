import nodemailer from 'nodemailer'

const {ADMIN_EMAIL, ADMIN_EMAIL_PASS} = process.env

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ADMIN_EMAIL,
    pass: ADMIN_EMAIL_PASS
  }
})

export async function POST(req){
  const data = await req.json()
  try {
    await transporter.sendMail({
      from: ADMIN_EMAIL,
      to: data.email,
      subject: "Hunting Coder - Feedback",
      html: `<div>
        <p>We value your feedback on our recent collaboration. Please take a moment to share your experience, highlighting areas of excellence and potential improvements. Your input is highly appreciated as we strive to deliver the best service possible. Thank you for your support.</p>
        <p>From Hunting Coder community</P>
      </div>`
    })
    return new Response(JSON.stringify({success: true}))
  } catch (error) {
    return new Response(JSON.stringify({success: false}))
  }
  return new Response(JSON.stringify({success: true}))
}
