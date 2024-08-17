import Container from "@/components/Container";
import React from "react";

const ContactPage = () => {
  return (
    <Container>
      <section className="bg-pastel-pink py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:py-20 lg:px-8">
          <div className="max-w-2xl lg:max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-800">
              Visit Our Location
            </h2>
            <p className="mt-4 text-lg text-gray-700">
              We&apos;d love to see you in person! Here&apos;s where you can find us.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Map Section */}
            <div className="rounded-lg overflow-hidden shadow-lg">
              {/* <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11672.945750644447!2d-122.42107853750231!3d37.7730507907087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858070cc2fbd55%3A0xa71491d736f62d5c!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1619524992238!5m2!1sen!2sus"
                width="100%"
                height="480"
                allowFullScreen=""
                loading="lazy"
                className="border-none"
              ></iframe> */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.692747625502!2d72.87775677479272!3d19.077241982127553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9ecfd03f4bd%3A0x816e42ac4dc6e43d!2sBrownie%20Bee%20the%20cake%20boutique!5e0!3m2!1sen!2sin!4v1722621539076!5m2!1sen!2sin"
                width="100%"
                height="480"
                loading="lazy"
                className="border-none"
              ></iframe>
            </div>

            {/* Contact Details Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-medium text-gray-800">
                    Our Address
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Shop Number.8 New Mill Road Safia Bai Building, Bazar Ward,
                    Kurla West, Mumbai, Maharashtra 400070
                  </p>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-2xl font-medium text-gray-800">Hours</h3>
                  <p className="mt-2 text-gray-600">
                    Monday - Friday: 11am - 1am
                  </p>
                  <p className="mt-1 text-gray-600">Saturday: 10am - 2am</p>
                  <p className="mt-1 text-gray-600">Sunday: Open</p>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-2xl font-medium text-gray-800">
                    Contact
                  </h3>
                  <p className="mt-2 text-gray-600">Email: info@example.com</p>
                  <p className="mt-1 text-gray-600">Phone: +91 23494 34993</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default ContactPage;
