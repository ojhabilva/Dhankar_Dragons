
export default function PolicyDetails() {
    return (
        <section className="bg-white py-12">
            <div className="max-w-5xl mx-auto px-6 text-gray-800">


                <h2 className="text-2xl font-serif font-semibold text-center mb-8">
                    Policy Details
                </h2>

                <div className="mb-8">
                    <h3 className="font-semibold underline mb-3">
                        Privacy Policy
                    </h3>
                    <p className="text-sm leading-relaxed">
                        We value your privacy and are committed to protecting your personal
                        information. Any details shared with us during booking, enquiry,
                        or stay are kept strictly confidential.
                    </p>
                    <p className="text-sm leading-relaxed mt-2">
                        We may collect personal information such as your name, contact
                        details, identification details, and payment information solely
                        for reservation, communication, and service-related purposes.
                        This information is never sold, shared, or disclosed to third
                        parties, except when required by law or for essential operational
                        needs (such as payment processing).
                    </p>
                    <p className="text-sm leading-relaxed mt-2">
                        Our website may use cookies to improve user experience and website
                        functionality. By using our website, you consent to our privacy
                        practices as described above.
                    </p>
                </div>

                <div className="mb-8">
                    <h3 className="font-semibold underline mb-3">
                        Terms & Conditions
                    </h3>
                    <ul className="list-disc ml-5 text-sm space-y-2 leading-relaxed">
                        <li>
                            All guests must provide valid government-issued photo
                            identification at the time of check-in.
                        </li>
                        <li>
                            Check-in and check-out timings must be followed as per hotel
                            policy. Early check-in or late check-out is subject to
                            availability and may attract additional charges.
                        </li>
                        <li>
                            Guests are responsible for any damage caused to hotel property
                            during their stay.
                        </li>
                        <li>
                            The hotel reserves the right to refuse service or cancel bookings
                            in case of inappropriate behaviour, violation of hotel rules,
                            or false information.
                        </li>
                        <li>
                            Room tariffs and services are subject to change without prior
                            notice.
                        </li>
                        <li>
                            The hotel is not responsible for loss of personal belongings
                            unless handed over for safe custody.
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold underline mb-3">
                        Room Cancellation Policy
                    </h3>
                    <p className="text-sm leading-relaxed mb-2">
                        We understand that travel plans may change. Our room cancellation
                        policy is designed to be fair to both guests and the hotel.
                    </p>
                    <ul className="list-disc ml-5 text-sm space-y-2 leading-relaxed">
                        <li>
                            Free cancellation is allowed up to <strong>[X days]</strong>
                            prior to the check-in date.
                        </li>
                        <li>
                            Cancellations made within <strong>[X days]</strong> of check-in
                            will attract a cancellation charge as per the booking amount.
                        </li>
                        <li>
                            In case of no-show or early departure, the full room tariff for
                            the booked duration may be charged.
                        </li>
                        <li>
                            Refunds, if applicable, will be processed within
                            <strong> [X working days]</strong> through the original mode of
                            payment.
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
