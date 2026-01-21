// genfeel-app.js - Precompiled React Application

// Hide loading screen immediately when this script loads
(function() {
    setTimeout(function() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }, 100);
})();

const { useState, useEffect } = React;

// API Configuration
const API_URL = 'http://localhost:5000';

// ===== URL ROUTING FUNCTIONS =====
function updateURL(page, service = null) {
    try {
        let url = '/' + page;
        if (service) {
            const serviceSlug = service
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]/g, '');
            url += '/' + serviceSlug;
        }
        
        if (window.history && window.history.pushState) {
            window.history.pushState({ page, service }, '', url);
            console.log('✅ URL updated to:', url);
        }
        
        // Update page title
        let title = 'Genfeel';
        if (service) {
            title += ' - ' + service;
        }
        title += ' | Tech with a Heartbeat';
        document.title = title;
        
    } catch (error) {
        console.log('URL update failed:', error);
    }
}

function getCurrentPageFromURL() {
    const path = window.location.pathname;
    const parts = path.split('/').filter(p => p);
    
    if (parts.length === 0) return 'home';
    if (parts[0] === 'services' && parts.length > 1) {
        // Save service slug for later use if needed
        window.currentServiceSlug = parts[1];
        return 'services';
    }
    return parts[0]; // home, about, contact, get-started
}
// ===== END URL FUNCTIONS =====

// ===== NAVBAR COMPONENT =====
const Navbar = ({ currentPage, setCurrentPage }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { id: 'home', label: 'Home' },
        { id: 'services', label: 'Services' },
        { id: 'about', label: 'About' },
        { id: 'contact', label: 'Contact' },
    ];

    const handleNavClick = (pageId) => {
        updateURL(pageId);
        setCurrentPage(pageId);
        setIsMobileMenuOpen(false);
        window.scrollTo(0, 0);
    };

    return React.createElement('nav', { className: `navbar ${isScrolled ? 'scrolled' : ''}` },
        React.createElement('div', { className: 'navbar-container container' },
            React.createElement('div', { onClick: () => handleNavClick('home'), className: 'navbar-logo' },
                React.createElement('span', { className: 'logo-icon' }, 'G'),
                React.createElement('span', { className: 'logo-text' }, 'Genfeel')
            ),
            React.createElement('div', { className: 'navbar-links desktop-only' },
                navLinks.map((link) => 
                    React.createElement('div', {
                        key: link.id,
                        onClick: () => handleNavClick(link.id),
                        className: `nav-link ${currentPage === link.id ? 'active' : ''}`
                    }, link.label)
                )
            ),
            React.createElement('button', { 
                onClick: () => {
                    updateURL('get-started');
                    setCurrentPage('get-started');
                }, 
                className: 'btn btn-primary desktop-only' 
            }, 'Get Started'),
            React.createElement('button', { 
                className: 'mobile-menu-toggle', 
                onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen) 
            },
                React.createElement('span', { className: `hamburger ${isMobileMenuOpen ? 'open' : ''}` },
                    React.createElement('span', {}),
                    React.createElement('span', {}),
                    React.createElement('span', {})
                )
            )
        ),
        React.createElement('div', { className: `mobile-menu ${isMobileMenuOpen ? 'open' : ''}` },
            React.createElement('div', { className: 'mobile-menu-links' },
                navLinks.map((link) => 
                    React.createElement('div', {
                        key: link.id,
                        onClick: () => handleNavClick(link.id),
                        className: `mobile-nav-link ${currentPage === link.id ? 'active' : ''}`
                    }, link.label)
                ),
                React.createElement('button', { 
                    onClick: () => {
                        updateURL('get-started');
                        setCurrentPage('get-started');
                    }, 
                    className: 'btn btn-primary' 
                }, 'Get Started')
            )
        )
    );
};

