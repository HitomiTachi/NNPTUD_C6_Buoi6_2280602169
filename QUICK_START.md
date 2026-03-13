# 🚀 QUICK START GUIDE - HƯỚNG DẪN NHANH

## ⚡ Bắt đầu trong 5 phút

### Bước 1: Kiểm tra yêu cầu
```bash
node --version    # Cần Node.js v14+
npm --version     # Cần npm
mongosh           # Cần MongoDB đang chạy
```

### Bước 2: Cài đặt dependencies
```bash
cd E:\Java\NNPTUD_C6_Buoi6_2280602169
npm install
```

### Bước 3: Đảm bảo MongoDB đang chạy
- Kiểm tra Services: MongoDB phải "Running"
- Hoặc chạy: `mongosh` để test kết nối

### Bước 4: Chạy server
```bash
npm start
```

**Kết quả mong đợi**: Terminal hiển thị `connected` → Server chạy ở `http://localhost:3000`

---

## 📥 Import Postman Collection

1. Mở Postman
2. Click **Import** → Chọn file `NNPTUD-C6_API.postman_collection.json`
3. Collection sẽ được import với tất cả các request sẵn có

---

## 🧪 Test nhanh 3 bước

### 1. Test Hello World
- **GET** `http://localhost:3000/`
- Kết quả: `{"success":true,"message":"HELLO WORLD"}`

### 2. Đăng ký tài khoản
- **POST** `http://localhost:3000/api/v1/auth/register`
- Body:
```json
{
  "username": "testuser",
  "password": "Test123!@#",
  "email": "test@example.com"
}
```
- **Lưu ý**: Password phải có ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt

### 3. Đăng nhập và lấy token
- **POST** `http://localhost:3000/api/v1/auth/login`
- Body:
```json
{
  "username": "testuser",
  "password": "Test123!@#"
}
```
- **Copy token** từ response để dùng cho các request cần authentication

---

## 🔑 Sử dụng Token

Với các request cần authentication, thêm header:
```
Authorization: Bearer <TOKEN>
```

Ví dụ: `Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...` (token được ký bằng RS256)

---

## 📋 Thứ tự test khuyến nghị

1. ✅ Hello World
2. ✅ Register → Login → Get Me
3. ✅ Get All Roles → Create Role
4. ✅ Get All Users (cần token)
5. ✅ Get All Categories → Create Category
6. ✅ Get All Products → Create Product (cần categoryId)

---

## ⚠️ Lỗi thường gặp

| Lỗi | Giải pháp |
|-----|-----------|
| Port 3000 đã được sử dụng | Tắt ứng dụng khác hoặc đổi port |
| MongoDB connection error | Kiểm tra MongoDB service có chạy không |
| "ban chua dang nhap" | Thêm header `Authorization: Bearer <token>` |
| Validation error | Kiểm tra password format, email format |

---

## 📚 Tài liệu đầy đủ

Xem file `HUONG_DAN_CHAY_DU_AN.md` để có hướng dẫn chi tiết từng bước.

---

**Chúc bạn thành công! 🎉**

