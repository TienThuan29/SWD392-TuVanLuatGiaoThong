package swd392.userpackageservice.application.usecase;

import swd392.userpackageservice.application.dto.TransactionCompletionResponse;

import java.math.BigDecimal;
import java.util.Map;
import java.util.UUID;

public interface IMomoPaymentUsecase {

    //tao url thanh toan momo ok chua
    String createPaymentUrl(BigDecimal amount, String userId, UUID packageId);

    TransactionCompletionResponse handleIpnPayload(Map<String, String> payload);

}
