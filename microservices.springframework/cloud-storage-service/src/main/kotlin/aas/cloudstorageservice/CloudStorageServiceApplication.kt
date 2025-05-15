package aas.cloudstorageservice

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
open class CloudStorageServiceApplication

fun main(args: Array<String>) {
    runApplication<CloudStorageServiceApplication>(*args)
}
