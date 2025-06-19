package swd392.identityservice.infrastructure.usecase

import org.springframework.data.redis.core.RedisTemplate
import org.springframework.stereotype.Service
import java.time.Duration

@Service
class RedisUsecase(
    val redisTemplate: RedisTemplate<String, Any>
) {
    // ------------------------------------------
    // GET VALUE FUNCTIONS
    // ------------------------------------------
    fun hasKey(key: String): Boolean {
        return redisTemplate.hasKey(key)
    }

    fun getValueByKey(key: String): Any? {
        return redisTemplate.opsForValue().get(key)
    }

    fun getValueIfExists(key: String): Any? {
        return if (this.hasKey(key)) {
            this.getValueByKey(key)
        }
        else null
    }

    final inline fun <reified T> getTypedValue(key: String): T? {
        val value = redisTemplate.opsForValue().get(key)
        return value as? T
    }

    // ------------------------------------------
    // SET VALUE FUNCTIONS
    // ------------------------------------------
    fun setValue(key: String, value: Any) {
        redisTemplate.opsForValue().set(key, value)
    }

    fun setValue(key: String, value: Any, ttl: Duration) {
        redisTemplate.opsForValue().set(key, value, ttl)
    }

    fun setValue(key: String, value: Any, timeoutSeconds: Long) {
        redisTemplate.opsForValue().set(key, value, Duration.ofSeconds(timeoutSeconds))
    }

    fun setIfAbsent(key: String, value: Any): Boolean {
        return redisTemplate.opsForValue().setIfAbsent(key, value) ?: false
    }

    fun setIfAbsent(key: String, value: Any, ttl: Duration): Boolean {
        return redisTemplate.opsForValue().setIfAbsent(key, value, ttl) ?: false
    }

    fun setMultiple(keyValueMap: Map<String, Any>) {
        redisTemplate.opsForValue().multiSet(keyValueMap)
    }

    // ------------------------------------------
    // DELETE VALUE FUNCTIONS
    // ------------------------------------------
    fun deleteKey(key: String): Boolean {
        return redisTemplate.delete(key)
    }
}