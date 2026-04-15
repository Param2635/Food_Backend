// ========================
// PROFESSIONAL
// ========================

# 🚀 Taskifest - Customer App

## 📌 Description

**Taskifest** is a multi-vendor food ordering application that allows users to order from both **restaurants and street food vendors** in one place.

Unlike traditional food delivery apps that focus only on restaurants, Taskifest aims to bring **local street food vendors online**, making them accessible for quick and convenient ordering.

---

## 🎯 Purpose

* Solve the problem of **limited accessibility to street food vendors online**
* Provide a platform where users can:

  * Order from nearby restaurants
  * Discover and order from local street food vendors

### 👥 Target Users

* Local users
* Students
* People looking for affordable and quick food options
* Street food lovers

---

## ✨ Features

### 🛍️ Core Features

* Browse products
* View categories
* View restaurants/vendors
* Search products and vendors
* Apply filters
* View offers and discounts

### 🛒 Cart & Orders

* Add to cart
* Manage cart items *(in progress)*
* Place orders
* View order history

### 🔐 Authentication

* Login / Signup *(OTP/Email-based)*

---

## 🧠 Tech Stack

### 📱 Frontend

* **Flutter (v3.8)**
* State Management:

  * BLoC
  * Cubit

### 🌐 Backend

* **Node.js**
* **Express.js**
* Custom API development *(currently in progress)*

---

## 🏗️ App Architecture

The app follows a **BLoC (Business Logic Component) architecture**, ensuring:

* Separation of concerns
* Scalable code structure
* Better state management

### 🔹 Architecture Highlights

* UI layer separated from business logic
* Reactive state updates using BLoC/Cubit
* Modular and maintainable codebase

---

## 🔌 API Structure

The backend is being developed with a RESTful approach.

### Planned Endpoints:

* `GET /getProducts`
* `GET /getCategories`
* `GET /getRestaurants`
* `POST /cart`
* `POST /order`

### 🔄 Data Flow

```
Categories → Products → Cart → Order
Restaurants → Products → Cart → Order
```

> ⚠️ Note: Backend APIs are currently under development.

---

## 📂 Project Structure

```
lib/
 ├── screens/        # UI screens
 ├── models/         # Data models
 ├── bloc/           # BLoC & Cubit state management
 ├── services/       # API services & network calls
 ├── utils/          # Utility functions
```

---

## 🚀 Current Status

### ✅ Completed

* Authentication (Login & Registration)
* Home screen
* Category listing
* Product listing
* Basic UI flow

### 🔄 In Progress

* Cart functionality
* Product details page

### ⏳ Pending

* Full BLoC implementation across all screens
* Backend integration
* Order system

---

## 🔮 Future Scope

* Complete backend integration
* Real-time order tracking
* Payment gateway integration
* Vendor (street food + restaurant) onboarding system
* Notifications
* Performance optimizations

---

## 🛠️ Installation & Setup

### Prerequisites

* Flutter SDK installed
* Android Studio / VS Code
* Emulator or physical device

### Steps to Run

```bash
# Clone the repository
git clone https://github.com/Param2635/your-repo-name.git

# Navigate to project
cd your-repo-name

# Install dependencies
flutter pub get

# Run the app
flutter run
```

> ⚠️ Note: Backend configuration (API base URL, keys) is not finalized yet.

---

## 🤝 Contributing

Contributions are welcome!

If you'd like to contribute:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

---

## 👨‍💻 Author

**Param Parmar**
GitHub: https://github.com/Param2635

---

## ⭐ Acknowledgment

This project is currently under active development and aims to bridge the gap between **street food vendors and digital food delivery platforms**.


````
// ===================
// temp
// ===================

# food_app_backend

A RESTful backend API for a food delivery application. Currently powered by a JSON mock API — designed for easy migration to a real database in the future.

---

## Features

- User registration and authentication (JWT-based)
- Restaurant and menu browsing
- Menu item management (categories, pricing, availability)
- Cart and order management
- Order history and status tracking
- Mock API using JSON — no database setup required to get started

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Mock Data | JSON flat files / json-server |
| Auth | JWT |
| Database (planned) | PostgreSQL / MongoDB *(TBD)* |

> **Note:** The app currently uses a JSON-based mock API. A proper database will be integrated in a future release.

---

## Project Structure

```
food_app_backend/
├── data/                   # JSON mock data files
│   ├── users.json
│   ├── restaurants.json
│   ├── menu_items.json
│   └── orders.json
├── services/               # Business logic (DB-ready layer)
│   ├── authService.js
│   ├── menuService.js
│   └── orderService.js
├── routes/                 # API route definitions
│   ├── auth.js
│   ├── menu.js
│   └── orders.js
├── middleware/             # Auth, error handling, etc.
│   └── authMiddleware.js
├── .env.example
├── package.json
└── server.js
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/food_app_backend.git
cd food_app_backend
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

```env
PORT=5000
JWT_SECRET=your_jwt_secret_here
```

### Run the Server

```bash
# Development
npm run dev

# Production
npm start
```

The server will start at `http://localhost:5000`.

---

## API Endpoints

### Auth

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |

### Restaurants & Menu

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/restaurants` | List all restaurants |
| GET | `/api/restaurants/:id/menu` | Get menu for a restaurant |
| GET | `/api/menu-items/:id` | Get a single menu item |

### Orders

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/orders` | Get current user's orders |
| POST | `/api/orders` | Place a new order |
| GET | `/api/orders/:id` | Get order details |
| PATCH | `/api/orders/:id/status` | Update order status |

> All protected routes require an `Authorization: Bearer <token>` header.

---

## Mock Data

Mock data lives in the `data/` folder as plain JSON files. You can use [json-server](https://github.com/typicode/json-server) to serve them directly:

```bash
npx json-server --watch data/db.json --port 3001
```

---

## Roadmap

- [x] JSON mock API
- [x] Auth with JWT
- [x] Menu and order endpoints
- [ ] Integrate PostgreSQL / MongoDB
- [ ] Payment gateway integration
- [ ] Real-time order tracking (WebSockets)
- [ ] Admin dashboard API
- [ ] Unit and integration tests

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

## License

[MIT](LICENSE)

*/