package swd392.lawqueryservice.infrastructure.configuration;

import org.apache.hc.core5.http.HttpHost;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class ElasticsearchConfiguration {
    
    @Bean
    public RestHighLevelClient client() {
        RestClientBuilder builder = RestClient.builder(
            new HttpHost("localhost", 9200, "http"));
        return new RestHighLevelClient(builder);
    }

}
