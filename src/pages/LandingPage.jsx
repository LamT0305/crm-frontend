import React from "react";
import { Link } from "react-router-dom";
import LeadView from "../assets/leadview.png";
import dealTracking from "../assets/deal-tracking.png";
import email from "../assets/email-integration.png";
import productView from "../assets/Productview.png";
import analytic1 from "../assets/analytic1.png";

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
              <div className="flex items-center space-x-4 mt-8 animate-fadeIn">
                <Link
                  to="/login"
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
          <div className="md:w-1/2 mt-8 md:mt-0 relative perspective-1000">
            <div className="grid grid-cols-2 gap-4 animate-float">
              <div className="space-y-4">
                <div className="transform hover:scale-105 transition-transform duration-300 hover:z-10">
                  <img
                    src={LeadView}
                    alt="Lead Management"
                    className="rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="300"
                  />
                </div>
                <div className="transform hover:scale-105 transition-transform duration-300 hover:z-10">
                  <img
                    src={dealTracking}
                    alt="Deal Tracking"
                    className="rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="300"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="transform hover:scale-105 transition-transform duration-300 hover:z-10">
                  <img
                    src={email}
                    alt="Email Integration"
                    className="rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="300"
                  />
                </div>
                <div className="transform hover:scale-105 transition-transform duration-300 hover:z-10">
                  <img
                    src={productView}
                    alt="Product View"
                    className="rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="300"
                  />
                </div>
                <div className="transform hover:scale-105 transition-transform duration-300 hover:z-10">
                  <img
                    src={analytic1}
                    alt="Analytics"
                    className="rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="300"
                  />
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-lg pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-sm animate-pulse"></div>
            <span className="inline-flex items-center bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase animate-fadeIn">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-ping"></span>
              Core Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight animate-slideUp">
              Everything You Need for
              <span className="block mt-2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Modern Customer Management
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed animate-fadeIn">
              Our comprehensive suite of features helps you manage customer
              relationships, track deals, and grow your business
              <span className="text-blue-600 font-semibold"> efficiently</span>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
              <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-10 h-10 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  Smart Communication Hub
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Integrated email system with template support
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Real-time customer interaction tracking
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Automated notification system
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600">
                    Instant Setup
                  </span>
                </div>
              </div>

              <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-10 h-10 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  Advanced Deal Management
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Visual deal pipeline tracking
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Automated quotation management
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Real-time sales analytics
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600">
                    Real-time Updates
                  </span>
                </div>
              </div>

              <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-10 h-10 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  Comprehensive Activity Center
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Task management & reminders
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Customer interaction history
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Team collaboration tools
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600">
                    Always Updated
                  </span>
                </div>
              </div>

              <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-10 h-10 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  Analytics & Reporting
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Custom dashboard creation
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Performance metrics tracking
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Export & share reports
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600">
                    Data-Driven
                  </span>
                </div>
              </div>

              <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-10 h-10 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  Customer Care Center
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Support ticket management
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Customer feedback tracking
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Service quality monitoring
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600">
                    Customer Success
                  </span>
                </div>
              </div>

              <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-10 h-10 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  Smart Scheduling
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Automated calendar sync
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Meeting reminders
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Team availability tracking
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600">
                    Time Optimization
                  </span>
                </div>
              </div>
            </div>
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
