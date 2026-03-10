# IE213 - MongoDB Lab

## 1. Thông tin sinh viên

* Họ tên: Nguyễn Thanh
* MSSV: 23521456
* Lớp: IE213.Q21

## 2. Môn học

* Môn học: **IE213 - NoSQL Databases**
* Giảng viên: **ThS. Võ Tấn Khoa**

---

# 3. Danh sách các Lab

| Lab   | Nội dung                                                            |
| ----- | ------------------------------------------------------------------- |
| Lab 1 | Thực hành MongoDB cơ bản: Insert, Query, Update, Index, Aggregation |

---

# 4. Mô tả ngắn gọn Lab

## Lab 1 - MongoDB cơ bản

Lab này thực hiện các thao tác cơ bản trên MongoDB như:

* Thêm dữ liệu vào collection
* Tạo index duy nhất
* Truy vấn dữ liệu
* Cập nhật dữ liệu
* Xóa field trong document
* Sử dụng aggregation để tính toán dữ liệu

Database sử dụng: **23521456-ie213**
Collection sử dụng: **user**

---

# 5. Mục tiêu bài thực hành

* Làm quen với MongoDB
* Thực hiện các thao tác CRUD
* Tạo index để đảm bảo dữ liệu duy nhất
* Sử dụng query để lọc dữ liệu
* Sử dụng aggregation để xử lý dữ liệu

---

# 6. Công cụ / môi trường sử dụng

* MongoDB Atlas
* MongoDB Compass
* MongoDB Shell (mongosh)

---

# 7. Cách chạy

### Bước 1: Kết nối MongoDB

Kết nối MongoDB Atlas bằng MongoDB Compass hoặc Mongo Shell.

### Bước 2: Chọn database

```javascript
use("23521456-ie213")
```

### Bước 3: Chạy các lệnh MongoDB

Ví dụ thêm dữ liệu:

```javascript
db.user.insertMany([
{ id:1, name:{ first:"John", last:"Doe" }, age:48 },
{ id:2, name:{ first:"Jane", last:"Doe" }, age:16 },
{ id:3, name:{ first:"Alice", last:"A" }, age:32 },
{ id:4, name:{ first:"Bob", last:"B" }, age:64 }
])
```

---

# 8. Kết quả thực hiện

## 8.1 Thêm dữ liệu

Các document được thêm thành công vào collection.

Ví dụ dữ liệu:

```
{
 id: 1,
 name: { first: "John", last: "Doe" },
 age: 48
}
```

---

## 8.2 Tạo Unique Index

Đảm bảo giá trị `id` không bị trùng.

```javascript
db.user.createIndex({ id:1 }, { unique:true })
```

---

## 8.3 Truy vấn dữ liệu

Tìm nhân viên có tên John Doe:

```javascript
db.user.find({
"name.first":"John",
"name.last":"Doe"
})
```

---

## 8.4 Truy vấn theo điều kiện tuổi

Tìm nhân viên có tuổi >30 và <60:

```javascript
db.user.find({
$and:[
{ age:{ $gt:30 } },
{ age:{ $lt:60 } }
]
})
```

---

## 8.5 Thêm dữ liệu có middle name

```javascript
db.user.insertMany([
{ id:5, name:{ first:"Rooney", middle:"K", last:"A" }, age:30 },
{ id:6, name:{ first:"Ronaldo", middle:"T", last:"B" }, age:60 }
])
```

---

## 8.6 Xóa middle name

```javascript
db.user.updateMany(
{ "name.middle":{ $exists:true } },
{ $unset:{ "name.middle":"" } }
)
```

---

## 8.7 Cập nhật organization

Thêm organization cho tất cả document:

```javascript
db.user.updateMany(
{},
{ $set:{ organization:"UIT" } }
)
```

Cập nhật organization của id 5 và 6:

```javascript
db.user.updateMany(
{ id:{ $in:[5,6] } },
{ $set:{ organization:"USSH" } }
)
```

---

## 8.8 Aggregation

Tính tổng tuổi và tuổi trung bình theo organization:

```javascript
db.user.aggregate([
{
$group:{
_id:"$organization",
totalAge:{ $sum:"$age" },
avgAge:{ $avg:"$age" }
}
}
])
```

---

# 9. Hình ảnh minh họa

Hình ảnh chụp màn hình kết quả trong thư mục image của bài lab

---

# 10. Nội dung đã hoàn thành

* Thêm dữ liệu vào MongoDB
* Tạo unique index
* Truy vấn dữ liệu
* Cập nhật dữ liệu
* Xóa field trong document
* Thực hiện aggregation

---

# 11. Nội dung chưa hoàn thành

Tất cả yêu cầu của Lab đã được thực hiện.
