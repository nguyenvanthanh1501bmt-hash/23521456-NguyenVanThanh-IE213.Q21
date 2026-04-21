# MOVIE REVIEWS SYSTEM - LAB 04 (IE213)

Dự án này là ứng dụng Full-stack trong chuỗi bài tập môn **Phát triển ứng dụng Web (IE213)** tại Trường Đại học Công nghệ Thông tin - ĐHQG-HCM (UIT). Ứng dụng cho phép người dùng xem danh sách phim, tìm kiếm, xem chi tiết và thực hiện đánh giá (review) phim.

## 👤 THÔNG TIN SINH VIÊN
- **Họ và tên:** Nguyễn Văn Thanh
- **MSSV:** 23521456
- **Lớp:** IE213.Q21
- **Giảng viên:** ThS. Võ Tấn Khoa

## 🛠 CÔNG NGHỆ SỬ DỤNG (MERN STACK)
- **Frontend:** React.js, React Router v5, React Bootstrap, Axios.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB (Sử dụng database mẫu `sample_mflix`).

## 📁 CẤU TRÚC THƯ MỤC FRONT-END
```text
front-end/
├── public/
├── src/
│   ├── components/
│   │   ├── add-review.js   # Form thêm/chỉnh sửa đánh giá phim
│   │   ├── login.js        # Chức năng đăng nhập giả lập (User Session)
│   │   ├── movie.js        # Trang chi tiết phim và danh sách các Review
│   │   └── movies-list.js  # Trang chủ hiển thị danh sách phim & bộ lọc
│   ├── App.js              # Quản lý Routing và State người dùng toàn cục
│   └── index.js            # Entry point của React app
└── package.json            # Quản lý thư viện phụ thuộc