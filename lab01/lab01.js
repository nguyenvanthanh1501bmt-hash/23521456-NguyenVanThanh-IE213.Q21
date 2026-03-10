// dùng đúng database
use("23521456-ie213")

// 2.2 Thêm document vào collection user
db.user.insertMany([
{ id:1, name:{ first:"John", last:"Doe" }, age:48 },
{ id:2, name:{ first:"Jane", last:"Doe" }, age:16 },
{ id:3, name:{ first:"Alice", last:"A" }, age:32 },
{ id:4, name:{ first:"Bob", last:"B" }, age:64 }
])

// 2.3 Tạo unique index cho id
db.user.createIndex({ id:1 }, { unique:true })

// 2.4 Tìm John Doe
db.user.find({
"name.first":"John",
"name.last":"Doe"
})

// 2.5 Tuổi >30 và <60
db.user.find({
$and:[
{ age:{ $gt:30 } },
{ age:{ $lt:60 } }
]
})

// 2.6 Thêm document có middle name
db.user.insertMany([
{ id:5, name:{ first:"Rooney", middle:"K", last:"A" }, age:30 },
{ id:6, name:{ first:"Ronaldo", middle:"T", last:"B" }, age:60 }
])

// tìm document có middle name
db.user.find({
"name.middle":{ $exists:true }
})

// 2.7 Xóa middle name
db.user.updateMany(
{ "name.middle":{ $exists:true } },
{ $unset:{ "name.middle":"" } }
)

// 2.8 Thêm organization UIT
db.user.updateMany(
{},
{ $set:{ organization:"UIT" } }
)

// 2.9 đổi organization id 5 và 6 thành USSH
db.user.updateMany(
{ id:{ $in:[5,6] } },
{ $set:{ organization:"USSH" } }
)

// 2.10 tổng tuổi và trung bình tuổi theo organization
db.user.aggregate([
{
$group:{
_id:"$organization",
totalAge:{ $sum:"$age" },
avgAge:{ $avg:"$age" }
}
}
])