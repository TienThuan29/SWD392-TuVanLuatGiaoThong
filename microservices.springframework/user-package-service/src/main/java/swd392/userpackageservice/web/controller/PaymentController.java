package swd392.userpackageservice.web.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import swd392.userpackageservice.application.usecase.IMomoPaymentUsecase;
import swd392.userpackageservice.web.dto.PaymentRequest;

import java.util.Collections;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    @Autowired
    private final IMomoPaymentUsecase momoPaymentUsecase;

    public PaymentController(IMomoPaymentUsecase momoPaymentUsecase) {
        this.momoPaymentUsecase = momoPaymentUsecase;
    }

    @PostMapping("/momo")
    public ResponseEntity<Map<String, String>> payWithMomo(@RequestBody PaymentRequest request) {
        String payUrl = momoPaymentUsecase.createPaymentUrl(request.getOrderId(), request.getAmount(), request.getUserId());
        return ResponseEntity.ok(Map.of("payUrl", payUrl));
    }

    @PostMapping("/ipn")
    public ResponseEntity<String> momoIpn(@RequestBody Map<String,String> payload,
                                          HttpServletRequest req) {
        System.out.println(">>>> IPN hit: " + req.getMethod() + " " + req.getRequestURI());
        System.out.println(">>>> Headers: " + Collections.list(req.getHeaderNames())
                .stream().collect(Collectors.toMap(h->h, req::getHeader)));
        System.out.println(">>>> Payload: " + payload);
        momoPaymentUsecase.handleIpnPayload(payload);
        return ResponseEntity.ok("Received");
    }
}

