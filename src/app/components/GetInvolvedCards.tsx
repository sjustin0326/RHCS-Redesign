import React from 'react';
import Link from 'next/link';
import { GetInvolvedCardsData } from '@/utils/homeUtils';

// Icon components
const MembershipIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const DonateIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const VolunteerIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const iconMap = {
  Membership: MembershipIcon,
  Donate: DonateIcon,
  Volunteer: VolunteerIcon,
};

interface GetInvolvedCardsProps {
  data: GetInvolvedCardsData;
}

export default function GetInvolvedCards({ data }: GetInvolvedCardsProps) {
  return (
    <section className="py-16 px-6 bg-gradient-to-b from-cream to-darkcream">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-inter font-black text-darkgreen text-center mb-12 animate-slide-down">
          {data.title}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {data.cards.map((card, index) => {
            const IconComponent = iconMap[card.icon];
            
            return (
              <Link
                key={index}
                href={card.url}
                className="group bg-white rounded-2xl p-8 shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className="mb-6 text-darkgreen group-hover:text-olive transition-colors">
                    <IconComponent />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-inter font-bold text-darkgreen mb-3 group-hover:text-olive transition-colors">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base font-poppins text-dark/70 mb-6">
                    {card.description}
                  </p>

                  {/* CTA Arrow */}
                  <div className="mt-auto">
                    <span className="inline-flex items-center text-terracotta font-inter font-semibold group-hover:text-terracottalight transition-colors">
                      Learn More
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}