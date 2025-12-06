import React from 'react';
import { MembershipData } from '@/utils/getInvolved';
import Image from 'next/image';
import Link from 'next/link';

interface MembershipSectionProps {
  data: MembershipData;
}

// Mapeo de nombres de iconos a rutas de archivos SVG
const iconMap: Record<string, string> = {
  card: '/Cheque.svg',
  donation: '/donate.svg',
  email: '/e-Transfer.svg',
};

const MembershipSection: React.FC<MembershipSectionProps> = ({ data }) => {
  return (
    <section id="membership" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-center text-darkgreen font-inter">
          {data.title}
        </h2>

        {/* Content */}
        <div
          className="prose prose-sm sm:prose-base lg:prose-lg mx-auto mb-8 text-gray-700 font-poppins text-center"
          dangerouslySetInnerHTML={{ __html: data.htmlContent }}
        />

        {/* Pricing Card */}
        <div className="bg-cream rounded-2xl p-6 sm:p-8 mb-8 border-2 border-darkgreen/10 max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Image 
              src="/Membership.svg" 
              alt="Membership" 
              width={32} 
              height={32}
            />
            <h3 className="text-xl sm:text-2xl font-bold text-darkgreen font-inter">
              {data.pricing.title}
            </h3>
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-terracotta mb-2 font-inter">
            {data.pricing.amount}
          </div>
          <p className="text-sm sm:text-base text-gray-600 font-opensans">{data.pricing.dueDate}</p>
        </div>

        {/* Payment Methods */}
        <h3 className="text-xl sm:text-2xl font-bold text-darkgreen mb-6 text-center font-inter">
          How to Pay
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {data.paymentMethods.map((method, index) => (
            <div
              key={index}
              className="bg-darkcream rounded-xl p-5 sm:p-6 border border-darkgreen/10 hover:border-darkgreen/20 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                {iconMap[method.icon] && (
                  <Image 
                    src={iconMap[method.icon]} 
                    alt={method.method} 
                    width={24} 
                    height={24}
                  />
                )}
                <h4 className="text-lg sm:text-xl font-semibold text-darkgreen font-inter">
                  {method.method}
                </h4>
              </div>
              <div
                className="text-sm sm:text-base text-gray-700 font-poppins prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: method.details }}
              />
            </div>
          ))}
        </div>

        {/* Note */}
        {data.note && (
          <div className="bg-olive/10 rounded-xl p-4 sm:p-5 mb-6">
            <p className="text-sm sm:text-base text-gray-700 font-opensans italic text-center">
              {data.note}
            </p>
          </div>
        )}

        {/* Membership Form PDF */}
        {data.membershipFormPDF && (
          <div className="text-center">
            <Link
              href={data.membershipFormPDF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-terracotta text-cream rounded-xl text-base sm:text-lg font-semibold shadow-md hover:bg-terracottalight transition-colors duration-300 font-inter"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Membership Form
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default MembershipSection;