// ===== HOME PAGE =====
const HomePage = ({ setCurrentPage }) => {
    const services = [
        {
            icon: '🌐',
            title: 'Websites',
            description: 'Beautiful, fast, and feel like home to your customers',
            features: ['Responsive Design', 'Performance Optimized', 'SEO Friendly']
        },
        {
            icon: '📱',
            title: 'Mobile Apps',
            description: 'Apps that fit seamlessly into daily life',
            features: ['iOS & Android', 'Native Performance', 'Intuitive UX']
        },
        {
            icon: '💬',
            title: 'Chatbot and Voice Agent AI',
            description: 'Like talking to a real person who knows your brand',
            features: ['Natural Language', 'Smart Responses', 'Brand Aligned']
        }
    ];

    const stats = [
        { number: '50+', label: 'Projects Delivered' },
        { number: '30+', label: 'Happy Clients' },
        { number: '98%', label: 'Satisfaction Rate' },
        { number: '24/7', label: 'Support Available' }
    ];

    return React.createElement('div', { className: 'home fade-in' },
        React.createElement('section', { className: 'hero' },
            React.createElement('div', { className: 'hero-background' },
                React.createElement('div', { className: 'gradient-mesh' })
            ),
            React.createElement('div', { className: 'hero-content container' },
                React.createElement('div', { className: 'hero-badge' }, 'Digital Made Human'),
                React.createElement('h1', { className: 'hero-title' },
                    'Tech with a ',
                    React.createElement('span', { className: 'gradient-text' }, 'heartbeat')
                ),
                React.createElement('p', { className: 'hero-description' },
                    'We create digital experiences that people ',
                    React.createElement('em', {}, 'enjoy'),
                    ' using. Beautiful websites, intuitive mobile apps, Chatbot and Voice Agent AI that feels like talking to a real person.'
                ),
                React.createElement('div', { className: 'hero-cta' },
                    React.createElement('button', { 
                        onClick: () => {
                            updateURL('get-started');
                            setCurrentPage('get-started');
                        }, 
                        className: 'btn btn-primary btn-lg' 
                    }, 'Start Your Project'),
                    React.createElement('button', { 
                        onClick: () => {
                            updateURL('services');
                            setCurrentPage('services');
                        }, 
                        className: 'btn btn-secondary btn-lg' 
                    }, 'View Services')
                ),
                React.createElement('div', { className: 'hero-stats' },
                    stats.map((stat, index) => 
                        React.createElement('div', { key: index, className: 'stat-item' },
                            React.createElement('div', { className: 'stat-number' }, stat.number),
                            React.createElement('div', { className: 'stat-label' }, stat.label)
                        )
                    )
                )
            )
        ),
        React.createElement('section', { className: 'services-section' },
            React.createElement('div', { className: 'container' },
                React.createElement('div', { className: 'section-header' },
                    React.createElement('h2', { className: 'section-title' }, 'What We Build'),
                    React.createElement('p', { className: 'section-description' }, 'Digital solutions designed for humans, not robots')
                ),
                React.createElement('div', { className: 'services-grid' },
                    services.map((service, index) => 
                        React.createElement('div', { key: index, className: 'service-card' },
                            React.createElement('div', { className: 'service-icon' }, service.icon),
                            React.createElement('h3', { className: 'service-title' }, service.title),
                            React.createElement('p', { className: 'service-description' }, service.description),
                            React.createElement('ul', { className: 'service-features' },
                                service.features.map((feature, i) => 
                                    React.createElement('li', { key: i },
                                        React.createElement('span', { style: { color: 'var(--color-primary)' } }, '✓'),
                                        feature
                                    )
                                )
                            ),
                            React.createElement('div', { 
                                onClick: () => {
                                    updateURL('services', service.title);
                                    setCurrentPage('services');
                                }, 
                                className: 'service-link' 
                            }, 'Learn More →')
                        )
                    )
                )
            )
        ),
        React.createElement('section', { className: 'why-section' },
            React.createElement('div', { className: 'container' },
                React.createElement('div', { className: 'why-content' },
                    React.createElement('div', { className: 'why-text' },
                        React.createElement('h2', { className: 'section-title' }, 'Building connections, not just code'),
                        React.createElement('p', { className: 'why-description' },
                            'Instead of cold technology, we build warm connections. Our work is about making every tap, scroll, and conversation feel intentional, intuitive, and human.'
                        ),
                        React.createElement('p', { className: 'why-description' },
                            'Whether you\'re launching something new or refreshing what you have, we\'re here to make sure your digital presence feels as good as it looks.'
                        ),
                        React.createElement('button', { 
                            onClick: () => {
                                updateURL('about');
                                setCurrentPage('about');
                            }, 
                            className: 'btn btn-primary' 
                        }, 'Learn About Us')
                    ),
                    React.createElement('div', { className: 'why-visual' },
                        React.createElement('div', { className: 'visual-card glass' },
                            React.createElement('div', { className: 'visual-content' },
                                React.createElement('h4', {}, 
                                    React.createElement('div', { className: 'pulse-dot' }),
                                    'Human-Centered Design'
                                ),
                                React.createElement('p', {}, 'Every decision driven by user experience')
                            )
                        ),
                        React.createElement('div', { className: 'visual-card glass' },
                            React.createElement('div', { className: 'visual-content' },
                                React.createElement('h4', {}, 
                                    React.createElement('div', { className: 'pulse-dot' }),
                                    'Modern Technology'
                                ),
                                React.createElement('p', {}, 'Built with the latest tools and frameworks')
                            )
                        ),
                        React.createElement('div', { className: 'visual-card glass' },
                            React.createElement('div', { className: 'visual-content' },
                                React.createElement('h4', {}, 
                                    React.createElement('div', { className: 'pulse-dot' }),
                                    'Ongoing Support'
                                ),
                                React.createElement('p', {}, 'We\'re with you every step of the way')
                            )
                        )
                    )
                )
            )
        ),
        React.createElement('section', { className: 'cta-section' },
            React.createElement('div', { className: 'container' },
                React.createElement('div', { className: 'cta-content' },
                    React.createElement('h2', { className: 'cta-title' }, 'Ready to build something amazing?'),
                    React.createElement('p', { className: 'cta-description' },
                        'Let\'s create a digital experience that your users will love'
                    ),
                    React.createElement('div', { className: 'cta-buttons' },
                        React.createElement('button', { 
                            onClick: () => {
                                updateURL('get-started');
                                setCurrentPage('get-started');
                            }, 
                            className: 'btn btn-primary btn-lg' 
                        }, 'Get Started Today'),
                        React.createElement('button', { 
                            onClick: () => {
                                updateURL('contact');
                                setCurrentPage('contact');
                            }, 
                            className: 'btn btn-secondary btn-lg' 
                        }, 'Schedule a Call')
                    )
                )
            )
        )
    );
};

