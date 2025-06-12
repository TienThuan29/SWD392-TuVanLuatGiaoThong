package swd392.userpackageservice.application.usecase;

import java.math.BigDecimal;
import java.util.Map;
import java.util.UUID;

public interface IMomoPaymentUsecase {

    //tao url thanh toan momo ok chua
    String createPaymentUrl(String orderId, BigDecimal amount, UUID userId);

    void handleIpnPayload(Map<String, String> payload);

}
