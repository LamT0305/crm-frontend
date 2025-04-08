import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white w-[100vw]">
      {/* Navigation */}
      <nav className="px-6 py-4 flex justify-between items-center fixed w-full bg-white/80 backdrop-blur-sm z-50">
        <div className="text-2xl font-bold text-blue-600 hover:scale-105 transition-transform">
          CRM System
        </div>
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-6 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-300"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-24 py-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 transform hover:translate-y-[-5px] transition-transform duration-300">
            <div className="space-y-4">
              <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-semibold animate-fadeIn">
                #1 CRM Solution for Small Businesses
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight animate-fadeIn bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Transform Your Customer Relations into Growth
              </h1>
              <div className="space-y-4 text-lg text-gray-600 animate-slideUp">
                <p>
                  Streamline your customer communications and boost business
                  growth with our comprehensive CRM solution.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                    Automate email communications
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                    Track customer interactions in real-time
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                    Generate insightful analytics reports
                  </li>
                </ul>
              </div>
              <div className="flex items-center space-x-4 mt-8">
                <Link
                  to="/register"
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 hover:shadow-lg transform hover:translate-y-[-2px] transition-all duration-300"
                >
                  Start Free Trial
                </Link>
                <p className="text-sm text-gray-500">
                  ⭐️ No credit card required
                </p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 transform hover:scale-105 transition-transform duration-500 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-20"></div>
            <img
              src="/dashboard-preview.png"
              alt="Dashboard Preview"
              className="relative rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/10 to-transparent rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-sm"></div>
            <span className="inline-flex items-center bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase animate-fadeIn">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Innovation Meets Simplicity
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
              Elevate Your Business with
              <span className="block mt-2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Intelligent CRM Solutions
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Discover how our cutting-edge features transform complex customer
              relationships into
              <span className="text-blue-600 font-semibold">
                {" "}
                seamless experiences
              </span>
              . Built for modern businesses that demand
              <span className="text-blue-600 font-semibold"> excellence</span>.
            </p>
            <div className="flex justify-center gap-4 mt-6 text-sm text-gray-500">
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                99.9% Uptime
              </span>
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                24/7 Support
              </span>
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Enterprise Security
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Email Integration",
                description:
                  "Connect your Gmail account instantly. Auto-organize customer emails, track responses, and never miss important communications.",
                icon: "📧",
                highlight: "Instant Setup",
              },
              {
                title: "360° Customer Management",
                description:
                  "Get a complete view of your customers. Track interactions, manage profiles, and access history with just one click.",
                icon: "👥",
                highlight: "Real-time Updates",
              },
              {
                title: "Seamless Team Collaboration",
                description:
                  "Work together effortlessly. Share customer insights, assign tasks, and maintain clear communication across your team.",
                icon: "🤝",
                highlight: "Built for Teams",
              },
              {
                title: "Powerful Analytics",
                description:
                  "Make data-driven decisions with comprehensive analytics. Track KPIs and generate insightful reports instantly.",
                icon: "📊",
                highlight: "Visual Reports",
              },
              {
                title: "Task Automation",
                description:
                  "Automate repetitive tasks and workflows. Save time and focus on what matters most - your customers.",
                icon: "⚡️",
                highlight: "Time Saving",
              },
              {
                title: "Secure & Reliable",
                description:
                  "Enterprise-grade security for your data. Regular backups and 99.9% uptime guarantee for peace of mind.",
                icon: "🔒",
                highlight: "Enterprise Grade",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 border border-gray-100 rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 bg-white relative group"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                <span className="text-4xl mb-6 block">{feature.icon}</span>
                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium inline-block mb-4">
                  {feature.highlight}
                </span>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-8">
        <div className="container mx-auto px-6 text-center text-gray-600 hover:text-gray-800 transition-colors duration-300">
          <p>© 2024 CRM System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
