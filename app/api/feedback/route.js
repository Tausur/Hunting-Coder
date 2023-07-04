import transporter from '@/config/gmail'

const { ADMIN_EMAIL } = process.env

export async function POST(req) {
  const data = await req.json()
  try {
    await transporter.sendMail({
      from: ADMIN_EMAIL,
      to: data.email,
      subject: "Appreciation for Your Feedback",
      text: "Hello world",
      html: `<div>
      <p>Dear ${data.name}</p>

      <p>Thank you for your kind words! We are thrilled to hear that our team at Hunting Coder provided you with an excellent service experience. Your feedback is greatly appreciated, and we will continue to strive for excellence in serving our clients.</p>
      
      <p>Best regards,</p>
      <p>Hunting Coder</p>
      </div>`
    })
    return new Response({ success: "Feedback sent successfull" })
  } catch (error) {
    return new Response(JSON.stringify({ success: false }))
  }
}