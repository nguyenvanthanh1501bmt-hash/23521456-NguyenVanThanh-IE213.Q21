# Lab 2 - Backend với NodeJS, ExpressJS và MongoDB

Mục tiêu của lab là xây dựng backend server sử dụng NodeJS và ExpressJS, kết nối với MongoDB Atlas và triển khai API `/api/v1/movies` để truy xuất dữ liệu movies. Các công cụ sử dụng bao gồm NodeJS, ExpressJS, MongoDB Atlas, MongoDB Compass, Visual Studio Code, và Postman hoặc trình duyệt để kiểm thử API.

## Thiết lập project
- Tạo thư mục project và khởi tạo NodeJS: `npm init -y`  
- Cài đặt các dependencies cần thiết: `express`, `mongodb`, `cors`, `dotenv`, `nodemon`  
- Tạo file `.env` để lưu biến môi trường như `MONGO_URL`, `MOVIEREVIEWS_NS`, `PORT`

## Cấu trúc project
- `index.js`: kết nối MongoDB và khởi chạy server  
- `server.js`: cấu hình Express và middleware  
- `dao/moviesDAO.js`: truy xuất dữ liệu movies từ database  
- `api/movies.controller.js`: xử lý request từ client và gọi DAO  
- `api/movies.route.js`: định tuyến API `/api/v1/movies`

## Chạy server
- Sử dụng lệnh: `npm run dev` hoặc `node index.js`  
- Truy cập API: `http://localhost:8000/api/v1/movies` trên trình duyệt hoặc Postman  
- API hỗ trợ query string: `page`, `moviesPerPage`, `title`, `rated` để phân trang và lọc dữ liệu

## Ghi chú
- DAO chịu trách nhiệm truy vấn MongoDB  
- Controller xử lý request từ client  
- Route định tuyến API  
- Server khởi chạy backend  

Toàn bộ backend được thiết kế theo kiến trúc tách lớp để dễ quản lý, bảo trì và mở rộng.