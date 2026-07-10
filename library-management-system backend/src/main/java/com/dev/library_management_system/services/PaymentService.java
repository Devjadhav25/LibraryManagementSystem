package com.dev.library_management_system.services;


import com.dev.library_management_system.payload.dto.PaymentDto;
import com.dev.library_management_system.payload.request.PaymentInitiateRequest;
import com.dev.library_management_system.payload.request.PaymentVerifyRequest;
import com.dev.library_management_system.payload.response.PaymentInitiateResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PaymentService {

    PaymentInitiateResponse initiatePayment(PaymentInitiateRequest req);

    PaymentDto verifyPayment(PaymentVerifyRequest req) throws Exception;

    Page<PaymentDto> getAllPayments(Pageable pageable);


}
