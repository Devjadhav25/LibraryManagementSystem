package com.dev.library_management_system.services.impl;

import com.dev.library_management_system.mapper.SubscriptionPlanMapper;
import com.dev.library_management_system.model.SubscriptionPlan;
import com.dev.library_management_system.model.User;
import com.dev.library_management_system.payload.dto.SubscriptionPlanDto;
import com.dev.library_management_system.repository.SubscriptionPlanRepository;
import com.dev.library_management_system.repository.SubscriptionRepository;
import com.dev.library_management_system.services.SubscriptionPlanService;
import com.dev.library_management_system.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubscriptionPlanServiceImpl implements SubscriptionPlanService {

    private final SubscriptionPlanRepository planRepository;
    private final SubscriptionPlanMapper planMapper;
    private final UserService userService;
    private final SubscriptionRepository subscriptionRepository;
    private final SubscriptionPlanRepository subscriptionPlanRepository;


    @Override
    public SubscriptionPlanDto createSubscriptionPlan(SubscriptionPlanDto planDto) throws Exception {

        if(planRepository.existsByPlanCode(planDto.getPlanCode())){
            throw new Exception("Plan code already exists");
        }
        SubscriptionPlan plan = planMapper.toEntity(planDto);

        User currentUser = userService.getCurrentUser();
        plan.setCreatedBy(currentUser.getFullName());
        plan.setUpdatedBy(currentUser.getFullName());
        SubscriptionPlan savedPlan = planRepository.save(plan);

        return planMapper.toDTO(savedPlan);

    }

    @Override
    public SubscriptionPlanDto updateSubscriptionPlan(Long planId, SubscriptionPlanDto planDto) throws Exception {
        SubscriptionPlan existingPlan = planRepository.findById(planId).orElseThrow(()->new Exception("plan not found"));
        planMapper.updateEntity(planDto, existingPlan);
        User currentUser = userService.getCurrentUser();
        existingPlan.setUpdatedBy(currentUser.getFullName());
        SubscriptionPlan updatedPlan = planRepository.save(existingPlan);

        return planMapper.toDTO(updatedPlan);
    }

    @Override
    public void deleteSubscriptionPlan(Long planId) throws Exception {
        SubscriptionPlan existingPlan = planRepository.findById(planId).orElseThrow(()->new Exception("plan not found"));

        planRepository.delete(existingPlan);

    }

    @Override
    public List<SubscriptionPlanDto> getAllSubscriptionPlan() {
        List<SubscriptionPlan> planList = planRepository.findAll();


        return planList.stream().map(planMapper::toDTO).
                collect(Collectors.toList());
    }

    @Override
    public SubscriptionPlan getBySubscriptionPlanCode(String subscriptionPlanCode) throws Exception {
        SubscriptionPlan plan = subscriptionPlanRepository.findByPlanCode(subscriptionPlanCode);
        if(plan == null){
            throw new Exception("Plan code not found");
        }
        return plan;
    }
}
