// StripePaymentDialog.jsx
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import CheckoutForm from './CheckoutForm';

const StripePaymentDialog = ({ open, onClose, stripePromise }) => {
    if (!stripePromise) return null;
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Complete Your Payment</DialogTitle>
            <DialogContent>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default StripePaymentDialog;
