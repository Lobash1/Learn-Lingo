# 📚 Learn Lingo — Language Learning Platform

**Learn Lingo** is a web application for finding foreign language teachers.  
Users can browse teachers, apply filters (by teaching language, student levels, hourly price), add teachers to favorites, and book trial lessons.

---

## 🎯 Project Overview

The goal is to create a convenient platform for students to find online language teachers.  
Each teacher has a card with detailed info, price, and reviews. Users can:

- 🔍 Search teachers by filters
- ❤️ Add to Favorites
- 📩 Book trial lessons through a form
- 🔑 Log in to save favorites in Firebase

---

## 🛠 Tech Stack

- **React** — component-based architecture
- **React Router** — routing between pages
- **Redux Toolkit** — global state for favorites
- **Firebase Authentication** — user registration and login
- **Firebase Realtime Database** — store users' favorite teachers
- **react-hook-form + yup** — forms and validation
- **Axios** — API requests
- **CSS Modules** — styling
- **iziToast** — notifications

---

## 🎨 UI / Screenshots

UI is based on [**Figma**](https://www.figma.com/design/RhEgycyV6AiKomLNQ1ZEU8/Learn-Lingo--Copy-?node-id=44-649&t=Z603El6fSYhhsy0f-0) design.  
Responsive layout with focus on usability for filters and teacher cards.

**Live Demo:** [Learn Lingo on Vercel](https://learn-lingo-taupe-five.vercel.app/)

---

## 📋 Features / Technical Requirements

1. **Pages**
   - **Home** — landing page
   - **Teachers** — catalog of teachers with filters
   - **Favorites** — user’s favorite teachers (login required)
2. **Teacher Cards**
   - Name, photo, languages, student levels, reviews
   - Hourly price
   - Buttons: "Add to Favorites", "Remove from Favorites", "Book Trial Lesson"
3. **Filters**
   - By teaching language
   - By student level
   - By hourly price (≤ selected value)
4. **Firebase Authentication**
   - Register / Login / Logout
   - Store user’s favorites in Firebase
5. **Booking Form**
   - Name, email, phone
   - Validation with **yup**
   - Success notification with **iziToast**
6. Favorites are preserved on page reload.
7. Clean code and component-based structure matching Figma design.

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone

# Go to project directory
cd learn-lingo

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

👩‍💻 Author
Anastasiia Lobash
lobash.n@gmail.com
