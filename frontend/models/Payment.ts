import { UsagePackage } from "./UsagePackage";

export type Payload = {
    partnerCode: string;
    orderId: string;
    requestId: string;
    amount: string;
    orderInfo: string;
    orderType: string;
    transId: string;
    resultCode: string;
    message: string;
    payType: string;
    responseTime: string;
    extraData: string;
    signature: string;
};

export type PaymentStatusResponse = {
    orderId: string;
    amount: number;
    status: string;
    message: string;
    paidAt: string;
    usagePackage: UsagePackage;
};
