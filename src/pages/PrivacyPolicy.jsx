import React from "react";
import { Link } from "react-router-dom";

function PrivacyPolicy() {
  return (
    <div className="min-h-screen w-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-8">
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-800 flex items-center group"
          >
            <svg
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Login
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8 text-gray-600">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">
                1
              </span>
              Information We Collect
            </h2>
            <div className="space-y-4 pl-11">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">
                  1.1 Personal Information
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Identity Information: Full name, email address, profile
                    picture, phone numbers
                  </li>
                  <li>
                    Professional Details: Job title, department, company role
                  </li>
                  <li>
                    Authentication Data: Encrypted passwords, security
                    questions, login history
                  </li>
                  <li>
                    Communication Preferences: Email settings, notification
                    preferences
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">
                  1.2 Business Information
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Company Details: Business name, registration numbers, tax
                    IDs
                  </li>
                  <li>
                    Contact Records: Customer interaction history, meeting
                    notes, call logs
                  </li>
                  <li>
                    Transaction Data: Sales records, contract details, payment
                    information
                  </li>
                  <li>Business Documents: Proposals, contracts, agreements</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">
                  1.3 Technical Data
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Device Information: IP addresses, browser type, operating
                    system
                  </li>
                  <li>
                    Usage Data: Feature usage patterns, access times, activity
                    logs
                  </li>
                  <li>
                    Performance Metrics: System performance data, error reports
                  </li>
                  <li>
                    Cookies and Tracking: Session identifiers, usage analytics
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">
                2
              </span>
              How We Use Your Information
            </h2>
            <div className="space-y-4 pl-11">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">
                  2.1 Service Provision
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Creating and managing your CRM account</li>
                  <li>Processing and organizing customer relationships</li>
                  <li>Providing customer support and communication</li>
                  <li>Facilitating team collaboration and data sharing</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">
                  2.2 Service Improvement
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Analyzing usage patterns to enhance features</li>
                  <li>Conducting research and development</li>
                  <li>Optimizing system performance</li>
                  <li>Personalizing user experience</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">
                  2.3 Use of Google User Data
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    We access Google user data (email, profile information,
                    Gmail access) only for features authorized by the user such
                    as sending emails, retrieving customer replies, and
                    organizing email communication in LeadMasterCRM.
                  </li>
                  <li>
                    Gmail data is accessed in real-time and is not stored unless
                    necessary for functionality (e.g., storing sent email
                    metadata).
                  </li>
                  <li>
                    We do not sell, share, or transfer Google user data to third
                    parties.
                  </li>
                  <li>
                    Access is limited to the minimum scopes required and used
                    only for user-requested actions.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">
                3
              </span>
              Data Security
            </h2>
            <div className="space-y-4 pl-11">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">
                  3.1 Security Measures
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>End-to-end encryption for data transmission (SSL/TLS)</li>
                  <li>Advanced encryption for stored data (AES-256)</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Multi-factor authentication options</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">
                  3.2 Data Protection
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Automated backup systems</li>
                  <li>Disaster recovery procedures</li>
                  <li>Access control and monitoring</li>
                  <li>Regular security training for staff</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">
                4
              </span>
              Your Rights and Choices
            </h2>
            <div className="space-y-4 pl-11">
              <p>You have the right to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-medium">Access:</span> Request copies of
                  your personal data
                </li>
                <li>
                  <span className="font-medium">Rectification:</span> Correct
                  any inaccurate information
                </li>
                <li>
                  <span className="font-medium">Deletion:</span> Request removal
                  of your data
                </li>
                <li>
                  <span className="font-medium">Restriction:</span> Limit how we
                  use your data
                </li>
                <li>
                  <span className="font-medium">Portability:</span> Receive your
                  data in a structured format
                </li>
                <li>
                  <span className="font-medium">Objection:</span> Contest our
                  use of your data
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">
                5
              </span>
              Contact Information
            </h2>
            <div className="space-y-4 pl-11">
              <p>For any privacy-related questions or concerns:</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-700">Privacy Officer</p>
                <p className="mt-2">
                  Email:{" "}
                  <a
                    href="mailto:privacy@crmsystem.com"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    privacy@crmsystem.com
                  </a>
                </p>
                <p>Response Time: Within 48 hours</p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            This privacy policy is regularly reviewed and updated to ensure
            compliance with applicable laws, Google API Services User Data
            Policy, and data protection regulations.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
