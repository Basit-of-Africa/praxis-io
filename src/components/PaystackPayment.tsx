"use client";

import React from "react";
import { usePaystackPayment } from "react-paystack";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { showSuccess, showError } from "@/utils/toast";

interface PaystackPaymentProps {
  amount: number; // Amount in kobo (e.g., 50000 for NGN 500.00)
  email: string;
  fullName: string;
  onSuccess: (reference: string) => void;
  onClose: () => void;
}

const PaystackPayment: React.FC<PaystackPaymentProps> = ({
  amount,
  email,
  fullName,
  onSuccess,
  onClose,
}) => {
  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount,
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "", // Ensure this is set in your .env file
    metadata: {
      fullName,
    },
  };

  const initializePayment = usePaystackPayment(config);

  const handlePayment = () => {
    if (!config.publicKey) {
      showError("Paystack public key is not configured. Please check your environment variables.");
      return;
    }
    initializePayment(
      (reference: any) => {
        // Payment was successful
        onSuccess(reference.reference);
      },
      () => {
        // Payment was closed without success
        onClose();
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Confirm & Pay</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg font-semibold">Total Amount: ${(amount / 100).toFixed(2)}</p>
        <p className="text-muted-foreground">You are about to pay for your appointment. Please click the button below to proceed to payment.</p>
        <Button onClick={handlePayment} className="w-full">
          Pay Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaystackPayment;