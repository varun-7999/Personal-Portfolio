import React, { useState, useId } from 'react';
import { 
  Sun, Moon, Bell, CheckCircle2, AlertCircle, Loader2, 
  Send, ExternalLink, Heart, Sparkles, Layers, Sliders, 
  Code2, Plus, Trash2, ArrowRight, Github, Twitter, Linkedin,
  Mail, Shield, RefreshCw, Zap, Layout
} from 'lucide-react';

// ============================================================================
// 1. REUSABLE COMPONENT: Button
// ============================================================================
export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
  size = 'md',         // 'sm' | 'md' | 'lg'
  isLoading = false,
  disabled = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  // Variant styles mapped with Tailwind
  const variantStyles = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow active:scale-[0.98]',
    secondary: 'bg-gray-800 hover:bg-gray-700 text-white dark:bg-gray-700 dark:hover:bg-gray-600 shadow-sm active:scale-[0.98]',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm active:scale-[0.98]',
    outline: 'border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-[0.98]',
    ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-[0.98]',
  };

  // Size configurations
  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-4 py-2 rounded-xl gap-2',
    lg: 'text-base px-6 py-2.5 rounded-xl gap-2.5 font-medium',
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center font-medium transition-all duration-150 select-none ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size] || sizeStyles.md} ${isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-current" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {LeftIcon && <LeftIcon className="w-4 h-4 shrink-0" />}
          {children}
          {RightIcon && <RightIcon className="w-4 h-4 shrink-0" />}
        </>
      )}
    </button>
  );
};

