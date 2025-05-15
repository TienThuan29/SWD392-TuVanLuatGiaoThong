package swd392.identityservice.domain.fixed

enum class Permission(val permission: String) {

    STUDENT_READ("student:read"),
    STUDENT_UPDATE("student:update"),
    STUDENT_CREATE("student:create"),
    STUDENT_DELETE("student:delete"),

    LECTURER_READ("lecturer:read"),
    LECTURER_UPDATE("lecturer:update"),
    LECTURER_CREATE("lecturer:create"),
    LECTURER_DELETE("lecturer:delete"),

    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_CREATE("admin:create"),
    ADMIN_DELETE("admin:delete");

}