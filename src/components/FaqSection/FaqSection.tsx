import React from 'react';
import './faq.css';

const faqs = [
  {
    question: 'What is your return policy?',
    answer:
      'You can return any item within 30 days of purchase. The product must be in original condition and packaging.',
  },
  {
    question: 'Do you offer international shipping?',
    answer:
      'Yes, we ship worldwide. Shipping fees and delivery times may vary based on your location.',
  },
  {
    question: 'How can I track my order?',
    answer:
      'Once your order ships, you’ll receive an email with a tracking link to monitor delivery progress.',
  },
  {
    question: 'Can I change or cancel my order?',
    answer:
      'If your order hasn’t been processed yet, we can change or cancel it. Contact support as soon as possible.',
  },
];

const FaqSection: React.FC = () => {
  return (
    <section className="faq-section">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <h3 className="faq-question">{faq.question}</h3>
            <p className="faq-answer">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
