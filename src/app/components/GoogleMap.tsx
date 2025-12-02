import React from 'react';

interface GoogleMapProps {
  src: string;
  width?: string;
  height?: string;
  title?: string;
  className?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  src,
  width = '600',
  height = '450',
  title = 'Google Map Location',
  className = '',
}) => {
  const aspectRatio = (parseInt(height) / parseInt(width)) * 100;
  
  return (
    <div 
      className="relative rounded-lg overflow-hidden shadow-medium" 
      style={{ paddingBottom: `${aspectRatio}%`, height: 0 }}
    >
      <iframe
        src={src}
        width={width}
        height={height}
        style={{ 
          border: 0, 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%' 
        }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
        className={className}
      ></iframe>
    </div>
  );
};

export default GoogleMap;