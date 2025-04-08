import React from "react";
import { Link } from "react-router-dom";

function TermOfService() {
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
            Terms of Service
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
              Acceptance of Terms
            </h2>
            <div className="space-y-4 pl-11">
              <p>
                By accessing and using our CRM system, you acknowledge that:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  You have read, understood, and agree to be bound by these
                  Terms of Service
                </li>
                <li>
                  You comply with all applicable local, state, national, and
                  international laws and regulations
                </li>
                <li>
                  You are at least 18 years of age or have legal parental or
                  guardian consent
                </li>
                <li>
                  You have the authority to enter into this agreement if
                  representing an organization
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">
                2
              </span>
              Service License
            </h2>
            <div className="space-y-4 pl-11">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">
                  2.1 License Grant
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Non-exclusive, non-transferable right to access and use the
                    service
                  </li>
                  <li>
                    License is valid only for the duration of active
                    subscription
                  </li>
                  <li>Limited to authorized users within your organization</li>
                  <li>Cannot be resold, distributed, or sublicensed</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">
                  2.2 Restrictions
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>No modification or derivative works</li>
                  <li>No reverse engineering or decompiling</li>
                  <li>No removal of proprietary notices</li>
                  <li>No unauthorized access attempts</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">
                3
              </span>
              User Obligations
            </h2>
            <div className="space-y-4 pl-11">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">
                  3.1 Account Security
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Maintain confidentiality of login credentials</li>
                  <li>Implement strong password practices</li>
                  <li>Report unauthorized access immediately</li>
                  <li>Regular security audit of account activities</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">
                  3.2 Data Responsibility
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Ensure accuracy of provided information</li>
                  <li>Regular backup of important data</li>
                  <li>Comply with data protection regulations</li>
                  <li>Proper management of customer data</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">
                4
              </span>
              Service Terms
            </h2>
            <div className="space-y-4 pl-11">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">
                  4.1 Service Availability
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>99.9% uptime guarantee during business hours</li>
                  <li>Scheduled maintenance windows</li>
                  <li>Emergency maintenance when required</li>
                  <li>Service monitoring and status updates</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">
                  4.2 Support Services
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>24/7 technical support via email</li>
                  <li>Priority phone support during business hours</li>
                  <li>Online documentation and resources</li>
                  <li>Regular training sessions</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">
                5
              </span>
              Legal Matters
            </h2>
            <div className="space-y-4 pl-11">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-700 mb-3">
                  Limitation of Liability
                </h3>
                <p className="text-sm leading-relaxed">
                  The CRM system is provided "as is" without warranties of any
                  kind. We shall not be liable for any indirect, incidental,
                  special, consequential, or punitive damages, including without
                  limitation, loss of profits, data, use, goodwill, or other
                  intangible losses.
                </p>
                <div className="mt-4 p-3 bg-blue-50 rounded-md">
                  <p className="text-sm text-blue-800">
                    For any legal inquiries, please contact:{" "}
                    <a href="mailto:legal@crmsystem.com" className="underline">
                      legal@crmsystem.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            These terms are subject to change. Users will be notified of any
            significant updates.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermOfService;
