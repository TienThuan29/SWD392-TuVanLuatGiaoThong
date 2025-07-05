import { useState, useCallback } from 'react';
import { Api } from '@/configs/Api';
import useAxios from './useAxios';
import { Payload, PaymentStatusResponse } from '@/models/Payment';

export type PaymentRequest = {
    amount: number;
    userId: string;
    packageId: string;
};

export type PaymentResponse = {
    payUrl: string;
};

export function useMomoPayment() {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const api = useAxios();

    const initiatePayment = useCallback(async (paymentRequest: PaymentRequest): Promise<PaymentResponse | null> => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await api.post<PaymentResponse>(
                Api.Payment.BUY_PACKAGE_WITH_MOMO,
                paymentRequest
            );
            
            return response.data;
        } 
        catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || 'Payment initiation failed';
            setError(errorMessage);
            return null;
        } 
        finally {
            setIsLoading(false);
        }
    }, [api]);

    const completePayment = useCallback(async (payload: Payload): Promise<PaymentStatusResponse | null> => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await api.post(
                Api.Payment.COMPLETE_PAYMENT_COMFIRMATION,
                payload
            );
            
            return response.data.dataResponse;
        } 
        catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || 'Payment confirmation failed';
            setError(errorMessage);
            return null;
        } 
        finally {
            setIsLoading(false);
        }
    }, [api]);

    const parsePaymentDataFromUrl = useCallback((url: string): Payload | null => {
        try {
            const urlParams = new URLSearchParams(url.split('?')[1]);
            
            return {
                partnerCode: urlParams.get('partnerCode') || '',
                orderId: urlParams.get('orderId') || '',
                requestId: urlParams.get('requestId') || '',
                amount: urlParams.get('amount') || '',
                orderInfo: urlParams.get('orderInfo') || '',
                orderType: urlParams.get('orderType') || '',
                transId: urlParams.get('transId') || '',
                resultCode: urlParams.get('resultCode') || '',
                message: urlParams.get('message') || '',
                payType: urlParams.get('payType') || '',
                responseTime: urlParams.get('responseTime') || '',
                extraData: urlParams.get('extraData') || '',
                signature: urlParams.get('signature') || ''
            };
        } catch (err) {
            setError('Failed to parse payment data from URL');
            return null;
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return {
        initiatePayment,
        completePayment,
        parsePaymentDataFromUrl,
        isLoading,
        error,
        clearError
    };
}