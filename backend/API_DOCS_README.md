# API Documentation Setup

Dự án đã được setup với SpringDoc OpenAPI để tự động tạo tài liệu API.

## Cách truy cập API Documentation

Sau khi chạy ứng dụng Spring Boot, bạn có thể truy cập API documentation tại các URL sau:

### 1. Swagger UI (Giao diện web tương tác)

```
http://localhost:8080/swagger-ui.html
```

### 2. OpenAPI JSON Specification

```
http://localhost:8080/api-docs
```

### 3. OpenAPI YAML Specification

```
http://localhost:8080/api-docs.yaml
```

## Tính năng đã được cấu hình

### 1. OpenAPI Configuration

- **File**: `src/main/kotlin/com/happyending/common/configs/OpenApiConfig.kt`
- **Chức năng**: Cấu hình thông tin chung của API như title, description, version, contact info
- **Servers**: Development (localhost:8080) và Production (api.happyending.com)

### 2. Application Properties

- **File**: `src/main/resources/application.properties`
- **Cấu hình**:
  - API docs path: `/api-docs`
  - Swagger UI path: `/swagger-ui.html`
  - Operations sorter: by method
  - Tags sorter: alphabetical
  - Try it out: enabled
  - Request duration display: enabled

### 3. Controller Documentation

- **File**: `src/main/kotlin/com/happyending/product/controllers/ProductController.kt`
- **Annotations được thêm**:
  - `@Tag`: Nhóm các API endpoints
  - `@Operation`: Mô tả từng endpoint
  - `@ApiResponses`: Mô tả các response codes
  - `@Parameter`: Mô tả các parameters

### 4. DTO và Entity Documentation

- **Files**:
  - `src/main/kotlin/com/happyending/product/dtos/CreateProductDTO.kt`
  - `src/main/kotlin/com/happyending/product/entities/Product.kt`
- **Annotations**: `@Schema` cho các fields với description và examples

## Cách test

1. **Chạy ứng dụng**:

   ```bash
   ./mvnw spring-boot:run
   ```

2. **Mở trình duyệt** và truy cập: `http://localhost:8080/swagger-ui.html`

3. **Test các endpoints**:
   - Sử dụng "Try it out" button trong Swagger UI
   - Thực hiện các request GET, POST để test API
   - Xem response examples và schema definitions

## Lợi ích

- **Tự động**: Tài liệu được tạo tự động từ code
- **Luôn cập nhật**: Khi code thay đổi, docs cũng được cập nhật
- **Interactive**: Có thể test API trực tiếp từ giao diện
- **Standard**: Tuân theo chuẩn OpenAPI 3.0
- **Developer-friendly**: Dễ đọc và hiểu cho developers

## Mở rộng

Để thêm documentation cho các controller khác, chỉ cần:

1. Thêm các annotations `@Operation`, `@ApiResponses`, `@Parameter`
2. Thêm `@Schema` cho các DTOs và Entities mới
3. Documentation sẽ tự động xuất hiện trong Swagger UI
