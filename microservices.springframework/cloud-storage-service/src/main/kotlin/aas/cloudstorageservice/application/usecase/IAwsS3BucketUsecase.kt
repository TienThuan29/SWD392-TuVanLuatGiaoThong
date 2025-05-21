package aas.cloudstorageservice.application.usecase

import aas.cloudstorageservice.application.dto.ApiResponse
import org.springframework.web.multipart.MultipartFile

interface IAwsS3BucketUsecase {

    fun createFolder(folderName: String) : ApiResponse<Any>

    fun uploadFile(file: MultipartFile, folder: String? = "") : ApiResponse<Any>

}