package swd392.userpackageservice.infrastructure.scheduler;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import swd392.userpackageservice.domain.entity.UserPackage;
import swd392.userpackageservice.domain.repository.UserPackageRepository;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class UserPackageScheduler {

    private final UserPackageRepository userPackageRepository;

    @PostConstruct
    public void runOnStartup() {
        log.info("Running expired package cleanup on application startup");
        this.disableExpiredPackages();
    }

    /**
     * Schedule function runs once per day at 2:00 AM to check expired packages and disable them
     * Uses Vietnam timezone (Asia/Ho_Chi_Minh) to match the entity's prePersist timezone
     */
    @Transactional
    @Scheduled(cron = "0 0 2 * * ?", zone = "Asia/Ho_Chi_Minh")
    public void disableExpiredPackages() {
        log.info("Starting scheduled task to disable expired user packages");
        try {
            ZoneId vietnamZone = ZoneId.of("Asia/Ho_Chi_Minh");
            Instant now = ZonedDateTime.now(vietnamZone).toInstant();
            List<UserPackage> expiredPackages = userPackageRepository.findExpiredEnabledPackages(now);
            if (expiredPackages.isEmpty()) {
                log.info("No expired packages found to disable");
                return;
            }
            expiredPackages.forEach(userPackage -> {
                userPackage.setEnable(false);
                log.debug("Disabling expired package: orderId={}, userId={}, expiredDate={}",
                        userPackage.getOrderId(), userPackage.getUserId(), userPackage.getExpiredDate());
            });
            userPackageRepository.saveAll(expiredPackages);
            log.info("Successfully disabled {} expired user packages", expiredPackages.size());

        }
        catch (Exception e) {
            log.error("Error occurred while disabling expired packages", e);
        }
    }

}