// ===== SERVICES PAGE =====
const ServicesPage = ({ setCurrentPage }) => {
    const services = [
        {
            icon: '🌐',
            title: 'Website Development',
            tagline: 'Beautiful, fast, and feel like home',
            description: 'We create websites that don\'t just look good—they perform exceptionally and provide experiences your customers will love returning to.',
            features: [
                'Responsive Design',
                'Performance Optimization',
                'SEO & Accessibility',
                'Content Management',
                'E-commerce Solutions',
                'Progressive Web Apps'
            ]
        },
        {
            icon: '📱',
            title: 'Mobile App Development',
            tagline: 'Apps that fit seamlessly into daily life',
            description: 'Native and cross-platform mobile applications designed with your users in mind. Intuitive, fast, and delightful to use.',
            features: [
                'iOS & Android Development',
                'Cross-Platform Solutions',
                'Native Performance',
                'Offline Functionality',
                'Push Notifications',
                'App Store Optimization'
            ]
        },
        {
            icon: '💬',
            title: 'Chatbot and Voice Agent AI',
            tagline: 'Like talking to a real person',
            description: 'AI-powered chatbots and virtual assistants that understand context, speak naturally, and truly represent your brand.',
            features: [
                'Natural Language Processing',
                'Multi-Channel Support',
                'Brand Voice Training',
                'Context Awareness',
                '24/7 Availability',
                'Analytics & Insights'
            ]
        }
    ];

    const packages = [
        {
            id: 'starter',
            name: 'Starter',
            badge: '🟩',
            price: '£299',
            description: 'For small local brands taking their first digital step',
            features: [
                '1–3 page modern website',
                'Responsive design for mobile & tablet',
                'Free domain setup & secure hosting (1 year)',
                'Basic SEO (titles, descriptions)',
                'Contact form & social links',
                'Email support (Mon–Fri)'
            ],
            upgrades: [
                '🛍️ Online store (+£149)',
                '📅 Booking system (+£99)'
            ],
            highlighted: false
        },
        {
            id: 'professional',
            name: 'Professional',
            badge: '🟦',
            price: '£749',
            description: 'For businesses ready to attract and convert',
            features: [
                'Everything in Starter, plus:',
                '5–8 custom pages',
                'High-definition visuals & animations',
                'Built-in CMS for easy editing',
                'Blog or portfolio section',
                'Local SEO optimization',
                'Google Analytics setup',
                '1-hour strategy consultation',
                'Two design revisions'
            ],
            addons: [
                '📱 Mobile app version (+£499)',
                '🗣️ Voice agent (+£249)',
                '💬 Chatbot assistant (+£199)'
            ],
            highlighted: true
        },
        {
            id: 'business',
            name: 'Business',
            badge: '🟨',
            price: '£1,499',
            description: 'For growing brands that want automation and performance',
            features: [
                'Everything in Professional, plus:',
                'Backend system with dashboard & database',
                'Secure payment & order processing',
                'Member/client portal',
                'Advanced SEO (speed + schema)',
                'Monthly website health checks (3 months)',
                'Priority support (24-hour response)'
            ],
            enhancements: [
                '📱 Custom mobile app (+£699)',
                '🗣️ Voice agent (+£299)',
                '🤖 AI chatbot (+£349)'
            ],
            highlighted: false
        }
    ];

    const maintenancePlans = [
        {
            name: 'Essential Care',
            price: '£49/mo',
            icon: '⚡',
            description: 'Hosting, backups, & security updates'
        },
        {
            name: 'Growth Care',
            price: '£99/mo',
            icon: '📈',
            description: 'Essential + SEO tracking & content updates',
            highlighted: true
        },
        {
            name: 'Enterprise Care',
            price: '£199/mo',
            icon: '🚀',
            description: 'Growth + chatbot & voice agent optimization'
        }
    ];

    return React.createElement('div', { className: 'services-page fade-in' },
        React.createElement('section', { className: 'services-hero' },
            React.createElement('div', { className: 'container' },
                React.createElement('h1', { className: 'hero-title' },
                    'Digital Experiences, ',
                    React.createElement('span', { className: 'gradient-text' }, 'Humanly Crafted')
                ),
                React.createElement('p', { className: 'hero-description' },
                    'We design technology that feels human — crafted for businesses that want to look, sound, and perform like the future.'
                )
            )
        ),
        React.createElement('section', { className: 'detailed-services' },
            React.createElement('div', { className: 'container' },
                services.map((service, index) => 
                    React.createElement('div', { key: index, className: 'detailed-service' },
                        React.createElement('div', { className: 'service-header' },
                            React.createElement('span', { className: 'service-icon-large' }, service.icon),
                            React.createElement('div', {},
                                React.createElement('h2', { className: 'service-title-large' }, service.title),
                                React.createElement('p', { className: 'service-tagline' }, service.tagline)
                            )
                        ),
                        React.createElement('p', { className: 'why-description' }, service.description),
                        React.createElement('div', { style: { marginTop: '2rem' } },
                            React.createElement('h4', { style: { marginBottom: '1rem', color: 'var(--color-primary-light)' } }, 'What\'s Included'),
                            React.createElement('ul', { className: 'service-features' },
                                service.features.map((feature, i) => 
                                    React.createElement('li', { key: i },
                                        React.createElement('span', { style: { color: 'var(--color-primary)' } }, '✓'),
                                        feature
                                    )
                                )
                            )
                        )
                    )
                )
            )
        ),
        React.createElement('section', { className: 'pricing-section' },
            React.createElement('div', { className: 'container' },
                React.createElement('div', { className: 'section-header' },
                    React.createElement('h2', { className: 'section-title' }, 'Choose a plan that fits your ambition'),
                    React.createElement('p', { className: 'section-description' }, 'Flexible pricing for projects of all sizes')
                ),
                React.createElement('div', { className: 'pricing-grid' },
                    packages.map((pkg, index) => 
                        React.createElement('div', {
                            key: index,
                            className: `pricing-card ${pkg.highlighted ? 'highlighted' : ''}`
                        },
                            pkg.highlighted && React.createElement('div', { className: 'popular-badge' }, 'Most Popular'),
                            React.createElement('div', { style: { fontSize: '2rem', marginBottom: '0.5rem' } }, pkg.badge),
                            React.createElement('h3', { className: 'package-name' }, pkg.name),
                            React.createElement('div', { className: 'package-price' }, pkg.price),
                            React.createElement('p', { className: 'package-description' }, pkg.description),
                            
                            React.createElement('div', { style: { marginBottom: '1rem' } },
                                React.createElement('h4', { style: { fontSize: '1rem', marginBottom: '0.75rem', color: 'var(--color-primary-light)' } }, 'Includes:'),
                                React.createElement('ul', { className: 'package-features' },
                                    pkg.features.map((feature, i) => 
                                        React.createElement('li', { key: i }, feature)
                                    )
                                )
                            ),

                            pkg.upgrades && React.createElement('div', { style: { marginBottom: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' } },
                                React.createElement('h4', { style: { fontSize: '0.875rem', marginBottom: '0.75rem', color: 'var(--color-accent)' } }, 'Upgrade Options:'),
                                React.createElement('ul', { className: 'package-features' },
                                    pkg.upgrades.map((upgrade, i) => 
                                        React.createElement('li', { key: i, style: { fontSize: '0.875rem' } }, upgrade)
                                    )
                                )
                            ),

                            pkg.addons && React.createElement('div', { style: { marginBottom: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' } },
                                React.createElement('h4', { style: { fontSize: '0.875rem', marginBottom: '0.75rem', color: 'var(--color-accent)' } }, 'Add-ons:'),
                                React.createElement('ul', { className: 'package-features' },
                                    pkg.addons.map((addon, i) => 
                                        React.createElement('li', { key: i, style: { fontSize: '0.875rem' } }, addon)
                                    )
                                )
                            ),

                            React.createElement('button', { 
                                onClick: () => {
                                    updateURL('contact', 'Get Quote');
                                    setCurrentPage('contact');
                                }, 
                                className: 'btn btn-primary btn-block' 
                            }, 'Get a Quote')
                        )
                    )
                )
            )
        ),
        React.createElement('section', { className: 'services-section', style: { background: 'var(--color-background)' } },
            React.createElement('div', { className: 'container' },
                React.createElement('div', { className: 'section-header' },
                    React.createElement('h2', { className: 'section-title' }, '⚙️ Monthly Maintenance Plans'),
                    React.createElement('p', { className: 'section-description' }, 'Keep your digital presence running smoothly')
                ),
                React.createElement('div', { className: 'services-grid' },
                    maintenancePlans.map((plan, index) => 
                        React.createElement('div', { key: index, className: `service-card ${plan.highlighted ? 'pricing-card highlighted' : ''}` },
                            plan.highlighted && React.createElement('div', { className: 'popular-badge' }, 'Best Value'),
                            React.createElement('div', { className: 'service-icon' }, plan.icon),
                            React.createElement('h3', { className: 'service-title' }, plan.name),
                            React.createElement('div', { className: 'package-price', style: { fontSize: '2rem', margin: '1rem 0' } }, plan.price),
                            React.createElement('p', { className: 'service-description' }, plan.description),
                            React.createElement('button', { 
                                onClick: () => {
                                    updateURL('contact', plan.name);
                                    setCurrentPage('contact');
                                }, 
                                className: `btn ${plan.highlighted ? 'btn-primary' : 'btn-secondary'} btn-block`
                            }, 'Learn More')
                        )
                    )
                )
            )
        )
    );
};

// ===== ABOUT PAGE =====
const AboutPage = ({ setCurrentPage }) => {
    return React.createElement('div', { className: 'about-page fade-in' },
        React.createElement('section', { className: 'services-hero' },
            React.createElement('div', { className: 'container' },
                React.createElement('h1', { className: 'hero-title' },
                    'We\'re ',
                    React.createElement('span', { className: 'gradient-text' }, 'Genfeel')
                ),
                React.createElement('p', { className: 'hero-description' },
                    'A team of designers, developers, and strategists who believe technology should feel human.'
                )
            )
        ),
        React.createElement('section', { className: 'why-section' },
            React.createElement('div', { className: 'container' },
                React.createElement('div', { className: 'why-content' },
                    React.createElement('div', { className: 'why-text' },
                        React.createElement('h2', { className: 'section-title' }, 'Our Mission'),
                        React.createElement('p', { className: 'why-description' },
                            'We exist to bridge the gap between technology and humanity. Every project we take on is an opportunity to create something that doesn\'t just work—it delights.'
                        ),
                        React.createElement('p', { className: 'why-description' },
                            'We believe the best digital experiences are invisible. They feel natural, intuitive, and effortless. That\'s what we build.'
                        ),
                        React.createElement('button', { 
                            onClick: () => {
                                updateURL('contact');
                                setCurrentPage('contact');
                            }, 
                            className: 'btn btn-primary' 
                        }, 'Contact Us')
                    ),
                    React.createElement('div', { className: 'why-visual' },
                        React.createElement('div', { className: 'visual-card glass' },
                            React.createElement('div', { className: 'visual-content' },
                                React.createElement('h4', {}, '🎨 Design First'),
                                React.createElement('p', {}, 'Every pixel matters. We obsess over the details.')
                            )
                        ),
                        React.createElement('div', { className: 'visual-card glass' },
                            React.createElement('div', { className: 'visual-content' },
                                React.createElement('h4', {}, '⚡ Performance Driven'),
                                React.createElement('p', {}, 'Fast, efficient, and optimized for all devices.')
                            )
                        ),
                        React.createElement('div', { className: 'visual-card glass' },
                            React.createElement('div', { className: 'visual-content' },
                                React.createElement('h4', {}, '🤝 Client Partnership'),
                                React.createElement('p', {}, 'Your success is our success. We\'re in this together.')
                            )
                        )
                    )
                )
            )
        ),
        React.createElement('section', { className: 'services-section' },
            React.createElement('div', { className: 'container' },
                React.createElement('div', { className: 'section-header' },
                    React.createElement('h2', { className: 'section-title' }, 'Our Values')
                ),
                React.createElement('div', { className: 'services-grid' },
                    React.createElement('div', { className: 'service-card' },
                        React.createElement('div', { className: 'service-icon' }, '💡'),
                        React.createElement('h3', { className: 'service-title' }, 'Innovation'),
                        React.createElement('p', { className: 'service-description' },
                            'We stay ahead of the curve, always exploring new technologies and methodologies to deliver cutting-edge solutions.'
                        )
                    ),
                    React.createElement('div', { className: 'service-card' },
                        React.createElement('div', { className: 'service-icon' }, '🎯'),
                        React.createElement('h3', { className: 'service-title' }, 'Quality'),
                        React.createElement('p', { className: 'service-description' },
                            'We never compromise on quality. Every line of code, every design element is crafted with care and precision.'
                        )
                    ),
                    React.createElement('div', { className: 'service-card' },
                        React.createElement('div', { className: 'service-icon' }, '❤️'),
                        React.createElement('h3', { className: 'service-title' }, 'Empathy'),
                        React.createElement('p', { className: 'service-description' },
                            'We put ourselves in your users\' shoes. Understanding their needs and pain points guides every decision we make.'
                        )
                    )
                )
            )
        )
    );
};

// ===== CONTACT PAGE =====
const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            setSuccess(true);
            setFormData({
                name: '',
                email: '',
                company: '',
                phone: '',
                service: '',
                message: ''
            });
        } catch (err) {
            setError('Failed to send message. Please try again.');
        }

        setLoading(false);
    };

    return React.createElement('div', { className: 'contact-page fade-in' },
        React.createElement('section', { className: 'contact-hero' },
            React.createElement('div', { className: 'container' },
                React.createElement('h1', { className: 'hero-title' },
                    'Let\'s ',
                    React.createElement('span', { className: 'gradient-text' }, 'Connect')
                ),
                React.createElement('p', { className: 'hero-description' },
                    'Have a project in mind? We\'d love to hear about it.'
                )
            )
        ),
        React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'contact-container' },
                React.createElement('div', { className: 'contact-info' },
                    React.createElement('div', {},
                        React.createElement('h2', {}, 'Get in Touch'),
                        React.createElement('p', { className: 'why-description' },
                            'Whether you\'re ready to start your project or just want to learn more about what we do, we\'re here to help.'
                        )
                    ),
                    React.createElement('div', { className: 'contact-info-item' },
                        React.createElement('div', { className: 'contact-icon' }, '📧'),
                        React.createElement('div', {},
                            React.createElement('h4', {}, 'Email'),
                            React.createElement('p', { className: 'why-description' }, 'hello@genfeel.co.uk')
                        )
                    ),
                    React.createElement('div', { className: 'contact-info-item' },
                        React.createElement('div', { className: 'contact-icon' }, '📞'),
                        React.createElement('div', {},
                            React.createElement('h4', {}, 'Phone'),
                            React.createElement('p', { className: 'why-description' }, '+44 7383027802')
                        )
                    ),
                    React.createElement('div', { className: 'contact-info-item' },
                        React.createElement('div', { className: 'contact-icon' }, '📍'),
                        React.createElement('div', {},
                            React.createElement('h4', {}, 'Location'),
                            React.createElement('p', { className: 'why-description' }, 'London, UK')
                        )
                    ),
                    React.createElement('div', { className: 'contact-info-item' },
                        React.createElement('div', { className: 'contact-icon' }, '⏰'),
                        React.createElement('div', {},
                            React.createElement('h4', {}, 'Business Hours'),
                            React.createElement('p', { className: 'why-description' }, 'Mon - Fri: 9AM - 6PM PST')
                        )
                    )
                ),
                React.createElement('form', { className: 'contact-form', onSubmit: handleSubmit },
                    React.createElement('h3', {}, 'Send us a Message'),
                    success && React.createElement('div', { 
                        className: 'success-message', 
                        style: { marginBottom: '1rem', padding: '1rem' } 
                    }, '✅ Thank you! We\'ll get back to you within 24 hours.'),
                    error && React.createElement('div', { className: 'error-message' }, error),
                    React.createElement('div', { className: 'form-group' },
                        React.createElement('label', { htmlFor: 'name' }, 'Full Name *'),
                        React.createElement('input', {
                            type: 'text',
                            id: 'name',
                            required: true,
                            value: formData.name,
                            onChange: (e) => setFormData({...formData, name: e.target.value}),
                            placeholder: 'John Doe'
                        })
                    ),
                    React.createElement('div', { className: 'form-group' },
                        React.createElement('label', { htmlFor: 'email' }, 'Email *'),
                        React.createElement('input', {
                            type: 'email',
                            id: 'email',
                            required: true,
                            value: formData.email,
                            onChange: (e) => setFormData({...formData, email: e.target.value}),
                            placeholder: 'john@company.com'
                        })
                    ),
                    React.createElement('div', { className: 'form-group' },
                        React.createElement('label', { htmlFor: 'company' }, 'Company'),
                        React.createElement('input', {
                            type: 'text',
                            id: 'company',
                            value: formData.company,
                            onChange: (e) => setFormData({...formData, company: e.target.value}),
                            placeholder: 'Your Company Inc.'
                        })
                    ),
                    React.createElement('div', { className: 'form-group' },
                        React.createElement('label', { htmlFor: 'phone' }, 'Phone'),
                        React.createElement('input', {
                            type: 'tel',
                            id: 'phone',
                            value: formData.phone,
                            onChange: (e) => setFormData({...formData, phone: e.target.value}),
                            placeholder: '+1 (555) 123-4567'
                        })
                    ),
                    React.createElement('div', { className: 'form-group' },
                        React.createElement('label', { htmlFor: 'service' }, 'Service Interested In'),
                        React.createElement('select', {
                            id: 'service',
                            value: formData.service,
                            onChange: (e) => setFormData({...formData, service: e.target.value})
                        },
                            React.createElement('option', { value: '' }, 'Select a service'),
                            React.createElement('option', { value: 'starter' }, 'Starter Package (£299)'),
                            React.createElement('option', { value: 'professional' }, 'Professional Package (£749)'),
                            React.createElement('option', { value: 'business' }, 'Business Package (£1,499)'),
                            React.createElement('option', { value: 'maintenance' }, 'Maintenance Plans'),
                            React.createElement('option', { value: 'other' }, 'Other')
                        )
                    ),
                    React.createElement('div', { className: 'form-group' },
                        React.createElement('label', { htmlFor: 'message' }, 'Message *'),
                        React.createElement('textarea', {
                            id: 'message',
                            required: true,
                            value: formData.message,
                            onChange: (e) => setFormData({...formData, message: e.target.value}),
                            placeholder: 'Tell us about your project...'
                        })
                    ),
                    React.createElement('button', { 
                        type: 'submit', 
                        disabled: loading, 
                        className: 'btn btn-primary btn-block' 
                    }, loading ? 'Sending...' : 'Send Message')
                )
            )
        )
    );
};

