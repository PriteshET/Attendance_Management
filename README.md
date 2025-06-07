# 🧑‍🏫 Attendance Management System for Faculty

A full-stack **Attendance Management System** designed to help faculty track and manage student attendance efficiently.  
This project was built as part of my learning journey into full-stack development and includes core functionality like **student listing**, **attendance marking**, and **graphical analysis** — with some features still under development.


---

## 🚀 Features

- 📋 **Student Listing Page**  
  - Displays all students with department, year, and ID
  - Options to **add** and **delete** students

- ✅ **Attendance Marking Page**  
  - Choose subject & year
  - Mark attendance via **checkbox UI**
  - Displays visual summary via **charts**

- 📊 **Analytics Page**  
  - Select Year → View **present vs absent ratio** in graph form

- 🔐 **Authentication**  
  - Integrated via **Kinde App** for secure access

- 🗃️ **Database**  
  - SQL database powered by **Drizzle ORM Studio**

---

## ⚠️ Project Status

> This was an early-stage learning project and includes a few **unfinished elements** and **UI glitches**:
- 🚧 *Settings page not implemented*
- 🧪 *Minor layout issues on attendance view*
- 🔍 *Code not fully optimized for production*

Despite that, it demonstrates core full-stack development concepts and backend integration.

---

## 🛠️ Tech Stack

| Category         | Tech Used                                     |
|------------------|-----------------------------------------------|
| **Frontend**     | React + Vite                                  |
| **Auth**         | Kinde App                                     |
| **Database**     | SQL (via Drizzle ORM Studio)                  |
| **Backend/API**  | Axios + NodeJS                                |


---


## 🧪 Getting Started

### 1. Setup Environment
Create a .env.local file and add your Kinde App credentials:

- KINDE_CLIENT_ID=xxx
- KINDE_CLIENT_SECRET=xxx

### 2. Run Frontend
```bash
git clone https://github.com/your-username/attendance-management.git
cd attendance-management
npm install
npm run dev
```

### 3. Start Server using XAMPP app

- Start Apache
- Start Sql


### 4. Run Backend
```bash
npm run db:studio
```

---

## Author

[@PriteshET](https://github.com/PriteshET)


---



## 📃 License
This project is open-source and available under the MIT License.


---


## 🙏 Acknowledgement
This project was part of my full-stack development learning journey.
Special thanks to Kinde for providing easy auth integration and to Drizzle ORM for simplifying SQL data handling.
