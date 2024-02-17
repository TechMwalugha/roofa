import  nodeMailer from 'nodemailer'
interface Props {
    email: string
    subject: string
    heading: string
    content: string
    pdfFilePath: string
}

const sendEmail = async ({email, subject, heading, content, pdfFilePath}: Props) =>{
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

        const mailOptions: nodeMailer.SendMailOptions = {
            from: process.env.USER,
            to: email,
            subject: subject,
            html: `<div style="display: flex; align-items: center; justify-content: center; padding: 10px;">
                   <div>
                   <h1>${heading}</h1>
                    <p>${content}</p><br>
                    </div>
                   </div>`,
        }

        //conditionally add the attachment if pdfFilePath exists

        if (pdfFilePath) {
            mailOptions.attachments = [{
                filename: 'your-pdf-file-name.pdf',
                path: pdfFilePath // Path to the PDF file
            }];
        }

        await transporter.sendMail(mailOptions);
        console.log('email sent')

    } catch (error) {
        console.log("Email not sent")
        console.log(error)
    }
}

export default sendEmail
