export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Austin Dest",
    alternateName: ["JayDee", "Austin Martin"],
    description:
      "Professional DJ, Producer, and Musician specializing in House, Progressive, and Groove music.",
    url: "https://austindest.com",
    image: "https://austindest.com/images/austin-dest-profile.jpg",
    sameAs: [
      "https://soundcloud.com/austindest",
      "https://instagram.com/austindest",
      "https://twitter.com/austindest",
      "https://facebook.com/austindest",
    ],
    jobTitle: "DJ, Producer, Musician",
    worksFor: {
      "@type": "Organization",
      name: "Austin Dest Music",
    },
    genre: ["House", "Progressive House", "Groove", "Electronic"],
    award: [
      {
        "@type": "Award",
        name: "Amsterdam Dance Event Performer",
        dateAwarded: "2023",
      },
    ],
    performerIn: {
      "@type": "Event",
      name: "Amsterdam Dance Event",
      startDate: "2023-10-18",
      endDate: "2023-10-22",
      location: {
        "@type": "Place",
        name: "Amsterdam",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Amsterdam",
          addressCountry: "Netherlands",
        },
      },
    },
    hasOccupation: {
      "@type": "Occupation",
      name: "DJ",
      description: "Professional DJ and music producer",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
