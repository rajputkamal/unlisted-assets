import React from 'react';
import Breadcrumb from "../../Components/Breadcrumbs";
import Buttons from "../../Components/Buttons"
import './style.css';
import CompanyLogo from './CompanyLogo.png';


export default function PrivacyPolicy() {
    React.useEffect(()=>{
        window.scrollTo(0, 0)       
    }, [])

    return (
        <>

            <section className="privacypolicy-main container">
                <div className="my-card">
                    <div className="privacypolicy-container">
                        <div className='d-flex justify-content-center'>
                            <div className='CompanyLogo'>
                                <img src={CompanyLogo} alt="img" className='img-fluid' />
                            </div>
                        </div>
                        <hr />
                        <div className="annexure-4-para link-style"> 
                            <div className="section1">
                                <h3 className='my-3'>Privacy Policy</h3>
                                <p>These terms describe our policy and procedures on collection, use and disclosure of information when you use the services and tells you about the privacy rights. We will use your personal data to provide and improve the service through our platform. By using the services of the platform, you agree to the collection and use of information in accordance with this policy. We can use your data such as email, mobile number, social media communication etc., to offer you services related to our domain of services through the platform or our associate or affiliate or subsidiaries.
                                </p>
                                <h5 className=''>Privacy</h5>
                                <p>We understand clearly that you and your personal information is one of our most important assets. We store and process your Information including any sensitive financial information collected (as defined under the Information Technology Act, 2000), if any, on computers that may be protected by physical as well as reasonable technological security measures and procedures in accordance with Information Technology Act 2000 and rules there under. If you object to your Information being transferred or used in this way please do not use platform.</p>

                                <p>We may share personal information with our other corporate entities and affiliates/partners. These entities and affiliates/partners may provide marketing services to you as a result of such sharing unless you explicitly opt-out. We may disclose personal information to third parties. This disclosure may be required for us to provide you access to our services, to comply with our legal obligations, to enforce our Terms of Use, to facilitate our marketing and advertising activities, or to prevent, detect, mitigate, and investigate fraudulent or illegal activities related to our services. We do not disclose your personal information to unrelated third parties for their marketing and advertising purposes without your explicit consent.</p>

                                <p>We may disclose personal information, if required to do so, by law or in the good faith belief that such disclosure is reasonably necessary to reply to subpoenas, court orders, or other legal process. We may disclose personal information to law enforcement offices, third party rights owners, or others in the good faith belief that such disclosure is reasonably necessary to: enforce our terms or this policy; respond to claims; or protect the rights, property or personal safety of our users or the general public. We and our affiliates/partners will share / sell some or all of your personal information with another business entity should we (or our assets) plan to merge with, or be acquired by that business entity, or re-organization, amalgamation, restructuring of business.</p>

                                <hr />

                                <h5 className=''>Definitions</h5>
                                <p>For the purpose of this policy:</p>
                                <ol className="term-ordered-list" type="a">

                                    <li><span>You mean individual accessing or using the services, or company or another legal entity on behalf of which the individual is using or accessing the services, as applicable.
                                    </span></li>
                                    <li><span>The company or we or us refers to Unlisted Tech Private Limited or its group company, partners, associate, or affiliate.
                                    </span></li>
                                    <li><span>Affiliate means an entity that controls or is controlled by or under common control with a party where “Control” means ownership of the some of the shares, equity interest or securities entitled to vote for election of Directors or other managing authority, or he is referral or distribution partner with any of the group companies.
                                    </span></li>
                                    <li><span>Distributors mean those distributors who have shown their desire or interest to work with us.
                                    </span></li>
                                    <li><span>Partner Companies means those companies where we have working relationship.
                                    </span></li>
                                    <li><span>Account means account created for you to access our services.
                                    </span></li>
                                    <li><span>Virtual Account means virtual account created for you to access and make payment for the transaction on our Platform.
                                    </span></li>
                                    <li><span>Website or platform means <a href="/">www.unlistedassets.com</a> or any other website added by Us.
                                    </span></li>
                                    <li><span>Service refers to platform related services, technical or otherwise, for the consummation of transaction between independent individuals on the platform.
                                    </span></li>
                                    <li><span>Country means India unless specially mentioned otherwise.
                                    </span></li>
                                    <li><span>Service provider means any natural or legal person who processes data on the behalf of the company in relation to the services. It refers to the third-party companies or employees engaged by the company to perform or facilitate the services.
                                    </span></li>
                                    <li><span>Third party social media service means any website or social network website through which user may log in or create an account to access the service.
                                    </span></li>
                                    <li><span>Personal data refer to the data that pertains to identified or identifiable individual.
                                    </span></li>
                                    <li><span>Cookies are the small files which are placed on your computer, mobile device or any other device by a website containing the details of the browsing history on that website.
                                    </span></li>
                                    <li><span>Usage data refers to the data collected automatically, either generated by the use of service or from the service infrastructure itself.</span></li>
                                </ol>
                            </div>


                            <div className='privacy-policy-table'>
                                <h5 className=''>Collecting your personal data</h5>

                                <table class="table table-bordered table-data">
                                    {/* <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">First</th>
                                                <th scope="col">Last</th>
                                                <th scope="col">Handle</th>
                                            </tr>
                                        </thead> */}
                                    <tbody>
                                        <tr>
                                            <th scope="row">Personal data</th>
                                            <td>While using our services, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include without limitation:
                                                <ul>
                                                    <li>Email address</li>
                                                    <li>First and last name
                                                    </li>
                                                    <li>Phone number
                                                    </li>
                                                    <li>Address, State, Province, Zip code, City, District
                                                    </li>
                                                    <li>Usage data
                                                    </li>
                                                    <li>Social media like facebook, whatsapp, Linkedin, Twitter, etc</li>
                                                    <li>Data on holding of equity shares held by You while uploading holding statement on platform</li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Usage data</th>
                                            <td>Usage data may include information such as your device Internet Protocol address, browser type, browser version, pages of our service that you visit, time and date of your visit, the time spent on those pages, unique device identifier and other diagnostic data. When you access the service by or through a mobile device, we may collect certain information automatically, including but not limited to type of mobile device you use, your mobile device unique ID, IP address of your mobile device, your mobile operating system, the type of mobile internet browser you use, unique device identifiers and other diagnostic data. We may also collect information that your browser sends whenever you visit our service or when you access the service by or through a mobile device. When you access our platform, we can use any of your available information.</td>

                                        </tr>
                                        <tr>
                                            <th scope="row">Tracking technologies and cookies</th>
                                            <td >We use cookies and similar technologies to track the activity on our service and retain your information. Tracking technologies used are beacons, tags, scripts, to collect and track information and to improve and analyze our service. You can instruct your browser to refuse all cookies or indicate when a cookie is being send. However, if you don’t accept any cookies, you may not be able to use some parts of our service. Cookies can be persistent or Session cookies. Persistent cookies remain on your computer or mobile device when you go offline while Session cookies are erased as soon as you close browser. We may use both session and persistent cookies or each of them.
                                                <div className='my-2'>
                                                    <p><span className='bold'>Type: </span> Session cookies </p>
                                                    <p><span className='bold'>Purpose: </span>These cookies are essential to provide you with Service available through the website and to enable you to use some of its feature. They help to authenticate users and prevent fraudulent use of user accounts. Without these cookies, the services that you have asked for cannot be provided, and we only use these cookies to provide you with those services.</p>
                                                </div>

                                                <div className='my-2'>
                                                    <p><span className='bold'>Type: </span> Persistent cookies </p>
                                                    <p><span className='bold'>Purpose: </span>These cookies identify if users have accepted the use of cookies on the website.</p>
                                                </div>

                                                <div className='my-2'>
                                                    <p><span className='bold'>Type: </span>functionality cookies </p>
                                                    <p><span className='bold'>Purpose: </span>These cookies allow us to remember choice you make when you use the website such as remembering your login details or language preference. The purpose of these cookies is to provide You with a more personal experience and to avoid having to re-enter your preference every time when you log in.</p>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <th scope="row">Log Files</th>
                                            <td >We follow a standard procedure of using log files. These file log visitors when they visit websites. All hosting companies do this and a part of hosting services analytics. The information collected by log files include IP addresses, browser type, ISP, date and time stamp, referring/exit page, and perhaps the number of clicks. These are not related to any information that is not identifiable. The purpose of this information is for scrutinizing and analysing trends, administrating the site, tracking users’ movement on the website and gathering demographic information.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="section1">

                                <h5 className=''>Use of your Personal data</h5>
                                <p>We may use the personal data for the following purposes:</p>
                                <ol className="term-ordered-list" type="a">


                                    <li><span> To provide and maintain our service including to monitor the usage of our service.
                                    </span></li>
                                    <li><span> To manage your account and your registration as user of the service. The personal data you provide can give access to various functionalities of the service that are available to you as a registered user.
                                    </span></li>
                                    <li><span> For the performance of a contract: the development compliance and undertaking of the purchase contract for the product item or service you have purchased or of any other contract with us through the service.
                                    </span></li>
                                    <li><span> To contact you by email, telephone calls, SMS or other comparable form of electronics communications such as mobile applications push notifications regarding update or informative communications related to the functionalities, product or contracted services, including security updates, when required or reasonable for their implementation.
                                    </span></li>
                                    <li><span> To provide you with news, special offers, and general information about other product services and event which we offer that are related or similar to those that you have already purchased or enquired about unless you have opted not to receive such information.
                                    </span></li>
                                    <li><span> To manage your request or to offer different product or services and to attend and manage your request to us.
                                    </span></li>
                                    <li><span> We may share your personal information in the following situations:</span>

                                        <ol className="">
                                            <li><span>With service providers: We may share your personal information with our service providers to monitor and scrutinize or analyse the use of our service, to show advertisement to you to help support and maintain our service, to contact you, to advertise on third party websites to you after you visited our service or for payment processing.
                                            </span></li><li><span>In case of business transfer/merger/other corporate actions: We may share or transfer your individual information in connection with or during negotiation of any merger, sale of company assets, financing or acquisition of all or a portion of our business to another company.
                                            </span></li><li><span>With affiliates: We may share your information with our affiliates/partners in which we will require those affiliates/partners to honor appropriate privacy policy.
                                            </span></li><li><span>With business partners: we may share your personal information with our business partner to offer you certain product/services.
                                            </span></li><li><span>With other users: when You share your personal information or otherwise interact in the public areas with other users such information may be viewed by all users and may be publicly distributed outside. If you interact with other users or register through a third party social media service, your contact on the third party social media service may see your name, profile, pictures and description, of your activity. Similarly, other users will be able to view descriptions of your activity communicate with you and view your profile. </span></li>

                                        </ol>
                                    </li>
                                </ol>
                                <hr />

                                <div>
                                    <h5>Third Party Privacy Policies</h5>
                                    <p>Our privacy policy does not apply to other advertisers or website. Thus, you may check with your advisor on the respective privacy policies of these third parties ad servers for more detailed information. It may include their practices and instruction on how to opt out of certain options. You can choose to disable cookies through your individual browser options. To know more about cookie management with specific web browser, it can be found at the browser’s respective websites.
                                    </p>
                                </div>
                                <div>
                                    <h5>External Links on The Website
                                    </h5>
                                    <p>The platform may include advertisements, hyperlinks to other websites, websites, content or resources. We have no control over any websites or resources, which are provided by companies or persons other than us. You acknowledge and agree that we are not responsible for the availability of any such external sites or resources, and do not endorse any advertising, services/products or other materials on or available from such platform or resources. You acknowledge and agree that we are not liable for any loss or damage which may be incurred by you as a result of the availability of those external sites or resources, or as a result of any reliance placed by you on the completeness, accuracy or existence of any advertising, products or other materials on, or available from, such websites or resources. These external websites and resource providers may have their own privacy policies governing the collection, storage, retention and disclosure of your personal information that you may be subject to. We recommend that when you enter such external website, you review their privacy policy.
                                    </p>
                                </div>
                                <div>
                                    <h5>Your rights in relation to your personal data
                                    </h5>
                                    <p>We take reasonable steps that are designed to keep your personal data review, complete and up to date for the purpose for which it is collected and used and to ensure that processing of your personal data complies with applicable laws. Some of the rights which you have in relation your personal data are mentioned as under:
                                    </p>

                                    <ul>

                                        <li>Right to access: You have right to request copies of your personal information. We may charge you a small amount of fee for this, if required.
                                        </li>
                                        <li>The right to rectifications: You have the right to request that we correct any information that you believe is incorrect. You also have the right to request that we complete the information that you believe is incomplete.
                                        </li>
                                        <li>Right to Edit/Delete: You have the right to request that your information may be edited/deleted under certain specific situations.
                                        </li>
                                        <li>Right to restrict processing: You have the right to request that we restrict the usage of your personal data under certain situations.
                                        </li>
                                        <li>Right to object to processing: You have the right to object to our processing of your personal information under certain conditions.
                                        </li>
                                        <li>Right to data portability: You have right to request that we transfer the data that we have collected to another organization or directly to you under certain situation.</li>
                                    </ul>
                                    <p >Please make such request from your registered email ID by writing to us on
                                         <a href="/"> support@unlistedassets.com</a> , we will revert back within 60 working days.</p>

                                </div>

                                <div>
                                    <h5>Users</h5>
                                    <p>If you are coming from United State of America or European union or any other region with laws governing law collection and use, please note that you are agreeing to the transfer of your information to us and processing globally. By providing your information, you agree to any transfer or processing in accordance with this privacy policy. The onus of compliance with the requisite laws applicable in a specific country will be on the person accessing our services.
                                    </p>
                                </div>
                                <div>
                                    <h5>Retention of your personal data
                                    </h5>
                                    <p>The Company will hold onto your personal data only for as long as is necessary for the purpose set out in this privacy policy. We will retain and use your personal data only to the extent necessary to comply with our legal obligations, resolve dispute, and enforce our legal agreement and policies. The Company will also retain data for internal analysis purpose. Usage data is generally retained for a shorter period of time except when this data is retained to strengthen the security or to improve the functionality of our service or we are under some legal obligation to retain it for longer period.
                                    </p>
                                </div>
                                <div>
                                    <h5>Transfer of your personal data
                                    </h5>
                                    <p>Your information including personal data is processing at the company operating offices and in any other places where the parties involved in the processing of the data are located in. This means the information may be transferred to and maintained on computer located outside of your state, province or country or government jurisdiction where the data protection laws may differ than those from your jurisdiction. Your consent to this privacy policy followed by your submission of such information represents your agreement to that transfer. The company will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this privacy policy and no transfer of your personal data will take place to an organization or a country unless there are adequate control in place including security of your data and personal information.
                                    </p>
                                </div>
                                <div>
                                    <h5>Security of Your personal data
                                    </h5>
                                    <p>The security of your personal data is important to us, but it may be noted that no method of transmission over the internet or method of electronics storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its total security.
                                    </p>
                                </div>
                                <div>
                                    <h5>Children's Privacy
                                    </h5>
                                    <p>Our service does not address anyone under the age of 18. We don't knowingly collect personally identifiable information from anyone below the age of 18. If you are parent or guardian and you are aware that your child has provided us with the personal data, You may please contact us. If we become aware that we have collected personal data from anyone under the age of 18 without verification of parental permission, we will take reasonable steps to remove that information from our records.
                                    </p>
                                </div>
                                <div>
                                    <h5>Changes to this Privacy Policy
                                    </h5>
                                    <p>We may modify this privacy policy from time to time and will keep posting the updated policy on this page. You are advised to review the privacy policy periodically for any changes. Changes to this policy are effective when posted on this website. We may also notify of any change in privacy policy via email or any other mode of electronic communication.
                                    </p>
                                </div>

                                <div>
                                    <h5>New Use of Personal Information
                                    </h5>
                                    <p>From time to time we may desire to use personal information for the users not previously disclosed in our privacy policy. If our practice changes regarding previously collected personal information in a way that would be materially less restrictive than stated in the version of this privacy policy in effect at the time we collected the information, we will make reasonable efforts to provide notice and obtain consent to any such uses as may be required by law.
                                    </p>
                                </div>
                                <div>
                                    <h5>Confidentiality
                                    </h5>
                                    <p>You further acknowledge that the platform may contain information which is designated confidential by us and that you shall not disclose such information without our prior written consent.
                                    </p>
                                </div>
                                <div>
                                    <h5>Contact us
                                    </h5>
                                    <p>If you have any query on the privacy policy, you may contact us on <a href="/">support@unlistedassets.com</a>
                                    </p>
                                </div>
                                <div>
                                    <h5>Liability
                                    </h5>
                                    <p>Except as otherwise expressly included in this privacy policy, this document only addresses the use and disclosure of information we collect from you. To the extent that you disclose your information to other parties, whether they are on our platform or on other sites throughout the Internet, different rules may apply to their use or disclosure of the information you disclose to them. To the extent that we use third party advertisers, they adhere to their own privacy policies.
                                    </p>
                                </div>
                                <div>
                                    <h5>Grievance Team
                                    </h5>
                                    <p>In accordance with Information Technology Act 2000 and rules made there under and the Consumer Protection (E-Commerce) Rules, 2020, the contact details of the Grievance Officer are provided below:
                                    </p>
                                    <div className="ml-3 mt-2">
                                        <h6>The Compliance Officer</h6>
                                        <h6>Address: 242-243, AIHP Palms, 1st Floor, Udyog Vihar-IV, Gurgaon</h6>
                                        <h6>Email:  <a href="/">support@unlistedassets.com</a></h6>
                                        <h6>Phone: +91-9990862220 / +91-9990872220</h6>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}







{/* <p className="bold"></p> */ }

{/* <ol className="term-ordered-list">
                                      <li><span>We reserve the right to revise terms of this Policy from time to time and publish the same on the website and Platform as applicable.</span></li>
                                    </ol> */}