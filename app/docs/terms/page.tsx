'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link"
import { BsFillPrinterFill } from "react-icons/bs";

const page = () => {
  return (
    <div className="sm:px-10 px-4 tracking-wider leading-8">
      <h1 className="text-heading1-bold text-center mt-4">Customer terms of service</h1>

      <span className="text-slate-700 mt-3">Updated June 10, 2024</span>

      <Button
      className="block"
      onClick={() => window.print()}
      >
        <BsFillPrinterFill size={26} /> Print
      </Button>
      <h3 className="text-heading3-bold my-5">Summary of these Terms</h3>

      <p className="tracking-wider leading-8">Along with the Terms on this page, there are two other documents that form part of our contract with you:</p>
<ul className="list-disc tracking-wider leading-8">
  <li>Our <Link href="/docs/how-we-work" className="text-blue"> How we Work </Link>  page helps you to use our Platform and understand our reviews, our rankings, our recommendations, how we make money, and more.</li>
  <li>Our <Link href="/docs/aboutus" className="text-blue"> Content Standards and Guidelines </Link>  help us to keep everything on our Platform relevant to and appropriate for our global audience, without limiting freedom of expression. They tell you how we manage content and take action against anything inappropriate.</li>
</ul>

<p className="tracking-wider leading-8">
  <br/>
By agreeing to our Terms, you’re agreeing to everything in all three documents. If you don’t accept any of these Terms, please do not use our Platform. 
<br/>

All this information is important because it (along with your booking confirmation email and any pre-contractual information provided before you book) sets out the legal terms on which Service Providers offer their Travel Experiences through our Platform. 
<br/>

If something goes wrong with your Travel Experience, <Link href="/docs/aboutus#something-goes-wrong" className="text-blue"> Section A11 of these Terms </Link> explains what you can do about it. This includes making a complaint to us, going to court, and (in some cases) using an online dispute resolution service. <br/>

If you want to appeal a moderation decision, or report any content on our Platform, our <Link href="/docs/privacy" className="text-blue"> Content Standards and Guidelines </Link> explain how to do so and how we manage these requests. <br/>

This summary isn’t part of our Terms, or a legal document. It’s just a simple explanation of our Terms. We encourage you to read each document in full. Some of the words in this summary have very specific meanings, so check out the <Link href="/d/aboutus#dictionary" className="text-blue"> "roofa.co.ke. dictionary" </Link> at the end of these Terms.
    </p>
    <br/><br/>

        {/* Table of contents */}
    <h2 className="text-heading3-bold my-5">Table of Contents</h2>

    <ul>
      <li><a className="text-blue" href="#all">A. All Roofa Experiences</a></li>
      <li><a className="text-blue" href="#dictionary">roofa.co.ke dictionary</a></li>
      <li><a className="text-blue" href="/">Home</a></li>
    </ul>
    
    <ul>
    <h2 className="text-heading3-bold my-5" id="all" >A. All Roofa Experiences</h2>
    <li><a className="text-blue" href="#definitions">A1. Definitions</a></li>
    <li><a className="text-blue" href="#about-terms">A2. About these terms</a></li>
    <li><a className="text-blue" href="#about-roofa">A3. About Roofa.co.ke</a></li>
    <li><a className="text-blue" href="#our-platform">A4. Our Platform</a></li>
    <li><a className="text-blue" href="#our-values">A5. Our values</a></li>
    <li><a className="text-blue" href="#our-prices">A6. Prices</a></li>
    <li><a className="text-blue" href="#payment">A7. Payment</a></li>
    <li><a className="text-blue" href="#policies">A8. Policies</a></li>
    <li><a className="text-blue" href="#accessibility-requests">A9. Accessibility requests</a></li>
    <li><a className="text-blue" href="#intellectual">A10. Intellectual property rights</a></li>
    <li><a className="text-blue" href="#something-goes-wrong">A11. What if something goes wrong?</a></li>
    <li><a className="text-blue" href="#communication-with-the-service-provider">A12. Communication with the Service Provider</a></li>
    <li><a className="text-blue" href="#measures">A13. Measures against unacceptable behavior</a></li>
    <li><a className="text-blue" href="#limitation-of-liability">A14. Limitation of liability</a></li>
    <li><a className="text-blue" href="#modification-clause">A15. Modification clause</a></li>
    </ul>

    <section className="mb-4" id="definitions">
      <h4 className="text-body-semibold my-3">A1. Definitions</h4>

      <p className="tracking-wider leading-8">1. Some of the words you’ll see have very specific meanings, so check out the <a className="text-blue" href="/">"roofa.co.ke dictionary"</a> at the end of these Terms.</p>
    </section>

    <section className="mb-4" id="about-terms">
      <h4 className="text-body-semibold my-3">A2. About these terms</h4>

      <p className="tracking-wider leading-8">
      1. When you complete your Booking or register an a account, you accept these Terms and any other ones that you’re provided with during the booking process. <br/>

      2. If any authority decides that some of these terms are unlawful, the rest of the terms will continue to apply.<br/>
        
      3. These Terms are laid out like this:<br/>
      </p>
      <ul className="list-disc">
        <li>Section A: General terms for all types of Travel Experiences.</li>
        <li>If there’s any discrepancy between general and specific terms, the specific terms will apply.</li>
      </ul>
      
      4. The English version of these Terms is the original. If there’s any dispute about the Terms, or any mismatch between the Terms in English and in another language, the Terms as they appear in English will apply, unless local law requires otherwise. (You can change the language at the top of this page.)
    </section>
    
    <section id="about-roofa">
      <h4 className="text-body-semibold my-3">A3. About Roofa.co.ke</h4>

      1. When you book an accommodation, rental, or Airbnb, Roofa.co.ke provides and is responsible for the Platform, but not the Travel, accommodation or Airbnb Experience itself (see A4.4 below). <br/>

      2. We work with companies that provide local support services (e.g. Customer Support or account management). They don’t: <br/>

     <ul className="list-disc">
      <li>control or manage our Platform</li>
      <li>have their own Platform</li>
      <li>have any legal or contractual relationship with you</li>
      <li>provide Travel or Relocation Experiences</li>
      <li>represent us, or enter into contracts or accept legal documents in our name</li>
      <li>operate as our “process or service agents.”</li>

     </ul>

    </section>

    <section id="our-platform">
    <h4 className="text-body-semibold my-3">A4. Our Platform</h4>
        1. We get information from Service Providers, and we can’t guarantee that everything is accurate—but when providing our Platform, we take reasonable care and act with professional diligence. Unless we’ve failed to do so, or have been negligent, we can’t be held responsible for any errors, interruptions, or missing bits of information. Of course, we’ll do everything we can to correct/fix them as soon as we become aware of them.<br/>

        2. We’re always working to improve our customers’ experience with Roofa.co.ke So sometimes, we show different people different designs, phrasings, products, etc. to find out how they react. As a result, you might not come across some services or conditions when you visit our Platform.<br/>

        3. Our Platform is not a recommendation or endorsement of any Service Provider or its products, services, facilities, rentals, etc.<br/>

        4. We’re not a party to the terms between you and the Service Provider. The Service Provider is solely responsible for the accomodation Experience.<br/>

        5. To make a Booking, you may need to create an Account but not a <b>MUST</b>. Make sure all your info (including payment and contact details) is correct and up to date, or you might not be able to access your Booking Experience(s). You’re responsible for anything that happens with your Account, so don’t let anyone else use it and keep your username and password secret.<br/>

        6. We’ll show you the offers that are available to you, in (what we think is) the right language for you. You can change to another language whenever you like.<br/>

        7. Unless otherwise indicated, you need to be at least 18 to use the Platform.<br/>
    </section>

    <section id="our-values">
    <h4 className="text-body-semibold my-3">A5. Our values</h4>
      1. You will: <br/>

    <ul className="list-disc">
      <li>abide by Our values</li>
      <li>comply with all applicable laws</li>
      <li>cooperate with any anti-fraud/anti-money laundering checks we need to carry out</li>
      <li>not use the Platform to cause a nuisance or make fake Bookings</li>
      <li>use the Booking Experience and/or Platform for their intended purpose</li>
      <li>not cause any nuisance or damage, and not behave inappropriately to the Service Provider’s personnel (or anyone else, for that matter).</li>

    </ul>
    </section>

    <section id="our-prices">
    <h4 className="text-body-semibold my-3">A6. Prices</h4>
    
      1. When you make a Booking, you agree to pay the cost of the Booking Experience for a rental its (rent + service fee), for Airbnb its (cost of Airbnb per night + service fee) including any taxes and charges that may apply.<br/>

      2. Some of the prices you see may have been rounded to the nearest whole number. The price you pay will be based on the original, “non-rounded” price (although the actual difference will be tiny anyway).<br/>

      3. Obvious errors and obvious misprints are not binding. For example, if you book a rental or a night in a luxury suite that was mistakenly offered for Ksh.100, your booking may be canceled and we’ll refund anything you’ve paid.<br/>

      4. A crossed-out price indicates the price of a like-for-like Booking without the price reduction applied (“like-for-like” means same dates, same policies, same quality of accommodation, etc.).<br/>
    </section>

    <section id="payment">
      <h4 className="text-body-semibold my-3">A7. Payment</h4>
      1. Upfront Payment: To secure your booking for certain rentals/Airbnb or other services, the Service Provider requires an Upfront Payment, which includes the rent price or Airbnb price per night and any applicable service fees. Upon booking, the payment will be processed within 3 hours. Once processed, you will receive a confirmation email or call verifying the completion of your booking.<br/>

      2. Payment Management: If we manage your payment, either directly or through our affiliate, we will ensure the completion of your transaction with the Service Provider. Your payment constitutes final settlement of the due and payable price.<br/>

      3. Payment Terms: The Upfront Payment policy of the Service Provider will be communicated to you during the booking process. This policy may include non-refundable deposits or pre-authorized charges. We do not influence or hold responsibility for the Service Provider's Upfront Payment policy.<br/>

      4. Currency Conversion: If your payment method uses a currency different from the payment currency, additional fees may be charged by your bank or payment method provider. We will inform you of any such fees during the booking process.<br/>

      <b>Note: </b> we do not take rental "deposit" you will pay that when checking in to the apartment.
    </section>

    <section id="policies">
    <h4 className="text-body-semibold my-3">A8. Policies</h4>
    1. When you make a Booking, you accept the applicable policies as displayed in the booking process. You’ll find each Service Provider’s cancellation policy and any other policies (about age requirements, security/damage deposits, additional supplements for group Bookings, extra beds, breakfast, pets, cards accepted, etc.) on our Platform: on the Service Provider information pages, during the booking process, in the fine print, and in the confirmation email or ticket (if applicable). <br/>

    2. If you cancel a Booking or don’t show up, any cancellation/no-show fee or refund will depend on the Service Provider’s cancellation/no-show policy.<br/>

    3. Some Bookings can’t be canceled for free, while others can only be canceled for free before a deadline.<br/>

    4. If you book a Travel Experience by paying in advance (including all price components and/or a damage deposit if applicable), the Service Provider may cancel the Booking without notice if they can’t collect the balance on the date specified. If they do cancel, any non-refundable payment you’ve made will only be refunded at their discretion. It’s your responsibility to make sure the payment goes through on time, that your Mpesa, bank, debit card, or credit card details are correct, and that there’s enough money available in your account.<br/>

    5. If you think you’re not going to arrive on time, contact your Service Provider and tell them when they can expect you. It’s your responsibility to ensure you’re on time—and if you aren’t, we are not responsible for any associated costs (e.g. the cancellation of your Booking, or any fees the Service Provider may charge).<br/>

    6. As the person making the Booking, you are responsible for the actions and behavior (in relation to the Travel Experience) of everyone in the group. You’re also responsible for obtaining their permission before providing us with their personal data.<br/>
    </section>

    <section id="accessibility-requests">
    <h4 className="text-body-semibold my-3">A9. Accessibility requests</h4>
      1. If you have any accessibility requests:<br/>

    <ul className="list-disc">
      <li>about our Platform and/or services, contact our Customer Service team</li>
      <li>about your Travel Experience (rentals, Airbnbs, etc.), contact your Service Provider or the owners of these apartments, etc.</li>
    </ul>
    </section>

    <section id="intellectual">
    <h4 className="text-body-semibold my-3">A10. Intellectual property rights</h4>
      1. Unless otherwise stated, all rights in our Platform (technology, content, trademarks, look and feel, etc.) are owned by Roofa.co.ke (or its licensors), and by using our Platform you agree to do so for its intended purpose only and respecting the requirements set out below in paragraphs A14.2 and A14.3.<br/>

      2. You’re not allowed to monitor, copy, scrape/crawl, download, reproduce, or otherwise use anything on our Platform for any commercial purpose without written permission of Roofa.co.ke or its licensors.<br/>

      3. We keep a close eye on every visit to our Platform, and we’ll block anyone (and any automated system) we suspect of:<br/>

      <ul className="list-disc">
        <li>violating these Terms</li>
        <li>trying to access areas of our Platform that they’re not allowed to</li>
        <li>using our Platform in a way that could damage it or the information on it</li>
        <li>trying to access our systems in a way that could interfere with their normal operation</li>
      </ul>
      4. By uploading a review/picture to our Platform, you’re confirming that it meets our Content Standards and Guidelines and that:<br/>

      <ul className="list-disc">
        <li>it’s truthful (e.g. you haven’t altered the picture or uploaded one of a different property)</li>
        <li>it doesn’t contain any viruses</li>
        <li>you’re allowed to share it with us</li>
        <li>you own (or are allowed to use) any intellectual property rights that it contains</li>
        <li>we’re allowed to use it on our Platform and for any other commercial purposes (including marketing and advertising), on any media, worldwide—unless you ask us to stop using it</li>
        <li>it doesn’t infringe the privacy rights of other people</li>
        <li>you accept full responsibility for any legal claims against Booking.com related to it.</li>
      </ul>
      
      5. Just to be clear, we’re not responsible or liable for any picture uploaded to our Platform, and we’re allowed to remove any picture at our discretion (e.g. if a picture does not meet the above criteria).
    </section>

    <section id="something-goes-wrong">
    <h4 className="text-body-semibold my-3">A11. What if something goes wrong?</h4>
      1. If you have a question or complaint, contact our Customer Service team. You can do so by accessing your Booking through our web app or through our Help Center (where you’ll also find some useful FAQs). You can help us help you as quickly as possible by providing: <br/>

      <ul className="list-disc">
        <li>your Booking confirmation number, your contact details, your Roofa.co.ke email (if you have one), and the email address you used when you made your Booking</li>
        <li>a summary of the issue, including how you’d like us to help you</li>
        <li>any supporting documents (e.g. bank statement, Mpesa messages, pictures, receipts, etc.)</li>
      </ul>
      2. All questions and complaints are recorded, and the most urgent ones are treated as highest priority.<br/>
      3. We do try to resolve disputes with you directly, and we’re not obliged to submit to any alternative dispute resolution procedures handled by independent providers.<br/>

      4. You may also bring legal proceedings before a competent court<br/>
    </section>

    <section id="communication-with-the-service-provider">
    <h4 className="text-body-semibold my-3"> A12. Communication with the Service Provider</h4>
      1. We may help you communicate with your Service Provider, but that doesn’t mean we’re taking responsibility for the Travel Experience or anything the Service Provider does/doesn’t do. We can’t guarantee that they will read anything from you or that they’ll do what you ask. In itself, the fact that you contact them or they contact you doesn’t mean you have any grounds for legal action. If you need help, contact us via our Help Center.

      <br/>
      <span><b>Note: </b> We ONLY connect you with either the rental owners(landlords) or the Airbnbs service Providers <b>After making a successfull booking with Roofa.co.ke</b> You will receive this information about the service provider through a call from our agents or a confirmation email.</span>
    </section>

    <section id="measures">
    <h4 className="text-body-semibold my-3"> A13. Measures against unacceptable behavior</h4>
    
      1. If you breach these Terms (including our values and our Content standards and guidelines) or fail to comply with applicable laws or regulations, we have the right to:

      <ul className="list-disc">
      <li>stop you making any Bookings,</li>
      <li>cancel any Bookings you’ve already made,</li>
      <li>stop you using:

        <ul>
          <li>our Platform,</li>
          <li>our Customer Service,</li>
          <li>your Account</li>
        </ul>
      </li>
      </ul>
      2. If we cancel a Booking as a result, you may not (depending on the circumstances) be entitled to a refund. We may tell you why we canceled your Booking, unless telling you would (a) contravene applicable laws and/or (b) prevent or obstruct the detection or prevention of fraud or other illegal activities. If you believe we incorrectly canceled your Booking, contact our Customer Service team.
    </section>

    <section id="limitation-of-liability">
    <h4 className="text-body-semibold my-3"> A14. Limitation of liability</h4>
      1. Nothing in these Terms will limit our (or the Service Provider’s) liability (i) when we (or they) were negligent and this led to death or personal injury; (ii) in case of fraud or fraudulent misrepresentation; (iii) in respect of gross negligence or willful misconduct; or (iv) if such liability can otherwise not lawfully be limited or excluded.<br/>

      2. If you are in breach of these Terms and/or the Service Provider’s terms, we won’t be liable for any costs you incur as a result.<br/>

      3. We are not liable for:

      <ul className="list-disc">
        <li>any losses or damages which were not reasonably foreseeable when you made your Booking or otherwise entered into these Terms; or</li>
        <li>any business loss (including loss of profits, revenue, contracts, anticipated savings, data, goodwill, or wasted expenditure); or</li>
        <li>any event which was reasonably beyond our control.</li>
      </ul>
      4. We don’t make any promises about Service Providers’ products and services (rentals & Airbnbs) apart from what we expressly state in these Terms, for example in Section A4.<br/>

      5. To the extent permitted by law, the most that we (or any Service Provider) will be liable for (whether for one event or a series of connected events) is your reasonably foreseeable losses or damages in connection to your Booking(s).<br/>

      6. Just to be clear, these Terms are between <b>you and us</b>. Nothing in these Terms will entitle any third party other than the Service Provider to anything.<br/>

      7. You may be protected by mandatory consumer protection laws and regulations, which guarantee you rights that no company’s terms can overrule. If there is any inconsistency between those laws and regulations and these Terms, such mandatory consumer protection laws and regulations will override.<br/>
    </section>

    <section id="modification-clause">
    <h4 className="text-body-semibold my-3"> A15. Modification clause</h4>
    1. We may make changes to these Terms. Where such changes are material, we will inform you in advance of such changes becoming effective, unless the changes are required by applicable law.<br/>

    2. If you do not accept the changes, please do not use our Platform.<br/>

    3. Otherwise, your continued use of our Platform after the effective date of the proposed changes will constitute your acceptance of the revised Terms.<br/>

    4. Any existing Bookings will continue to be governed by the Terms that applied when the Booking was made.<br/>
    </section>

    <section>
    <h4 className="text-body-semibold my-3 text-center" id="dictionary"> roofa.co.ke dictionary</h4>
“Account” means an account (with Roofa.co.ke or a Group Company), through which you can book rentals and Airbnbs on our Platform. <br/>

“Accommodation” means the provision of an accommodation service by a Service Provider (throughout Section B, “Service Provider” means the provider of the accommodation service). <br/>

“Attraction” means the provision of an Attraction service by a Service Provider (throughout Section C, “Service Provider” means the provider of the Attraction service). <br/>

“Attraction service(s)” includes, but is not limited to, tours, museums, attractions, activities, and experiences. <br/>

“Booking” means the booking of a Travel Experience on our Platform, whether you pay for it now or later. <br/>

“Roofa.co.ke,” “us,” “we,” or “our” means Roofah Housing PLC (for accommodation, rentals, or Airbnbs) Corporate contact <br/>

“Booking Confirmation” (in the “Apartment rentals” section) means the confirmation email and coupon we send you, explaining the details of your Booking. <br/>

“Booking Network Sponsored Ads” means our program that lets Accommodation Service Providers bid through a third party (Koddi) for their product to appear in second place when your search results are ordered by “Our top picks.” <br/>

“Cash Credits” means a benefit with a monetary value that you can “cash out” to the Payment Method that we have on file for you, or put toward the cost of a future Travel Experience. <br/>

“Contract of Carriage” means the contract between you and the Service Provider, which deals with your Flight. <br/>

“Credits” means a benefit with a monetary value. There are “Cash Credits” and “Travel Credits.” <br/>

“Credit Card Cashback” means a benefit with a monetary value that can be cashed out to the credit card that we have on file for you, but can’t be put toward the cost of a future Travel Experience. <br/>

“Connectivity Partner” means a company that allows properties and Roofa.co.ke to communicate accommodation information and customers’ booking data. <br/>

“Currency Conversion Rate” means the rate that we use to convert currency; this is currently the WM/Refinitiv Closing Spot Rate, but this may change. <br/>

“Eligible Booking” means a Booking that meets the criteria to qualify for a Reward. <br/>


“Group Company” means an affiliate of Roofa.co.ke – either a direct shareholding of Roofa.co.ke. <br/>

“Individual Reward Criteria” means rules that apply to certain Rewards in addition to the general “Rewards, Credits, & Wallet” terms (A13) above.


“Pay In Your Own Currency” means the payment option that we sometimes offer when a Service Provider doesn’t use your currency. This option lets you pay in your currency instead. <br/>

“Payment Method” means the method used to pay for a Booking, which might be a credit/debit card or an alternative payment method like Mpesa. <br/>

“Reporting Date and Time” (in the “rentals and Airbnb” section) means the (local) date and time you’re due to report to the apartment(rental) or Airbnb, as stated in your Booking Confirmation. <br/>

“Platform” means the website/app on which you can book Travel Experiences, whether owned or managed by Roofa.co.ke or by a third-party affiliate. <br/>


“Private Transportation Journey” means the private transportation journey as set out in the Booking (including any changes after the Booking was made). <br/>

“Public Transportation” means trains, buses, trams, and other types of public transportation. <br/>

“Public Transportation Journey” means the public transportation journey as set out in the Booking (including any changes after the Booking was made). <br/>

“Rental” (or “Apartment Rental”) means the provision of a rental by a Service Provider (throughout Section D, “Service Provider” means the rental company that provides the rental). <br/>

“Rental Agreement” means the contract between you and the Service Provider, which you sign at reporting time. You’ll be provided with a summary of the key terms during the booking process. <br/>

“Rewards” means a benefit that you are promised. In most cases, Rewards will be Travel Credits, Cash Credits, a Credit Card Cashback, or a coupon for an item of some kind. <br/>

“Service Provider” means the provider of a accommodation-related product or service on the Platform, including but not limited to the owner of a hotel, Airbnb, rental or other property (for an “accommodation” Booking). <br/>

“Services” (in the “Private and Public Transportation” section) means the provision of a Public Transportation Journey or Private Transportation Journey. <br/>

“Terms” means these terms of service.

“Third-Party Aggregator” means a company that acts as either (a) an intermediary between you and the Service Provider or (b) a reseller of the Booking Experience. <br/>

“Third-Party Terms” (in the “Flights” section) means both the Intermediation Contract with the Third-Party Aggregator (for the booking)<br/>

“Booking Credits” means a benefit with a monetary value that you can put toward the cost of a future Travel Experience, but can’t “cash out.” <br/>

“Travel Experience” means one of the travel-related products or services on the Platform. <br/>

“Upfront Payment” means a payment that you make when you book a product or service, rather than when you actually use it. <br/>

“Wallet” means a dashboard in your Account that shows your Rewards, Credits, and other incentives. <br/>
    </section>

    </div>
  )
}

export default page
