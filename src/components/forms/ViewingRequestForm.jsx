import ContactForm from './ContactForm';

export default function ViewingRequestForm({ property }) {
    return (
        <ContactForm
            title="Schedule a Viewing"
            description="Tell us when you would like to visit this property."
            formType="viewing"
            property={property}
            defaultSubject={property ? `Viewing Request: ${property.title}` : 'Schedule a Viewing'}
            buttonLabel="Request Viewing"
        />
    );
}
