import emailjs from '@emailjs/browser';
import businessInfo from '../data/businessInfo.js';

const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {};

export const emailConfig = {
    serviceId: env.VITE_EMAILJS_SERVICE_ID || '',
    publicKey: env.VITE_EMAILJS_PUBLIC_KEY || '',
    contactTemplateId: env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || '',
    autoReplyTemplateId: env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID || '',
    adminEmail: env.VITE_ADMIN_EMAIL || businessInfo.email,
};

export function getEmailConfig() {
    return {
        ...emailConfig,
        isConfigured:
            Boolean(emailConfig.serviceId) &&
            Boolean(emailConfig.publicKey) &&
            Boolean(emailConfig.contactTemplateId) &&
            Boolean(emailConfig.autoReplyTemplateId),
    };
}

export function formatDate(date = new Date()) {
    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(date);
}

export function formatTime(date = new Date()) {
    return new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    }).format(date);
}

export function sanitizeText(value = '') {
    return String(value ?? '').trim();
}

export function validateInquiryForm(values = {}) {
    const errors = {};
    const name = sanitizeText(values.name);
    const email = sanitizeText(values.email).toLowerCase();
    const phone = sanitizeText(values.phone);
    const subject = sanitizeText(values.subject || '');
    const message = sanitizeText(values.message);

    if (!name) {
        errors.name = 'Name is required.';
    }

    if (!email) {
        errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Please enter a valid email address.';
    }

    if (!phone) {
        errors.phone = 'Phone number is required.';
    } else if (!/^(\+?[\d\s()-]{7,20})$/.test(phone)) {
        errors.phone = 'Please enter a valid phone number.';
    }

    if (subject && !subject.trim()) {
        errors.subject = 'Subject is required.';
    }

    if (!message) {
        errors.message = 'Message is required.';
    } else if (message.length < 20) {
        errors.message = 'Message must be at least 20 characters long.';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
}

export function buildAdminEmailPayload(values = {}, options = {}) {
    const property = values.property || {};
    const submittedAt = new Date();

    const payload = {
        to_email: options.adminEmail || emailConfig.adminEmail,
        user_name: sanitizeText(values.name),
        user_email: sanitizeText(values.email),
        user_phone: sanitizeText(values.phone),
        subject: sanitizeText(values.subject || 'General Inquiry'),
        message: sanitizeText(values.message),
        date: formatDate(submittedAt),
        time: formatTime(submittedAt),
        admin_note: 'Please respond to this inquiry within 24 hours.',
        brand_name: businessInfo.name,
        website_name: businessInfo.name,
        property_title: sanitizeText(property.title),
        property_id: sanitizeText(property.id),
        property_location: sanitizeText(property.location),
        property_price: sanitizeText(property.price),
        'Property': sanitizeText(property.title),
        'Property ID': sanitizeText(property.id),
        'Location': sanitizeText(property.location),
        'Price': sanitizeText(property.price),
        'Customer Name': sanitizeText(values.name),
        'Customer Email': sanitizeText(values.email),
        'Customer Phone': sanitizeText(values.phone),
    };

    return payload;
}

export function buildUserReplyPayload(values = {}) {
    const property = values.property || {};

    return {
        to_email: sanitizeText(values.email),
        reply_to: sanitizeText(values.email),
        user_name: sanitizeText(values.name),
        user_email: sanitizeText(values.email),
        subject: sanitizeText(values.subject || 'General Inquiry'),
        message: sanitizeText(values.message),
        property_title: sanitizeText(property.title),
        property_name: sanitizeText(property.title),
        brand_name: businessInfo.name,
        city: businessInfo.city,
        country: businessInfo.country,
        response_message: 'Our team aims to respond within 24 hours.',
        urgent_message: 'For urgent assistance, you can contact us directly through WhatsApp or phone.',
        greeting: `Hello ${sanitizeText(values.name)},`,
    };
}

export async function sendInquiry(formData = {}, options = {}) {
    const config = getEmailConfig();

    if (!config.isConfigured) {
        throw new Error(
            'EmailJS is not configured yet. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_CONTACT_TEMPLATE_ID, and VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID to your .env file.'
        );
    }

    if (!emailjs || typeof emailjs.init !== 'function') {
        throw new Error('EmailJS library could not be initialized.');
    }

    emailjs.init({ publicKey: config.publicKey });

    const adminPayload = buildAdminEmailPayload(formData, { adminEmail: options.adminEmail || config.adminEmail });
    const userPayload = buildUserReplyPayload(formData);

    const [adminResult, userResult] = await Promise.all([
        emailjs.send(config.serviceId, config.contactTemplateId, adminPayload, { publicKey: config.publicKey }),
        emailjs.send(config.serviceId, config.autoReplyTemplateId, userPayload, { publicKey: config.publicKey }),
    ]);

    return {
        adminResult,
        userResult,
    };
}

export default {
    emailConfig,
    getEmailConfig,
    validateInquiryForm,
    buildAdminEmailPayload,
    buildUserReplyPayload,
    sendInquiry,
};


