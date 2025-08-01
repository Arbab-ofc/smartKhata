import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const Home = () => {
  return (
    <div className="pt-24 px-4 md:px-10 lg:px-20 bg-gray-50 min-h-screen text-gray-800">

      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          <TypeAnimation
            sequence={[
              'SmartKhata - Personal Expense Tracker 💸',
              1500,
              ' Track , Plan , Save 💼',
              1500,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </h1>
        <p className="text-sm md:text-base max-w-xl mx-auto text-gray-600">
          Your money deserves to be managed smartly. Let SmartKhata handle your expenses while you focus on life.
        </p>
      </section>

      {/* Benefits / Why Manage Expenses Section */}
      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: '📊 Financial Awareness',
            desc: 'Know where your money goes. Make informed decisions by tracking income and spending regularly.',
          },
          {
            title: '🎯 Goal Planning',
            desc: 'Plan budgets and set financial goals. Whether it’s saving, investing, or managing debt, SmartKhata helps you stay on track.',
          },
          {
            title: '⏱️ Save Time & Stress',
            desc: 'No more lost receipts or forgotten expenses. Easily access your financial history, anytime, anywhere.',
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-2xl p-6 hover:scale-[1.02] transition duration-300 border border-gray-200"
          >
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
