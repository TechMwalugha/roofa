import  nodeMailer from 'nodemailer'
interface Props {
    email: string
    subject: string
    heading: string
    content: string
}

const sendEmail = async ({email, subject, heading, content}: Props) =>{
    try {
        const transporter = nodeMailer.createTransport({
            // host: Number(process.env.HOST) || 0,
            // service: process.env.SERVICE,
            // post: Number(process.env.EMAIL_PORT),
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth:{
                user: process.env.USER,
                pass: process.env.PASS
            }
        })

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            html: `<div style="display: flex; align-items: center; justify-content: center; padding: 10px;">
                   <div>
                   <h1>${heading}</h1>
                    <p>${content}</p><br>
                    </div>
                   </div>`
        })
        console.log('email sent')

    } catch (error) {
        console.log("Email not sent")
        console.log(error)
    }
}

export default sendEmail
