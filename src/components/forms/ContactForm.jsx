import { useState } from 'react';
import { validateInquiryForm } from '../../services/emailService';
import api from '../../admin/context/AdminContext';

const initialFormState = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    website: '',
};

export default function ContactForm({
    title = 'Send Us a Message',
    description = 'Tell us about your property requirements...',
    formType = 'contact',
    property = null,
    buttonLabel = 'Send Message',
    defaultSubject = '',
    compact = false,
}) {
    const [formData, setFormData] = useState({
        ...initialFormState,
        subject: defaultSubject,
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState({ type: 'idle', message: '' });
    const [lastSubmittedAt, setLastSubmittedAt] = useState(0);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((previous) => ({ ...previous, [name]: value }));
        setErrors((previous) => ({ ...previous, [name]: '' }));
        setStatus({ type: 'idle', message: '' });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (Date.now() - lastSubmittedAt < 4000) {
            setStatus({
                type: 'error',
                message: 'Please wait a moment before submitting again.',
            });
            return;
        }

        if (formData.website) {
            setStatus({
                type: 'error',
                message: 'Your request could not be submitted. Please try again.',
            });
            return;
        }

        const payload = {
            ...formData,
            subject: formData.subject || defaultSubject || 'General Inquiry',
            property,
        };

        const validationResult = validateInquiryForm(payload);

        if (!validationResult.isValid) {
            setErrors(validationResult.errors);
            setStatus({ type: 'error', message: 'Please fix the highlighted fields and try again.' });
            return;
        }

        setIsSubmitting(true);
        setStatus({ type: 'idle', message: '' });

        try {
            await api.post('/enquiries', payload);
            setStatus({
                type: 'success',
                message: 'Thank you! Your inquiry has been received. Our team will get back to you within 24 hours.',
            });
            setFormData({ ...initialFormState, subject: defaultSubject });
            setErrors({});
            setLastSubmittedAt(Date.now());
        } catch {
            setStatus({
                type: 'error',
                message: 'Something went wrong. Please try again or contact us directly via WhatsApp.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const hasSubjectField = formType === 'contact';

    return (
        <div className={`bg-white rounded-2xl border border-navy-100 shadow-premium ${compact ? 'p-6' : 'p-8 lg:p-10'}`}>
            <div className="mb-6">
                <h3 className="text-xl lg:text-2xl font-bold text-navy-900 mb-2 tracking-tight">{title}</h3>
                {description && <p className="text-sm text-navy-500">{description}</p>}
            </div>

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                <div className="hidden">
                    <label htmlFor="website">Website</label>
                    <input
                        type="text"
                        id="website"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.website}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor={`${formType}-name`} className="block text-sm font-semibold text-navy-700 mb-2">Full Name</label>
                    <input
                        type="text"
                        id={`${formType}-name`}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? `${formType}-name-error` : undefined}
                        className={`input-field ${errors.name ? 'input-error' : ''}`}
                        placeholder="Enter your full name"
                    />
                    {errors.name && <p id={`${formType}-name-error`} className="mt-2 text-sm text-red-600 font-medium">{errors.name}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                        <label htmlFor={`${formType}-email`} className="block text-sm font-semibold text-navy-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            id={`${formType}-email`}
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={errors.email ? `${formType}-email-error` : undefined}
                            className={`input-field ${errors.email ? 'input-error' : ''}`}
                            placeholder="Enter your email address"
                        />
                        {errors.email && <p id={`${formType}-email-error`} className="mt-2 text-sm text-red-600 font-medium">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor={`${formType}-phone`} className="block text-sm font-semibold text-navy-700 mb-2">Phone Number</label>
                        <input
                            type="tel"
                            id={`${formType}-phone`}
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            aria-invalid={Boolean(errors.phone)}
                            aria-describedby={errors.phone ? `${formType}-phone-error` : undefined}
                            className={`input-field ${errors.phone ? 'input-error' : ''}`}
                            placeholder="Enter your phone number"
                        />
                        {errors.phone && <p id={`${formType}-phone-error`} className="mt-2 text-sm text-red-600 font-medium">{errors.phone}</p>}
                    </div>
                </div>

                {hasSubjectField && (
                    <div>
                        <label htmlFor={`${formType}-subject`} className="block text-sm font-semibold text-navy-700 mb-2">Subject</label>
                        <input
                            type="text"
                            id={`${formType}-subject`}
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            aria-invalid={Boolean(errors.subject)}
                            aria-describedby={errors.subject ? `${formType}-subject-error` : undefined}
                            className={`input-field ${errors.subject ? 'input-error' : ''}`}
                            placeholder="What would you like to discuss?"
                        />
                        {errors.subject && <p id={`${formType}-subject-error`} className="mt-2 text-sm text-red-600 font-medium">{errors.subject}</p>}
                    </div>
                )}

                <div>
                    <label htmlFor={`${formType}-message`} className="block text-sm font-semibold text-navy-700 mb-2">Message</label>
                    <textarea
                        id={`${formType}-message`}
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? `${formType}-message-error` : undefined}
                        className={`input-field resize-none ${errors.message ? 'input-error' : ''}`}
                        placeholder={description}
                    ></textarea>
                    {errors.message && <p id={`${formType}-message-error`} className="mt-2 text-sm text-red-600 font-medium">{errors.message}</p>}
                </div>

                {status.message && (
                    <div
                        role="status"
                        aria-live="polite"
                        className={`rounded-xl border px-4 py-3 text-sm ${
                                status.type === 'success'
                                ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                                : 'border-red-200 bg-red-50 text-red-700'
                            }`}
                    >
                        {status.message}
                    </div>
                )}

                {property && (
                    <div className="rounded-xl border border-navy-200 bg-navy-50 p-3 text-sm text-navy-700">
                        <strong>Interested property:</strong> {property.title}
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full btn-primary disabled:cursor-not-allowed disabled:opacity-70"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Sending...' : buttonLabel}
                </button>

                <p className="text-xs text-navy-400">
                    Our team will get back to you within 24 hours.
                </p>
            </form>
        </div>
    );
}
