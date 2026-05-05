# Lab 5 - Kết nối Frontend với Backend

# 1. Mục tiêu bài thực hành

Trong bài lab này sẽ kết nối **frontend ReactJS** với **backend API** cho ứng dụng **Movie Reviews**.

Các nội dung chính:

- Cài đặt Axios cho dự án React
- Tạo lớp dịch vụ MovieDataService trong thư mục `src/services`
- Tạo các lời gọi dịch vụ tới backend
- Xây dựng MoviesList Component
- Tìm kiếm phim theo title
- Tìm kiếm phim theo rating
- Hiển thị thông tin chi tiết của movie
- Hiển thị danh sách review tương ứng cho từng phim
- Định dạng thời gian review bằng MomentJS

---

# 2. Công cụ / môi trường sử dụng

Các công cụ được sử dụng trong lab:

- **ReactJS** – thư viện xây dựng giao diện người dùng
- **NodeJS** – môi trường chạy JavaScript
- **ExpressJS** – framework xây dựng backend API
- **MongoDB** – cơ sở dữ liệu lưu trữ thông tin movie và review
- **Axios** – thư viện gọi API từ frontend
- **Bootstrap** – framework hỗ trợ thiết kế UI
- **React Router DOM** – thư viện định tuyến trong React
- **MomentJS** – thư viện định dạng thời gian
- **Visual Studio Code** – môi trường lập trình
- **Web Browser** – kiểm tra ứng dụng

---

# 3. Cách chạy

1. Di chuyển vào thư mục backend
2. Cài đặt các thư viện: `npm install`
3. Chạy backend server: `npm start`
4. Di chuyển vào thư mục frontend
5. Cài đặt các thư viện: `npm install`
6. Chạy ứng dụng React: `npm start`
7. Mở trình duyệt tại: `http://localhost:3001`

---

# 4. Kết quả đầu ra

- Frontend kết nối được với backend API
- Danh sách movie được hiển thị trên giao diện
- Có thể tìm kiếm movie theo title
- Có thể tìm kiếm movie theo rating
- Có thể xem thông tin chi tiết của movie
- Có thể xem danh sách review của từng movie
- Có thể thêm, sửa và xóa review

---

# 5. Giải thích phần chính đã thực hiện

## MovieDataService

Trong thư mục `services` tạo file:

- `movies.js`

File này sử dụng **Axios** để gọi các API từ backend:

- `getAll()`
- `get(id)`
- `find(query, by, page)`
- `createReview(data)`
- `updateReview(data)`
- `deleteReview(id, userId)`
- `getRatings()`

---

## MoviesList Component

Component `movies-list.js` sử dụng **useState** để lưu các trạng thái:

- `movies`
- `searchTitle`
- `searchRating`
- `ratings`

Sử dụng **useEffect** để gọi:

- `retrieveMovies()`
- `retrieveRatings()`

Các movie được hiển thị bằng **Card** của React Bootstrap.

---

## Movie Component

Component `movie.js` dùng để hiển thị thông tin chi tiết của một movie.

Nội dung hiển thị bao gồm:

- Poster
- Title
- Rated
- Plot
- Reviews

Nếu người dùng đã đăng nhập thì có thể thêm review cho movie.

---

## Reviews

Danh sách review được hiển thị bên dưới phần thông tin movie.

Mỗi review bao gồm:

- Tên người review
- Ngày review
- Nội dung review

Thời gian review được định dạng bằng **MomentJS**.

---
