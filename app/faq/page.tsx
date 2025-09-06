
'use client';

import { useState } from 'react';

export default function FAQPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      category: "Orders & Shipping",
      questions: [
        {
          question: "How long does shipping take?",
          answer: "Standard shipping takes 5-7 business days, express shipping takes 2-3 business days, and overnight delivery is available for next business day delivery. Processing time is typically 1-2 business days."
        },
        {
          question: "Do you offer free shipping?",
          answer: "Yes! We offer free standard shipping on all orders over $75. Orders under $75 have a $8.99 shipping fee."
        },
        {
          question: "Can I track my order?",
          answer: "Absolutely! Once your order ships, you'll receive a tracking number via email. You can track your package through your Motor Elite account or directly on the carrier's website."
        },
        {
          question: "Can I change or cancel my order?",
          answer: "You can modify or cancel your order within 2 hours of placing it by contacting our customer service team. After that, orders enter our fulfillment process and cannot be changed."
        }
      ]
    },
    {
      category: "Products & Compatibility",
      questions: [
        {
          question: "How do I know if a part fits my vehicle?",
          answer: "Use our vehicle fitment tool on each product page. Enter your year, make, model, and engine size to verify compatibility. You can also contact our technical support team for assistance."
        },
        {
          question: "Are your parts OEM or aftermarket?",
          answer: "We carry both OEM (Original Equipment Manufacturer) and high-quality aftermarket parts. Each product listing clearly indicates whether it's OEM or aftermarket."
        },
        {
          question: "Do you sell used or remanufactured parts?",
          answer: "We sell new, remanufactured, and carefully inspected used parts. All listings clearly indicate the part condition, and remanufactured parts come with the same warranty as new parts."
        },
        {
          question: "What if I order the wrong part?",
          answer: "If you order the wrong part, you can return it within 30 days in original condition. Return shipping costs may apply unless the error was on our end."
        }
      ]
    },
    {
      category: "Returns & Warranty",
      questions: [
        {
          question: "What is your return policy?",
          answer: "We accept returns within 30 days of delivery for most items in new, unused condition. Items must be in original packaging with all tags and labels intact."
        },
        {
          question: "How long is the warranty coverage?",
          answer: "Warranty periods vary by product category. Engine components typically have 24-36 month coverage, while wear items like brake pads have 12-month coverage. Check individual product pages for specific warranty terms."
        },
        {
          question: "What does the warranty cover?",
          answer: "Our warranties cover manufacturing defects, material failures, and premature wear under normal use. They do not cover normal wear and tear, accident damage, or improper installation."
        },
        {
          question: "How do I file a warranty claim?",
          answer: "Contact our warranty department at 1-800-MOTOR-01 ext. 3 or email warranty@motorelite.com with your order number, part details, and description of the issue."
        }
      ]
    },
    {
      category: "Payment & Pricing",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and financing options through our partner lenders for qualified customers."
        },
        {
          question: "Do you offer financing?",
          answer: "Yes! We offer financing options for purchases over $500 through our partner lenders. Apply at checkout to see if you qualify for 0% APR financing."
        },
        {
          question: "Are your prices competitive?",
          answer: "We strive to offer competitive pricing on all our parts. If you find a lower price elsewhere, contact us about our price matching policy."
        },
        {
          question: "Do you offer volume discounts?",
          answer: "Yes! We offer volume discounts for bulk orders and have special pricing for commercial customers, repair shops, and fleet managers. Contact our sales team for details."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "Do you provide installation instructions?",
          answer: "Many of our products include installation instructions. We also have technical support available at tech@motorelite.com for installation questions and guidance."
        },
        {
          question: "Can you help me identify the part I need?",
          answer: "Absolutely! Our technical support team can help identify parts based on your vehicle information, symptoms, or photos. Contact us at tech@motorelite.com or call our technical hotline."
        },
        {
          question: "Do you offer technical phone support?",
          answer: "Yes! Our technical support team is available Monday-Friday 8AM-6PM EST at 1-800-MOTOR-01 ext. 2 for installation questions and technical guidance."
        },
        {
          question: "What tools do I need for installation?",
          answer: "Tool requirements vary by part. Check the product description for specific tool requirements, or contact our technical support team for guidance on your specific installation."
        }
      ]
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>
        
        <div className="mb-8">
          <p className="text-lg text-gray-600">
            Find answers to the most common questions about Motor Elite parts, orders, shipping, and more. Can't find what you're looking for? Contact our customer service team.
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <section key={categoryIndex}>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const globalIndex = categoryIndex * 100 + questionIndex;
                  return (
                    <div key={questionIndex} className="border border-gray-200 rounded-lg">
                      <button
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                        onClick={() => toggleFAQ(globalIndex)}
                      >
                        <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                        <div className="flex-shrink-0">
                          {openFAQ === globalIndex ? (
                            <i className="ri-subtract-line text-xl text-gray-500"></i>
                          ) : (
                            <i className="ri-add-line text-xl text-gray-500"></i>
                          )}
                        </div>
                      </button>
                      {openFAQ === globalIndex && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Still Have Questions?</h2>
          <p className="text-gray-700 mb-6">
            Our customer service team is here to help! Get in touch with us through any of these channels:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="ri-phone-line text-xl"></i>
              </div>
              <h3 className="font-semibold mb-1">Phone Support</h3>
              <p className="text-gray-600">1-800-MOTOR-01</p>
              <p className="text-sm text-gray-500">Mon-Fri 8AM-6PM EST</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="ri-mail-line text-xl"></i>
              </div>
              <h3 className="font-semibold mb-1">Email Support</h3>
              <p className="text-gray-600">support@motorelite.com</p>
              <p className="text-sm text-gray-500">24-48 hour response</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="ri-chat-1-line text-xl"></i>
              </div>
              <h3 className="font-semibold mb-1">Live Chat</h3>
              <p className="text-gray-600">Available on website</p>
              <p className="text-sm text-gray-500">Mon-Fri 9AM-5PM EST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
