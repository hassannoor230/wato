const businessInfo = {
  name: "Ahmad Wattoo Real Estate",
  tagline: "Your Trusted Property Partner in Gujranwala",
  description:
    "Ahmad Wattoo Real Estate is a dedicated real estate agency specializing in property buying, selling, renting, and investment advisory across Gujranwala and nearby premium housing societies. We provide transparent, client-focused property solutions with deep local expertise.",
  phone: "+92 302 1001860",
  phoneDisplay: "0302-1001860",
  whatsapp: "923021001860",
  email: "info@ahmadwattoorealestate.com",
  address: "23-B, Main Boulevard Commercial, Sialkot Road, Gujranwala, Pakistan",
  city: "Gujranwala",
  province: "Punjab",
  country: "Pakistan",
  hours: {
    weekdays: "Mon - Fri: 10:00 AM - 8:00 PM",
    saturday: "Sat: 10:00 AM - 6:00 PM",
    sunday: "Sun: 11:00 AM - 4:00 PM",
  },
  social: {
    facebook: "#",
    instagram: "#",
    linkedin: "https://linkedin.com/in/ahmad-wattoo-2797b9348",
    youtube: "#",
  },
  googleMapsUrl:
    "https://www.google.com/maps/place/Ahmad+Wattoo+Real+Estate/@32.1658354,74.1384031,13z/data=!4m7!3m6!1s0x391ed7e1eb7d23d9:0x45d20816b08be915!8m2!3d32.1837301!4d74.2213027!15sChNyZWFsIGVzdGF0ZSBuZWFyIG1lIgOQAQFaFSITcmVhbCBlc3RhdGUgbmVhciBtZZIBEnJlYWxfZXN0YXRlX2FnZW5jeZoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VSR09EZFFjaTFCUlJBQuABAPoBBAgAEBA!16s%2Fg%2F11kjg3hdqj?entry=tts",
  services: [
    {
      id: 1,
      title: "Property Buying",
      description:
        "Find verified residential and commercial properties in Gujranwala, Sialkot Road, and nearby premium housing societies. We ensure transparent pricing and secure transactions.",
      icon: "home",
    },
    {
      id: 2,
      title: "Property Selling",
      description:
        "List your property with us for maximum visibility and best market value. Our marketing strategy and buyer network help you close deals faster.",
      icon: "trending-up",
    },
    {
      id: 3,
      title: "Investment Advisory",
      description:
        "Get expert guidance on high-growth property investments. We analyze market trends, upcoming projects, and ROI opportunities tailored to your budget.",
      icon: "chart",
    },
    {
      id: 4,
      title: "Rental Solutions",
      description:
        "Whether you're looking to rent out your property or find a rental home, our team connects you with the right tenants or landlords quickly.",
      icon: "key",
    },
    {
      id: 5,
      title: "Legal & Documentation",
      description:
        "We handle sale deeds, registration, transfer letters, and all legal paperwork to ensure your transaction is smooth, secure, and compliant.",
      icon: "file",
    },
    {
      id: 6,
      title: "Property Management",
      description:
        "From maintenance to tenant management, we offer end-to-end property management services so your investment stays profitable and stress-free.",
      icon: "building",
    },
  ],
  featuredProperties: [
    {
      id: 1,
      title: "5 Marla Plot on Sialkot Road, Gujranwala",
      price: "PKR 200 Lakh",
      type: "For Sale",
      location: "Gujranwala",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
      bedrooms: null,
      bathrooms: null,
      area: "5 Marla",
    },
    {
      id: 2,
      title: "10 Marla Residential Plot near Central City, Gujranwala",
      price: "PKR 170 Lakh",
      type: "For Sale",
      location: "Gujranwala",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      bedrooms: null,
      bathrooms: null,
      area: "10 Marla",
    },
    {
      id: 3,
      title: "Commercial Shop in Main Market, Gujranwala",
      price: "PKR 95 Lakh",
      type: "For Sale",
      location: "Gujranwala",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      bedrooms: null,
      bathrooms: null,
      area: "450 Sq Ft",
    },
  ],
  stats: [
    { label: "Properties Sold", value: "500+" },
    { label: "Happy Clients", value: "400+" },
    { label: "Years Experience", value: "8+" },
    { label: "Areas Covered", value: "12+" },
  ],
  testimonials: [
    {
      id: 1,
      name: "Ali Hassan",
      role: "Property Buyer",
      text: "Ahmad Wattoo and his team made the entire process of buying our dream home in Gujranwala incredibly smooth. Their market knowledge and professionalism are outstanding.",
      rating: 5,
    },
    {
      id: 2,
      name: "Sara Ahmed",
      role: "Property Investor",
      text: "I've invested in three properties through Ahmad Wattoo Real Estate. Their investment advice has always been spot-on, and the returns have exceeded my expectations.",
      rating: 5,
    },
    {
      id: 3,
      name: "Muhammad Usman",
      role: "Property Seller",
      text: "Sold my plot in Bahria Orchard at a great price thanks to their extensive buyer network. Highly recommend their services for anyone looking to sell or buy.",
      rating: 5,
    },
  ],
  faqs: [
    {
      id: 1,
      question: "What areas do you cover?",
      answer:
        "We primarily operate in Gujranwala, Sialkot Road, and surrounding premium housing societies including new residential developments and commercial hubs across the city.",
    },
    {
      id: 2,
      question: "Do you handle commercial properties?",
      answer:
        "Yes, we deal in both residential and commercial properties including plots, houses, apartments, shops, and office spaces across our service areas.",
    },
    {
      id: 3,
      question: "How do I schedule a property viewing?",
      answer:
        "You can call us directly at 0302-1001860 or send a message on WhatsApp. We arrange same-day or next-day viewings based on availability.",
    },
    {
      id: 4,
      question: "Are your properties verified?",
      answer:
        "All properties listed with us undergo thorough verification. We check ownership documents, legal status, and physical inspection before listing any property.",
    },
    {
      id: 5,
      question: "Do you provide home financing assistance?",
      answer:
        "While we are not a financing institution, we have partnerships with leading banks and financial institutions that can help you with home loans and mortgage facilities.",
    },
  ],
};

export default businessInfo;
