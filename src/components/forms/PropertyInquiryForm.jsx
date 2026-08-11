import ContactForm from './ContactForm';

export default function PropertyInquiryForm({ property, compact = false }) {
    return (
        <ContactForm
            title="Request Property Details"
            description="Tell us which property you want more information about."
            formType="property"
            property={property}
            defaultSubject={property ? `Property Inquiry: ${property.title}` : 'Property Inquiry'}
            buttonLabel="Request Details"
            compact={compact}
        />
    );
}
