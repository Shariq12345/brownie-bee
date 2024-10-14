import React from "react";
import { Shield, Eye, Lock, Bell, RefreshCw, HelpCircle } from "lucide-react";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Information We Collect",
      content:
        "We collect personal information that you provide directly to us, such as your name, email address, postal address, phone number, and payment information when you make a purchase. We also automatically collect certain information about your device and how you interact with our website.",
      icon: <Eye className="text-rose-600" size={24} />,
    },
    {
      title: "How We Use Your Information",
      content:
        "We use your information to process your orders, communicate with you about your purchases, improve our services, send you marketing communications (if you've opted in), and comply with legal obligations.",
      icon: <Shield className="text-rose-600" size={24} />,
    },
    {
      title: "Information Sharing and Disclosure",
      content:
        "We do not sell your personal information. We may share your information with service providers who help us operate our business, or as required by law. We may also share aggregated or de-identified information that cannot reasonably be used to identify you.",
      icon: <Lock className="text-rose-600" size={24} />,
    },
    {
      title: "Your Choices and Rights",
      content:
        "You can access, update, or delete your personal information by logging into your account or contacting us. You can also opt-out of marketing communications at any time. Depending on your location, you may have additional rights regarding your personal information.",
      icon: <RefreshCw className="text-rose-600" size={24} />,
    },
    {
      title: "Data Security",
      content:
        "We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage.",
      icon: <Lock className="text-rose-600" size={24} />,
    },
    {
      title: "Cookies and Similar Technologies",
      content:
        "We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can manage your cookie preferences through your browser settings.",
      icon: <Bell className="text-rose-600" size={24} />,
    },
    {
      title: "Changes to This Privacy Policy",
      content:
        "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last updated' date.",
      icon: <RefreshCw className="text-rose-600" size={24} />,
    },
    {
      title: "Contact Us",
      content:
        "If you have any questions about this Privacy Policy, please contact us at: privacy@browniebee.com | +91 9867119576 | Shop Number.8 New Mill Road Safia Bai Building, Bazar Ward, Kurla West, Mumbai-70",
      icon: <HelpCircle className="text-rose-600" size={24} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-8 sm:px-10 sm:py-12">
            <h1 className="text-4xl font-bold mb-6 text-rose-800">
              Privacy Policy
            </h1>
            <p className="text-sm text-rose-600 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <p className="mb-8 text-rose-900 leading-relaxed">
              At Brownie Bee, we are committed to protecting your privacy and
              ensuring the security of your personal information. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website or make a purchase from us.
            </p>

            <div className="space-y-8">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className="bg-rose-50 rounded-lg p-6 transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex items-center mb-4">
                    {section.icon}
                    <h2 className="text-xl font-semibold text-rose-800 ml-3">
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-rose-900">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
