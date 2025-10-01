import React from 'react';

const ComingSoon: React.FC = () => {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
      <div className="mb-4">
        <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Coming Soon
      </h3>
      
      <p className="text-gray-600 max-w-md mx-auto">
        Follow us on our social media and stay updated for our next Tree Tour.
      </p>
    </div>
  );
};

export default ComingSoon;