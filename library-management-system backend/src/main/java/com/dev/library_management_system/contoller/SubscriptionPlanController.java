package com.dev.library_management_system.contoller;

import com.dev.library_management_system.mapper.SubscriptionPlanMapper;
import com.dev.library_management_system.payload.dto.SubscriptionPlanDto;
import com.dev.library_management_system.payload.response.ApiResponse;
import com.dev.library_management_system.services.SubscriptionPlanService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/subscription-plans")
public class SubscriptionPlanController {

    private final SubscriptionPlanService subscriptionPlanService;
    private final SubscriptionPlanMapper subscriptionPlanMapper;

    @GetMapping
    public ResponseEntity<List<?>> getAllSubscriptionPlans() {
        List<SubscriptionPlanDto> plans = subscriptionPlanService.getAllSubscriptionPlan();
        return ResponseEntity.ok().body(plans);

    }

    @PostMapping("/admin/create")
    public ResponseEntity<?> createSubscriptionPlans(@Valid @RequestBody SubscriptionPlanDto subscriptionPlanDto) throws Exception {
        SubscriptionPlanDto plans= subscriptionPlanService.createSubscriptionPlan(subscriptionPlanDto);
        return ResponseEntity.ok().body(plans);

    }

    @PostMapping("/admin/{id}")
    public ResponseEntity<?> updateSubscriptionPlans(@RequestBody SubscriptionPlanDto subscriptionPlanDto, @PathVariable long id) throws Exception {
        SubscriptionPlanDto plans= subscriptionPlanService.updateSubscriptionPlan(id, subscriptionPlanDto);
        return ResponseEntity.ok().body(plans);

    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<?> deleteSubscriptionPlans( @PathVariable long id) throws Exception {
        subscriptionPlanService.deleteSubscriptionPlan(id);
        ApiResponse apiResponse = new ApiResponse("plan deleted Successfully",true);
        return ResponseEntity.ok().body(apiResponse);

    }





}
