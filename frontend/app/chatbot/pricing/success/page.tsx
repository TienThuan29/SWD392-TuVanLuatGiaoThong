'use client'

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useMomoPayment } from '@/hooks/useMomoPayment';
import { PaymentStatusResponse } from '@/models/Payment';
import Header_C from "@/components/combination/Header_C";
import Footer from "@/components/combination/Footer_C";
import Spinner_C from "@/components/combination/Spinner_C";
import { FaCheckCircle, FaTimesCircle, FaArrowLeft, FaHome } from "react-icons/fa";
import { useAuth } from '@/context/AuthContext';

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    const { user } = useAuth()
    const router = useRouter();
    const { completePayment, parsePaymentDataFromUrl, isLoading, error } = useMomoPayment();
    const [paymentResult, setPaymentResult] = useState<PaymentStatusResponse | null>(null);
    const [isProcessing, setIsProcessing] = useState(true);
    const [hasProcessed, setHasProcessed] = useState(false);

    const handlePaymentCompletion = useCallback(async () => {
        if (hasProcessed) return; // Prevent multiple calls
        
        try {
            setHasProcessed(true);
            // Get the full URL with query parameters
            const currentUrl = window.location.href;
            
            // Parse payment data from URL
            const paymentData = parsePaymentDataFromUrl(currentUrl);
            console.log("payment data: ", paymentData);
            
            if (!paymentData) {
                console.error('Failed to parse payment data from URL');
                setIsProcessing(false);
                return;
            }

            // Complete the payment
            const result = await completePayment(paymentData);
            
            if (result) {
                setPaymentResult(result);
            } 
            else {
                console.error('Payment completion failed');
            }
        } 
        catch (error) {
            console.error('Error processing payment:', error);
        } 
        finally {
            setIsProcessing(false);
        }
    }, [completePayment, parsePaymentDataFromUrl, hasProcessed]);

    useEffect(() => {
        handlePaymentCompletion();
    }, [handlePaymentCompletion]);

    const handleGoToHome = () => {
        router.push('/');
    };

    const handleGoToChatbot = () => {
        router.push('/chatbot');
    };

    if (isProcessing) {
        return (
            <>
                <Header_C />
                <section className="bg-gray-50 py-16">
                    <div className="max-w-2xl mx-auto px-6">
                        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                            <div className="flex justify-center mb-6">
                                <Spinner_C size="lg" color="blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Đang xử lý thanh toán...
                            </h2>
                            <p className="text-gray-600">
                                Vui lòng chờ trong giây lát, chúng tôi đang xác nhận thanh toán của bạn.
                            </p>
                        </div>
                    </div>
                </section>
                <Footer />
            </>
        );
    }

    const isPaymentSuccessful = paymentResult?.status === 'SUCCESS';

    return (
        <>
            <Header_C logedUser={user} />
            <section className="bg-gray-50 py-16">
                <div className="max-w-2xl mx-auto px-6">
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        {/* Payment Status Icon */}
                        <div className="text-center mb-6">
                            {isPaymentSuccessful ? (
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                                    <FaCheckCircle className="text-green-600 text-3xl" />
                                </div>
                            ) : (
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                                    <FaTimesCircle className="text-red-600 text-3xl" />
                                </div>
                            )}
                            
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {isPaymentSuccessful ? 'Thanh toán thành công!' : 'Thanh toán thất bại'}
                            </h1>
                            <p className="text-gray-600">
                                {isPaymentSuccessful 
                                    ? 'Cảm ơn bạn đã mua gói sử dụng. Gói của bạn đã được kích hoạt.'
                                    : 'Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.'
                                }
                            </p>
                        </div>

                        {/* Error Display */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-600 text-sm">{error}</p>
                            </div>
                        )}

                        {/* Payment Details */}
                        {paymentResult && (
                            <div className="bg-gray-50 rounded-lg p-6 mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Chi tiết thanh toán</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Mã đơn hàng:</span>
                                        <span className="font-medium">{paymentResult.orderId}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Số tiền:</span>
                                        <span className="font-medium">{paymentResult.amount?.toLocaleString('vi-VN')} VNĐ</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Trạng thái:</span>
                                        <span className={`font-medium ${
                                            paymentResult.status === 'SUCCESS' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                            {paymentResult.status === 'SUCCESS' ? 'Thành công' : 'Thất bại'}
                                        </span>
                                    </div>
                                    {paymentResult.paidAt && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Thời gian thanh toán:</span>
                                            <span className="font-medium">
                                                {new Date(paymentResult.paidAt).toLocaleString('vi-VN')}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Package Information */}
                        {paymentResult?.usagePackage && (
                            <div className="bg-blue-50 rounded-lg p-6 mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin gói</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tên gói:</span>
                                        <span className="font-medium">{paymentResult.usagePackage.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Giá:</span>
                                        <span className="font-medium">{paymentResult.usagePackage.price?.toLocaleString('vi-VN')} VNĐ</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Giới hạn hàng ngày:</span>
                                        <span className="font-medium">{paymentResult.usagePackage.dailyLimit} lượt</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Thời hạn:</span>
                                        <span className="font-medium">{paymentResult.usagePackage.daysLimit} ngày</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            {isPaymentSuccessful ? (
                                <button
                                    onClick={handleGoToChatbot}
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <FaCheckCircle />
                                    Bắt đầu sử dụng
                                </button>
                            ) : (
                                <button
                                    onClick={() => router.back()}
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <FaArrowLeft />
                                    Thử lại
                                </button>
                            )}
                            
                            <button
                                onClick={handleGoToHome}
                                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                <FaHome />
                                Về trang chủ
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

