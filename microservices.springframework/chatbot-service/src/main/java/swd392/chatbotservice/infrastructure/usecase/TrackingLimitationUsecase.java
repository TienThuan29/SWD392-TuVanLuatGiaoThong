//package swd392.chatbotservice.infrastructure.usecase;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.data.redis.core.RedisTemplate;
//import org.springframework.stereotype.Service;
//import swd392.chatbotservice.application.dto.ApiResponse;
//import swd392.chatbotservice.domain.entity.UserUsage;
//import swd392.chatbotservice.infrastructure.client.UserPackageClient;
//import swd392.chatbotservice.infrastructure.client.dto.UsagePackageResponse;
//import swd392.chatbotservice.infrastructure.utils.HashingUtil;
//import java.time.Duration;
//import java.time.LocalDateTime;
//import java.time.LocalTime;
//
//@Service
//@RequiredArgsConstructor
//public class TrackingLimitationUsecase {
//
//    private static final int DEFAULT_LIMITATION_DAILY = 5;
//
//    private final RedisTemplate<String, Object> redisTemplate;
//
//    private final UserPackageClient userPackageClient;
//
//    private final HashingUtil hashingUtil;
//
//    public boolean canUserAsk(String userId) {
//        String key = hashingUtil.decode(userId);
//        UserUsage userUsage = this.getUserUsageFromRedis(key);
//        if (userUsage == null) {
//            // Not in Redis -> Get package info and save to Redis
//            int dailyLimit = this.getDailyLimitFromPackage(userId);
//            if (dailyLimit <= 0) {
//                return false; // No valid package
//            }
//
//            // Save to Redis with initial usage = 1
//            userUsage = new UserUsage(1, dailyLimit);
//            saveUserUsageToRedis(key, userUsage);
//            return true;
//        }
//        else {
//            // In Redis -> Check usage
//            if (userUsage.getUserUsage() >= userUsage.getDailyUsage()) { // Daily limit reached
//                return false;
//            }
//            else { // Increment usage and save back to Redis
//                userUsage.setUserUsage(userUsage.getUserUsage() + 1);
//                saveUserUsageToRedis(key, userUsage);
//                return true;
//            }
//        }
//    }
//
//    private UserUsage getUserUsageFromRedis(String key) {
//        try {
//            return (UserUsage) redisTemplate.opsForValue().get(key);
//        }
//        catch (Exception e) {
//            return null;
//        }
//    }
//
//    private void saveUserUsageToRedis(String key, UserUsage userUsage) {
//        try {
//            LocalDateTime endOfDay = LocalDateTime.now().with(LocalTime.of(23, 59, 59));
//            Duration duration = Duration.between(LocalDateTime.now(), endOfDay);
//            redisTemplate.opsForValue().set(key, userUsage, duration);
//        }
//        catch (Exception e) {
//            throw new RuntimeException("Failed to save usage to Redis", e);
//        }
//    }
//
//    private int getDailyLimitFromPackage(String userId) {
//        try {
//            UsagePackageResponse currentPackage = this.getCurrentUsagePackageByUserId(userId);
//            if (currentPackage == null) { return DEFAULT_LIMITATION_DAILY; }
//            else {
//                return currentPackage.getDailyLimit();
//            }
//        }
//        catch (Exception e) {
//            System.out.println("Error fetching current usage package at function getDailyLimitFromPackage(): " + e.getMessage());
//            return DEFAULT_LIMITATION_DAILY;
//        }
//    }
//
//    private UsagePackageResponse getCurrentUsagePackageByUserId(String userId) {
//        ApiResponse<UsagePackageResponse> response = userPackageClient.getCurrentUsagePackageByUserId(userId);
//        return response.getDataResponse();
//    }
//}

