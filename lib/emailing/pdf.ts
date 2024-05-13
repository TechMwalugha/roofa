import puppeteer from 'puppeteer'
import { formatDateString } from '../utils';
import sendEmail from './nodemailer.email';
import { readFileSync } from 'fs';


export default async function generatePdf({
    receiptNo,
    date,
    name,
    email,
    identityNumber,
    gender,
    reportingDate,
    apartmentName,
    apartmentLocation,
    apartmentPrice,
    mpesaReciptNumber,
    transactionDate,
    mpesaPhoneNumber,
    amountPaid,
}: {
    receiptNo: string;
    date: Date;
    name: string;
    email: string;
    identityNumber: string;
    gender: string;
    reportingDate: Date;
    apartmentName: string;
    apartmentLocation: string;
    apartmentPrice: number;
    mpesaReciptNumber: string;
    transactionDate: Date;
    mpesaPhoneNumber: string;
    amountPaid: number;
}) {
 try {
    const newReceiptNumber = 'Roof-' + receiptNo.slice(6, 13)

    const browser = await puppeteer.launch({ headless: true})
    const page = await browser.newPage()
    await page.setContent(`<html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  <style>
  body {
    padding: 1rem;
  }
      h1 {
          font-size: 1.2rem;
          margin-bottom: 0;
      }
      h2{
          font-size: 1rem;
      }
      h1, h2, p {
          margin: 0;
          margin-bottom: .3rem;
      }
      .logo {
          display: flex;
          align-items: center;
          justify-content: center;
      }
      .logo img {
          width: 80px;
          height: 80px;
      }
  
      header {
          display: flex;
          justify-content: space-between;
      }
  
      .client-details, .apartment-booked{
          margin-top: 1rem;
          background-color: rgba(0, 0, 0, 0.1);
          padding: .5em;
          border-radius: 5px;
      }
      .client-details h2, .apartment-booked h2 {
          text-align: center;
          margin-bottom: 1rem;
      }
      .client-details .item, .apartment-booked .item{
          display: flex;
          justify-content: space-between;
          margin-bottom: .5rem;
      }
      table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
      margin-top: 1rem;
      }
  
      td, th {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
      }
  
      tr:nth-child(even) {
      background-color: #dddddd;
      }
  
      .payment-details {
          display: flex;
          margin-top: 1rem;
          font-weight: bold;
      }
  </style>
  <body>
      <div class="logo">
      <img src="data:image/jpeg;base64,${
        readFileSync('public/assets/roofalogo.png').toString('base64')
      }" alt="alt text" />
      </div>
      <header>
          <div>
              <h1>Roofa Housing PLC</h1>
              <p>Nakuru, kenya</p>
              <p>info@roofa.co.ke</p>
          </div>
          <div>
              <h1>Payment Receipt</h1>
              <p>Receipt No: ${newReceiptNumber}</p>
              <p>Date: ${formatDateString(date as unknown as string)}</p>
          </div>
      </header>
  
      <hr />
  
      <main>
          <div class="client-details">
              <h2>Client Details</h2>
              <div class="item">
                  <b>Name</b>
                  <p>${name}</p>
              </div>
              <div class="item">
                  <b>Email</b>
                  <p>${email}</p>
              </div>
              <div class="item">
                  <b>Identity Number</b>
                  <p>${identityNumber}</p>
              </div>
              <div class="item">
                  <b>Gender</b>
                  <p>${gender}</p>
              </div>
              <div class="item">
                  <b>Reporting Date</b>
                  <p>${formatDateString(reportingDate as unknown as string)}</p>
              </div>
              <p style="font-size: 12px; text-align: center;">kindly report within the specified date. incase of anything kindly reach us</p>
          </div>
  
          <div class="apartment-booked">
              <h2>Apartment Booked</h2>
              <div class="item">
                  <b>Name</b>
                  <p>${apartmentName}</p>
              </div>
  
              <div class="item">
                  <b>Location</b>
                  <p>${apartmentLocation}</p>
              </div>
  
              <div class="item">
                  <b>Price</b>
                  <p>Ksh. ${apartmentPrice}</p>
              </div>
          </div>
  
          <table>
              <tr>
                <th>Description</th>
                <th>Total</th>
              </tr>
              <tr>
                <td>Mpesa Receipt Number</td>
                <td>${mpesaReciptNumber}</td>
              </tr>
              <tr>
                <td>Transaction Date</td>
                <td>${formatDateString(transactionDate as unknown as string)}</td>
              </tr>
              <tr>
                <td>Mpesa Phone Number</td>
                <td>${mpesaPhoneNumber}</td>
              </tr>
            </table>
  
            <div class="payment-details">
                  <h2 style="text-align: center;">Payment Details:</h2>
                  <hr>
                  <p>Amount Paid: Ksh. ${amountPaid}</p>
                  <hr>
                  <p>Payment Method: Mpesa</p>
            </div>
  
            <footer style="margin-top: 1rem; text-align: center;">
              <div>
  
              </div>
                  <p>Thank you for choosing Roofa Housing PLC</p>
            </footer>
      </main>
  
  </body>
  </html>`, { waitUntil: 'domcontentloaded' })
  
    const pdfBuffer = await page.pdf({ 
      format: 'A4',
      path: `public/receipts/Roof-${receiptNo}.pdf`,
      printBackground: true,
    })

    //send email
    await sendEmail({
        email: email, 
        subject: 'Payment Receipt', 
        heading: `${apartmentName} booked succesfully`, 
        content: `Dear ${name}, <br />

        We hope this email finds you well and excited for booking with Roofa!
        
        First and foremost, we want to extend our warmest congratulations on successfully booking your desired accommodation through our platform. We are thrilled to have helped you secure an apartment and are committed to ensuring your stay is comfortable and memorable.
        
        As your check-in date approaches, we kindly want to remind you of a few important details to ensure a smooth and hassle-free experience:
        
        Bring Matching Credentials: Please remember to carry identification credentials that match the information provided during the booking process. This typically includes your ID card or passport, as well as any additional documentation such as the M-Pesa message if applicable. Ensuring your credentials match the details on your receipt will help expedite the check-in process.
        
        Check-In Date: Please ensure you arrive at the specified accommodation on the designated check-in date as indicated in your booking confirmation. This helps us coordinate your arrival efficiently and ensures that your accommodation is ready for you to settle in comfortably.
        
        If you have any questions or require further assistance before your arrival, please do not hesitate to reach out to our customer support team. We are here to help make your stay as enjoyable as possible.
        
        Once again, congratulations on securing your booking with Roofa. We look forward to hosting you and providing you with a memorable experience. <br />

        Find the attached booking receipt below, please present this while checking in. <br />
        <br />
        Warm regards,<br />
        
        Roofa Bookings <br />
        Roofa Customer Support Team`, 
        pdfFilePath: `public/receipts/Roof-${receiptNo}.pdf`
    })
 } catch (error: any) {
    console.log(error.message)
 }
}