// ============================================================================
// 2. REUSABLE COMPONENT: Header
// ============================================================================
export const Header = ({
  title = "DevForge",
  navLinks = [],
  activeLink = "",
  onNavigate,
  isDarkMode = false,
  onToggleTheme,
  notificationCount = 0,
  onNotificationClick,
  userBadge = "Pro Member",
  actions,
  className = "",
}) => {
  return (
    <header className={`w-full sticky top-0 z-40 transition-colors backdrop-blur-md border-b ${
      isDarkMode 
        ? 'bg-gray-900/80 border-gray-800 text-gray-100' 
        : 'bg-white/80 border-gray-200 text-gray-800'
    } ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-500/25">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              {title}
            </span>
            {userBadge && (
              <span className="ml-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                {userBadge}
              </span>
            )}
          </div>
        </div>

        {/* Nav Links */}
        {navLinks && navLinks.length > 0 && (
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = activeLink === link.id || activeLink === link.label;
              return (
                <button
                  key={link.id || link.label}
                  onClick={() => onNavigate && onNavigate(link.id || link.label)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100/60 dark:hover:bg-gray-800/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>
        )}

        {/* Controls / Actions */}
        <div className="flex items-center space-x-2">
          {actions}

          {/* Notifications Button with Badge */}
          <button
            type="button"
            onClick={onNotificationClick}
            className="relative p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-gray-900">
                {notificationCount > 99 ? '99+' : notificationCount}
              </span>
            )}
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};

// ============================================================================
// 3. REUSABLE COMPONENT: Card
// ============================================================================
export const Card = ({
  title,
  subtitle,
  badge,
  badgeVariant = 'primary', // 'primary' | 'success' | 'warning' | 'purple'
  icon: Icon,
  imageSrc,
  children,
  footer,
  variant = 'elevated', // 'elevated' | 'outline' | 'glass'
  className = '',
  onClick,
}) => {
  const variantStyles = {
    elevated: 'bg-white dark:bg-gray-800 shadow-md hover:shadow-xl border border-gray-100 dark:border-gray-700/60',
    outline: 'bg-white dark:bg-gray-800/80 border-2 border-gray-200 dark:border-gray-700 shadow-none hover:border-indigo-400 dark:hover:border-indigo-500',
    glass: 'bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-lg',
  };

  const badgeStyles = {
    primary: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
    success: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
    warning: 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200 dark:border-amber-800',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 border-purple-200 dark:border-purple-800',
  };

  return (
    <div 
      onClick={onClick}
      className={`rounded-2xl overflow-hidden transition-all duration-200 flex flex-col ${variantStyles[variant] || variantStyles.elevated} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Optional Top Media/Banner */}
      {imageSrc && (
        <div className="relative w-full h-40 overflow-hidden bg-gray-100 dark:bg-gray-900">
          <img 
            src={imageSrc} 
            alt={title || "Card visual"} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
          />
        </div>
      )}

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header Row: Title/Badge/Icon */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center space-x-2.5">
              {Icon && (
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                  <Icon className="w-5 h-5" />
                </div>
              )}
              <div>
                {title && <h3 className="font-semibold text-base text-gray-900 dark:text-white leading-snug">{title}</h3>}
                {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>}
              </div>
            </div>
            {badge && (
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${badgeStyles[badgeVariant] || badgeStyles.primary}`}>
                {badge}
              </span>
            )}
          </div>

          {/* Main Body */}
          {children && (
            <div className="text-sm text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">
              {children}
            </div>
          )}
        </div>

        {/* Footer actions */}
        {footer && (
          <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between text-sm">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 4. REUSABLE COMPONENT: Form
// ============================================================================
export const Form = ({
  fields = [],
  onSubmit,
  submitButtonText = "Submit Details",
  isSubmitting = false,
  className = "",
  initialValues = {},
}) => {
  const formId = useId();
  const [formData, setFormData] = useState(() => {
    const data = {};
    fields.forEach((field) => {
      data[field.name] = initialValues[field.name] ?? (field.defaultValue || '');
    });
    return data;
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (field, value) => {
    if (field.required && (!value || (typeof value === 'string' && !value.trim()))) {
      return `${field.label || field.name} is required`;
    }
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return 'Please enter a valid email address';
    }
    if (field.minLength && value.length < field.minLength) {
      return `Must be at least ${field.minLength} characters`;
    }
    if (field.validate && typeof field.validate === 'function') {
      return field.validate(value, formData);
    }
    return '';
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field.name]: value }));
    if (touched[field.name]) {
      const err = validateField(field, value);
      setErrors(prev => ({ ...prev, [field.name]: err }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field.name]: true }));
    const err = validateField(field, formData[field.name]);
    setErrors(prev => ({ ...prev, [field.name]: err }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    const newTouched = {};

    fields.forEach((field) => {
      newTouched[field.name] = true;
      const err = validateField(field, formData[field.name]);
      if (err) newErrors[field.name] = err;
    });

    setTouched(newTouched);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (onSubmit) onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`} noValidate>
      {fields.map((field) => {
        const fieldError = touched[field.name] && errors[field.name];
        const inputId = `${formId}-${field.name}`;

        return (
          <div key={field.name} className="flex flex-col">
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                {field.label} {field.required && <span className="text-rose-500">*</span>}
              </label>
              {field.helperText && !fieldError && (
                <span className="text-[11px] text-gray-400">{field.helperText}</span>
              )}
            </div>

            {/* Field Rendering by Type */}
            {field.type === 'textarea' ? (
              <textarea
                id={inputId}
                rows={field.rows || 3}
                placeholder={field.placeholder}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field, e.target.value)}
                onBlur={() => handleBlur(field)}
                disabled={isSubmitting}
                className={`w-full px-3.5 py-2.5 text-sm rounded-xl transition border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 resize-none ${
                  fieldError
                    ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500'
                    : 'border-gray-300 dark:border-gray-700 focus:ring-indigo-500/20 focus:border-indigo-500'
                }`}
              />
            ) : field.type === 'select' ? (
              <select
                id={inputId}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field, e.target.value)}
                onBlur={() => handleBlur(field)}
                disabled={isSubmitting}
                className={`w-full px-3.5 py-2.5 text-sm rounded-xl transition border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 ${
                  fieldError
                    ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500'
                    : 'border-gray-300 dark:border-gray-700 focus:ring-indigo-500/20 focus:border-indigo-500'
                }`}
              >
                <option value="" disabled>{field.placeholder || "Select option..."}</option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : field.type === 'checkbox' ? (
              <label className="flex items-center space-x-2.5 cursor-pointer mt-1">
                <input
                  type="checkbox"
                  id={inputId}
                  checked={Boolean(formData[field.name])}
                  onChange={(e) => handleChange(field, e.target.checked)}
                  onBlur={() => handleBlur(field)}
                  disabled={isSubmitting}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-700"
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">{field.checkboxLabel || field.label}</span>
              </label>
            ) : (
              <input
                id={inputId}
                type={field.type || 'text'}
                placeholder={field.placeholder}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field, e.target.value)}
                onBlur={() => handleBlur(field)}
                disabled={isSubmitting}
                className={`w-full px-3.5 py-2.5 text-sm rounded-xl transition border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 ${
                  fieldError
                    ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500'
                    : 'border-gray-300 dark:border-gray-700 focus:ring-indigo-500/20 focus:border-indigo-500'
                }`}
              />
            )}

            {/* Error Message display */}
            {fieldError && (
              <span className="flex items-center text-xs text-rose-500 mt-1.5 font-medium animate-fadeIn">
                <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                {fieldError}
              </span>
            )}
          </div>
        );
      })}

      <div className="pt-2">
        <Button 
          type="submit" 
          variant="primary" 
          size="md" 
          isLoading={isSubmitting} 
          className="w-full"
          rightIcon={Send}
        >
          {submitButtonText}
        </Button>
      </div>
    </form>
  );
};

