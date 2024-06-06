'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link";
import { BsFillPrinterFill } from "react-icons/bs";

const page = () => {
  return (
    <div className="sm:px-10 px-4 text-[13px]">

        <h1 className="text-heading1-bold text-center mt-4">How we work</h1>

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
                <Link href='#definitions'>1A. Definitions and Who We Are</Link>
            </li>
            <li className="mb-2 text-blue">
                <Link href='#services-work'>1B. How does our service work?</Link>
            </li>
            <li className="mb-2 text-blue">
                <Link href='#work-with'>1C. Who do we work with?</Link>
            </li>
            <li className="mb-2 text-blue">
                <Link href='#how-do-we-make-money'>1D. How do we make money?</Link>
            </li>
            <li className="mb-2 text-blue">
                <Link href='#prices'>1E. Prices</Link>
            </li>
            <li className="mb-2 text-blue">
                <Link href='#payments'>1F. Payments</Link>
            </li>
            <li className="mb-2 text-blue">
                <Link href='#help-and-advice'>1G. Help and advice – if the unexpected happens</Link>
            </li>
            <li className="mb-2 text-blue">
                <Link href='#over-booking'>1H. Overbooking</Link>
            </li>
            <li className="mb-2 ml-3 text-blue">
                <Link href='#related-information'>Home</Link>
            </li>
        </ul>
      </div>

            <section className="mb-4" id="definitions">
                <h4 className="text-body-semibold my-3">1A. Definitions and Who We Are</h4>

                <p className="text-[13px]">Some of the words you’ll see have very specific meanings, so please check out the “Roofa.co.ke dictionary” in our <a href="/docs/terms#dictionary" className="text-blue">Terms of Service</a>Terms of Service.</p>
                <br/>
                <p>When you book an Accommodation, Roofa.co.ke provides and is responsible for the Platform – but <b>NOT</b> the accommodation Experience itself (see 1B below). Roofa.co.ke is a company incorporated under the laws of the Kenya (registered address: NAKURU, DISTRICT: RONGAI DISTRICT , P.O BOX 20108 RONGAI).</p>
            </section>

            <section className="mb-4" id="services-work">
                <h4 className="text-body-semibold my-3">1B. How does our service work?</h4>

                <p className="text-[13px]">We make it easy for you to compare Bookings from many hotels, property owners, Airbnbs and other Service Providers.</p>
                <br/>
                <p>When you make a Booking on our Platform, you enter into a contract with the Service Provider (unless otherwise stated).</p>
                <br/>
                <p>Roofa.co.ke is not a party to that contract and is not responsible for the provision of the Experience. We are responsible for the Platform and our Services.</p>
                <br/>
                <p>The information on our Platform is based on what Service Providers tell us. We do our best to keep things up to date at all times, but realistically, it can take a few hours to update, e.g. text descriptions and lists of the facilities that Accommodations provide.</p>
            </section>

            <section className="mb-4" id="work-with">
                <h4 className="text-body-semibold my-3">1C. Who do we work with?</h4>

                <p className="text-[13px]">Only Service Providers that have a contractual relationship with us will be displayed on our Platform. They may offer other Experiences outside our Platform as well.</p>
                <br/>
                <p>We don’t own any Accommodations ourselves—each Service Provider is a separate company that has agreed to work with us in a certain way.</p>
                <br/>
                <p>Our Platform tells you how many Accommodations you can book through us worldwide – and our search results page tells you how many of them might be right for you, based on what you’ve told us.</p>
            </section>

            <section className="mb-4" id="how-do-we-make-money">
                <h4 className="text-body-semibold my-3">1D. How do we make money?</h4>

                <p className="text-[13px]"><b>1. </b>We don’t buy or (re-)sell any products or services. Once you make a successful booking, the Service Provider simply pays us a commission. In such apartment the user does not pay the service fee its the apartment owners.</p>
                <br/>
                <p><b>2. </b> Some Service Providers have an agreement with us that when we make a successful booking for their services they will only take the rent and pay Roofa.co.ke the agency fees as commission. Thats why some apartment we charge a service fee to you the user(customer) which works as the agency fee for our commission to enable Roofa.co.ke run its services smoothly, <b>Note: </b> in such apartments we will have a notification "Zero agency fees when you book this particular apartment with us"</p>
                <br/>
                <p>If the second Accommodation in your search results has a badge that says “Ad,” this means that the Service Provider has paid for it to appear there, as part of our “Booking Network Sponsored Ads” program.</p>
            </section>

            <section className="mb-4" id="prices">
                <h4 className="text-body-semibold my-3">1E. Prices</h4>

                <p className="text-[13px]">The rates displayed on our Platform are set by the Service Providers. We may finance rewards or other benefits out of our own pocket.</p>
                <br/>
                <p>When you make a Booking, you agree to pay the cost of the Travel Experience itself and any other charges and taxes that may apply (e.g. for any extras). Taxes and fees may vary for different reasons, such as the Service Provider’s location, the kind of room selected, and the number of guests. The price description tells you whether any taxes and fees are included or excluded. You’ll be able to find more information about the price while you’re booking.</p>
                <br/>
                <p>Our Platform provides descriptions of any equipment and facilities that Service Providers offer (based on what they tell us). It also tells you how much extra they’ll cost, if anything.</p>
            </section>

            <section className="mb-4" id="payments">
                <h4 className="text-body-semibold my-3">1F. Payments</h4>

                <p className="text-[13px]">There is <b>ONLY</b> one way you might pay for your Booking:</p>
                <br/>
                <ul className="list-disc">
                   <li><b> We organize your payment to the Service Provider in advance. </b> We (or our affiliate) will take your Payment Method details and make sure the Service Provider is paid. Kindly note the <b>Rental Deposit</b> and any other costs will be paid while checking in to the apartment Roofa.co.ke has nothing to do with such cost.</li>
                </ul>
                <br/>
                <p>If you cancel a Booking or don’t show up, any cancellation/no-show fee or refund will depend on the Service Provider’s cancellation/no-show policy.</p>
            </section>

            <section className="mb-4" id="help-and-advice">
                <h4 className="text-body-semibold my-3">1G. Help and advice – if the unexpected happens</h4>

                <p className="text-[13px]">If you have any questions, or if something doesn’t go according to plan, just contact us. You can do this by accessing your Booking either through our app, or through our <a href="/docs/help-center" className="text-blue">Help Center</a>, where you’ll also find some useful FAQs). We handle complaints as soon as possible, treating the most urgent ones as the highest priority</p>
                <br/>
                <p>You can help us help you as quickly as possible by providing:</p>
                <br/>
                <ul className="list-disc">
                   <li>your Booking confirmation number, your Roofa.co.ke email, your contact details, and the email address you used when you booked your stay</li>
                   <li>a summary of the situation you need assistance with, including how you’d like us to help you</li>
                   <li>any supporting documents (bank statement, Mpesa messages, photos, receipts, etc.).</li>
                </ul>

                <br/>
                <p>Whatever the issue, we will do what we can to help you.</p>
                <br/>
                <ul className="list-disc">
                    <li><b>What happens if a Booking is mispriced?</b> Sometimes (very rarely), you might see an obvious incorrect price on our Platform. If that happens, and if you make your Booking before we correct the mistake, your Booking may be canceled and we’ll refund anything you’ve paid.</li>
                    <li><b>Do we ever remove Service Providers from our Platform altogether?</b> Of course. We can do that if we find out they’ve breached their contractual obligations, for example, or that they’ve provided an inaccurate description of their Accommodation (and failed to correct it when we asked them to).</li>
                </ul>
                <br/>
                <p>We can also remove Service Providers if we find out they’re doing something illegal, or if they’re not treating our customers fairly. For more info, check out “What if something goes wrong?” (A11)in our <a href="/docs/terms" className="text-blue">Terms of Service</a>.</p>
            </section>

            <section className="mb-4" id="over-booking">
                <h4 className="text-body-semibold my-3">1H. Overbooking</h4>

                <p className="text-[13px]">Once your Booking is confirmed, your Service Provider is required to honor it. If the Service Provider is “overbooked,” they’re responsible for finding a solution as soon as possible – but we provide them with guidelines, as well as practical help.</p>
                <br/>
                <p>If they can’t give you the option you booked and they can’t offer you a suitable alternative:</p>
                <br/>
                <ul className="list-disc">
                   <li>you’ll be able to cancel your Booking at no cost (with a refund of anything you’ve paid)</li>
                   <li>if you like, we’ll then help you choose an alternative Accommodation of a similar category and price on our Platform (if available)—and if it’s a bit more expensive, we’ll refund the difference when you send us the invoice that you get from your new Service Provider.</li>
                </ul>

                <br/>
                <p>When it comes to refunds...</p>
                <br/>
                <ul className="list-disc">
                    <li><b>If your Service Provider has received your payment after a successful booking,</b> we’ll try to ensure they refund you as soon as possible.</li>
                    <li>
                        <b>If you made a successful booking your payment is still with us, </b> we’ll refund you ourselves. In 90% of cases, the money should be in your account within 5 business days of the time when: 
                        <ul className="list-disc px-4">
                            <li>your original Booking is canceled, or</li>
                            <li> You did not check in to that apartment.</li>
                        </ul>
                    </li>
                </ul>
                
            </section>
      
    </div>
  )
}

export default page
