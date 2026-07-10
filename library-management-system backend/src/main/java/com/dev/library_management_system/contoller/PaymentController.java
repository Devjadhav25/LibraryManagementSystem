package com.dev.library_management_system.contoller;


import com.dev.library_management_system.payload.dto.PaymentDto;
import com.dev.library_management_system.payload.request.PaymentInitiateRequest;
import com.dev.library_management_system.payload.request.PaymentVerifyRequest;
import com.dev.library_management_system.payload.response.ApiResponse;
import com.dev.library_management_system.payload.response.PaymentInitiateResponse;
import com.dev.library_management_system.services.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;
    // 1. Initiates the payment and returns the Razorpay checkout URL
    @PostMapping("/initiate")
    public ResponseEntity<PaymentInitiateResponse> initiatePayment(@RequestBody PaymentInitiateRequest request) throws Exception {
        PaymentInitiateResponse response = paymentService.initiatePayment(request);
        return ResponseEntity.ok(response);
    }

    // 2. Verifies the payment after the frontend completes the Razorpay checkout
    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody @Valid PaymentVerifyRequest request) throws Exception {
        try{
            PaymentDto response = paymentService.verifyPayment(request);
            return ResponseEntity.ok(response);

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage(), false));
        }

    }

    // 3. Admin endpoint to view all transactions
    @GetMapping("/admin/all")
    public ResponseEntity<?> getAllPayments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

//        Sort sort = sortDir.equalsIgnoreCase( anotherString: "DESC")
//? Sort.by(sortBy).descending()
//: Sort.by(sortBy).ascending();

        // Using defaultValue prevents the "Page size cannot be zero" crash you saw earlier!
        Pageable pageable = PageRequest.of(page, size);
        Page<PaymentDto> payments = paymentService.getAllPayments(pageable);
        return ResponseEntity.ok(payments);
    }
}
