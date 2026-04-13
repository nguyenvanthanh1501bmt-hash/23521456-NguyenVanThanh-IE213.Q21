# Lab 3 - Hoàn thiện Backend với Reviews và Aggregate

Mục tiêu của lab là nâng cấp backend server từ Lab 2, bổ sung hệ thống quản lý đánh giá (Reviews) và thực hiện các truy vấn nâng cao như **MongoDB Aggregate ($lookup)** để kết hợp dữ liệu giữa hai collections `movies` và `reviews`.

## Thiết lập project
- **Khởi tạo NodeJS:** `npm init -y`
- **Cài đặt dependencies:** `npm install express mongodb cors dotenv nodemon`
- **Cấu hình biến môi trường:** Tạo file `.env` để lưu các biến:
    - `MONGO_URL`: Đường dẫn kết nối MongoDB Atlas.
    - `MOVIEREVIEWS_NS`: Tên database (Namespace).
    - `PORT`: Cổng chạy server (ví dụ: 8000).

## Cấu trúc project
- **index.js**: Điểm khởi đầu của ứng dụng. Thực hiện kết nối MongoDB Atlas và khởi chạy server, đồng thời gọi hàm `injectDB` để truyền client vào `MoviesDAO` và `ReviewsDAO`.
- **server.js**: Cấu hình Express và các middleware cần thiết như `CORS`, `express.json`.
- **dao/moviesDAO.js**: Chịu trách nhiệm truy xuất dữ liệu phim và thực hiện Framework Aggregate để lấy chi tiết phim kèm các reviews liên quan.
- **dao/reviewsDAO.js**: Thực hiện các thao tác CRUD (Create, Read, Update, Delete) trực tiếp trên collection `reviews`.
- **api/movies.controller.js**: Tiếp nhận request từ client, gọi các phương thức từ `MoviesDAO` và trả về phản hồi JSON về phim và ratings.
- **api/reviews.controller.js**: Xử lý logic nghiệp vụ cho các hành động thêm, sửa, xóa nhận xét.
- **api/movies.route.js**: Định nghĩa và quản lý tất cả các tuyến đường (routes) của API hệ thống tại `/api/v1/movies`.

## Chạy server
- **Lệnh khởi chạy:** `npm run dev` hoặc `node index.js`.
- **Địa chỉ truy cập:** `http://localhost:8000/api/v1/movies`.
- **Công cụ kiểm thử:** Sử dụng **Insomnia** hoặc **Postman** để kiểm tra các đầu Endpoint (GET, POST, PUT, DELETE).

## Các tính năng API chính
- **Lấy danh sách Ratings:** `GET /movies/ratings`
- **Thêm Review:** `POST /movies/review`
- **Lấy chi tiết phim kèm Reviews:** `GET /movies/id/:id` (Sử dụng kỹ thuật Aggregate để join collections).
- **Cập nhật Review:** `PUT /movies/review` (Cơ chế bảo mật xác thực qua `user_id`).
- **Xóa Review:** `DELETE /movies/review`

## Ghi chú
- **DAO (Data Access Object):** Chịu trách nhiệm tương tác trực tiếp với cơ sở dữ liệu MongoDB.
- **Controller:** Đóng vai trò trung gian, tiếp nhận yêu cầu và phản hồi dữ liệu cho người dùng.
- **Route:** Định tuyến các yêu cầu HTTP đến đúng Controller xử lý.
- **Lưu ý:** Biến `reviews` trong `ReviewsDAO` phải được khởi tạo thông qua phương thức `injectDB` trong file `index.js` để tránh các lỗi liên quan đến `undefined`.

--- 

Toàn bộ backend được thiết kế theo kiến trúc tách lớp chuyên nghiệp, đảm bảo tính đóng gói, dễ dàng quản lý và mở rộng cho các giai đoạn phát triển tiếp theo.