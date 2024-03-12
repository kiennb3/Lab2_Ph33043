//import thư viện
const express= require('express')
const mongoose= require('mongoose');
//tạo đối tượng mới cho express
const app=express();
//kết nối với csdl mongoDB
mongoose.connect('mongodb+srv://kiendtph33043:24022004kien@data.4azy2ad.mongodb.net/?retryWrites=true&w=majority&appName=data',{
useNewUrlParser: true,
useUnifiedTopology: true,
}).then(()=>{
    console.log('kết nối thành công với MongoDB');
}).catch((err)=>{
    console.log('Lỗi: ',err);
});
//truy vấn csdl
//chọn csdl thao tác
const  db1=mongoose.connection.useDb('db1');
//định nghĩa model bang dữ liệu
const SinhVienSchema= new mongoose.Schema({
    masv:String,
    tensv:String,
});
//ánh xạ model vào bảng dl
const Sinhvien=db1.model('sinhvien',SinhVienSchema);
//tạo link để triêu gọi trên trình duyệt
app.get('/' ,async(request,response)=>{
    try {
        const sinhvien=await Sinhvien.find();//đọc dl từ bảng sv
       if (sinhvien.length>0) {
        response.json(sinhvien);//api trả về kqua
       }else{
        response.status(404).json({error:'khong co sinh vien'});
       }
    } catch (error) {
        console.error('Lỗi đọc dl: ');
        response.status(500).json({error:'doc du lieu loi'})
    }
})
//khởi chạy máy chủ
const PORT = process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log('server đang chạy ở cổng 3000');
});
module.exports=app;