// ============================================================================
// 5. REUSABLE COMPONENT: Footer
// ============================================================================
export const Footer = ({
  brandName = "DevForge",
  tagline = "Empowering developers to build elegant and maintainable software faster.",
  links = [],
  socialLinks = [],
  copyrightYear = 2026,
  onSubscribe,
  className = "",
  isDarkMode = false,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    if (onSubscribe) onSubscribe(email);
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className={`w-full border-t transition-colors ${
      isDarkMode 
        ? 'bg-gray-900/90 border-gray-800 text-gray-300' 
        : 'bg-gray-50 border-gray-200 text-gray-600'
    } ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Zap className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-gray-900 dark:text-white">{brandName}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              {tagline}
            </p>
            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              {socialLinks.map((item, idx) => {
                const IconComponent = item.icon || ExternalLink;
                return (
                  <a
                    key={idx}
                    href={item.href || '#'}
                    aria-label={item.name}
                    className="p-2 rounded-lg text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-200/50 dark:hover:bg-gray-800 transition"
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Dynamic Link Columns */}
          {links.map((col, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
                {col.category}
              </h4>
              <ul className="space-y-2 text-xs">
                {col.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <a 
                      href={item.href || '#'} 
                      className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Stay in the loop
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Get the latest updates on reusable React component libraries and design tokens.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
              <Button type="submit" size="sm" variant="primary" className="w-full">
                Join Newsletter
              </Button>
            </form>
            {subscribed && (
              <span className="flex items-center text-xs text-emerald-500 font-medium animate-fadeIn">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Thanks for subscribing!
              </span>
            )}
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>&copy; {copyrightYear} {brandName}. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#privacy" className="hover:underline">Privacy Policy</a>
            <a href="#terms" className="hover:underline">Terms of Service</a>
            <a href="#cookies" className="hover:underline">Cookies Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ============================================================================
// MAIN APPLICATION: Interactive Playground & Component Showcase
// ============================================================================
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('playground'); // 'playground' | 'component-catalog' | 'code'
  const [activeNav, setActiveNav] = useState('Overview');
  const [notificationCount, setNotificationCount] = useState(3);
  
  // Playground State Controls
  const [btnVariant, setBtnVariant] = useState('primary');
  const [btnSize, setBtnSize] = useState('md');
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);

  // Card Playground Controls
  const [cardVariant, setCardVariant] = useState('elevated');
  const [cardBadgeVariant, setCardBadgeVariant] = useState('primary');
  const [cardWithImage, setCardWithImage] = useState(true);

  // Dynamic Card List State
  const [cardsList, setCardsList] = useState([
    {
      id: 1,
      title: "Design System Architecture",
      subtitle: "Token-driven component styling",
      badge: "Production Ready",
      badgeVariant: "success",
      icon: Layers,
      content: "Components are built with composable React patterns, strict prop types, accessibility standards, and clean tailwind primitives.",
      likes: 124,
    },
    {
      id: 2,
      title: "Stateful Form Validations",
      subtitle: "Controlled input hooks",
      badge: "Form Hook",
      badgeVariant: "purple",
      icon: Shield,
      content: "Features comprehensive runtime validation including email format detection, required guards, dynamic errors, and clean resetting.",
      likes: 89,
    }
  ]);

  // Form State feedback
  const [submittedData, setSubmittedData] = useState(null);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  // Example navigation links for Header component
  const sampleNavLinks = [
    { id: 'Overview', label: 'Overview' },
    { id: 'Components', label: 'Components' },
    { id: 'Showcase', label: 'Showcase' },
    { id: 'Docs', label: 'Docs' }
  ];

  // Footer data props
  const footerLinks = [
    {
      category: "Product",
      items: [
        { label: "Component Library", href: "#" },
        { label: "Figma UI Kit", href: "#" },
        { label: "Changelog", href: "#" },
      ]
    },
    {
      category: "Resources",
      items: [
        { label: "React 19 Hooks", href: "#" },
        { label: "Tailwind CSS Guide", href: "#" },
        { label: "Community Discord", href: "#" },
      ]
    }
  ];

  const socialLinks = [
    { name: "Github", icon: Github, href: "https://github.com" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
    { name: "Linkedin", icon: Linkedin, href: "https://linkedin.com" },
  ];

  // Form field schema for dynamic Form Component
  const contactFormFields = [
    {
      name: 'fullName',
      label: 'Full Name',
      placeholder: 'e.g. Maya Chen',
      type: 'text',
      required: true,
      minLength: 3,
    },
    {
      name: 'email',
      label: 'Work Email',
      placeholder: 'maya@example.com',
      type: 'email',
      required: true,
      helperText: "We'll never share your email address."
    },
    {
      name: 'componentInterest',
      label: 'Preferred Component',
      type: 'select',
      required: true,
      options: [
        { value: 'button', label: 'Reusable Button with Loading states' },
        { value: 'header', label: 'Header with responsive Drawer & Theme' },
        { value: 'card', label: 'Multi-variant Container Card' },
        { value: 'form', label: 'Dynamic Controlled Form' },
        { value: 'footer', label: 'Footer with Newsletter Hook' },
      ]
    },
    {
      name: 'comments',
      label: 'Custom Feedback or Props Request',
      type: 'textarea',
      placeholder: 'Write any specific props you would like to test...',
      rows: 3,
    },
    {
      name: 'termsAccepted',
      label: 'Terms of Use',
      type: 'checkbox',
      checkboxLabel: 'I agree to the test playground usage guidelines.',
      required: true,
      validate: (val) => (!val ? 'You must accept the terms' : '')
    }
  ];

  const handleFormSubmit = (values) => {
    setIsFormSubmitting(true);
    setTimeout(() => {
      setSubmittedData(values);
      setIsFormSubmitting(false);
    }, 700);
  };

  const handleAddCard = () => {
    const newId = cardsList.length + 1;
    setCardsList([
      ...cardsList,
      {
        id: newId,
        title: `Dynamic Card Item #${newId}`,
        subtitle: `Added at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        badge: "New Prop Item",
        badgeVariant: "warning",
        icon: Sparkles,
        content: "Dynamically added to component tree via parent state props.",
        likes: 0
      }
    ]);
  };

  const handleLikeCard = (id) => {
    setCardsList(cardsList.map(card => card.id === id ? { ...card, likes: card.likes + 1 } : card));
  };

  const handleDeleteCard = (id) => {
    setCardsList(cardsList.filter(card => card.id !== id));
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${isDarkMode ? 'dark bg-gray-950 text-gray-100' : 'bg-slate-50 text-gray-900'}`}>
      
      {/* 1. Header Component in Action */}
      <Header
        title="ComponentStudio"
        navLinks={sampleNavLinks}
        activeLink={activeNav}
        onNavigate={(id) => setActiveNav(id)}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        notificationCount={notificationCount}
        onNotificationClick={() => setNotificationCount(prev => Math.max(0, prev - 1))}
        userBadge="v2.4 React"
        actions={
          <Button 
            size="sm" 
            variant="ghost" 
            leftIcon={RefreshCw} 
            onClick={() => {
              setBtnLoading(true);
              setTimeout(() => setBtnLoading(false), 800);
            }}
            className="hidden sm:inline-flex"
          >
            Reset Test
          </Button>
        }
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Hero & Navigation Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-200 dark:border-gray-800 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              5 Reusable React Components <span className="text-indigo-600 dark:text-indigo-400">Props & State Lab</span>
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Explore dynamic rendering, state propagation, and live prop modifications across Header, Footer, Card, Button, and Form.
            </p>
          </div>

          {/* View Tab Buttons */}
          <div className="inline-flex p-1 rounded-xl bg-gray-200 dark:bg-gray-800/80 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('playground')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'playground'
                  ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Interactive Controls</span>
            </button>
            <button
              onClick={() => setActiveTab('component-catalog')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'component-catalog'
                  ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Component Catalog</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'code'
                  ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Props Specs</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            TAB 1: INTERACTIVE PLAYGROUND
        ========================================================================= */}
        {activeTab === 'playground' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            
            {/* Left Column: Live Component Previews */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Button Component Playground */}
              <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                    <h2 className="text-base font-bold">1. Button Component</h2>
                  </div>
                  <span className="text-xs font-mono text-gray-400">&lt;Button variant="{btnVariant}" size="{btnSize}" /&gt;</span>
                </div>

                <div className="p-8 rounded-xl bg-slate-50 dark:bg-gray-950 border border-dashed border-gray-300 dark:border-gray-800 flex flex-wrap items-center justify-center gap-4 min-h-[120px]">
                  <Button
                    variant={btnVariant}
                    size={btnSize}
                    isLoading={btnLoading}
                    disabled={btnDisabled}
                    leftIcon={Sparkles}
                    onClick={() => alert('Button Clicked! State trigger works.')}
                  >
                    Action Trigger
                  </Button>
                </div>
              </div>

              {/* Card Component Playground & Dynamic State List */}
              <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <h2 className="text-base font-bold">2. Card Component (Dynamic Rendering)</h2>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    leftIcon={Plus}
                    onClick={handleAddCard}
                  >
                    Add Dynamic Card
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cardsList.map((item) => (
                    <Card
                      key={item.id}
                      title={item.title}
                      subtitle={item.subtitle}
                      badge={item.badge}
                      badgeVariant={item.badgeVariant || cardBadgeVariant}
                      variant={cardVariant}
                      icon={item.icon}
                      imageSrc={cardWithImage ? "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60" : undefined}
                      footer={
                        <>
                          <button 
                            type="button" 
                            onClick={(e) => { e.stopPropagation(); handleLikeCard(item.id); }}
                            className="flex items-center space-x-1 text-xs text-rose-500 hover:text-rose-600 font-medium"
                          >
                            <Heart className="w-3.5 h-3.5 fill-current" />
                            <span>{item.likes} Likes</span>
                          </button>
                          <div className="flex space-x-1">
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); handleDeleteCard(item.id); }}
                              className="p-1 rounded text-gray-400 hover:text-rose-500 transition"
                              aria-label="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </>
                      }
                    >
                      {item.content}
                    </Card>
                  ))}
                </div>
              </div>

              {/* Form Component Playground */}
              <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                    <h2 className="text-base font-bold">3. Reusable Form Component</h2>
                  </div>
                  <span className="text-xs font-mono text-gray-400">&lt;Form fields={'{schema}'} /&gt;</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Dynamic Form instance */}
                  <div className="p-5 rounded-xl bg-slate-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
                    <Form
                      fields={contactFormFields}
                      onSubmit={handleFormSubmit}
                      submitButtonText="Dispatch Form Values"
                      isSubmitting={isFormSubmitting}
                    />
                  </div>

                  {/* Realtime Submission output */}
                  <div className="p-5 rounded-xl bg-slate-100 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Live Submission Payload</span>
                        {submittedData && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-semibold">
                            Received
                          </span>
                        )}
                      </div>
                      {submittedData ? (
                        <pre className="text-xs font-mono p-3 rounded-lg bg-gray-900 text-emerald-400 overflow-x-auto max-h-64 leading-tight">
                          {JSON.stringify(submittedData, null, 2)}
                        </pre>
                      ) : (
                        <div className="h-44 flex flex-col items-center justify-center text-center text-gray-400 p-4 border border-dashed border-gray-300 dark:border-gray-800 rounded-lg">
                          <Send className="w-6 h-6 mb-2 stroke-1" />
                          <p className="text-xs">Fill out the form on the left and submit to see props-driven state serialization.</p>
                        </div>
                      )}
                    </div>
                    {submittedData && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSubmittedData(null)}
                        className="mt-4 self-end text-xs"
                      >
                        Clear Payload
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Prop Controls (Playground Toolbar) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="sticky top-24 p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md">
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center space-x-2">
                    <Sliders className="w-5 h-5 text-indigo-500" />
                    <h3 className="font-bold text-base">Props Controller</h3>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 font-medium">
                    React State
                  </span>
                </div>

                {/* Button Props Toggles */}
                <div className="space-y-4 mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Button Props</h4>
                  
                  <div>
                    <label className="text-xs text-gray-600 dark:text-gray-300 block mb-1">Variant Prop</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {['primary', 'secondary', 'danger', 'outline', 'ghost'].map(v => (
                        <button
                          key={v}
                          onClick={() => setBtnVariant(v)}
                          className={`text-xs capitalize py-1.5 px-2 rounded-lg border transition ${
                            btnVariant === v 
                              ? 'bg-indigo-600 text-white border-indigo-600 font-semibold' 
                              : 'border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-600 dark:text-gray-300 block mb-1">Size Prop</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['sm', 'md', 'lg'].map(s => (
                        <button
                          key={s}
                          onClick={() => setBtnSize(s)}
                          className={`text-xs uppercase py-1.5 px-2 rounded-lg border transition ${
                            btnSize === s 
                              ? 'bg-indigo-600 text-white border-indigo-600 font-semibold' 
                              : 'border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-gray-600 dark:text-gray-300">isLoading Prop</span>
                    <button
                      type="button"
                      onClick={() => setBtnLoading(!btnLoading)}
                      className={`w-11 h-6 rounded-full transition-colors relative ${btnLoading ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-700'}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform transform absolute top-1 ${btnLoading ? 'left-6' : 'left-1'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 dark:text-gray-300">disabled Prop</span>
                    <button
                      type="button"
                      onClick={() => setBtnDisabled(!btnDisabled)}
                      className={`w-11 h-6 rounded-full transition-colors relative ${btnDisabled ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-700'}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform transform absolute top-1 ${btnDisabled ? 'left-6' : 'left-1'}`} />
                    </button>
                  </div>
                </div>

                {/* Card Props Toggles */}
                <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Card Props</h4>

                  <div>
                    <label className="text-xs text-gray-600 dark:text-gray-300 block mb-1">Variant Prop</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {['elevated', 'outline', 'glass'].map(v => (
                        <button
                          key={v}
                          onClick={() => setCardVariant(v)}
                          className={`text-xs capitalize py-1.5 px-2 rounded-lg border transition ${
                            cardVariant === v 
                              ? 'bg-indigo-600 text-white border-indigo-600 font-semibold' 
                              : 'border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 dark:text-gray-300">Include Image Banner</span>
                    <button
                      type="button"
                      onClick={() => setCardWithImage(!cardWithImage)}
                      className={`w-11 h-6 rounded-full transition-colors relative ${cardWithImage ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-700'}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform transform absolute top-1 ${cardWithImage ? 'left-6' : 'left-1'}`} />
                    </button>
                  </div>
                </div>

                {/* Header Props Quick Tweaks */}
                <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Header Props</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 dark:text-gray-300">Unread Notification Count</span>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setNotificationCount(c => Math.max(0, c - 1))}
                        className="w-7 h-7 rounded bg-gray-100 dark:bg-gray-800 text-sm font-bold flex items-center justify-center hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span className="text-xs font-mono font-bold w-6 text-center">{notificationCount}</span>
                      <button 
                        onClick={() => setNotificationCount(c => c + 1)}
                        className="w-7 h-7 rounded bg-gray-100 dark:bg-gray-800 text-sm font-bold flex items-center justify-center hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 2: COMPONENT CATALOG
        ========================================================================= */}
        {activeTab === 'component-catalog' && (
          <div className="mt-8 space-y-10">
            {/* 1. Buttons Row */}
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-bold mb-1">Button Variants & Sizes</h3>
              <p className="text-xs text-gray-500 mb-6">Standardized primary, secondary, danger, outline, and ghost variants.</p>
              
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Primary Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="primary" isLoading>Loading State</Button>
                <Button variant="primary" disabled>Disabled State</Button>
                <Button variant="primary" size="sm" leftIcon={Sparkles}>Small with Icon</Button>
                <Button variant="primary" size="lg" rightIcon={ArrowRight}>Large with Icon</Button>
              </div>
            </div>

            {/* 2. Cards Grid */}
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-bold mb-1">Card Container Styles</h3>
              <p className="text-xs text-gray-500 mb-6">Elevated, outline, and glass styles with customizable badges, icons, and footers.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card
                  title="Elevated Variant"
                  subtitle="Default box-shadow"
                  badge="Popular"
                  badgeVariant="primary"
                  variant="elevated"
                  icon={Layers}
                  footer={<span className="text-xs text-indigo-500 font-semibold">Read Guide &rarr;</span>}
                >
                  Features an ambient drop shadow that elevates on hover with subtle border styling.
                </Card>

                <Card
                  title="Outline Variant"
                  subtitle="Strict 2px border"
                  badge="Clean"
                  badgeVariant="success"
                  variant="outline"
                  icon={Shield}
                  footer={<span className="text-xs text-emerald-500 font-semibold">Inspect Docs &rarr;</span>}
                >
                  Ideal for dense interfaces or cards nested inside already shadowed containers.
                </Card>

                <Card
                  title="Glassmorphism Variant"
                  subtitle="Backdrop blur"
                  badge="Modern"
                  badgeVariant="purple"
                  variant="glass"
                  icon={Sparkles}
                  footer={<span className="text-xs text-purple-500 font-semibold">Discover &rarr;</span>}
                >
                  Leverages CSS backdrop-filter for frosted glass UI against colorful backgrounds.
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: PROPS SPECS & ARCHITECTURE
        ========================================================================= */}
        {activeTab === 'code' && (
          <div className="mt-8 space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-bold mb-2">Component Specifications & Prop Contracts</h3>
              <p className="text-xs text-gray-500 mb-6">Overview of all 5 reusable components built into this application.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
                  <h4 className="font-semibold text-sm text-indigo-500 mb-2">1. Header</h4>
                  <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400 font-mono">
                    <li>• title: string</li>
                    <li>• navLinks: Array&lt;{'{ id, label }'}&gt;</li>
                    <li>• activeLink: string</li>
                    <li>• onNavigate: (id) =&gt; void</li>
                    <li>• isDarkMode: boolean</li>
                    <li>• onToggleTheme: () =&gt; void</li>
                    <li>• notificationCount: number</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
                  <h4 className="font-semibold text-sm text-indigo-500 mb-2">2. Footer</h4>
                  <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400 font-mono">
                    <li>• brandName: string</li>
                    <li>• tagline: string</li>
                    <li>• links: Array&lt;{'{ category, items }'}&gt;</li>
                    <li>• socialLinks: Array&lt;{'{ name, icon, href }'}&gt;</li>
                    <li>• copyrightYear: number</li>
                    <li>• onSubscribe: (email) =&gt; void</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
                  <h4 className="font-semibold text-sm text-indigo-500 mb-2">3. Card</h4>
                  <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400 font-mono">
                    <li>• title, subtitle: string</li>
                    <li>• badge, badgeVariant: string</li>
                    <li>• icon: LucideIcon</li>
                    <li>• imageSrc: string (optional)</li>
                    <li>• variant: 'elevated' | 'outline' | 'glass'</li>
                    <li>• footer: ReactNode</li>
                    <li>• children: ReactNode</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
                  <h4 className="font-semibold text-sm text-indigo-500 mb-2">4. Button</h4>
                  <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400 font-mono">
                    <li>• variant: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost'</li>
                    <li>• size: 'sm' | 'md' | 'lg'</li>
                    <li>• isLoading: boolean</li>
                    <li>• disabled: boolean</li>
                    <li>• leftIcon, rightIcon: LucideIcon</li>
                    <li>• onClick: (e) =&gt; void</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 md:col-span-2">
                  <h4 className="font-semibold text-sm text-indigo-500 mb-2">5. Form</h4>
                  <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400 font-mono">
                    <li>• fields: Array&lt;{'{ name, label, type, required, placeholder, validate, options }'}&gt;</li>
                    <li>• onSubmit: (formData) =&gt; void</li>
                    <li>• submitButtonText: string</li>
                    <li>• isSubmitting: boolean</li>
                    <li>• initialValues: Object</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 5. Footer Component in Action */}
      <Footer
        brandName="DevForge"
        tagline="Standardized React components designed with modern props patterns, state flow, and accessibility."
        links={footerLinks}
        socialLinks={socialLinks}
        copyrightYear={2026}
        isDarkMode={isDarkMode}
        onSubscribe={(email) => {
          console.log("Subscribed email:", email);
        }}
      />
    </div>
  );
}