import React, { useState, useEffect } from 'react';
import profileImg from '/profile.jpg';
import { sendEmail } from './emailService';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [scrollY, setScrollY] = useState(0);

  const fullText = "Java Developer";

  // Typing animation effect
  useEffect(() => {
    let i = 0;
    const typeTimer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeTimer);
      }
    }, 100);
    return () => clearInterval(typeTimer);
  }, []);

  // Enhanced smooth scroll effect with easing and scroll reveal animations
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Detect which section is currently in view
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = currentScrollY + 150; // Offset for better detection
      
      let currentSection = 'home';
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);
        if (element && element.offsetTop <= scrollPosition) {
          currentSection = sectionId;
          break;
        }
      }
      
      setActiveSection(currentSection);
      
      // Add smooth scroll behavior to all internal links
      const internalLinks = document.querySelectorAll('a[href^="#"]');
      internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href')?.substring(1);
          if (targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
              });
            }
          }
        });
      });
      
      // Smooth scroll behavior for internal links only
      // Removed the dimming effect that was making sections appear dim
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ColorSpace-inspired color palette with exact gradient stops
  const colors = {
    primary: '#00bf72', // Teal green
    secondary: '#00a889', // Darker teal
    accent: '#a8eb12', // Lime green
    teal: '#00bf72', // Teal for gradients
    lime: '#a8eb12', // Lime green
    dark: '#051937', // Deep navy
    darker: '#004d7a', // Dark blue
    light: '#ffffff', // Pure white
    white: '#ffffff', // White
    gray: '#6B7280', // Medium gray
    lightGray: '#F3F4F6', // Light gray
    background: 'linear-gradient(135deg, #051937 0%, #004d7a 25%, #008793 50%, #00bf72 75%, #a8eb12 100%)', // ColorSpace gradient
    glass: 'rgba(255, 255, 255, 0.1)', // Glass effect
    glassBorder: 'rgba(255, 255, 255, 0.2)' // Glass border
  };

  // Navigation items
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About Me', icon: '👨‍💻' },
    { id: 'skills', label: 'Technical Skills', icon: '⚡' },
    { id: 'experience', label: 'Work Experience', icon: <img src="/exp.png" alt="Experience" style={{ width: 16, height: 16, objectFit: 'contain' }} /> },
    { id: 'projects', label: 'My Projects', icon: '📊' },
    { id: 'contact', label: 'Get In Touch', icon: '📧' }
  ];

  // Enhanced smooth scroll to section with easing
  interface ScrollToSectionFn {
    (sectionId: string): void;
  }

  const scrollToSection: ScrollToSectionFn = (sectionId) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.offsetTop - 100;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // Smooth easing function for scroll animations
  const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
  };

  // Enhanced modern card component with smooth hover effects
  interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
  }

  const Card: React.FC<CardProps> = ({ children, className = '', hover = true, ...props }) => (
    <div
      {...props}
      style={{
        background: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '24px',
        padding: '32px',
        boxShadow: `
          0 20px 60px rgba(0, 0, 0, 0.1),
          0 10px 30px rgba(0, 0, 0, 0.08),
          inset 0 1px 0 rgba(255, 255, 255, 0.05)
        `,
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        cursor: 'pointer',
        willChange: 'transform, box-shadow',
        ...props.style
      }}
      className={`card-hover ${className}`}
    >
      {children}
    </div>
  );

  // Enhanced modern button component with smooth hover effects
  type ButtonVariant = 'primary' | 'outline' | 'ghost';
  type ButtonSize = 'lg' | 'md' | 'sm';

  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
  }

  const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', ...props }) => {
    const baseStyles: React.CSSProperties = {
      border: 'none',
      borderRadius: '24px',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      textDecoration: 'none',
      fontSize: size === 'lg' ? '18px' : size === 'sm' ? '16px' : '18px',
      padding: size === 'lg' ? '20px 40px' : size === 'sm' ? '14px 24px' : '18px 36px',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      position: 'relative',
      overflow: 'hidden',
      willChange: 'transform, box-shadow',
    };

    const variants: Record<ButtonVariant, React.CSSProperties> = {
      primary: {
        background: `linear-gradient(135deg, ${colors.primary}, ${colors.teal})`,
        color: colors.white,
        boxShadow: `
          0 8px 32px rgba(16, 185, 129, 0.3),
          0 4px 16px rgba(0, 0, 0, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.2),
          inset 0 -1px 0 rgba(0, 0, 0, 0.1)
        `,
        border: 'none',
      },
      outline: {
        background: 'rgba(255, 255, 255, 0.9)',
        color: colors.dark,
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.8),
          inset 0 -1px 0 rgba(0, 0, 0, 0.05)
        `,
        border: 'none',
      },
      ghost: {
        background: 'rgba(255, 255, 255, 0.0000001)',
        color: colors.dark,
        boxShadow: 'none',
        border: '1px solid rgba(255, 255, 255, 0.05)',
      }
    };

    return (
      <button
        {...props}
        style={{
          ...baseStyles,
          ...variants[variant],
          ...props.style
        }}
        onMouseEnter={(e) => {
          const target = e.currentTarget;
          if (variant === 'primary') {
            target.style.transform = 'translateY(-6px) scale(1.05)';
            target.style.boxShadow = `
              0 20px 60px rgba(16, 185, 129, 0.5),
              0 12px 32px rgba(0, 0, 0, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.4),
              inset 0 -1px 0 rgba(0, 0, 0, 0.15)
            `;
          } else if (variant === 'outline') {
            target.style.transform = 'translateY(-6px) scale(1.05)';
            target.style.boxShadow = `
              0 20px 60px rgba(0, 0, 0, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.95),
              inset 0 -1px 0 rgba(0, 0, 0, 0.1)
            `;
          }
        }}
        onMouseLeave={(e) => {
          const target = e.currentTarget;
          if (variant === 'primary') {
            target.style.transform = 'translateY(0) scale(1)';
            target.style.boxShadow = `
              0 8px 32px rgba(16, 185, 129, 0.3),
              0 4px 16px rgba(0, 0, 0, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.2),
              inset 0 -1px 0 rgba(0, 0, 0, 0.1)
            `;
          } else if (variant === 'outline') {
            target.style.transform = 'translateY(0) scale(1)';
            target.style.boxShadow = `
              0 8px 32px rgba(0, 0, 0, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.8),
              inset 0 -1px 0 rgba(0, 0, 0, 0.05)
            `;
          }
        }}
      >
        {children}
      </button>
    );
  };

  // Enhanced glossy navigation bar with smooth hover effects
  const Navigation = () => (
    <nav style={{
      position: 'fixed',
      top: '32px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      background: 'rgba(255, 255, 255, 0.0000001)',
      backdropFilter: 'blur(40px)',
      WebkitBackdropFilter: 'blur(40px)',
      borderRadius: '50px',
      border: '1px solid rgba(255, 255, 255, 0.01)',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    }}>
      {[
        { label: 'Home', id: 'home' },
        { label: 'About Me', id: 'about' },
        { label: 'Technical Skills', id: 'skills' },
        { label: 'Work Experience', id: 'experience' },
        { label: 'My Projects', id: 'projects' },
        { label: 'Get In Touch', id: 'contact' },
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          style={{
            background: 'transparent',
            color: activeSection === item.id ? colors.white : 'rgba(255, 255, 255, 0.8)',
            border: 'none',
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            letterSpacing: '0.3px',
            transition: 'all 0.3s ease',
            position: 'relative',
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
            borderRadius: '25px',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = colors.white;
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = activeSection === item.id ? colors.white : 'rgba(255, 255, 255, 0.8)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          {item.label}
          {activeSection === item.id && (
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '20px',
              height: '2px',
              background: colors.primary,
              borderRadius: '1px',
            }} />
          )}
        </button>
      ))}
      
      {/* Resume Download Button */}
      <a
        href="/resume.pdf"
        download
        style={{
          background: 'rgba(255, 255, 255, 0.0000001)',
          color: colors.white,
          border: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '8px 16px',
          borderRadius: '25px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          textDecoration: 'none',
          display: 'inline-block',
          whiteSpace: 'nowrap',
          letterSpacing: '0.3px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.0000001)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
              >
         Resume
        </a>
    </nav>
  );

  // ColorSpace-style Logo component (hidden since logo is in navbar)
  const Logo = () => null;

  // Resume button component (removed - now integrated in navigation)
  const ResumeButton = () => null;

  // Enhanced glossy background with blackish finish and glowing effects
  const BackgroundGradients = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: -1,
      overflow: 'hidden',
      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.2) 100%)',
    }}>
      {/* Primary emerald blob with enhanced glow */}
      <div style={{
        position: 'absolute',
        top: '8%',
        left: '3%',
        width: '450px',
        height: '450px',
        background: `radial-gradient(circle, ${colors.primary}20 0%, ${colors.accent}15 40%, ${colors.teal}12 70%, transparent 100%)`,
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'float 25s ease-in-out infinite',
        transform: `translateY(${scrollY * 0.1}px)`,
        boxShadow: `0 0 100px ${colors.primary}30, 0 0 200px ${colors.primary}20`,
        transition: 'transform 0.1s ease-out',
        willChange: 'transform',
      }} />
      
      {/* Teal-purple blob with enhanced glow */}
      <div style={{
        position: 'absolute',
        bottom: '12%',
        right: '5%',
        width: '400px',
        height: '400px',
        background: `radial-gradient(circle, ${colors.teal}18 0%, #8B5CF6 15 40%, #A855F7 12 70%, transparent 100%)`,
        borderRadius: '50%',
        filter: 'blur(100px)',
        animation: 'float 30s ease-in-out infinite reverse',
        transform: `translateY(${scrollY * 0.15}px)`,
        boxShadow: `0 0 120px ${colors.teal}30, 0 0 240px ${colors.teal}20`,
        transition: 'transform 0.1s ease-out',
        willChange: 'transform',
      }} />
      
      {/* Blue accent blob with enhanced glow */}
      <div style={{
        position: 'absolute',
        top: '55%',
        left: '45%',
        width: '350px',
        height: '350px',
        background: `radial-gradient(circle, #3B82F6 15 0%, ${colors.teal}12 40%, transparent 80%)`,
        borderRadius: '50%',
        filter: 'blur(120px)',
        animation: 'float 35s ease-in-out infinite',
        transform: `translateY(${scrollY * 0.2}px)`,
        boxShadow: `0 0 150px #3B82F6 30, 0 0 300px #3B82F6 20`,
        transition: 'transform 0.1s ease-out',
        willChange: 'transform',
      }} />
      
      {/* Sunset gradient blob with enhanced glow */}
      <div style={{
        position: 'absolute',
        top: '75%',
        left: '15%',
        width: '300px',
        height: '300px',
        background: `radial-gradient(circle, #F59E0B 12 0%, #EC4899 10 40%, #F97316 08 70%, transparent 100%)`,
        borderRadius: '50%',
        filter: 'blur(90px)',
        animation: 'float 28s ease-in-out infinite reverse',
        transform: `translateY(${scrollY * 0.12}px)`,
        boxShadow: `0 0 80px #F59E0B 25, 0 0 160px #F59E0B 15`,
        transition: 'transform 0.1s ease-out',
        willChange: 'transform',
      }} />
      
      {/* Enhanced floating glass panels with glow */}
      <div style={{
        position: 'absolute',
        top: '25%',
        right: '20%',
        width: '200px',
        height: '200px',
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '24px',
        filter: 'blur(40px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        animation: 'float 22s ease-in-out infinite',
        transform: `translateY(${scrollY * 0.08}px) rotate(${scrollY * 0.02}deg)`,
        boxShadow: '0 0 60px rgba(255, 255, 255, 0.2), 0 0 120px rgba(255, 255, 255, 0.1)',
        transition: 'transform 0.1s ease-out',
        willChange: 'transform',
      }} />
      
      {/* Additional blackish overlay for depth */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.1) 70%, rgba(0, 0, 0, 0.2) 100%)',
        pointerEvents: 'none',
      }} />
    </div>
  );

  // SVG icon components
  const GitHubIcon = () => (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#181717" d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z"/></svg>
  );
  // Real-world skill icons using PNG files
  const JavaIcon = () => (
    <img src="/java.png" alt="Java" style={{ width: 48, height: 48, objectFit: 'contain' }} />
  );
  
  const SpringIcon = () => (
    <img src="/springboot.svg" alt="Spring Boot" style={{ width: 48, height: 48, objectFit: 'contain' }} />
  );
  
  const MicroservicesIcon = () => (
    <img src="/microservices.jpg" alt="Microservices" style={{ width: 48, height: 48, objectFit: 'contain' }} />
  );
  
  const OracleIcon = () => (
    <img src="/oracledb.png" alt="Oracle Database" style={{ width: 48, height: 48, objectFit: 'contain' }} />
  );
  
  const APIIcon = () => (
    <img src="/restapi.png" alt="REST API" style={{ width: 48, height: 48, objectFit: 'contain' }} />
  );
  
  const JenkinsIcon = () => (
    <img src="/jenkins.png" alt="Jenkins" style={{ width: 48, height: 48, objectFit: 'contain' }} />
  );
  
  const GitIcon = () => (
    <img src="/git.png" alt="Git" style={{ width: 48, height: 48, objectFit: 'contain' }} />
  );
  
  const AWSIcon = () => (
    <img src="/aws.png" alt="AWS" style={{ width: 48, height: 48, objectFit: 'contain' }} />
  );
  
  const DockerIcon = () => (
    <img src="/docker.png" alt="Docker" style={{ width: 48, height: 48, objectFit: 'contain' }} />
  );
  const LinkedInIcon = () => (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#0077B5" d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.72z"/></svg>
  );
  const EmailIcon = () => (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 13.065 2.4 6.6A2 2 0 0 1 4 4h16a2 2 0 0 1 1.6 2.6l-9.6 6.465Zm0 2.87 9.6-6.465V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.47l9.6 6.465Z"/></svg>
  );
  
  const PhoneIcon = () => (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path fill="#000000" d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19c-.54 0-.99.45-.99.99 0 9.4 7.6 17 17 17 .54 0 .99-.45.99-.99v-3.45c0-.54-.45-.99-.99-.99z"/>
    </svg>
  );

  // ColorSpace-style Hero Section
  const HeroSection = () => (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '100px', // Account for fixed navbar
        opacity: 1,
        transform: 'translateY(0) scale(1)',
        transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    >
      {/* Main Content Container */}
      <div style={{
        textAlign: 'center',
        color: colors.white,
        zIndex: 2,
        maxWidth: 'none',
        width: '100%',
        margin: '0 auto',
        transform: `translateY(${scrollY * 0.1}px)`,
        transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}>
        {/* Main Heading */}
        <h1 style={{
          fontSize: '4.5rem',
          fontWeight: '900',
          marginBottom: '32px',
          color: colors.white,
          lineHeight: '1.1',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05) rotate(1deg)';
          e.currentTarget.style.textShadow = '0 4px 20px rgba(255, 255, 255, 0.4), 0 0 30px rgba(0, 191, 114, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
          e.currentTarget.style.textShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        }}
        >
          ADITYA KATKOJU
        </h1>

        <p style={{
          fontSize: '1.75rem',
          lineHeight: '1.2',
          marginBottom: '48px',
          color: 'rgba(255, 255, 255, 0.9)',
          maxWidth: 'none',
          margin: '0 auto 48px',
          fontWeight: '400',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
          textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          textAlign: 'center',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.02) translateY(-5px)';
          e.currentTarget.style.color = colors.white;
          e.currentTarget.style.textShadow = '0 3px 15px rgba(255, 255, 255, 0.5), 0 0 20px rgba(0, 191, 114, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) translateY(0)';
          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
          e.currentTarget.style.textShadow = '0 1px 5px rgba(0, 0, 0, 0.2)';
        }}
        >
          I'm Aditya, a Java Developer passionate about building robust banking and payment systems
        </p>
      </div>
    </section>
  );

  // About Section with glassmorphism
  const AboutSection = () => (
    <section
      id="about"
      style={{
        padding: '80px 32px',
        background: 'transparent',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div style={{ maxWidth: '2600px', margin: '0 auto', width: '120%' }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '60px',
        }}>
          <h2 style={{
            fontSize: '3.5rem',
            fontWeight: '800',
            color: colors.white,
            marginBottom: '24px',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.03) translateY(-3px)';
            e.currentTarget.style.textShadow = '0 4px 20px rgba(255, 255, 255, 0.4), 0 0 25px rgba(0, 191, 114, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
            e.currentTarget.style.textShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
          }}
          >
            About Me
          </h2>
          <div style={{
            width: '80px',
            height: '4px',
            background: `linear-gradient(90deg, ${colors.primary}, ${colors.teal})`,
            borderRadius: '2px',
            margin: '0 auto',
            boxShadow: `0 0 20px ${colors.primary}40`,
          }} />
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Card style={{ maxWidth: '1200px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              {/* Profile Image with glassmorphism */}
              <div style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'rgba(0, 0, 0, 0.25)',
                margin: '0 auto 32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '80px',
                boxShadow: `
                  0 20px 60px rgba(0, 0, 0, 0.2),
                  0 10px 30px rgba(0, 0, 0, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1)
                `,
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
                e.currentTarget.style.boxShadow = `
                  0 30px 80px rgba(255, 255, 255, 0.4),
                  0 15px 45px rgba(0, 0, 0, 0.2),
                  inset 0 1px 0 rgba(255, 255, 255, 0.6)
                `;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                e.currentTarget.style.boxShadow = `
                  0 20px 60px rgba(255, 255, 255, 0.2),
                  0 10px 30px rgba(0, 0, 0, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.3)
                `;
              }}
              >
                <img
                  src={profileImg}
                  alt="Profile"
                  style={{
                    width: '192px',
                    height: '192px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: `4px solid ${colors.white}`,
                    boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                  }}
                />
              </div>
            </div>
            <p style={{
              color: colors.white,
              lineHeight: '1.8',
              fontSize: '1.1rem',
              textAlign: 'center',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02) translateY(-3px)';
              e.currentTarget.style.color = colors.white;
              e.currentTarget.style.textShadow = '0 3px 15px rgba(255, 255, 255, 0.5), 0 0 20px rgba(0, 191, 114, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
              e.currentTarget.style.color = colors.white;
              e.currentTarget.style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.2)';
            }}
            >
              With 3+ years of experience in Java development, I specialize in building robust banking and payment systems 
              using enterprise-grade technologies and best practices.
            </p>
            
            <div style={{ textAlign: 'left', marginTop: '32px' }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: colors.white,
                marginBottom: '16px',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02) translateY(-2px)';
                e.currentTarget.style.textShadow = '0 3px 15px rgba(255, 255, 255, 0.5), 0 0 20px rgba(0, 191, 114, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.2)';
              }}
              >
                Education
              </h3>
              <p style={{
                color: colors.white,
                lineHeight: '1.8',
                fontSize: '1.1rem',
                textAlign: 'left',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02) translateY(-2px)';
                e.currentTarget.style.color = colors.white;
                e.currentTarget.style.textShadow = '0 3px 15px rgba(255, 255, 255, 0.5), 0 0 20px rgba(0, 191, 114, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.color = colors.white;
                e.currentTarget.style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.2)';
              }}
              >
                <strong>M.S. in Computer Science</strong><br />
                Montclair State University<br />
                <br />
                Specialized in Software Engineering, Enterprise Systems, and Banking Technology
              </p>
            </div>
          </Card>
        </div>


      </div>
    </section>
  );

  // Skills Section
  const SkillsSection = () => {
    const skills = [
      { name: 'Java', icon: <JavaIcon /> },
      { name: 'Spring Boot', icon: <SpringIcon /> },
      { name: 'Microservices', icon: <MicroservicesIcon /> },
      { name: 'Oracle Database', icon: <OracleIcon /> },
      { name: 'REST API', icon: <APIIcon /> },
      { name: 'Docker', icon: <DockerIcon /> },
      { name: 'AWS', icon: <AWSIcon /> },
      { name: 'Jenkins', icon: <JenkinsIcon /> },
      { name: 'Git', icon: <GitIcon /> },
    ];

    return (
      <section
        id="skills"
        style={{
          padding: '40px 32px',
          background: 'transparent',
          minHeight: '50vh',
        }}
      >
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '60px',
          }}>
                      <h2 style={{
            fontSize: '3.5rem',
            fontWeight: '800',
            color: colors.white,
            marginBottom: '24px',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.03) translateY(-3px)';
            e.currentTarget.style.textShadow = '0 4px 20px rgba(255, 255, 255, 0.4), 0 0 25px rgba(0, 191, 114, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
            e.currentTarget.style.textShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
          }}
          >
            Technical Skills
          </h2>
            <div style={{
              width: '80px',
              height: '4px',
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.teal})`,
              borderRadius: '2px',
              margin: '0 auto',
              boxShadow: `0 0 20px ${colors.primary}40`,
            }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '32px',
            maxWidth: '1400px',
            margin: '0 auto',
          }}>
            {skills.map((skill) => (
              <div
                key={skill.name}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '20px 12px',
                  minWidth: '120px',
                }}
              >
                <div 
                  className="skill-icon-hover"
                  style={{
                    width: '64px',
                    height: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px',
                    fontSize: '3rem',
                    cursor: 'pointer',
                  }}
                >
                  {skill.icon}
                </div>
                <span 
                  className="skill-name-hover"
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: colors.white,
                    textAlign: 'center',
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer',
                  }}
                >
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Experience Section
  const ExperienceSection = () => {
    const experiences = [
      {
        company: 'U.S Bank',
        title: 'Lead Java Engineer',
        duration: 'Aug 2024 – Present',
        icon: <img src="/usbank.svg" alt="U.S Bank" style={{ width: 48, height: 48, objectFit: 'contain' }} />, 
        description: 'Developed and maintained core banking applications using Java, Spring Boot, and Oracle Database. Built microservices architecture for payment processing systems, improving transaction throughput by 30%. Implemented RESTful APIs for banking operations and integrated with third-party payment gateways.',
        highlights: ['🏦 Core Banking Systems', '⚡ 30% performance improvement', '🔗 Microservices Architecture', '💳 Payment Processing']
      },
      {
        company: 'Dentsu',
        title: 'Java Developer',
        duration: 'May 2020 – Jul 2022',
        icon: <img src="/dentsu.jpeg" alt="Dentsu" style={{ width: 48, height: 48, objectFit: 'contain' }} />, 
        description: 'Engineered payment processing systems using Java EE, Spring Framework, and Oracle Database. Developed automated CI/CD pipelines using Jenkins and Docker, and deployed services on AWS infrastructure. Created robust error handling and monitoring systems for high-availability payment processing.',
        highlights: ['💳 Payment Processing', '🔄 CI/CD Pipelines', '📦 Docker & AWS', '🔍 Monitoring Systems']
      }
    ];

    return (
            <section
        id="experience"
        style={{
          padding: '40px 32px',
          background: 'transparent',
          minHeight: '50vh',
        }}
      >
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '60px',
          }}>
                      <h2 style={{
            fontSize: '3.5rem',
            fontWeight: '800',
            color: colors.white,
            marginBottom: '24px',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.03) translateY(-3px)';
            e.currentTarget.style.textShadow = '0 4px 20px rgba(255, 255, 255, 0.4), 0 0 25px rgba(0, 191, 114, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
            e.currentTarget.style.textShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
          }}
          >
            Work Experience
          </h2>
            <div style={{
              width: '80px',
              height: '4px',
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.teal})`,
              borderRadius: '2px',
              margin: '0 auto',
              boxShadow: `0 0 20px ${colors.primary}40`,
            }} />
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            maxWidth: '1200px',
            margin: '0 auto',
          }}>
            {experiences.map((exp, index) => (
              <Card key={exp.company} hover={true}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: '32px',
                  alignItems: 'start',
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '20px',
                    background: colors.white,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    cursor: 'pointer',
                    willChange: 'transform, background, box-shadow',
                  }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget;
                    target.style.background = colors.dark;
                    target.style.transform = 'scale(1.1) rotate(5deg)';
                    target.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget;
                    target.style.background = colors.white;
                    target.style.transform = 'scale(1) rotate(0deg)';
                    target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                  }}
                  >
                    {exp.icon}
                  </div>
                  
                  <div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                      marginBottom: '16px',
                      flexWrap: 'wrap',
                      gap: '16px',
                    }}>
                      <div>
                        <h3 style={{
                          fontSize: '1.5rem',
                          fontWeight: '700',
                          color: colors.dark,
                          marginBottom: '8px',
                          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
                          e.currentTarget.style.color = colors.dark;
                          e.currentTarget.style.textShadow = '0 3px 15px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 0, 0, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1) translateY(0)';
                          e.currentTarget.style.color = colors.dark;
                          e.currentTarget.style.textShadow = 'none';
                        }}
                        >
                          {exp.title}
                        </h3>
                        <div style={{
                          fontSize: '1.2rem',
                          color: colors.primary,
                          fontWeight: '600',
                          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
                          e.currentTarget.style.color = colors.primary;
                          e.currentTarget.style.textShadow = '0 3px 15px rgba(16, 185, 129, 0.6), 0 0 20px rgba(16, 185, 129, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1) translateY(0)';
                          e.currentTarget.style.color = colors.primary;
                          e.currentTarget.style.textShadow = 'none';
                        }}
                        >
                          {exp.company}
                        </div>
                      </div>
                      
                      <div style={{
                        background: `linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))`,
                        color: colors.white,
                        padding: '8px 16px',
                        borderRadius: '12px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        border: `1px solid rgba(255, 255, 255, 0.3)`,
                        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05) translateY(-3px)';
                        e.currentTarget.style.background = `linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2))`;
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.3), 0 0 20px rgba(0, 191, 114, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1) translateY(0)';
                        e.currentTarget.style.background = `linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))`;
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      >
                        {exp.duration}
                      </div>
                    </div>

                    <p style={{
                      color: colors.white,
                      lineHeight: '1.8',
                      marginBottom: '24px',
                      fontSize: '1.1rem',
                      textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
                      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02) translateY(-2px)';
                      e.currentTarget.style.color = colors.white;
                      e.currentTarget.style.textShadow = '0 3px 15px rgba(255, 255, 255, 0.5), 0 0 20px rgba(0, 191, 114, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1) translateY(0)';
                      e.currentTarget.style.color = colors.white;
                      e.currentTarget.style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.2)';
                    }}
                    >
                      {exp.description}
                    </p>

                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '12px',
                    }}>
                      {exp.highlights.map((highlight, i) => (
                        <span
                          key={i}
                          style={{
                            background: 'rgba(0, 0, 0, 0.25)',
                            color: colors.white,
                            padding: '8px 16px',
                            borderRadius: '12px',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            cursor: 'pointer',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.08) translateY(-3px)';
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)';
                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.3), 0 0 20px rgba(0, 191, 114, 0.2)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1) translateY(0)';
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Projects Section
  const ProjectsSection = () => {
    const projects = [
      {
        title: 'Real-Time Transaction Engine',
        description: 'Built a high-performance transaction processing engine using Java, Spring Boot, and Oracle Database. Implemented microservices architecture for handling millions of daily banking transactions with 99.9% uptime.',
                icon: '🏦',
        tags: ['Java', 'Spring Boot', 'Oracle DB', 'Microservices']
      },
      {
        title: 'Payment Gateway Integration',
        description: 'Developed RESTful APIs for integrating multiple payment gateways (Stripe, PayPal, Square) using Java EE and Spring Framework. Implemented secure payment processing with encryption and fraud detection.',
                icon: '💳',
        tags: ['Java EE', 'Spring', 'REST APIs', 'Payment Processing']
      },
      {
        title: 'Basel III & CCAR Reporting',
        description: 'Automated regulatory reporting system for Basel III and CCAR compliance using Java, Spring Boot, and Oracle Database. Generated automated reports for regulatory authorities with data validation and audit trails.',
                icon: '📊',
        tags: ['Java', 'Spring Boot', 'Oracle DB', 'Regulatory Compliance']
      },
      {
        title: 'Banking API Gateway',
        description: 'Designed and implemented a comprehensive API gateway for banking services using Spring Cloud Gateway, OAuth2 authentication, and rate limiting. Provided unified access to multiple banking microservices.',
                icon: '🔐',
        tags: ['Spring Cloud', 'OAuth2', 'API Gateway', 'Microservices']
      }
    ];

    return (
      <section
        id="projects"
                      style={{
          padding: '80px 32px',
          background: 'transparent',
          minHeight: '80vh',
        }}
      >
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '60px',
          }}>
            <h2 style={{
              fontSize: '3.5rem',
              fontWeight: '800',
              color: colors.white,
              marginBottom: '24px',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.03) translateY(-3px)';
              e.currentTarget.style.textShadow = '0 4px 20px rgba(255, 255, 255, 0.4), 0 0 25px rgba(0, 191, 114, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
              e.currentTarget.style.textShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            }}
            >
              Projects
            </h2>
            <div style={{
              width: '80px',
              height: '4px',
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.teal})`,
              borderRadius: '2px',
              margin: '0 auto',
              boxShadow: `0 0 20px ${colors.primary}40`,
            }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '32px',
            maxWidth: '1400px',
            margin: '0 auto',
          }}>
            {projects.map((project, index) => (
              <Card key={project.title} hover={true} style={{ height: 'fit-content' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '24px',
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '16px',
                    background: colors.white,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.8rem',
                    marginRight: '16px',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    cursor: 'pointer',
                    willChange: 'transform, box-shadow',
                  }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget;
                    target.style.transform = 'scale(1.15) rotate(3deg)';
                    target.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget;
                    target.style.transform = 'scale(1) rotate(0deg)';
                    target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
                  }}>
                    {project.icon}
                  </div>
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    color: colors.dark,
                    margin: 0,
                    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
                    e.currentTarget.style.color = colors.dark;
                    e.currentTarget.style.textShadow = '0 3px 15px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                    e.currentTarget.style.color = colors.dark;
                    e.currentTarget.style.textShadow = 'none';
                  }}
                  >
                    {project.title}
                  </h3>
                </div>

                <p style={{
                  color: colors.white,
                  lineHeight: '1.7',
                  marginBottom: '24px',
                  fontSize: '1rem',
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02) translateY(-2px)';
                  e.currentTarget.style.color = colors.white;
                  e.currentTarget.style.textShadow = '0 3px 15px rgba(255, 255, 255, 0.5), 0 0 20px rgba(0, 191, 114, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.color = colors.white;
                  e.currentTarget.style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.2)';
                }}
                >
                  {project.description}
                </p>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginBottom: '24px',
                }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        background: 'rgba(0, 0, 0, 0.25)',
                        color: colors.white,
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '0.85rem',
                        fontWeight: '500',
                        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        cursor: 'pointer',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.08) translateY(-3px)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.3), 0 0 20px rgba(0, 191, 114, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1) translateY(0)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>


              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Contact Section
  const ContactSection = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    const [isSliding, setIsSliding] = useState(false);

    interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> {}

    const handleInputChange = (e: InputChangeEvent) => {
      setFormData({
      ...formData,
      [e.target.name]: e.target.value
      });
    };

    interface ContactFormData {
      name: string;
      email: string;
      subject: string;
      message: string;
    }

    interface ContactFormEvent extends React.FormEvent<HTMLFormElement> {}

    const handleSubmit = async (e: ContactFormEvent) => {
      e.preventDefault();
      setIsSliding(true);
      
      try {
        await sendEmail(formData);
        alert('Thank you for your message! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } catch (error) {
        alert('Sorry, there was an error sending your message. Please try again later.');
      } finally {
        // Reset sliding state after animation
        setTimeout(() => setIsSliding(false), 600);
      }
    };

    return (
      <section
        id="contact"
        style={{
          padding: '80px 32px',
          background: 'transparent',
          minHeight: '80vh',
        }}
      >
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '60px',
          }}>
                      <h2 style={{
            fontSize: '3.5rem',
            fontWeight: '800',
            color: colors.white,
            marginBottom: '24px',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.03) translateY(-3px)';
            e.currentTarget.style.textShadow = '0 4px 20px rgba(255, 255, 255, 0.4), 0 0 25px rgba(0, 191, 114, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
            e.currentTarget.style.textShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
          }}
          >
            Let's Connect
          </h2>
          <div style={{
            width: '80px',
            height: '4px',
            background: `linear-gradient(90deg, ${colors.primary}, ${colors.teal})`,
            borderRadius: '2px',
            margin: '0 auto 32px',
            boxShadow: `0 0 20px ${colors.primary}40`,
          }} />
            <p style={{
              fontSize: '1.4rem',
              color: colors.white,
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.7',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02) translateY(-3px)';
              e.currentTarget.style.color = colors.white;
              e.currentTarget.style.textShadow = '0 3px 15px rgba(255, 255, 255, 0.5), 0 0 20px rgba(0, 191, 114, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
              e.currentTarget.style.color = colors.white;
              e.currentTarget.style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.2)';
            }}
            >
              <div style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>
                <div style={{ marginBottom: '8px' }}>• Ready to discuss your next Java development project or banking systems opportunity!</div>
                <div>• I'd love to hear from you!</div>
              </div>
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
            gap: '32px',
            alignItems: 'start',
            maxWidth: '1400px',
            margin: '0 auto',
          }}>
            {/* Contact Info */}
            <Card>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: colors.white,
                marginBottom: '32px',
                textAlign: 'center',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
              }}>
                📞 Get In Touch
              </h3>

              {[
                { icon: <EmailIcon />, label: 'Email', value: 'adityavaj08@gmail.com', href: 'mailto:adityavaj08@gmail.com' },
                { icon: <GitHubIcon />, label: 'GitHub', value: 'adityakatkoju', href: 'https://github.com/adityakatkoju' },
                { icon: <LinkedInIcon />, label: 'LinkedIn', value: 'Connect with me', href: 'https://www.linkedin.com/in/adityak-0914in/' },
                { icon: <PhoneIcon />, label: 'Phone', value: 'Available on request', href: null },
                { icon: '📍', label: 'Location', value: 'New Jersey, USA', href: null },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px',
                    marginBottom: '16px',
                    borderRadius: '16px',
                    transition: 'all 0.3s ease',
                    cursor: item.href ? 'pointer' : 'default',
                  }}
                  onClick={() => item.href && window.open(item.href, '_blank')}
                  onMouseEnter={(e) => {
                    if (item.href) {
                      (e.target as HTMLElement).style.background = 'rgba(0, 200, 83, 0.05)';
                      (e.target as HTMLElement).style.transform = 'translateX(8px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (item.href) {
                      (e.target as HTMLElement).style.background = 'transparent';
                      (e.target as HTMLElement).style.transform = 'translateX(0)';
                    }
                  }}
                >
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    background: colors.white,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    marginRight: '16px',
                    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    willChange: 'transform, box-shadow',
                  }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget;
                    target.style.transform = 'scale(1.1) rotate(2deg)';
                    target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget;
                    target.style.transform = 'scale(1) rotate(0deg)';
                    target.style.boxShadow = 'none';
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: colors.white,
                      marginBottom: '4px',
                      textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
                    }}>
                      {item.label}
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      color: colors.white,
                      textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
                    }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </Card>

            {/* Contact Form */}
            <Card>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: colors.white,
                marginBottom: '32px',
                textAlign: 'center',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
              }}>
                Send Message
              </h3>

              <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: colors.white,
                    marginBottom: '10px',
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
                  }}>
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your name"
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      borderRadius: '16px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      fontSize: '1rem',
                      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      outline: 'none',
                      background: 'rgba(255, 255, 255, 0.15)',
                      color: colors.white,
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                      e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                      e.target.style.boxShadow = `
                        inset 0 1px 0 rgba(255, 255, 255, 0.25),
                        0 0 25px rgba(255, 255, 255, 0.08),
                        0 0 50px rgba(0, 191, 114, 0.1)
                      `;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                      e.target.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: colors.white,
                    marginBottom: '8px',
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
                  }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      borderRadius: '16px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      fontSize: '1rem',
                      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      outline: 'none',
                      background: 'rgba(255, 255, 255, 0.15)',
                      color: colors.white,
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                      e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                      e.target.style.boxShadow = `
                        inset 0 1px 0 rgba(255, 255, 255, 0.25),
                        0 0 25px rgba(255, 255, 255, 0.08),
                        0 0 50px rgba(0, 191, 114, 0.1)
                      `;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                      e.target.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: colors.white,
                    marginBottom: '8px',
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
                  }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter subject"
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      borderRadius: '16px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      fontSize: '1rem',
                      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      outline: 'none',
                      background: 'rgba(255, 255, 255, 0.15)',
                      color: colors.white,
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                      e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                      e.target.style.boxShadow = `
                        inset 0 1px 0 rgba(255, 255, 255, 0.25),
                        0 0 25px rgba(255, 255, 255, 0.08),
                        0 0 50px rgba(0, 191, 255, 0.1)
                      `;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                      e.target.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: colors.white,
                    marginBottom: '8px',
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
                  }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    placeholder="Enter your message"
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      borderRadius: '16px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      fontSize: '1rem',
                      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      outline: 'none',
                      background: 'rgba(255, 255, 255, 0.15)',
                      color: colors.white,
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                      resize: 'vertical',
                      minHeight: '120px',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                      e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                      e.target.style.boxShadow = `
                        inset 0 1px 0 rgba(255, 255, 255, 0.25),
                        0 0 25px rgba(255, 255, 255, 0.08),
                        0 0 50px rgba(0, 191, 114, 0.1)
                      `;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                      e.target.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                    }}
                  />
                </div>

                <button 
                  type="submit"
                  style={{ 
                    width: '100%',
                    height: '60px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: colors.white,
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '30px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    boxShadow: `
                      0 8px 32px rgba(255, 255, 255, 0.1),
                      0 4px 16px rgba(0, 0, 0, 0.1),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2)
                    `,
                    transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    willChange: 'transform, box-shadow',
                  }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget;
                    target.style.transform = 'scale(1.02) translateY(-2px)';
                    target.style.boxShadow = `
                      0 12px 40px rgba(255, 255, 255, 0.2),
                      0 6px 20px rgba(0, 0, 0, 0.15),
                      inset 0 1px 0 rgba(255, 255, 255, 0.3)
                    `;
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget;
                    target.style.transform = 'scale(1) translateY(0)';
                    target.style.boxShadow = `
                      0 8px 32px rgba(255, 255, 255, 0.1),
                      0 4px 16px rgba(0, 0, 0, 0.1),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2)
                    `;
                  }}
                  onMouseDown={(e) => {
                    const target = e.currentTarget;
                    target.style.transform = 'scale(0.98) translateY(0px)';
                    target.style.boxShadow = `
                      0 4px 16px rgba(255, 255, 255, 0.05),
                      0 2px 8px rgba(0, 0, 0, 0.1),
                      inset 0 1px 0 rgba(255, 255, 255, 0.1)
                    `;
                  }}
                  onMouseUp={(e) => {
                    const target = e.currentTarget;
                    target.style.transform = 'scale(1.02) translateY(-2px)';
                    target.style.boxShadow = `
                      0 12px 40px rgba(255, 255, 255, 0.2),
                      0 6px 20px rgba(0, 0, 0, 0.15),
                      inset 0 1px 0 rgba(255, 255, 255, 0.3)
                    `;
                  }}
                  onClick={() => {
                    setIsSliding(true);
                    setTimeout(() => setIsSliding(false), 600);
                  }}
                >
                  {/* iOS-style sliding background effect */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: isSliding ? '0%' : '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.2)',
                    transition: 'left 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    zIndex: 1,
                  }} />
                  
                  {/* Content with higher z-index */}
                  <div style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    gap: '8px',
                  }}>
                    <span style={{ fontSize: '1.2rem' }}>📤</span>
                    <span>Send Message</span>
                  </div>
                </button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    );
  };

  // Footer with glassmorphism
  const Footer = () => (
    <footer style={{
      background: 'rgba(0, 0, 0, 0.25)',
      color: colors.white,
      padding: '60px 32px 32px',
      textAlign: 'center',
      borderTop: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(15px)',
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '32px',
          marginBottom: '32px',
          flexWrap: 'wrap',
        }}>
          <a
            href="https://github.com/adityakatkoju"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              textDecoration: 'none',
              transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              boxShadow: `
                0 8px 25px rgba(255, 255, 255, 0.2),
                0 4px 15px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.3)
              `,
              border: '1px solid rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              willChange: 'transform, box-shadow',
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget;
              target.style.transform = 'translateY(-8px) scale(1.15) rotate(5deg)';
              target.style.boxShadow = '0 20px 45px rgba(0, 0, 0, 0.25)';
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget;
              target.style.transform = 'translateY(0) scale(1) rotate(0deg)';
              target.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.15), 0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
            }}
          >
            <GitHubIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/adityak-0914in/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              textDecoration: 'none',
              transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              boxShadow: `
                0 8px 25px rgba(255, 255, 255, 0.2),
                0 4px 15px rgba(0, 0, 0, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.3)
              `,
              border: '1px solid rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              willChange: 'transform, box-shadow',
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget;
              target.style.transform = 'translateY(-8px) scale(1.15) rotate(-5deg)';
              target.style.boxShadow = '0 20px 45px rgba(0, 0, 0, 0.25)';
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget;
              target.style.transform = 'translateY(0) scale(1) rotate(0deg)';
              target.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.15), 0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
            }}
          >
            <LinkedInIcon />
          </a>
        </div>

        <div style={{
          borderTop: `1px solid ${colors.gray}20`,
          paddingTop: '32px',
        }}>
          <p style={{
            margin: 0,
            fontSize: '1rem',
            color: colors.white,
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02) translateY(-2px)';
            e.currentTarget.style.textShadow = '0 3px 15px rgba(255, 255, 255, 0.5), 0 0 20px rgba(0, 191, 114, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
            e.currentTarget.style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.2)';
          }}
          >
            © 2025 ADITYA KATKOJU. All rights reserved.
          </p>
          <p style={{
            margin: '8px 0 0',
            fontSize: '0.9rem',
            color: colors.white,
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
          }}>
  
          </p>
        </div>
      </div>
    </footer>
  );

  // Add enhanced CSS animations with Apple-style motion and smooth transitions
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { 
          transform: translateY(0px) scale(1) rotate(0deg); 
        }
        25% { 
          transform: translateY(-8px) scale(1.01) rotate(0.5deg); 
        }
        50% { 
          transform: translateY(-15px) scale(1.02) rotate(0deg); 
        }
        75% { 
          transform: translateY(-8px) scale(1.01) rotate(-0.5deg); 
        }
      }
      
      @keyframes fadeInUp {
        from { 
          opacity: 0; 
          transform: translateY(40px) scale(0.95); 
        }
        to { 
          opacity: 1; 
          transform: translateY(0) scale(1); 
        }
      }
      
      @keyframes slideInLeft {
        from { 
          opacity: 0; 
          transform: translateX(-40px) scale(0.95); 
        }
        to { 
          opacity: 1; 
          transform: translateX(0) scale(1); 
        }
      }
      
      @keyframes slideInRight {
        from { 
          opacity: 0; 
          transform: translateX(40px) scale(0.95); 
        }
        to { 
          opacity: 1; 
          transform: translateX(0) scale(1); 
        }
      }
      
      @keyframes glow {
        0%, 100% { 
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); 
        }
        50% { 
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.5), 0 0 40px rgba(16, 185, 129, 0.3); 
        }
      }
      
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      
      @keyframes neonGlow {
        0%, 100% { 
          box-shadow: 
            0 0 20px rgba(139, 92, 246, 0.4),
            0 0 40px rgba(139, 92, 246, 0.2),
            0 0 60px rgba(139, 92, 246, 0.1);
        }
        50% { 
          box-shadow: 
            0 0 30px rgba(139, 92, 246, 0.6),
            0 0 60px rgba(139, 92, 246, 0.3),
            0 0 90px rgba(139, 92, 246, 0.2);
        }
      }
      
      @keyframes glassFloat {
        0%, 100% { 
          transform: translateY(0px) scale(1);
          box-shadow: 0 8px 32px rgba(255, 255, 255, 0.1);
        }
        50% { 
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 16px 48px rgba(255, 255, 255, 0.2);
        }
      }
      
      .card-hover {
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        will-change: transform, box-shadow;
      }
      
      .card-hover:hover {
        transform: translateY(-12px) scale(1.03);
        box-shadow: 
          0 45px 120px rgba(255, 255, 255, 0.35),
          0 20px 60px rgba(0, 0, 0, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.5),
          inset 0 -1px 0 rgba(0, 0, 0, 0.15);
      }
      
      .skill-icon-hover {
        transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        will-change: transform;
      }
      
      .skill-icon-hover:hover {
        transform: translateY(-20px) scale(1.25) rotate(8deg);
      }
      
      .skill-name-hover {
        transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        will-change: transform, color, text-shadow;
      }
      
      .skill-name-hover:hover {
        transform: translateY(-8px) scale(1.1);
        color: #ffffff !important;
        text-shadow: 0 3px 15px rgba(255, 255, 255, 0.5), 0 0 20px rgba(0, 191, 114, 0.2) !important;
      }
      
      @keyframes frostGlow {
        0%, 100% { 
          backdrop-filter: blur(30px);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
        }
        50% { 
          backdrop-filter: blur(35px);
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
        }
      }
      
      @keyframes glossyShine {
        0%, 100% { 
          box-shadow: 
            0 0 30px rgba(255, 255, 255, 0.2),
            0 0 60px rgba(255, 255, 255, 0.1);
        }
        50% { 
          box-shadow: 
            0 0 50px rgba(255, 255, 255, 0.4),
            0 0 100px rgba(255, 255, 255, 0.2);
        }
      }
      
      @keyframes enhancedGlow {
        0%, 100% { 
          filter: brightness(1) saturate(1);
          box-shadow: 0 0 40px rgba(255, 255, 255, 0.15);
        }
        50% { 
          filter: brightness(1.1) saturate(1.2);
          box-shadow: 0 0 60px rgba(255, 255, 255, 0.25);
        }
      }
      
      @keyframes smoothHover {
        0% { transform: translateY(0) scale(1); }
        100% { transform: translateY(-8px) scale(1.05); }
      }
      
      @keyframes gentleBounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
      
      @keyframes subtleRotate {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(1deg); }
      }
      
      @keyframes smoothScale {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
      }
      
      @keyframes gentleGlow {
        0%, 100% { 
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
        }
        50% { 
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
        }
      }
      
      * {
        box-sizing: border-box;
      }
      
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Segoe UI', 'Roboto', sans-serif;
        scroll-behavior: smooth;
        background: linear-gradient(135deg, #051937 0%, #004d7a 25%, #008793 50%, #00bf72 75%, #a8eb12 100%);
        background-size: cover;
        background-attachment: fixed;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        overflow-x: hidden;
        position: relative;
      }
      
      /* Faster smooth scrolling */
      html {
        scroll-behavior: smooth;
        scroll-padding-top: 100px;
      }
      
      /* Custom scroll behavior for faster navigation */
      * {
        scroll-behavior: smooth;
      }
      
      /* Film grain texture overlay */
      body::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        opacity: 0.03;
        pointer-events: none;
        z-index: 1;
      }
      
      html {
        scroll-behavior: smooth;
        overflow-x: hidden;
      }
      
      /* Smooth scrolling for all elements */
      * {
        scroll-behavior: smooth;
      }
      
      /* Enhanced smooth transitions for all interactive elements */
      button, a, div[onclick], div[onMouseEnter] {
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
      }
      
      .fade-in-up {
        animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      }
      
      .slide-in-left {
        animation: slideInLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      }
      
      .slide-in-right {
        animation: slideInRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      }
      
      .glow {
        animation: glow 2s ease-in-out infinite;
      }
      
      .shimmer {
        animation: shimmer 2s ease-in-out infinite;
      }
      
      .pulse {
        animation: pulse 2s ease-in-out infinite;
      }
      
      .neon-glow {
        animation: neonGlow 3s ease-in-out infinite;
      }
      
      .glass-float {
        animation: glassFloat 4s ease-in-out infinite;
      }
      
      .frost-glow {
        animation: frostGlow 3s ease-in-out infinite;
      }
      
      .glossy-shine {
        animation: glossyShine 4s ease-in-out infinite;
      }
      
      .enhanced-glow {
        animation: enhancedGlow 5s ease-in-out infinite;
      }
      
      .smooth-hover {
        animation: smoothHover 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      }
      
      .gentle-bounce {
        animation: gentleBounce 2s ease-in-out infinite;
      }
      
      .subtle-rotate {
        animation: subtleRotate 3s ease-in-out infinite;
      }
      
      .smooth-scale {
        animation: smoothScale 2s ease-in-out infinite;
      }
      
      .gentle-glow {
        animation: gentleGlow 3s ease-in-out infinite;
      }
      
      /* Smooth hover effects for all interactive elements */
      button:hover, a:hover, div[onclick]:hover, div[onMouseEnter]:hover {
        transform: translateY(-2px) scale(1.02);
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      
      /* Enhanced focus states for accessibility */
      button:focus, a:focus, input:focus, textarea:focus {
        outline: 2px solid rgba(16, 185, 129, 0.5);
        outline-offset: 2px;
        transition: outline 0.2s ease;
      }
      
      /* Smooth scrollbar styling */
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 4px;
        transition: background 0.3s ease;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.5);
      }
      
      /* Glassmorphism form styling */
      input::placeholder, textarea::placeholder {
        color: rgba(255, 255, 255, 0.6);
        font-weight: 400;
        transition: color 0.3s ease;
      }
      
      input:focus::placeholder, textarea:focus::placeholder {
        color: rgba(255, 255, 255, 0.8);
      }
      
      /* Enhanced focus states for glassmorphism inputs */
      input:focus, textarea:focus {
        outline: none;
        border-color: rgba(255, 255, 255, 0.6) !important;
        background: rgba(255, 255, 255, 0.15) !important;
        box-shadow: 
          inset 0 1px 0 rgba(255, 255, 255, 0.2),
          0 0 20px rgba(255, 255, 255, 0.1),
          0 0 40px rgba(255, 255, 255, 0.05) !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      background: colors.background,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
    }}>
      <BackgroundGradients />
      <Logo />
      <ResumeButton />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Portfolio;
