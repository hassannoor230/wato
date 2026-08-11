import { sendInquiry, validateInquiryForm } from '../services/emailService';

export function useEmailService() {
    return {
        validateInquiryForm,
        sendInquiry,
    };
}

export default useEmailService;
