# 🚀 Mark API Documentation

Welcome to **Mark API** — a modern, developer-friendly platform built to help you create, manage, and scale applications faster.

Everything you need to integrate with our APIs is available here.

---

## 🌟 Why Mark API?

### ⚡ Fast & Reliable

Built for performance with low-latency responses and high availability.

### 🔐 Secure by Default

Industry-standard authentication and secure data handling keep your applications protected.

### 🛠 Developer First

Simple APIs, clear documentation, and easy integration.

---

# 🚦 Get Started

Follow these steps to make your first API request.

## 1. Get your API Key

Create an account and generate your API key from the dashboard.

Your API key will look like:

```text
mk_live_xxxxxxxxxxxxxxxxx

# 📌 API Endpoints

| Endpoint | Method | Description | Authentication |
|----------|--------|-------------|----------------|
| `/users` | GET | Fetch all users | Required |
| `/users/{id}` | GET | Get user details | Required |
| `/projects` | POST | Create a new project | Required |
| `/projects/{id}` | DELETE | Delete a project | Required |
| `/files/upload` | POST | Upload a file | Required |

---

# 📊 Response Codes

| Code | Status | Meaning |
|------|--------|---------|
| 200 | Success | Request completed successfully |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Missing or invalid API key |
| 404 | Not Found | Resource does not exist |
| 500 | Server Error | Internal server error |

---

# 🛠 SDK Support

| Language | Package | Status |
|----------|---------|--------|
| JavaScript | `mark-sdk` | ✅ Available |
| Python | `mark-python` | ✅ Available |
| Java | `mark-java` | 🚧 Coming Soon |
| Go | `mark-go` | 🚧 Coming Soon |