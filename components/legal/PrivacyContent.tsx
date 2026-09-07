import {
  Cookie,
  CreditCard,
  FileText,
  Key,
  Mail,
  Phone,
  RefreshCw,
  Share2,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';

const policyCards = [
  {
    icon: FileText,
    title: 'Introduction',
    content:
      'This Privacy Policy describes how Alzair Dates Dry Fruits ("we", "us", or "our") collects, uses, and protects your personal information when you visit our website or purchase our products. By using our website, you agree to the practices described in this policy.',
  },
  {
    icon: UserCheck,
    title: 'Information We Collect',
    content:
      'We may collect the following types of information: personal details such as your name, email address, phone number, and shipping address when you place an order or contact us; payment information processed securely through our payment partners; and browsing data such as your IP address, browser type, and pages visited.',
  },
  {
    icon: Mail,
    title: 'How We Use Your Information',
    content:
      'We use your information to process and fulfill your orders, communicate with you about your purchases, send promotional materials (with your consent), improve our website and services, and comply with legal obligations.',
  },
  {
    icon: Cookie,
    title: 'Cookies',
    content:
      'Our website may use cookies to enhance your browsing experience, remember your preferences, and analyze site traffic. You can control cookie settings through your browser, but disabling cookies may affect some website functionality.',
  },
  {
    icon: CreditCard,
    title: 'Payment Information',
    content:
      'We do not store your full payment card details on our servers. Payment information is processed securely through trusted third-party payment gateways that comply with industry security standards.',
  },
  {
    icon: ShieldCheck,
    title: 'Data Security',
    content:
      'We implement reasonable security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.',
  },
  {
    icon: Share2,
    title: 'Third-Party Services',
    content:
      'We may use third-party services for payment processing, shipping, analytics, and marketing. These providers have their own privacy policies, and we are not responsible for their practices.',
  },
  {
    icon: Key,
    title: 'Your Rights',
    content:
      'You have the right to access, correct, or delete your personal information. You may also opt out of receiving promotional communications at any time. To exercise these rights, please contact us using the information provided below.',
  },
  {
    icon: ShieldAlert,
    title: "Children's Privacy",
    content:
      'Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children. If you believe we have collected such information, please contact us immediately.',
  },
  {
    icon: RefreshCw,
    title: 'Changes to This Policy',
    content:
      'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.',
  },
  {
    icon: Phone,
    title: 'Contact Us',
    content:
      'If you have any questions or concerns about this Privacy Policy, please contact us at alzairdates@gmail.com or call +91 7052375313.',
  },
];

export function PrivacyContent() {
  return (
    <section className="bg-[#f5f0e7] px-5 py-16 sm:py-20 text-[#171513]">
      <div className="mx-auto max-w-[1240px]">
        {/* Policy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {policyCards.map((card, idx) => {
            const Icon = card.icon;
            const isLast = idx === policyCards.length - 1;
            return (
              <div
                key={card.title}
                className={`rounded-2xl border border-[#dccbb4] bg-[#ede5d8]/75 p-7 sm:p-9 shadow-[0_8px_24px_rgba(72,53,35,0.05)] transition duration-300 hover:border-[#c49a4a] hover:bg-[#ede5d8] ${
                  isLast ? 'md:col-span-2' : ''
                }`}
              >
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#171513] text-[#c49a4a] shadow-sm">
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-[#1a1714] font-sans">
                      {card.title}
                    </h2>
                    <div className="mt-1 h-0.5 w-8 bg-[#c49a4a]/60" />
                  </div>
                </div>

                <p className="mt-4 text-xs sm:text-[13.5px] leading-relaxed text-[#554e44] font-sans">
                  {card.content}
                </p>
              </div>
            );
          })}
        </div>

        {/* Disclaimer Note */}
        <div className="mt-14 text-center">
          <p className="text-[11px] text-[#786e60] font-sans">
            This privacy policy is provided for informational purposes and should be reviewed with a legal professional.
          </p>
        </div>
      </div>
    </section>
  );
}
