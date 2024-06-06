'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BsFillPrinterFill } from "react-icons/bs";

const page = () => {
  return (
    <div className="sm:px-10 px-4 text-[13px]">
      <h1 className="text-heading1-bold text-center mt-4">Roofa Privacy Notice</h1>

      <span className="text-slate-700 my-3">Updated June 10, 2024</span>

      <Button
      className="block my-4"
      onClick={() => window.print()}
      >
        <BsFillPrinterFill size={26} />
      </Button>

      <div>
        <h2 className="text-heading3-bold">Table of Contents</h2>

        <ul>
            <li className="mb-2 text-blue">
                <Link href='#about-this-notice'>1. About this Notice</Link>
            </li>
            <li className="mb-2 text-blue">
                <Link href='#who-we-are'>2. Who we are</Link>
            </li>
            <li className="mb-2 text-blue">
                <Link href='#data-we-collect'>3. The data we collect about you?</Link>
            </li>
            <li className="mb-2 text-blue">
                <Link href='#cookies'>4. Cookies and other Identifiers</Link>
            </li>
            <li className="mb-2 text-blue">
                <Link href='#how-we-use'>5. How We Use Your Personal Data:</Link>
            </li>
            <li className="mb-2 text-blue">
                <Link href='#legal-basis'>6. Legal basis for the processing of Personal Data :</Link>
            </li>
            <li className="mb-2 text-blue">
                <Link href='#how-we-share'>7. How We Share Your Personal Data</Link>
            </li>
            <li className="mb-2 text-blue">
                <Link href='#international-transfers'>8. International Transfers</Link>
            </li>
            <li className="mb-2 text-blue">
                <Link href='#data-retention'>9. Data Retention</Link>
            </li>
            <li className="mb-2 text-blue">
                <Link href='#data-security'>10. Data Security</Link>
            </li>
            <li className="mb-2 text-blue">
                <Link href='#legal-rights'>11. Your Legal Rights</Link>
            </li>
            <li className="mb-2 text-blue">
                <Link href='#data-controllers'>12. Data Controllers & Contact</Link>
            </li>
            <li className="mb-2 text-blue">
                <Link href='#related-information'>13. Related Practices and Information</Link>
            </li>
            <li className="mb-2 ml-3 text-blue">
                <Link href='#related-information'>Home</Link>
            </li>
        </ul>
      </div>

      <section className="mb-4" id="about-this-notice">
      <h4 className="text-body-semibold my-3">1.  About this Notice</h4>

      <p className="text-[13px]">This Privacy Notice provides information on how Roofa.co.ke collects and processes your personal data when you visit our website or mobile applications. It sets out what we do with your personal data and how we keep it secure and explains the rights that you have in relation to your personal data</p>
      </section>

    <section className="mb-4" id="who-we-are">
        <h4 className="text-body-semibold my-3">2. Who we are</h4>
        <p className="text-[13px]"> Roofa.co.ke is an online booking platform for rentals and Airbnbs. We facilitate the connection between renters and property owners. Roofa.co.ke is operated by Roofah Housing, a member of the Roofah Housing PLC group of companies. Upon successful booking, we connect users with property owners or Airbnb hosts. Additionally, we update the occupancy status of apartments every week to ensure accurate availability information.</p>
    </section>

    <section className="mb-4" id="data-we-collect">
        <h4 className="text-body-semibold my-3">3. The data we collect about you?</h4>
        <p className="text-[13px]">Personal data means any information that can be used to identify directly or indirectly a specific individual. We collect your personal data in order to provide tailored rentals, Airbnbs and services and in order to analyse and continually improve our services. We may collect, use, store and transfer different kinds of personal data for marketing and personal data optimization purposes. Roofa.co.ke also uses Google Digital Marketing to propose targeted offers for certain products and services to our customers.</p>
        <br/>
        <p className="text-[13px]">You provide us with your personal data when you register your personal details on our website and mobile platforms or when you make a booking with our website and transact with the same.</p>
        <br/>
        <p className="text-[13px]">The personal data we collect includes:</p>
        <br/>
        <p className="text-[13px]">A. Information you provide to us: We receive and store the information you provide to us including your identity data, contact data, biometric data, address and financial data. These types of personal data may include:</p>
        <br/>
        <ul className="list-disc">
            <li>contact details (such as your name, ID number, phone numbers and email addresses),</li>
            <li>demographic information (such as your date of birth, age or age range and gender),</li>
            <li>online registration information (such as your password and other authentication information),</li>
            <li>payment information (such as your credit card information, Mpesa information and billing address),</li>
            <li>information provided as part of online questionnaires (such as responses to any customer satisfaction surveys or market research),</li>
            <li>competition entries/submissions, and</li>
            <li>in certain cases your marketing preferences.</li>
        </ul>

        <p>B. Information we automatically collect/generate or obtain from third parties: collect and store certain types of information regarding your use of the Roofa.co.ke including information about your searches, views, downloads and purchases. In addition, we may receive information about you from third parties including our carriers; payment service providers; merchants/brands; and advertising service providers.</p>
        <br/>
        <p>These types of personal data may relate to your device (such as your PC, tablet or other mobile device), your use of our websites and apps (as well as certain third party websites with whom we have partnered), and/or your personal preferences, interests, or geographic location. Examples of these types of information include:</p>
        <br/>

        <ul className="list-disc">
            <li>name and age (or predicted age range),</li>
            <li>information about your device, operating system, browser and IP address,</li>
            <li>unique identifiers associated with your device,</li>
            <li>details of web pages that you have visited,</li>
            <li>which products you have looked at online (including information about products you have searched for or viewed, purchased or added to an online shopping basket),</li>
            <li>how long you spend on certain areas of a website or app together with the date and time of your visit/usage,</li>
            <li>personal data contained within user-generated content (such as blogs and social media postings),</li>
            <li>social media user name or ID, and</li>
            <li>social media profile photo and other social media profile information (such as number of followers).</li>
        </ul>

        <p>We strive to provide you with choices regarding the Personal Data that you provide to us. Where required by law, if you wish to have your Personal Data used by Roofa.co.ke to provide you with a personalized experience/targeted advertising & content, you can indicate so through the relevant tick-box(es) located on the registration form or by answering the question(s) presented by Roofa.co.ke representatives. If you decide that you no longer wish to benefit from this personalization, you can opt-out or adjust your preferences at any time by closing your account or by sending an email to accounts@roofa.co.ke You can close your account by clicking on this link and following the instructions. Once your account is closed, all products and services that you access through your account will no longer be available.</p>
    </section>

    <section className="mb-4" id="cookies">
        <h4 className="text-body-semibold my-3">4. Cookies and other Identifiers</h4>
        <p className="text-[13px]">A cookie is a small file of letters and numbers that we put on your computer, mobile phone or tablet if you agree. Cookies allow us to distinguish you from other users of our website and mobile applications, which helps us to provide you with an enhanced browsing experience. For more information about cookies and how we use them, please read our Cookie Notice:</p>
    </section>

    <section className="mb-4" id="how-we-use">
        <h4 className="text-body-semibold my-3">5. How We Use Your Personal Data:</h4>
        <p className="text-[13px]">We use your personal data to operate, provide, develop and improve the services that we offer, including the following:</p>
        <br/>
        <ul>
            <li><b>A</b> Registering you as a new user.</li>
            <li><b>B</b> Processing and delivering your bookings.</li>
            <li><b>C</b> Managing your relationship with us.</li>
            <li><b>D</b> Enabling you to participate in promotions, competitions and surveys.</li>
            <li><b>E</b> Improving our website, applications, products and services.</li>
            <li><b>F</b> Recommending/advertising products or services which may be of interest to you.</li>
            <li><b>G</b> Enabling you to access certain products and services offered by our partners and vendors.</li>
            <li><b>H</b> Complying with our legal obligations, including verifying your identity where necessary.</li>
            <li><b>I</b> Detecting fraud.</li>
        </ul>
    </section>

    <section className="mb-4" id="legal-basis">
        <h4 className="text-body-semibold my-3">6. Legal basis for the processing of Personal Data :</h4>
        <p className="text-[13px]">We will only process your personal data where we have a legal basis to do so. The legal basis will depend on the purposes for which we have collected and used your personal data. In almost every case the legal basis will be one of the following:</p>
        <br/>
        <ul>
            <li><b>A. Performance of a contract:</b> the processing is necessary to perform our obligations under a contract with you or take steps at your request before entering into a contract.</li>
            <li><b>B. Legal obligation: </b> the processing is necessary for compliance with a legal obligation.</li>
            <li><b>C. Consent:</b> you have given your consent to the processing (where consent is required).</li>
            <li><b>D. Legitimate interests:</b> the processing is necessary for the purposes of the legitimate interests pursued by us or by a third party.</li>
        </ul>
    </section>

    <section className="mb-4" id="how-we-share">
        <h4 className="text-body-semibold my-3">7. How We Share Your Personal Data</h4>
        <p className="text-[13px]"><b>A. </b> We may need to share your personal data with third parties for the following purposes:</p>
        <br/>

        <ul className="list-disc">
            <li>Sale of products and services: In order to deliver services purchased on our platform from third parties, we may be required to provide your personal data to such third parties.</li>
            <li>Working with third party service providers: We engage third parties to perform certain functions on our behalf. Examples include fulfilling bookings for rentals or Airbnbs, analyzing data, providing marketing assistance, processing payments, transmitting content, assessing and managing credit risk, and providing customer service.</li>
            <li>Business transfers: As we continue to develop our business, we might sell or buy other businesses or services. In such transactions, customer information may be transferred together with other business assets.</li>
            <li>Detecting fraud and abuse: We release account and other personal data to other companies and organizations for fraud protection and credit risk reduction, and to comply with applicable law</li>
        </ul>

        <br/>

        <p className="text-[13px]"><b>B. </b>  When we share your personal data with third parties we:</p>
        <br/>
        <ul>
            <li>require them to agree to use your data in accordance with the terms of this Privacy Notice, our Privacy Policy and in accordance with applicable law; and</li>
            <li>only permit them to process your personal data for specified purposes and in accordance with our instructions. We do not allow our third-party service providers to use your personal data for their own purposes.</li>
        </ul>
    </section>

    <section className="mb-4" id="international-transfers">
        <h4 className="text-body-semibold my-3">8. International Transfers</h4>
        <p className="text-[13px]">We may transfer your personal data to locations in another country, if this is permissible pursuant to applicable laws in your location. There are inherent risks in such transfers.

        In the event of international transfers of your personal data, we shall put in place measures necessary to protect your data and ensure the same level of protection available in the country of data origin. We shall continue to respect your legal rights pursuant to the terms of this Privacy Notice and applicable laws in your location.
        </p>
    </section>

    <section className="mb-4" id="data-retention">
        <h4 className="text-body-semibold my-3">9. Data Retention</h4>
        <p className="text-[13px]">We will take every reasonable step to ensure that your personal data is processed for the minimum period necessary for the purposes set out in this Privacy Notice. Your Personal Data may be retained in a form that allows for identification only for as long as:</p>
        <br/>
        <ul>
            <li>A. the purposes for which the Personal Data was collected are no longer relevant, or</li>
            <li>B. you have withdrawn your consent (where consent was the legal basis for processing), or</li>
            <li>C. following a successful erasure request.</li>
            <li>D. The duration of: (i) any applicable limitation period (i.e., any period during which a person could bring a legal claim against us), and

            We will actively review the personal data we hold and delete it securely, or in some cases anonymise it, when there is no longer a legal, business or consumer need for it to be retained.
            </li>
        </ul>
    </section>

    <section className="mb-4" id="data-security">
        <h4 className="text-body-semibold my-3">10. Data Security</h4>
        <p className="text-[13px]">We have put in place security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality. We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.</p>
    </section>

    <section className="mb-4" id="legal-rights">
        <h4 className="text-body-semibold my-3">11. Your Legal Rights</h4>
        <p className="text-[13px]">A.  It is important that the personal data we hold about you is accurate and current. Please keep us informed if your personal data changes during your relationship with us.</p>
        <br/>
        <p>B. Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to access, correct or erase your personal data, object to or restrict processing of your personal data, right to ask that we transfer your personal data to a third party, and unsubscribe from our emails and newsletters.</p>
        <br/>
        <p>C. Where you wish to permanently delete your data from our website and other applications, you can choose the option of closing your account. You can close your account by clicking on this link and following the instructions. Once your account is closed, all products and services that you access through your account will no longer be available.</p>
        <br/>
        <p>D. We can refuse to accede to your request where it is unreasonable or where you have failed to provide additional information necessary to confirm your identity.</p>
    </section>

    <section className="mb-4" id="data-controllers">
        <h4 className="text-body-semibold my-3">12. Data Controllers & Contact</h4>
        <p className="text-[13px]">If you have any questions or concerns about Roofa.co.ke Privacy Notice or you are looking for more information on how we process your personal data, or wish to exercise your legal rights in respect of your personal data, please contact the Data Privacy Officer by email at info@roofa.co.ke</p>
        <br/>
        <p>We will investigate any complaint about the way we manage Personal Data and ensure that we respond to all substantiated complaints within prescribed timelines.</p>
    </section>

    <section className="mb-4" id="related-information">
        <h4 className="text-body-semibold my-3">13. Related Practices and Information</h4>
        <Link
        href='/docs/terms'
        className="hover:text-blue transition-all"
        >
            Terms & Conditions
        </Link>
    </section>
    </div>
  )
}

export default page
