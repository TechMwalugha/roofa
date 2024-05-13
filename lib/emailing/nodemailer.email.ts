import  nodeMailer from 'nodemailer'
interface Props {
    email: string
    subject: string
    heading: string
    content: string
    pdfFilePath: string | null
}

const sendEmail = async ({email, subject, heading, content, pdfFilePath}: Props) =>{
    try {
        const transporter = nodeMailer.createTransport({
            // host: Number(process.env.HOST) || 0,
            // service: process.env.SERVICE,
            // post: Number(process.env.EMAIL_PORT),
            host: 'smtp.zoho.com',
            port: 465,
            secure: true, // use SSL
            auth:{
                user: process.env.USER,
                pass: process.env.PASS
            },
        })

        const mailOptions: nodeMailer.SendMailOptions = {
            from: process.env.USER,
            to: email,
            subject: subject,
            html: `<!-- Complete Email template -->

            <body style="background-color:grey"> 
                <table align="center" border="0" cellpadding="0" cellspacing="0"
                    width="550" bgcolor="white" style="border:2px solid black"> 
                    <tbody> 
                        <tr> 
                            <td align="center"> 
                                <table align="center" border="0" cellpadding="0"
                                    cellspacing="0" class="col-550" width="550"> 
                                    <tbody> 
                                        <tr> 
                                            <td align="center" style="background-color: #67C1CA; 
                                                    height: 50px; width: 100%"> 
            
                                                <a href="#" style="text-decoration: none;"> 
                                                    <p style="color:white; 
                                                            font-weight:bold;"> 
                                                        Roofa 
                                                    </p> 
                                                </a> 
                                            </td> 
                                        </tr> 
                                    </tbody> 
                                </table> 
                            </td> 
                        </tr> 
                        <tr style="height: 300px;"> 
                            <td align="center" style="border: none; 
                                    border-bottom: 2px solid #4cb96b; 
                                    padding-right: 20px;padding-left:20px"> 
            
                                <p style="font-weight: bolder;font-size: 42px; 
                                        letter-spacing: 0.025em; 
                                        color:black;"> 
                                    ${heading} 
                                </p> 
                            </td> 
                        </tr> 
            
                        <tr style="display: inline-block;"> 
                            <td style="height: 150px; 
                                    padding: 20px; 
                                    border: none; 
                                    border-bottom: 2px solid #67C1CA; 
                                    background-color: white;"> 
                                 
                                <p class="data"
                                style="text-align: justify-all; 
                                        align-items: center; 
                                        font-size: 15px; 
                                        padding-bottom: 12px;"> 
                                   ${content}
                                </p> 
                                <p> 
                                    <a href= 
            "https://www.roofa.co.ke/"
                                    style="text-decoration: none; 
                                            color:black; 
                                            border: 2px solid #67C1CA; 
                                            padding: 10px 30px; 
                                            font-weight: bold;"> 
                                    Read More 
                                </a> 
                                </p> 
                            </td> 
                        </tr> 
                        <tr style="border: none; 
                        background-color: #67C1CA; 
                        height: 40px; 
                        color:white; 
                        padding-bottom: 20px; 
                        text-align: center;"> 
                            
            <td height="40px" align="center"> 
                <p style="color:white; 
                line-height: 1.5em;"> 
                Roofa Housing 
                </p> 
                <a href="#"
                style="border:none; 
                    text-decoration: none; 
                    padding: 5px;"> 
                        
                <img height="30"
                src= 
            "https://extraaedgeresources.blob.core.windows.net/demo/salesdemo/EmailAttachments/icon-twitter_20190610074030.png"
                width="30" /> 
                </a> 
                
                <a href="#"
                style="border:none; 
                text-decoration: none; 
                padding: 5px;"> 
                
                <img height="30"
                src= 
            "https://extraaedgeresources.blob.core.windows.net/demo/salesdemo/EmailAttachments/icon-linkedin_20190610074015.png"
            width="30" /> 
                </a> 
                
                <a href="#"
                style="border:none; 
                text-decoration: none; 
                padding: 5px;"> 
                
                <img height="20"
                src= 
            "https://extraaedgeresources.blob.core.windows.net/demo/salesdemo/EmailAttachments/facebook-letter-logo_20190610100050.png"
                    width="24"
                    style="position: relative; 
                        padding-bottom: 5px;" /> 
                </a> 
            </td> 
            </tr> 
            <tr> 
            <td style="font-family:'Open Sans', Arial, sans-serif; 
                    font-size:11px; line-height:18px; 
                    color:#999999;" 
                valign="top"
                align="center"> 
            <a href="#"
            target="_blank"
            style="color:#999999; 
                    text-decoration:underline;">PRIVACY STATEMENT</a> 
                    | <a href="#" target="_blank"
                    style="color:#999999; text-decoration:underline;">TERMS OF SERVICE</a> 
                    | <a href="#"
                    target="_blank"
                    style="color:#999999; text-decoration:underline;">RETURNS</a><br> 
                            © 2024 ROOFAH HOUSING PLC . All Rights Reserved.<br> 
                            If you do not wish to receive any further 
                            emails from us, please 
                            <a href="#"
                            target="_blank"
                            style="text-decoration:none; 
                                    color:#999999;">unsubscribe</a> 
                        </td> 
                        </tr> 
                        </tbody></table></td> 
                    </tr> 
                    <tr> 
                    <td class="em_hide"
                    style="line-height:1px; 
                            min-width:700px; 
                            background-color:#ffffff;"> 
                        <img alt=""
                        src="images/spacer.gif"
                        style="max-height:1px; 
                        min-height:1px; 
                        display:block; 
                        width:700px; 
                        min-width:700px;" 
                        width="700"
                        border="0"
                        height="1"> 
                        </td> 
                    </tr> 
                    </tbody> 
                </table> 
            </body> 
            `,
        }

        //conditionally add the attachment if pdfFilePath exists

        if (pdfFilePath) {
            const filePath: string = pdfFilePath;
            const parts: string[] = filePath.split('/'); // Split the string by '/'
            const fileNameWithExtension: string = parts[parts.length - 1]; // Extract the last part which contains the file name with extension
            const fileNameParts: string[] = fileNameWithExtension.split('.'); // Split the file name by '.'
            const fileNameWithoutExtension: string = fileNameParts[0]; // Extract the part before the extension

            mailOptions.attachments = [{
                filename: `${fileNameWithoutExtension.slice(0, 10)}.pdf`,
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
