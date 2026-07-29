import React from 'react';

export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Urban Spazio - Signature Modular Interiors',
    image: 'https://urbanspazio.com/images/projects/signature-kitchen-1.jpg',
    '@id': 'https://urbanspazio.com',
    url: 'https://urbanspazio.com',
    telephone: '+919876543210',
    priceRange: '₹₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Golf Course Road, Sector 54',
      addressLocality: 'Gurugram',
      addressRegion: 'Haryana',
      postalCode: '122002',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.4392,
      longitude: 77.1025
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      opens: '10:00',
      closes: '19:00'
    },
    sameAs: [
      'https://instagram.com/urbanspazio.design',
      'https://facebook.com/urbanspazio'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '48'
    },
    areaServed: ['Gurugram', 'New Delhi', 'Noida', 'Faridabad', 'Delhi NCR']
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
