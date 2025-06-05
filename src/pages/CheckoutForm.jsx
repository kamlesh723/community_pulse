import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CARD_OPTIONS = {
    style: {
        base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#9e2146',
        },
    },
};

const CheckoutForm = ({ amount = 1000 }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim() || !email.trim()) {
            setMessage('Please enter your name and email.');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            // Create payment intent on your backend and pass user info if needed
            const res = await fetch('http://localhost:8080/api/payment/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount, name, email }),
            });

            if (!res.ok) throw new Error('Failed to create payment intent');

            const { clientSecret } = await res.json();

            if (!stripe || !elements) throw new Error('Stripe is not ready');

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name,
                        email,
                    },
                },
            });

            if (result.error) {
                setMessage(result.error.message);
            } else if (result.paymentIntent.status === 'succeeded') {
                setMessage('✅ Payment succeeded!');
            } else {
                setMessage(`Unexpected status: ${result.paymentIntent.status}`);
            }
        } catch (err) {
            setMessage(err.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
            />
            <CardElement options={CARD_OPTIONS} />
            <button type="submit" disabled={!stripe || loading} style={{ marginTop: '1rem' }}>
                {loading ? 'Processing...' : `Pay ${amount/2-1}`}
            </button>
            {message && (
                <div
                    style={{
                        marginTop: '1rem',
                        color: message.includes('succeeded') ? 'green' : 'red',
                    }}
                >
                    {message}
                </div>
            )}
        </form>
    );
};

export default CheckoutForm;
