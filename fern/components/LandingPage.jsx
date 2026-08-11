import React from 'react';

export default function LandingPage() {
  const documentationCards = [
    {
      icon: '📚',
      title: 'Documentation',
      description: 'Learn how to use MonoCloud',
      href: '/get-started',
    },
    {
      icon: '⚙️',
      title: 'API References',
      description: 'Complete API documentation',
      href: '/api',
    },
  ];

  const quickStartCards = [
    {
      icon: '🔐',
      title: 'Authentication',
      href: '/authentication',
    },
    {
      icon: '🚀',
      title: 'Getting Started',
      href: '/get-started',
    },
    {
      icon: '👥',
      title: 'Manage Users',
      href: '/manage-user',
    },
    {
      icon: '🎨',
      title: 'Customize',
      href: '/customize',
    },
  ];

  const integrations = [
    { icon: '⚛️', name: 'React' },
    { icon: '🔷', name: 'Angular' },
    { icon: '▲', name: 'Next.js' },
    { icon: '🍎', name: 'iOS' },
    { icon: '🤖', name: 'Android' },
    { icon: '☕', name: 'Java' },
    { icon: '.NET', name: '.NET' },
    { icon: '🐍', name: 'Python' },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ padding: "50px", fontSize: '80px' ,marginBottom: "0px" ,fontFamily: "Roboto"}}>MonoCloud Docs</h1>
        <p style={{ fontSize: '1.1rem', color: '#ccc', marginBottom: '3rem' }}>
          Browse the latest documentation, tutorials, and API reference.
        </p>

        {/* Documentation Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
          {documentationCards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              style={{
                padding: '2rem',
                border: '1px solid #333',
                borderRadius: '8px',
                textDecoration: 'none',
                color: 'white',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1a1a1a';
                e.currentTarget.style.borderColor = '#555';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = '#333';
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{card.icon}</div>
              <h3 style={{ marginBottom: '0.5rem' }}>{card.title}</h3>
              <p style={{ color: '#aaa' }}>{card.description}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Get Started Section */}
      <div style={{ marginBottom: '4rem' }}>
        <h2 style={{ marginBottom: '2rem' }}>Get Started with MonoCloud</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {quickStartCards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              style={{
                padding: '1.5rem',
                border: '1px solid #333',
                borderRadius: '8px',
                textAlign: 'center',
                textDecoration: 'none',
                color: 'white',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1a1a1a';
                e.currentTarget.style.borderColor = '#555';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = '#333';
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{card.icon}</div>
              <div>{card.title}</div>
            </a>
          ))}
        </div>
      </div>

      {/* Integrations Section */}
      <div>
        <h2 style={{ marginBottom: '2rem' }}>Popular Integrations</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {integrations.map((integration) => (
            <div
              key={integration.name}
              style={{
                padding: '2rem',
                border: '1px solid #333',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{integration.icon}</div>
              <h4 style={{ marginBottom: 0 }}>{integration.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}