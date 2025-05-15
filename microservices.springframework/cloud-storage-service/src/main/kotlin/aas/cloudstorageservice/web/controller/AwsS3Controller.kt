package aas.cloudstorageservice.web.controller

import aas.cloudstorageservice.application.dto.ApiResponse
import aas.cloudstorageservice.application.usecase.IAwsS3BucketUsecase
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api/v1/aws/s3")
class AwsS3Controller(
    private val awsS3BucketUsecase: IAwsS3BucketUsecase
) {

    @GetMapping("/health")
    fun health() : String {
        return "AWS S3 Bucket Service is up and running"
    }

    @PostMapping("/create-folder")
    fun createFolder(@RequestParam("folderName") folderName: String) : ResponseEntity<ApiResponse<Any>> {
        awsS3BucketUsecase.createFolder(folderName).let {
            return ResponseEntity(it, HttpStatus.CREATED)
        }
    }

    @PostMapping("/upload")
    fun uploadFile(
        @RequestParam("file") file: MultipartFile, @RequestParam("folderName") folderName: String
    ): ResponseEntity<ApiResponse<Any>> {
        awsS3BucketUsecase.uploadFile(file, folderName).let {
            return ResponseEntity(it, HttpStatus.CREATED)
        }
    }

}