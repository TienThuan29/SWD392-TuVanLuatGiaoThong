package swd392.identityservice.infrastructure.utils

import org.springframework.stereotype.Component
import java.util.Random

@Component
class OtpGeneratorUtil {

    fun generateOtp(): String {
        val random = Random()
        val otp = random.nextInt(900000) + 100000 // Generates 6-digit number
        return otp.toString()
    }

}