package swd392.apigatewayservice.configuration;

import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

/*
 * File: FeignConfiguration.java
 * Description: configuration for feign client.
 *
 * Version History:
 * ----------------------------------------------------------------------------
 * v1.0 - ?/3/2025 - Nguyen Tien Thuan - Initial OpenFeign configuration.
 * ----------------------------------------------------------------------------
 *
 * Author(s): Nguyen Tien Thuan
 * Last Modified: 26/3/2025
 * Notes:
 */
@Configuration
public class FeignConfiguration {

    @Bean
    public HttpMessageConverters messageConverters() {
        return new HttpMessageConverters(new MappingJackson2HttpMessageConverter());
    }
}

