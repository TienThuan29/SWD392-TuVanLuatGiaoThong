package swd392.userpackageservice.infrastructure.usecase;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import swd392.userpackageservice.application.mapper.TransactionHistoryMapper;
import swd392.userpackageservice.application.usecase.IMomoPaymentUsecase;
import swd392.userpackageservice.domain.fixed.PayType;
import swd392.userpackageservice.domain.fixed.Status;
import swd392.userpackageservice.domain.repository.TransactionHistoryRepository;
import swd392.userpackageservice.domain.repository.TransactionHistoryTransaction;
import swd392.userpackageservice.web.dto.TransactionHistoryRequest;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class MomoPaymentUsecase implements IMomoPaymentUsecase {

    @Value("${momo.partner-code}") private String partnerCode;
    @Value("${momo.access-key}") private String accessKey;
    @Value("${momo.secret-key}") private String secretKey;
    @Value("${momo.endpoint}") private String endpoint;
    @Value("${momo.redirect-url}") private String redirectUrl;
    @Value("${momo.ipn-url}") private String ipnUrl;

    private final TransactionHistoryTransaction transactionHistoryTransaction;

    public MomoPaymentUsecase(TransactionHistoryRepository transactionHistoryRepository,
                                 TransactionHistoryMapper mapper) {
        this.transactionHistoryTransaction = new TransactionHistoryTransaction(transactionHistoryRepository, mapper);
    }

    public String createPaymentUrl(String orderId, BigDecimal amount, UUID userId) {
        String requestId = UUID.randomUUID().toString();
        String orderInfo = "Payment for order " + orderId;

        String rawHash = "accessKey=" + accessKey +
                "&amount=" + amount +
                "&extraData=" + userId +
                "&ipnUrl=" + ipnUrl +
                "&orderId=" + orderId +
                "&orderInfo=" + orderInfo +
                "&partnerCode=" + partnerCode +
                "&redirectUrl=" + redirectUrl +
                "&requestId=" + requestId +
                "&requestType=captureWallet";

        String signature = hmacSHA256(rawHash, secretKey);

        Map<String, Object> body = new LinkedHashMap<>();

        body.put("partnerCode", partnerCode);
        body.put("accessKey", accessKey);
        body.put("requestId", requestId);
        body.put("amount", amount.toString());
        body.put("orderId", orderId);
        body.put("orderInfo", orderInfo);
        body.put("redirectUrl", redirectUrl);
        body.put("ipnUrl", ipnUrl);
        body.put("extraData", userId.toString());
        body.put("requestType", "captureWallet");
        body.put("signature", signature);
        body.put("lang", "vi");

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.postForEntity(endpoint, body, Map.class);

        Map<String, Object> resBody = response.getBody();
        System.out.println("Momo API response: " + resBody);

        if (resBody == null || resBody.get("payUrl") == null) {
            throw new RuntimeException("Momo API failed or did not return payUrl. Full response: " + resBody);
        }

        return resBody.get("payUrl").toString();
    }

    //tao chu ky bao mat
    private String hmacSHA256(String data, String key) {
       try {
           Mac hmac = Mac.getInstance("HmacSHA256");
           SecretKeySpec secretKeySpec = new SecretKeySpec(key.getBytes(),"HmacSHA256");
           hmac.init(secretKeySpec);
           byte[] hash = hmac.doFinal(data.getBytes());
           return bytesToHex(hash);
       } catch (Exception e) {
           throw new RuntimeException("Error generating HMAC SHA256", e);
       }
    }

    @Override
    @Transactional
    public void handleIpnPayload(Map<String, String> payload) {
        if (payload.get("orderId") == null || payload.get("amount") == null) {
            throw new IllegalArgumentException("Missing required fields");
        }

        TransactionHistoryRequest dto = new TransactionHistoryRequest();
        dto.setOrderId(payload.get("orderId"));
        dto.setPaymentTransId(payload.get("transId"));
        dto.setAmount(new BigDecimal(payload.get("amount")));
        dto.setPayType(PayType.MOMO);
        dto.setStatus("0".equals(payload.get("resultCode")) ? Status.SUCCESS : Status.FAILED);
        dto.setMessage(payload.get("message"));
        dto.setPaidAt(LocalDateTime.now());
        dto.setUserId(UUID.fromString(payload.get("extraData")));

        transactionHistoryTransaction.save(dto);
    }

    //chuyen doi byte sang hex
    //can vi dung trong ham hmacSHA256
    //momo ko nhan duoc ma nhi phan
    private String bytesToHex(byte[] bytes) {
        StringBuilder hexString = new StringBuilder();
        for (byte b : bytes) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }
        return hexString.toString();
    }
}
