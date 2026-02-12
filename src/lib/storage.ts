export interface Requirement {
    id: string;
    title: string;
    description: string;
    category: 'Functional' | 'Non-Functional' | 'Constraint' | 'Action Item' | 'Epic' | 'Story' | 'Feature';
    priority: 'High' | 'Medium' | 'Low' | 'N/A';
    subItems?: Requirement[];
}

export interface AnalysisResult {
    transcript: string;
    requirements: Requirement[];
}

export const storeAnalysis = (data: AnalysisResult) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('analysisResult', JSON.stringify(data));
    }
};

export const getAnalysis = (): AnalysisResult | null => {
    if (typeof window !== 'undefined') {
        const data = localStorage.getItem('analysisResult');
        return data ? JSON.parse(data) : null;
    }
    return null;
};

export const demoData: AnalysisResult = {
    transcript: `Project Lead: Today we're diving into two major initiatives for our Q3 roadmap. First, we need to completely overhaul our User Authentication system to meet the new enterprise security standards. Second, we're launching the Real-time Data Analytics Dashboard.

Security Architect: For the authentication refactor, we absolutely need Multi-Factor Authentication. It should support both SMS OTP and Authenticator apps like Google Authenticator.

Lead Developer: Right, and for our enterprise clients, SSO is a non-negotiable. We need to support SAML 2.0 and ensure user profiles are auto-provisioned upon their first login.

Product Manager: Moving to the Analytics Dashboard. Our users are asking for live stream data visualization. This needs to be low-latency, likely using WebSockets, with dynamic charts that update in real-time.

Data Engineer: We also need custom report generation. Users should be able to export their data to PDF or Excel.

Product Manager: And let's not forget scheduled email delivery for those reports so stakeholders stay informed.`,
    requirements: [
        {
            id: 'E-001',
            title: 'User Authentication Refactor',
            description: 'Overhaul the existing authentication system to support enterprise-grade security and MFA.',
            category: 'Epic',
            priority: 'High',
            subItems: [
                {
                    id: 'S-1.1',
                    title: 'Multi-Factor Authentication (MFA)',
                    description: 'Implement multi-factor authentication to enhance user account security.',
                    category: 'Story',
                    priority: 'High',
                    subItems: [
                        {
                            id: 'F-1.1.1',
                            title: 'SMS OTP Integration',
                            description: 'Integration with a third-party SMS provider for One-Time Password delivery.',
                            category: 'Feature',
                            priority: 'Medium'
                        },
                        {
                            id: 'F-1.1.2',
                            title: 'Authenticator App Support (TOTP)',
                            description: 'Support for Time-based One-Time Passwords via apps like Google Authenticator or Microsoft Authenticator.',
                            category: 'Feature',
                            priority: 'High'
                        }
                    ]
                },
                {
                    id: 'S-1.2',
                    title: 'Enterprise SSO Integration',
                    description: 'Enable seamless login for enterprise clients via Single Sign-On.',
                    category: 'Story',
                    priority: 'Medium',
                    subItems: [
                        {
                            id: 'F-1.2.1',
                            title: 'SAML 2.0 Support',
                            description: 'Implement SAML 2.0 protocol for secure identity exchange with Enterprise IDPs.',
                            category: 'Feature',
                            priority: 'High'
                        },
                        {
                            id: 'F-1.2.2',
                            title: 'User Auto-Provisioning',
                            description: 'Automatically create internal user accounts upon successful external SSO login.',
                            category: 'Feature',
                            priority: 'Medium'
                        }
                    ]
                }
            ]
        },
        {
            id: 'E-002',
            title: 'Real-time Data Analytics Dashboard',
            description: 'A new centralized dashboard providing live insights and customizable data reporting.',
            category: 'Epic',
            priority: 'High',
            subItems: [
                {
                    id: 'S-2.1',
                    title: 'Live Data Visualization',
                    description: 'Present real-time data streams through interactive and low-latency visualization components.',
                    category: 'Story',
                    priority: 'High',
                    subItems: [
                        {
                            id: 'F-2.1.1',
                            title: 'WebSocket Backend Integration',
                            description: 'Establish WebSocket connections for streaming time-series data from sensors and logs.',
                            category: 'Feature',
                            priority: 'High'
                        },
                        {
                            id: 'F-2.1.2',
                            title: 'Time-series Chart Components',
                            description: 'Dynamic charting library implementation that handles high-frequency updates without performance lag.',
                            category: 'Feature',
                            priority: 'Medium'
                        }
                    ]
                },
                {
                    id: 'S-2.2',
                    title: 'Advanced Reporting System',
                    description: 'Allow users to generate and manage custom reports based on filtered analytics data.',
                    category: 'Story',
                    priority: 'Medium',
                    subItems: [
                        {
                            id: 'F-2.2.1',
                            title: 'Export to PDF/Excel',
                            description: 'Functionality to generate and download reports in standard office formats.',
                            category: 'Feature',
                            priority: 'Medium'
                        },
                        {
                            id: 'F-2.2.2',
                            title: 'Scheduled Email Notifications',
                            description: 'Automated delivery system for sending reports to defined email distributions on a recurring basis.',
                            category: 'Feature',
                            priority: 'Low'
                        }
                    ]
                }
            ]
        }
    ]
};

export const loadDemoData = () => {
    storeAnalysis(demoData);
    if (typeof window !== 'undefined') {
        window.location.href = '/dashboard';
    }
};
