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
      text: "Hello world",
      html: `<div>
        <p>Name : ${data.name}</p>
        <p>Message : ${data.message}</p>
      </div>`
    })
    return new Response(JSON.stringify({success: true}))
  } catch (error) {
    return new Response(JSON.stringify({success: false}))
  }
  return new Response(JSON.stringify({success: true}))
}