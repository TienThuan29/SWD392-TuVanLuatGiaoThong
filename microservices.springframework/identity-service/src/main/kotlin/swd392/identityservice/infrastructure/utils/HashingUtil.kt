package swd392.identityservice.infrastructure.utils

import org.hashids.Hashids
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.PropertySource
import org.springframework.stereotype.Component

@Component("hashingUtil_IdentityService")
@PropertySource("classpath:security.properties")
class HashingUtil(
    @Value("\${hashing.secret-key}") private val hashingKey: String
) {

    private val minHashLength: Int = 8;

    fun hash(str: String) : String {
        val hashids = Hashids(this.hashingKey, this.minHashLength)
        val numbers = str.map { it.code.toLong() }.toLongArray()
        return hashids.encode(*numbers)
    }

    fun decode(hash: String?): String {
        val hashids = Hashids(this.hashingKey, this.minHashLength)
        val numbers = hashids.decode(hash)

        val result = StringBuilder()
        for (number in numbers) {
            result.append(Char(number.toUShort()))
        }
        return result.toString()
    }
}