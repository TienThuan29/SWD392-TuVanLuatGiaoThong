package swd392.chatbotservice.infrastructure.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import swd392.chatbotservice.application.dto.ApiResponse;
import swd392.chatbotservice.infrastructure.client.dto.UsagePackageResponse;

@FeignClient(name = "user-package-service", url = "${app.services.user-package.url:http://localhost:8094}")
public interface UserPackageClient {

    @GetMapping("/api/v1/user-packages/usage-package/get/current-usage-package/{userId}")
    ApiResponse<UsagePackageResponse> getCurrentUsagePackageByUserId(@PathVariable("userId") String userId);

}
