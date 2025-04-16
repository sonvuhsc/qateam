# Playwright + Cucumber + API Testing (Windows Setup)

Dự án này sử dụng **Playwright** để kiểm thử giao diện (UI) và API, kết hợp với **Cucumber (BDD)** để viết kịch bản kiểm thử dễ đọc, dễ bảo trì và tự động hóa tốt trên mọi môi trường.

---

## 💻 Yêu cầu hệ thống

- ✅ Node.js >= 16.x (khuyên dùng Node.js 18.x)
- ✅ npm (đi kèm với Node)
- ✅ Hệ điều hành: Windows 10 hoặc 11

---

## 🚀 Cài đặt và khởi tạo project

### 1. Clone project từ GitHub

```bash
git clone https://github.com/son.vd/hsc.git
cd your-project

---

## Cài đặt dependencies
npm install

## Cài đặt playwright
npx playwright install

## Cài đặt Cucumber
npm install --save-dev @cucumber/cucumber

## Cài đặt Extensions
1. Cucumber ( Gherkin ) Full


## ▶️ Cách chạy test UI
npm run test:parallel   # nếu muốn chạy parallel các scenario cùng 1 lúc
npm run test:report     # nếu muốn chạy test tuần tự các testcase và sau đó xuất ra report
npm run test    # nếu muốn chỉ chạy test không xuất report
npm run report  # nếu muốn chỉ xuất report

## ▶️ Cách chạy test API
npx playwright test tests/api

## Cấu trúc thư mục
project-root/
├── features/                  # BDD feature files (.feature)
│   ├── *.feature              # Các scenario feature
│   └── step_definitions/      # Step của từng scenario
|   └── support                # Chứa hooks file >  để config chạy các test 
├── tests/                     # Các file test .spec.ts/.js (UI, API)
│   ├── api/
│   └── config/
├── pageobjects                # Chứa từng page của từng tính năng
├── playwright.config.js       # Cấu hình cho Playwright
├── package.json               # Chứa các dependencies đã cài đặt, các scripts để run test
└── README.md                  # Tài liệu này
