# Lab 2 - Thiết lập Backend với NodeJS và ExpressJS

# 1. Mục tiêu bài thực hành
Làm quen với việc xây dựng **backend server** bằng **NodeJS và ExpressJS** và kết nối với **MongoDB Atlas**.

Trong bài lab này sẽ thực hiện:

- Thiết lập môi trường phát triển với NodeJS
- Tạo backend server sử dụng **ExpressJS**
- Kết nối server với **MongoDB Atlas**
- Tổ chức project theo mô hình:
  - Route
  - Controller
  - DAO (Data Access Object)
- Xây dựng API để truy vấn dữ liệu movies từ database

---

# 2. Công cụ / môi trường sử dụng

Các công cụ được sử dụng trong lab:

- **NodeJS** – môi trường chạy JavaScript phía server
- **ExpressJS** – framework xây dựng web server
- **MongoDB Atlas** – hệ quản trị cơ sở dữ liệu NoSQL trên cloud
- **MongoDB Compass** – công cụ quản lý MongoDB
- **Visual Studio Code** – môi trường lập trình
- **Postman / Browser** – kiểm tra API

---

# 3. Cách chạy
1. Tạo thư mục project
2. Khởi tạo NodeJS project chạy lệnh `npm init`
3. Cài đặt các thư viện cần thiết gồm `express mongodb cors dotenv nodemon`
4. Tạo file môi trường `.env`
5. Chạy server bằng lệnh: `npm run dev` hoặc `node index.js`
6. Mở trình duyệt hoặc Postman và truy cập: http://localhost:3000/api/v1/movies để test APi

---

# 4. Kết quả đầu ra

Sau khi thực hiện các bước trên:

- Server NodeJS được khởi tạo thành công
- Backend được xây dựng với **ExpressJS**
- Server kết nối thành công với **MongoDB Atlas**
- API `/api/v1/movies` hoạt động
- Dữ liệu movie được trả về dưới dạng JSON
- Có thể phân trang và lọc dữ liệu theo `title` hoặc `rated`

---

# 5. Giải thích phần chính đã thực hiện
Trong bài lab này, backend được xây dựng theo kiến trúc tách lớp:
## Route
File `movies.route.js` chịu trách nhiệm định tuyến request từ client đến controller.

## Controller
File `movies.controller.js` xử lý request từ client và gọi các phương thức trong DAO để lấy dữ liệu.

## DAO (Data Access Object)
File `moviesDAO.js` thực hiện việc truy vấn dữ liệu từ MongoDB.

Các hàm chính:
- `injectDB()`  
  Dùng để kết nối đến collection `movies`.
- `getMovies()`  
  Dùng để truy vấn danh sách movies từ database.

## Server
File `server.js` cấu hình middleware:
- `cors`
- `express.json()`

File `index.js` thực hiện:
- Kết nối MongoDB
- Khởi động server Express