package swd392.chatbotservice.infrastructure.usecase;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import swd392.chatbotservice.application.dto.ApiResponse;
import swd392.chatbotservice.infrastructure.client.UserPackageClient;
import swd392.chatbotservice.infrastructure.client.dto.UsagePackageResponse;
import swd392.chatbotservice.infrastructure.utils.HashingUtil;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TrackingLimitationUsecase {

    private static final int DEFAULT_LIMITATION_DAILY = 5;
    private static final String USER_USAGE_KEY = "userUsage";
    private static final String DAILY_USAGE_KEY = "dailyUsage";

    private final RedisTemplate<String, Object> redisTemplate;
    private final UserPackageClient userPackageClient;
    private final HashingUtil hashingUtil;

    public boolean canUserAsk(String userId) {
        String key = hashingUtil.decode(userId);
        Map<String, Integer> userUsageMap = this.getUserUsageFromRedis(key);

        if (userUsageMap == null) {
            // Not in Redis -> Get package info and save to Redis
            int dailyLimit = this.getDailyLimitFromPackage(userId);
            if (dailyLimit <= 0) {
                return false; // No valid package
            }

            // Create map with initial usage = 1
            Map<String, Integer> newUsageMap = new HashMap<>();
            newUsageMap.put(USER_USAGE_KEY, 1);
            newUsageMap.put(DAILY_USAGE_KEY, dailyLimit);

            saveUserUsageToRedis(key, newUsageMap);
            return true;
        } else {
            // In Redis -> Check usage
            Integer currentUsage = userUsageMap.get(USER_USAGE_KEY);
            Integer dailyLimit = userUsageMap.get(DAILY_USAGE_KEY);

            // Handle null values (data corruption)
            if (currentUsage == null || dailyLimit == null) {
                // Delete corrupted data and retry
                redisTemplate.delete(key);
                return canUserAsk(userId);
            }

            if (currentUsage >= dailyLimit) {
                return false; // Daily limit reached
            } else {
                // Increment usage and save back to Redis
                userUsageMap.put(USER_USAGE_KEY, currentUsage + 1);
                saveUserUsageToRedis(key, userUsageMap);
                return true;
            }
        }
    }

    /**
     * Get user usage map from Redis
     * @param key Redis key
     * @return Map containing userUsage and dailyUsage, or null if not found
     */
    @SuppressWarnings("unchecked")
    private Map<String, Integer> getUserUsageFromRedis(String key) {
        try {
            Object value = redisTemplate.opsForValue().get(key);
            if (value == null) {
                return null;
            }

            // Cast to Map
            return (Map<String, Integer>) value;
        } catch (Exception e) {
            System.out.println("Error getting user usage from Redis: " + e.getMessage());
            return null;
        }
    }

    /**
     * Save user usage map to Redis with daily expiration
     * @param key Redis key
     * @param userUsageMap Map containing usage data
     */
    private void saveUserUsageToRedis(String key, Map<String, Integer> userUsageMap) {
        try {
            LocalDateTime endOfDay = LocalDateTime.now().with(LocalTime.of(23, 59, 59));
            Duration duration = Duration.between(LocalDateTime.now(), endOfDay);

            redisTemplate.opsForValue().set(key, userUsageMap, duration);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save usage to Redis", e);
        }
    }

    /**
     * Get current usage info for display purposes
     * @param userId User ID
     * @return Map with usage information or null if not found
     */
    public Map<String, Integer> getCurrentUsage(String userId) {
        String key = hashingUtil.decode(userId);
        return getUserUsageFromRedis(key);
    }

    /**
     * Get remaining usage for user
     * @param userId User ID
     * @return Number of remaining uses, or -1 if not found
     */
    public int getRemainingUsage(String userId) {
        Map<String, Integer> usage = getCurrentUsage(userId);
        if (usage == null) {
            return -1;
        }

        Integer currentUsage = usage.get(USER_USAGE_KEY);
        Integer dailyLimit = usage.get(DAILY_USAGE_KEY);

        if (currentUsage == null || dailyLimit == null) {
            return -1;
        }

        return Math.max(0, dailyLimit - currentUsage);
    }

    /**
     * Reset user's daily usage (for admin purposes)
     * @param userId User ID
     */
    public void resetUserUsage(String userId) {
        String key = hashingUtil.decode(userId);
        redisTemplate.delete(key);
    }

    /**
     * Check if user has valid package and can use the service
     * @param userId User ID
     * @return true if user can use, false otherwise
     */
    public boolean hasValidPackage(String userId) {
        return getDailyLimitFromPackage(userId) > 0;
    }

    private int getDailyLimitFromPackage(String userId) {
        try {
            UsagePackageResponse currentPackage = this.getCurrentUsagePackageByUserId(userId);
            if (currentPackage == null) {
                return DEFAULT_LIMITATION_DAILY;
            } else {
                return currentPackage.getDailyLimit();
            }
        } catch (Exception e) {
            System.out.println("Error fetching current usage package at function getDailyLimitFromPackage(): " + e.getMessage());
            return DEFAULT_LIMITATION_DAILY;
        }
    }

    private UsagePackageResponse getCurrentUsagePackageByUserId(String userId) {
        ApiResponse<UsagePackageResponse> response = userPackageClient.getCurrentUsagePackageByUserId(userId);
        return response.getDataResponse();
    }
}