// ===== GET STARTED PAGE =====
const GetStartedPage = ({ setCurrentPage }) => {
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        selectedUpgrades: []
    });

    const packages = [
        {
            id: 'starter',
            name: 'Starter',
            badge: '🟩',
            price: 299,
            description: 'For small local brands taking their first digital step',
            features: [
                '1–3 page modern website',
                'Responsive design for mobile & tablet',
                'Free domain setup & secure hosting (1 year)',
                'Basic SEO (titles, descriptions)',
                'Contact form & social links',
                'Email support (Mon–Fri)'
            ],
            upgrades: [
                { id: 'store', name: '🛍️ Online store', price: 149 },
                { id: 'booking', name: '📅 Booking system', price: 99 }
            ]
        },
        {
            id: 'professional',
            name: 'Professional',
            badge: '🟦',
            price: 749,
            description: 'For businesses ready to attract and convert',
            features: [
                'Everything in Starter, plus:',
                '5–8 custom pages',
                'High-definition visuals & animations',
                'Built-in CMS for easy editing',
                'Blog or portfolio section',
                'Local SEO optimization',
                'Google Analytics setup',
                '1-hour strategy consultation',
                'Two design revisions'
            ],
            addons: [
                { id: 'mobileapp', name: '📱 Mobile app version', price: 499 },
                { id: 'voiceagent', name: '🗣️ Voice agent', price: 249 },
                { id: 'chatbot', name: '💬 Chatbot assistant', price: 199 }
            ],
            popular: true
        },
        {
            id: 'business',
            name: 'Business',
            badge: '🟨',
            price: 1499,
            description: 'For growing brands that want automation and performance',
            features: [
                'Everything in Professional, plus:',
                'Backend system with dashboard & database',
                'Secure payment & order processing',
                'Member/client portal',
                'Advanced SEO (speed + schema)',
                'Monthly website health checks (3 months)',
                'Priority support (24-hour response)'
            ],
            enhancements: [
                { id: 'custommobile', name: '📱 Custom mobile app', price: 699 },
                { id: 'voiceagentpro', name: '🗣️ Voice agent', price: 299 },
                { id: 'aichatbot', name: '🤖 AI chatbot', price: 349 }
            ]
        }
    ];

    const handleUpgradeToggle = (upgradeId, price) => {
        setFormData(prev => {
            const isSelected = prev.selectedUpgrades.some(u => u.id === upgradeId);
            if (isSelected) {
                return {
                    ...prev,
                    selectedUpgrades: prev.selectedUpgrades.filter(u => u.id !== upgradeId)
                };
            } else {
                return {
                    ...prev,
                    selectedUpgrades: [...prev.selectedUpgrades, { id: upgradeId, price }]
                };
            }
        });
    };

    const calculateTotal = () => {
        const basePrice = selectedPackage?.price || 0;
        const upgradesTotal = formData.selectedUpgrades.reduce((sum, u) => sum + u.price, 0);
        return basePrice + upgradesTotal;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setSuccess(true);
        } catch (err) {
            setError('Failed to process request. Please try again.');
        }

        setLoading(false);
    };

    if (success) {
        return React.createElement('div', { className: 'get-started-page fade-in' },
            React.createElement('div', { className: 'container', style: { paddingTop: '120px', paddingBottom: '120px' } },
                React.createElement('div', { className: 'success-message' },
                    React.createElement('div', { className: 'success-icon' }, '✅'),
                    React.createElement('h3', {}, 'Request Received!'),
                    React.createElement('p', {}, 'Thank you for choosing Genfeel. We\'ll be in touch within 24 hours to discuss your project and next steps.'),
                    React.createElement('p', { style: { marginTop: '1rem', color: 'var(--color-text-secondary)' } },
                        'A confirmation email has been sent to ' + formData.email
                    ),
                    React.createElement('button', { 
                        onClick: () => {
                            updateURL('services');
                            setSuccess(false);
                            setSelectedPackage(null);
                            setFormData({name: '', email: '', company: '', phone: '', selectedUpgrades: []});
                        }, 
                        className: 'btn btn-primary',
                        style: { marginTop: '2rem' }
                    }, 'Back to Services')
                )
            )
        );
    }

    return React.createElement('div', { className: 'get-started-page fade-in' },
        React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'get-started-header' },
                React.createElement('h1', {}, 'Let\'s Build Something Amazing'),
                React.createElement('p', {}, 'Choose your package and customize with add-ons')
            ),
            !selectedPackage ? React.createElement('div', { className: 'package-selection' },
                React.createElement('div', { className: 'packages-grid' },
                    packages.map((pkg) => 
                        React.createElement('div', {
                            key: pkg.id,
                            className: `pricing-card ${pkg.popular ? 'highlighted' : ''}`,
                            onClick: () => setSelectedPackage(pkg)
                        },
                            pkg.popular && React.createElement('div', { className: 'popular-badge' }, 'Most Popular'),
                            React.createElement('div', { style: { fontSize: '2rem', marginBottom: '0.5rem' } }, pkg.badge),
                            React.createElement('h3', { className: 'package-name' }, pkg.name),
                            React.createElement('div', { className: 'package-price' }, '£' + pkg.price),
                            React.createElement('p', { className: 'package-description' }, pkg.description),
                            React.createElement('ul', { className: 'package-features' },
                                pkg.features.slice(0, 4).map((feature, i) => 
                                    React.createElement('li', { key: i }, feature)
                                )
                            ),
                            React.createElement('button', { className: 'btn btn-primary btn-block' }, 'Select Package')
                        )
                    )
                )
            ) : React.createElement('div', { className: 'checkout-section' },
                React.createElement('button', {
                    className: 'back-button',
                    onClick: () => {
                        setSelectedPackage(null);
                        setFormData({name: '', email: '', company: '', phone: '', selectedUpgrades: []});
                    }
                }, '← Back to packages'),
                React.createElement('div', { className: 'checkout-grid' },
                    React.createElement('div', { className: 'order-summary' },
                        React.createElement('h2', {}, 'Order Summary'),
                        React.createElement('div', { className: 'summary-item' },
                            React.createElement('h3', {}, selectedPackage.badge + ' ' + selectedPackage.name + ' Package'),
                            React.createElement('p', { style: { color: 'var(--color-text-secondary)', marginTop: '0.5rem' } }, selectedPackage.description),
                            React.createElement('div', { className: 'summary-row', style: { marginTop: '1rem' } },
                                React.createElement('span', {}, 'Base Package'),
                                React.createElement('span', {}, '£' + selectedPackage.price)
                            )
                        ),
                        (selectedPackage.upgrades || selectedPackage.addons || selectedPackage.enhancements) && React.createElement('div', { className: 'summary-item' },
                            React.createElement('h4', { style: { marginBottom: '1rem', color: 'var(--color-primary-light)' } }, 'Available Add-ons:'),
                            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.75rem' } },
                                [...(selectedPackage.upgrades || []), ...(selectedPackage.addons || []), ...(selectedPackage.enhancements || [])].map((addon) => 
                                    React.createElement('label', {
                                        key: addon.id,
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            padding: '0.75rem',
                                            background: formData.selectedUpgrades.some(u => u.id === addon.id) ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255,255,255,0.03)',
                                            borderRadius: 'var(--radius-sm)',
                                            border: '1px solid ' + (formData.selectedUpgrades.some(u => u.id === addon.id) ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)'),
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }
                                    },
                                        React.createElement('input', {
                                            type: 'checkbox',
                                            checked: formData.selectedUpgrades.some(u => u.id === addon.id),
                                            onChange: () => handleUpgradeToggle(addon.id, addon.price),
                                            style: { cursor: 'pointer' }
                                        }),
                                        React.createElement('span', { style: { flex: 1, fontSize: '0.875rem' } }, addon.name),
                                        React.createElement('span', { style: { fontWeight: 'bold', color: 'var(--color-primary-light)' } }, '+£' + addon.price)
                                    )
                                )
                            )
                        ),
                        formData.selectedUpgrades.length > 0 && React.createElement('div', { className: 'summary-item' },
                            React.createElement('h4', { style: { marginBottom: '0.75rem' } }, 'Selected Add-ons:'),
                            formData.selectedUpgrades.map((upgrade) => {
                                const upgradeData = [...(selectedPackage.upgrades || []), 
                                                     ...(selectedPackage.addons || []), 
                                                     ...(selectedPackage.enhancements || [])].find(u => u.id === upgrade.id);
                                return React.createElement('div', { key: upgrade.id, className: 'summary-row' },
                                    React.createElement('span', { style: { fontSize: '0.875rem' } }, upgradeData?.name),
                                    React.createElement('span', {}, '£' + upgrade.price)
                                );
                            })
                        ),
                        React.createElement('div', { className: 'summary-total' },
                            React.createElement('div', { 
                                className: 'summary-row', 
                                style: { fontWeight: 'bold', fontSize: '1.5rem', borderTop: '2px solid rgba(255,255,255,0.2)', paddingTop: '1rem' } 
                            },
                                React.createElement('span', {}, 'Total'),
                                React.createElement('span', { className: 'gradient-text' }, '£' + calculateTotal())
                            )
                        )
                    ),
                    React.createElement('form', { className: 'checkout-form', onSubmit: handleSubmit },
                        React.createElement('div', { className: 'form-section' },
                            React.createElement('h3', {}, 'Your Information'),
                            React.createElement('div', { className: 'form-group' },
                                React.createElement('label', { htmlFor: 'name' }, 'Full Name *'),
                                React.createElement('input', {
                                    type: 'text',
                                    id: 'name',
                                    required: true,
                                    value: formData.name,
                                    onChange: (e) => setFormData({ ...formData, name: e.target.value }),
                                    placeholder: 'John Doe'
                                })
                            ),
                            React.createElement('div', { className: 'form-group' },
                                React.createElement('label', { htmlFor: 'email' }, 'Email *'),
                                React.createElement('input', {
                                    type: 'email',
                                    id: 'email',
                                    required: true,
                                    value: formData.email,
                                    onChange: (e) => setFormData({ ...formData, email: e.target.value }),
                                    placeholder: 'john@company.com'
                                })
                            ),
                            React.createElement('div', { className: 'form-group' },
                                React.createElement('label', { htmlFor: 'company' }, 'Company'),
                                React.createElement('input', {
                                    type: 'text',
                                    id: 'company',
                                    value: formData.company,
                                    onChange: (e) => setFormData({ ...formData, company: e.target.value }),
                                    placeholder: 'Your Company Inc.'
                                })
                            ),
                            React.createElement('div', { className: 'form-group' },
                                React.createElement('label', { htmlFor: 'phone' }, 'Phone *'),
                                React.createElement('input', {
                                    type: 'tel',
                                    id: 'phone',
                                    required: true,
                                    value: formData.phone,
                                    onChange: (e) => setFormData({ ...formData, phone: e.target.value }),
                                    placeholder: '+44 7XXX XXXXXX'
                                })
                            )
                        ),
                        React.createElement('div', { className: 'form-section' },
                            React.createElement('h3', {}, 'Project Details'),
                            React.createElement('div', { className: 'form-group' },
                                React.createElement('label', { htmlFor: 'projectDetails' }, 'Tell us about your project *'),
                                React.createElement('textarea', {
                                    id: 'projectDetails',
                                    required: true,
                                    rows: 4,
                                    placeholder: 'What are your goals? Any specific features or requirements?',
                                    style: {
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: 'var(--radius-sm)',
                                        color: 'var(--color-text-primary)',
                                        fontFamily: 'var(--font-primary)',
                                        resize: 'vertical'
                                    }
                                })
                            ),
                            React.createElement('div', {
                                style: {
                                    padding: '1rem',
                                    background: 'rgba(99, 102, 241, 0.1)',
                                    borderRadius: 'var(--radius-sm)',
                                    marginBottom: '1rem',
                                    fontSize: '0.875rem',
                                    lineHeight: '1.6'
                                }
                            },
                                React.createElement('strong', {}, '📋 Next Steps:'),
                                React.createElement('ol', { style: { marginTop: '0.5rem', marginLeft: '1.25rem' } },
                                    React.createElement('li', {}, 'Submit this form'),
                                    React.createElement('li', {}, 'We\'ll review your requirements'),
                                    React.createElement('li', {}, 'Schedule a consultation call'),
                                    React.createElement('li', {}, 'Receive a detailed proposal'),
                                    React.createElement('li', {}, 'Start building!')
                                )
                            ),
                            error && React.createElement('div', { className: 'error-message' }, error),
                            React.createElement('button', {
                                type: 'submit',
                                disabled: loading,
                                className: 'btn btn-primary btn-lg btn-block'
                            }, loading ? 'Submitting...' : 'Submit Request - £' + calculateTotal()),
                            React.createElement('p', { className: 'payment-notice' }, '💡 No payment required now. We\'ll discuss payment terms during our consultation.')
                        )
                    )
                )
            )
        )
    );
};

