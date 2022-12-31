import React from 'react';
import Breadcrumb from "../../../Components/Breadcrumbs";
import './style.css';


export default function RefundAndCancellation() {
    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>

            <section className="container mb-5">
                {/* <Breadcrumb /> */}
                <div className="my-card mt-4">
                    <div className="container DisclaimerForMarketing-main">
                        <div className="default-sapcing">
                            <div className="annexure-4-para">
                                <div className="">
                                    <h3 className='my-3'>Refund and Cancellation Policy</h3>

                                    <h5>Refund Policy :</h5>
                                    <ol className="term-ordered-list">
                                        <li>
                                            <span>
                                                The Platform does refunds and cancellations of the transaction on a case-to-case basis and therefore the Platform reserves in its sole discretion the right to refuse/cancel any order. The Platform in its sole discretion may cancel/refund, as the case may be, the transaction in full, proportionate, or on such other basis as the Platform deems fit:
                                            </span>
                                            <span>
                                                <ol className="term-ordered-list" type="a">
                                                    <li><span>If it suspects a fraudulent or improper transaction;
                                                    </span></li>
                                                    <li><span>If it suspects that a customer has undertaken a transaction that is not in accordance with the Terms of Use, which it may propose from time to time;
                                                    </span></li>
                                                    <li><span>If the user has not completed the KYC (or in case buyer/seller furnishes wrong details).
                                                    </span></li>
                                                    <li><span>In case the user does not provide a DP ID /Client ID or in the event a wrong DP ID /Client ID is furnished by the user;
                                                    </span></li>
                                                    <li><span>In the event the user opts to cancel the transaction subject to the applicable terms;
                                                    </span></li>
                                                    <li><span>In the event payments are not received in the designated escrow account or Bank Account of the Seller despite being debited from the buyers’ account;
                                                    </span></li>
                                                    <li><span>In the event of non-compliance with the provisions of the applicable law including but not limited to the Securities Contracts (Regulation) Act, 1956
                                                    </span></li>
                                                    <li><span>In case the Seller transfers a part of the confirmed quantity of shares or makes an improper or incorrect transaction. Please note that in these cases, the Platform cannot confirm, or guarantee the return of such shares which have been improperly/incorrectly transferred. In case the user receives an incorrect order, the user should contact customer support by dropping an email to <a href="/">support@unlistedassets.com</a>;
                                                    </span></li>
                                                    <li><span>In the event the internal/external Trustee rejects the transaction owing to certain non-compliance or incorrect detail or any other justifiable reason; and/or
                                                    </span></li>
                                                    <li><span>Any other reason as may be deemed fit by the Platform or the Trustee.
                                                    </span></li>
                                                </ol>
                                            </span>

                                        </li>

                                        <li><span>
                                            In the event the Platform approves initiation of a refund, such amount (excluding the payment gateway charges or the amount owed, if any to the Platform) shall be processed to the user’s respective Virtual Account within 48 to 72 hours (excluding public holidays and Sundays). Once credited, the users would be able to withdraw this amount from their respective Virtual Account at any time at their convenience.
                                        </span></li>
                                        <li><span>
                                            The users will have to send an email to <a href="/">support@unlistedassets.com</a> for any refund-related requests or queries that they may have along with the transaction number and the original payment receipt, if any, generated at the time of making payments.
                                        </span></li>
                                        <li><span>
                                            Platform does not assume any responsibility or liability for any false or incorrect details furnished by the user including but not limited to the Demat/Bank Details entered by the user on the Platform. All share transfers/payments made on the details provided by the User on the Platform shall be deemed to be correct and not subject to any dispute.
                                        </span></li>
                                        <li><span>
                                            Buyers shall not have the right to cancel the transaction once the buyer accepts the terms on the Platform and the amount for such particular transaction is received in the designated escrow/Bank Account of the Seller. However, please note that placement of an offer on the Platform by a buyer with any seller on the Platform is an offer to buy the shares and it shall not be construed as the seller's automatic/deemed acceptance of the buyer's offer to buy such assets. The seller retains the right to cancel any such offer placed by the buyer, at its sole discretion and the buyer shall be intimated of the same via an email/SMS or any other notification on the Platform. Upon such cancellation, the amount received from the buyer shall be refunded subject to the deductions, if any, and the applicable terms.
                                        </span></li>
                                        <li><span>
                                            Grievance/Dispute Management: For any specific complaint which you may have, you can get in touch with the grievance officer of Unlisted Tech Private Limited. Furthermore, if you are facing any transaction-related issues or have a query, you can shoot an email at
                                            <a href="/"> rajesh@unlistedassets.com</a>. For general trading-related queries, grievances can be shared by sending an email at <a href="/">support@unlistedassets.com</a>.
                                        </span></li>





                                    </ol>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}
