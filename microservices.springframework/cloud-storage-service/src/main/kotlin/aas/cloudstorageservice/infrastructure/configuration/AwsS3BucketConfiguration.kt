package aas.cloudstorageservice.infrastructure.configuration

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.PropertySource
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider
import software.amazon.awssdk.services.s3.S3Client
import software.amazon.awssdk.services.s3.presigner.S3Presigner
import software.amazon.awssdk.regions.Region

@Configuration
@PropertySource("classpath:aws.properties")
class AwsS3BucketConfiguration(
    @Value("\${aws.s3.access-key}") val accessKey: String,
    @Value("\${aws.s3.secret-key}") val secretKey: String,
    @Value("\${aws.s3.region}") val region: String
) {

    @Bean
    fun s3Client(): S3Client {
        val awsBasicCredentials = AwsBasicCredentials.create(
            this.accessKey, this.secretKey
        )
        return S3Client.builder()
            .credentialsProvider(StaticCredentialsProvider.create(awsBasicCredentials))
            .region(Region.of(this.region))
            .build()
    }

    @Bean
    fun s3Presigner(): S3Presigner {
        val awsCredentials = AwsBasicCredentials.create(
            this.accessKey, this.secretKey
        )
        return S3Presigner.builder()
            .credentialsProvider(StaticCredentialsProvider.create(awsCredentials))
            .region(Region.of(this.region))
            .build()
    }

}