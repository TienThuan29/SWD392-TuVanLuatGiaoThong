# SWD392 - Tư Vấn Luật Giao Thông Việt Nam

## Chạy nextjs local
`npm install`
Create .env file, copy value from sheet
`npm run dev`

## Chạy project cho nextjs trong devcontainer (when changed, rec-compile)
`CHOKIDAR_USEPOLLING=true npm run dev`

## Tạo branch và đặt tên
FE_<Tên>
vd: FE_tienthuan

## Đặt tên component tự custom: <tên component>_C.tsx

## Khi muốn view component
1. Tạo 1 folder <tên>-test
2. thêm tên folder test vào .gitignore để ko push lên git

## Một số folder/file không được ĐỤNG (ĐỤNG LÀ KICK)
Folder
- lib
- components/library
- components/modern-ui

File
- Các file config ở folder project chính (trừ .env)

## Comment để theo dõi quá trình làm
- Sau khi code xong 1 hàm hoặc thay đổi file, bắt buộc phải ghi log
/*
 * File: <file_name>
 * Description: <brief description of what this file does>
 * 
 * Version History:
 * ----------------------------------------------------------------------------
 * v1.0 - <Date> - <Author Name> - Initial creation.
 * v1.1 - <Date> - <Author Name> - Added feature X, fixed bug Y.
 * v1.2 - <Date> - <Author Name> - Refactored code, optimized function Z.
 * ----------------------------------------------------------------------------
 * 
 * Author(s): <Your Name(s)>
 * Last Modified: <Date>
 * Notes: <Any additional notes>
 */