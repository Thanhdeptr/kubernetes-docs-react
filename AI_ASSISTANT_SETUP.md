# Kubernetes AI Assistant Setup Guide

## Tổng quan

Kubernetes AI Assistant là một trợ lý AI tích hợp sẵn trong ứng dụng Kubernetes Documentation React. Trợ lý có thể:

- Tìm kiếm thông tin trong tài liệu Kubernetes
- Trả lời câu hỏi về các thành phần Kubernetes
- Cung cấp hướng dẫn setup cluster
- Giải thích các khái niệm phức tạp
- Hỗ trợ troubleshooting

## Cài đặt Dependencies

Trước khi sử dụng AI Assistant, bạn cần cài đặt các dependencies cần thiết:

```bash
npm install openai
# hoặc
yarn add openai
```

## Thiết lập Environment Variables

### Bước 1: Tạo file .env

1. Copy file `env.example` thành `.env`:
```bash
cp env.example .env
```

2. Hoặc tạo file `.env` mới trong thư mục `kubernetes-docs-react/` với nội dung:
```env
VITE_OPENAI_API_KEY=your_api_key_here
VITE_OPENAI_MODEL=openai/gpt-3.5-turbo
```

### Bước 2: Lấy API Key từ OpenRouter

1. Truy cập [OpenRouter.ai](https://openrouter.ai/)
2. Đăng ký tài khoản hoặc đăng nhập
3. Vào phần "API Keys" và tạo key mới
4. Copy API key và paste vào file `.env`

### Bước 3: Chọn Model

Bạn có thể chọn model phù hợp với ngân sách:

#### Free Models (Miễn phí):
```env
VITE_OPENAI_MODEL=google/gemma-2-9b-it:free
VITE_OPENAI_MODEL=microsoft/phi-3-mini-128k-instruct:free
VITE_OPENAI_MODEL=meta-llama/llama-3.1-8b-instruct:free
```

#### Paid Models (Trả phí, chất lượng cao hơn):
```env
VITE_OPENAI_MODEL=openai/gpt-3.5-turbo
VITE_OPENAI_MODEL=openai/gpt-4o-mini
VITE_OPENAI_MODEL=anthropic/claude-3-haiku
VITE_OPENAI_MODEL=google/gemini-pro-1.5
```

## Cách sử dụng

### Khởi động ứng dụng

```bash
npm run dev
# hoặc
yarn dev
```

### Mở AI Assistant

1. Click vào icon chat (🤖) trên giao diện
2. Gửi câu hỏi về Kubernetes
3. AI sẽ tìm kiếm trong tài liệu và trả lời

### Ví dụ câu hỏi:

- "Pod là gì?"
- "Cách setup minikube"
- "Khác nhau giữa Service và Ingress"
- "Hướng dẫn setup control plane"
- "Cách sử dụng Rancher UI"

## Tính năng

### 1. Custom Search Tool
- AI tự động tìm kiếm trong documentation
- Render HTML từ React components
- Hiển thị kết quả với format đẹp

### 2. Lưu Chat History
- Lưu lịch sử chat trong localStorage
- Có thể xóa chat history bằng nút 🗑️

### 3. Easter Egg
- Vẫn giữ tính năng Easter Egg như cũ
- Chạy song song với AI functionality

### 4. Responsive Design
- Hỗ trợ cả dark và light theme
- Responsive trên mobile và desktop

## Troubleshooting

### Lỗi API Key
```
Error: "Tôi không thể kết nối với API"
```
**Giải pháp**: Kiểm tra API key trong file `.env`

### Lỗi Model không tồn tại
```
Error: "Model not found"
```
**Giải pháp**: Kiểm tra tên model trong file `.env`

### Lỗi Network
```
Error: "Không thể kết nối với API"
```
**Giải pháp**: Kiểm tra kết nối internet và firewall

### Console Logs
Mở Developer Tools (F12) để xem chi tiết logs:
- Raw API response
- Tool calls
- Search results

## Customization

### Thêm tài liệu mới

Để thêm trang documentation mới vào search:

1. Mở `src/components/ChatInterface.jsx`
2. Thêm import component mới
3. Thêm vào `documentationUrls` array
4. Thêm vào `componentMap`

### Thay đổi System Prompt

Chỉnh sửa function `createSystemPrompt()` trong `ChatInterface.jsx`

### Custom Styling

Chỉnh sửa CSS trong `src/components/ChatInterface.css`

## Security Notes

- API key được lưu trong environment variables
- Không commit file `.env` vào git
- Sử dụng `dangerouslyAllowBrowser: true` chỉ cho development
- Production nên proxy qua backend server

## License

Sử dụng theo license của project chính.
