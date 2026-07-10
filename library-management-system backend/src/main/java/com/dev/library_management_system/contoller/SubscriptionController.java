package com.dev.library_management_system.contoller;

import com.dev.library_management_system.exception.SubscriptionException;
import com.dev.library_management_system.payload.dto.SubscriptionDto;
import com.dev.library_management_system.payload.response.ApiResponse;
import com.dev.library_management_system.payload.response.PaymentInitiateResponse;
import com.dev.library_management_system.services.SubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/subscriptions")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    // ---------------------------------------------------------
    // USER ENDPOINTS
    // ---------------------------------------------------------

    @PostMapping("/subscribe")
    public ResponseEntity<?> subscribe(@RequestBody SubscriptionDto subscriptionDto) throws Exception {
        // The frontend sends the planId inside the DTO
        PaymentInitiateResponse subscriptionDto1 = subscriptionService.subscribe(subscriptionDto);
        return ResponseEntity.ok(subscriptionDto1);
    }

    @GetMapping("/user/active")
    public ResponseEntity<SubscriptionDto> getUsersActiveSubscription(@RequestParam(required = false)Long userID) throws Exception {
        SubscriptionDto activeSubscription = subscriptionService.getUserActiveSubscription(userID);
        return ResponseEntity.ok(activeSubscription);
    }

    @DeleteMapping("/cancel/{subscriptionId}")
    public ResponseEntity<SubscriptionDto> cancelSubscription(@PathVariable Long subscriptionId, @RequestParam(required = false)String reason) throws Exception {
        SubscriptionDto cancelledSubscription = subscriptionService.cancelSubscription(subscriptionId, reason);
        return ResponseEntity.ok(cancelledSubscription);
    }

    // This is typically called automatically by a Razorpay webhook/listener,
    // but the instructor maps it here for manual verification/fallback testing.
    @PostMapping("/activate")
    public ResponseEntity<SubscriptionDto> activateSubscription(
            @RequestParam Long subscriptionId,
            @RequestParam Long paymentId) throws Exception {

        SubscriptionDto activatedSubscription = subscriptionService.activateSubscription(subscriptionId, paymentId);
        return ResponseEntity.ok(activatedSubscription);
    }

    // ---------------------------------------------------------
    // ADMIN ENDPOINTS
    // ---------------------------------------------------------

    @GetMapping("/admin/all")
    public ResponseEntity<?> getAllSubscriptions() {
        int page =0;
        int size =10;
        Pageable pageable = PageRequest.of(page,size);
        List<SubscriptionDto> subscriptions = subscriptionService.getAllSubscriptions(pageable);
        return ResponseEntity.ok(subscriptions);
    }

    @PostMapping("/admin/deactivate-expired")
    public ResponseEntity<ApiResponse> deactivateExpiredSubscriptions() throws SubscriptionException {
        int page =0;
        int size =0;
        Pageable pageable = PageRequest.of(page,size);
        subscriptionService.deactivateExpiredSubscriptions();
        ApiResponse apiResponse = new ApiResponse("Deactivated" ,true);
        return ResponseEntity.ok(apiResponse);
    }



}
