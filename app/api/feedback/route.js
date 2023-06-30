import transporter from '@/config/gmail'

const { ADMIN_EMAIL } = process.env

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
    return new Response({success: "Feedback sent successfull"})
  } catch (error) {
    return new Response(JSON.stringify({success: false}))
  }
}