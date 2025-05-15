package aas.cloudstorageservice.infrastructure.usecase

import aas.cloudstorageservice.application.dto.ApiResponse
import aas.cloudstorageservice.application.exception.FolderNotFoundException
import aas.cloudstorageservice.application.usecase.IAwsS3BucketUsecase
import lombok.RequiredArgsConstructor
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.PropertySource
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import software.amazon.awssdk.core.sync.RequestBody
import software.amazon.awssdk.services.s3.S3Client
import software.amazon.awssdk.services.s3.model.GetObjectRequest
import software.amazon.awssdk.services.s3.model.PutObjectRequest
import software.amazon.awssdk.services.s3.model.S3Exception
import software.amazon.awssdk.services.s3.presigner.S3Presigner
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest
import java.time.Duration

@Service
@RequiredArgsConstructor
@PropertySource("classpath:aws.properties")
class AwsS3BucketUsecase (
    @Value("\${aws.s3.endpoint-url}") private val endpointUrl: String,
    @Value("\${aws.s3.bucket-name}") private var bucketName: String,
    @Value("\${aws.s3.region}") private val region: String,
    private val s3Client: S3Client,
    private val s3Presigner: S3Presigner
) : IAwsS3BucketUsecase {

    override fun createFolder(folderName: String): ApiResponse<Any> {
        if(folderName.isEmpty())
            throw FolderNotFoundException("Folder name is empty! Please provide folder name")
        val folderKey: String = if (folderName.endsWith('/')) folderName else "$folderName/";
        val putObjectRequest = PutObjectRequest.builder()
            .bucket(this.bucketName)
            .key(folderKey)
            .build();
        s3Client.putObject(putObjectRequest, RequestBody.empty())
        return ApiResponse(
            status = "success", message = "Folder created successfully",
            dataResponse = "https://$this.bucketName.s3.${this.region}.amazonaws.com/$folderKey"
        );
    }

    /**
     * Upload single file to S3 bucket, it can pass folder path to upload file to specific folder
     * By default it will upload file to root folder
     * @return String - URL of the uploaded file
     */
    override fun uploadFile(file: MultipartFile , folder: String?) : ApiResponse<Any> {
        // val key: String = file.originalFilename ?: throw RuntimeException("File name is empty");
        try {
            val normalizedFolder =
                if (folder.isNullOrBlank())
                    "uploads/"
                else
                    if (folder.endsWith('/')) folder else "$folder/"

            val fileName = "$normalizedFolder${System.currentTimeMillis()}-${file.originalFilename}"
            s3Client.putObject(
                PutObjectRequest.builder()
                    .bucket(this.bucketName)
                    .key(fileName)
                    .build(),
                RequestBody.fromInputStream(file.inputStream, file.size)
            )
            // return generatePresignedUrl(key)
            return ApiResponse(
                status = "success", message = "File uploaded successfully",
                dataResponse = "https://$bucketName.s3.${region}.amazonaws.com/$fileName"
            )
        }
        catch (exception: S3Exception) {
            throw RuntimeException("Error uploading file to S3", exception)
        }
        catch (exception: Exception) {
            throw RuntimeException("Uploading error", exception)
        }
    }

    private fun generatePresignedUrl(key: String): String {
        val presignRequest = GetObjectPresignRequest.builder()
            .getObjectRequest { builder: GetObjectRequest.Builder ->
                builder.bucket(this.bucketName).key(key).build()
            }
            .signatureDuration(Duration.ofMinutes(60)) // Set the URL to expire in 60 minutes
            .build()
        return s3Presigner!!.presignGetObject(presignRequest).url().toString()
    }
}