// ===== FOOTER COMPONENT =====
const Footer = ({ setCurrentPage }) => {
    const handleNavClick = (pageId) => {
        updateURL(pageId);
        setCurrentPage(pageId);
        window.scrollTo(0, 0);
    };

    return React.createElement('footer', { className: 'footer' },
        React.createElement('div', { className: 'footer-container container' },
            React.createElement('div', { className: 'footer-grid' },
                React.createElement('div', { className: 'footer-section' },
                    React.createElement('div', { className: 'footer-logo' },
                        React.createElement('span', { className: 'logo-icon' }, 'G'),
                        React.createElement('span', { className: 'logo-text' }, 'Genfeel')
                    ),
                    React.createElement('p', { className: 'footer-description' },
                        'Creating digital experiences that people enjoy using. Tech with a heartbeat.'
                    ),
                    React.createElement('div', { className: 'social-links' },
                        React.createElement('a', {
                            href: 'https://instagram.com',
                            target: '_blank',
                            rel: 'noopener noreferrer',
                            className: 'social-link',
                            title: 'Instagram'
                        }, React.createElement('i', { className: 'fab fa-instagram' })),
                        React.createElement('a', {
                            href: 'https://tiktok.com',
                            target: '_blank',
                            rel: 'noopener noreferrer',
                            className: 'social-link',
                            title: 'TikTok'
                        }, React.createElement('i', { className: 'fab fa-tiktok' })),
                        React.createElement('a', {
                            href: 'https://facebook.com',
                            target: '_blank',
                            rel: 'noopener noreferrer',
                            className: 'social-link',
                            title: 'Facebook'
                        }, React.createElement('i', { className: 'fab fa-facebook-f' })),
                        React.createElement('a', {
                            href: 'https://twitter.com',
                            target: '_blank',
                            rel: 'noopener noreferrer',
                            className: 'social-link',
                            title: 'X (Twitter)'
                        }, React.createElement('i', { className: 'fab fa-x-x' }))
                    )
                ),
                React.createElement('div', { className: 'footer-section' },
                    React.createElement('h4', { className: 'footer-title' }, 'Services'),
                    React.createElement('ul', { className: 'footer-links' },
                        React.createElement('li', {}, 
                            React.createElement('a', { 
                                onClick: () => handleNavClick('services'), 
                                style: { cursor: 'pointer' } 
                            }, 'Websites')
                        ),
                        React.createElement('li', {}, 
                            React.createElement('a', { 
                                onClick: () => handleNavClick('services'), 
                                style: { cursor: 'pointer' } 
                            }, 'Mobile Apps')
                        ),
                        React.createElement('li', {}, 
                            React.createElement('a', { 
                                onClick: () => handleNavClick('services'), 
                                style: { cursor: 'pointer' } 
                            }, 'Chatbot and Voice Agent AI')
                        ),
                        React.createElement('li', {}, 
                            React.createElement('a', { 
                                onClick: () => handleNavClick('services'), 
                                style: { cursor: 'pointer' } 
                            }, 'Maintenance Plans')
                        )
                    )
                ),
                React.createElement('div', { className: 'footer-section' },
                    React.createElement('h4', { className: 'footer-title' }, 'Company'),
                    React.createElement('ul', { className: 'footer-links' },
                        React.createElement('li', {}, 
                            React.createElement('a', { 
                                onClick: () => handleNavClick('about'), 
                                style: { cursor: 'pointer' } 
                            }, 'About Us')
                        ),
                        React.createElement('li', {}, 
                            React.createElement('a', { 
                                onClick: () => handleNavClick('services'), 
                                style: { cursor: 'pointer' } 
                            }, 'Our Services')
                        ),
                        React.createElement('li', {}, 
                            React.createElement('a', { 
                                onClick: () => handleNavClick('contact'), 
                                style: { cursor: 'pointer' } 
                            }, 'Contact')
                        ),
                        React.createElement('li', {}, 
                            React.createElement('a', { 
                                onClick: () => handleNavClick('get-started'), 
                                style: { cursor: 'pointer' } 
                            }, 'Get Started')
                        )
                    )
                ),
                React.createElement('div', { className: 'footer-section' },
                    React.createElement('h4', { className: 'footer-title' }, 'Stay Updated'),
                    React.createElement('p', { className: 'footer-description' },
                        'Get the latest updates on digital trends and our work.'
                    ),
                    React.createElement('div', { className: 'social-links', style: { marginTop: '1rem' } },
                        React.createElement('a', {
                            href: 'https://instagram.com',
                            target: '_blank',
                            rel: 'noopener noreferrer',
                            className: 'social-link',
                            title: 'Follow us on Instagram'
                        }, React.createElement('i', { className: 'fab fa-instagram' })),
                        React.createElement('a', {
                            href: 'https://tiktok.com',
                            target: '_blank',
                            rel: 'noopener noreferrer',
                            className: 'social-link',
                            title: 'Follow us on TikTok'
                        }, React.createElement('i', { className: 'fab fa-tiktok' })),
                        React.createElement('a', {
                            href: 'https://facebook.com',
                            target: '_blank',
                            rel: 'noopener noreferrer',
                            className: 'social-link',
                            title: 'Like us on Facebook'
                        }, React.createElement('i', { className: 'fab fa-facebook-f' })),
                        React.createElement('a', {
                            href: 'https://twitter.com',
                            target: '_blank',
                            rel: 'noopener noreferrer',
                            className: 'social-link',
                            title: 'Follow us on X'
                        }, React.createElement('i', { className: 'fab fa-x-x' }))
                    )
                )
            ),
            React.createElement('div', { className: 'footer-bottom' },
                React.createElement('p', {}, '© 2026 Genfeel. All rights reserved.'),
                React.createElement('div', { className: 'footer-bottom-links' },
                    React.createElement('a', { style: { cursor: 'pointer' } }, 'Privacy Policy'),
                    React.createElement('a', { style: { cursor: 'pointer' } }, 'Terms of Service')
                )
            )
        )
    );
};

