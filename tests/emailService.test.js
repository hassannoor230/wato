import test from 'node:test';
import assert from 'node:assert/strict';

import {
    validateInquiryForm,
    buildAdminEmailPayload,
    buildUserReplyPayload,
} from './emailService.js';

test('validateInquiryForm rejects empty required fields', () => {
    const result = validateInquiryForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    assert.equal(result.isValid, false);
    assert.ok(Object.keys(result.errors).length >= 3);
});

test('validateInquiryForm accepts valid contact details', () => {
    const result = validateInquiryForm({
        name: 'Ali Hassan',
        email: 'ali@example.com',
        phone: '+92 300 1234567',
        subject: 'Property Inquiry',
        message: 'I would like to know more about the available residential plot.',
    });

    assert.equal(result.isValid, true);
    assert.deepEqual(result.errors, {});
});

test('buildAdminEmailPayload includes property metadata when present', () => {
    const payload = buildAdminEmailPayload({
        name: 'Sara',
        email: 'sara@example.com',
        phone: '+92 300 1234567',
        subject: 'Need property details',
        message: 'Please send the details and schedule a call.',
        property: {
            title: '5 Marla Plot',
            id: 'P-1001',
            location: 'Gujranwala',
            price: 'PKR 200 Lakh',
        },
    });

    assert.equal(payload['Property'], '5 Marla Plot');
    assert.equal(payload['Property ID'], 'P-1001');
    assert.equal(payload['Customer Name'], 'Sara');
});

test('buildUserReplyPayload includes the property reference in the reply', () => {
    const payload = buildUserReplyPayload({
        name: 'Usman',
        email: 'usman@example.com',
        subject: 'Schedule a viewing',
        message: 'I would like to visit the property and know the viewing slot.',
        property: {
            title: 'Commercial Shop',
        },
    });

    assert.match(payload.to_email, /usman@example.com/);
    assert.match(payload.message, /Commercial Shop|view/i);
});
