# SWD392 Project: Hệ thông tư vấn luật giao thông Việt Nam

- application
    - dto: thiết kế response để trả về giao diện
    - mapper: thiết kế ánh xạ dữ liệu
    - usecase: là tên gọi khác của IService, các chức năng của service
- domain
    - entity: thiết kế đối tượng
    - fixed: lưu các enum class
    - repository: lưu repository
- infrastructure
    - configuration: thiết kế các config
    - usecase: implement các usecase được tạo tại interface trong application/usecase
    - utils: thiết kế hàm xử logic được sử dụng nhiều lần trong các service khác nhau
- web
    - controller: thiết kế api tại đây
    - dto: thiết kế request