// ===== MAIN APP COMPONENT =====
const App = () => {
    const [currentPage, setCurrentPage] = useState(() => {
        // Initialize from URL on first load
        return getCurrentPageFromURL();
    });

    // Handle browser back/forward buttons
    useEffect(() => {
        const handlePopState = () => {
            const page = getCurrentPageFromURL();
            setCurrentPage(page);
            window.scrollTo(0, 0);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    return React.createElement('div', { className: 'app' },
        React.createElement(Navbar, { currentPage: currentPage, setCurrentPage: setCurrentPage }),
        currentPage === 'home' && React.createElement(HomePage, { setCurrentPage: setCurrentPage }),
        currentPage === 'services' && React.createElement(ServicesPage, { setCurrentPage: setCurrentPage }),
        currentPage === 'about' && React.createElement(AboutPage, { setCurrentPage: setCurrentPage }),
        currentPage === 'contact' && React.createElement(ContactPage, {}),
        currentPage === 'get-started' && React.createElement(GetStartedPage, { setCurrentPage: setCurrentPage }),
        React.createElement(Footer, { setCurrentPage: setCurrentPage })
    );
};

// ===== RENDER APP =====
console.log('Rendering React app...');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));

// Final safety - hide loading screen
setTimeout(function() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen && loadingScreen.style.display !== 'none') {
        loadingScreen.style.display = 'none';
        console.log('Loading screen safely hidden');
    }
}, 1000);