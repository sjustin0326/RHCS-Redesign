import React from 'react';
import { DonationsData } from '@/utils/getInvolved';
import Image from 'next/image';

interface DonationsSectionProps {
  data: DonationsData;
}

// Mapeo de nombres de iconos a rutas de archivos SVG
const iconMap: Record<string, string> = {
  card: '/Cheque.svg',
  donation: '/Cash.svg',
  email: '/e-Transfer.svg',
};

const DonationsSection: React.FC<DonationsSectionProps> = ({ data }) => {
  return (
    <section id="donate" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-darkcream to-cream px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-center text-darkgreen font-inter">
          {data.title}
        </h2>

        {/* Content */}
        <div
          className="prose prose-sm sm:prose-base lg:prose-lg mx-auto mb-10 text-gray-700 font-poppins text-center"
          dangerouslySetInnerHTML={{ __html: data.htmlContent }}
        />

        {/* Payment Options */}
        <h3 className="text-xl sm:text-2xl font-bold text-darkgreen mb-6 text-center font-inter">
          Payment Options
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-6">
          {data.paymentOptions.map((option, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-5 sm:p-6 border-2 hover:shadow-medium transition-all relative ${
                option.preferred
                  ? 'border-terracotta shadow-medium'
                  : 'border-darkgreen/10 hover:border-darkgreen/20'
              }`}
            >
              {option.preferred && (
                <div className="absolute top-0 right-0 bg-terracotta text-cream text-xs font-semibold px-3 py-1 rounded-bl-xl rounded-tr-xl font-opensans">
                  Preferred
                </div>
              )}
              <div className="flex flex-col items-center text-center">
                {iconMap[option.icon] && (
                  <div className="w-12 h-12 mb-3 flex items-center justify-center">
                    <Image
                      src={iconMap[option.icon]}
                      alt={option.method}
                      width={48}
                      height={48}
                    />
                  </div>
                )}
                <h4 className="text-lg sm:text-xl font-semibold text-darkgreen mb-3 font-inter">
                  {option.method}
                </h4>
                <div
                  className="text-sm sm:text-base text-gray-700 font-poppins prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: option.details }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Tax Receipt Note */}
        {data.taxReceiptNote && (
          <div className="bg-olive/10 rounded-xl p-4 sm:p-5 flex items-start gap-3">
            <svg className="w-5 h-5 text-olive flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-sm sm:text-base text-gray-700 font-opensans">
              {data.taxReceiptNote}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DonationsSection;