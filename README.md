An application for a company offering online language tutoring services

learn-lingo/
├── public/
│
├── src/
│ ├── assets/
│ ├── components/
│ ├── features/
│ │ ├── auth/ # реєстрація, логін, firebase logic
│ │ ├── teachers/ # картки викладачів, фільтрація, Read More
│ │ ├── favorites/ # сторінка обраного
│ │ └── booking/ # модалка бронювання
│ ├── hooks/ # кастомні хуки
│ ├── pages/ # сторінки (Home, Teachers, Favorites)
│ ├── routes/ # маршрутизація, приватні маршрути
│ ├── services/ # api.js, firebase.js, authService.js
│ ├── store/ # Zustand / Redux / Context API
│ ├── utils/ # допоміжні функції (наприклад: filterTeachers, formValidators)
│ ├── App.jsx
│ ├── index.css
│ └── main.jsx
├── index.html
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
