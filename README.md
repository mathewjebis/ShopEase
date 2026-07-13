# ShopEase - React E-Commerce App

A fully functional e-commerce application built with React, featuring product management, wishlist, todo app, and user authentication forms.

## Live Demo

[View Live Website](https://stirring-twilight-44ce61.netlify.app/)

## Features

### Products

- View all products fetched from a REST API
- Add new products
- Edit existing products
- Delete products with confirmation dialog
- Add products to wishlist
- Full product details page with description and rating
- Star rating display

### Wishlist

- Add/Remove products
- Total price calculation
- Persistent storage with localStorage
- Redux state management

### Authentication

- Sign Up form with Yup validation
- Login page with React Router params
- Real-time field validation

### Todo App

- Add, Edit, Delete tasks
- Mark tasks as complete
- Task stats counter (Total, Done, Pending)
- Keyboard support

### General

- Responsive navbar with cart count badge and mobile drawer menu
- Fully responsive layout, mobile to desktop
- Custom 404 page
- Loading indicators

## Technologies Used

### Frontend

- React 19
- React Router DOM v7
- Redux Toolkit
- Material UI (MUI) + MUI Icons

### Forms & Validation

- React Hook Form
- Yup validation
- Custom regex patterns

### State Management

- Redux Toolkit
- localStorage persistence

### API & Data

- Axios
- JSON Server (REST API, deployed on Render)
- Custom useFetch hook

### UI Libraries

- Material UI (MUI)
- SweetAlert2
- React Icons (used in the Todo App only)

## Project Structure

```
src/
├── App.jsx
├── main.jsx
├── index.css
├── Components/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── SignUp.jsx
│   ├── NavbarMenu.jsx
│   ├── Products.jsx
│   ├── ProductList.jsx
│   ├── ProductDetails.jsx
│   ├── NewProduct.jsx
│   ├── UpdateProduct.jsx
│   ├── WishList.jsx
│   ├── Todoapp.jsx
│   ├── Content.jsx
│   └── NotFound.jsx
├── custom-hook/
│   └── useFetch.js
└── store/
    ├── store.js
    └── cartSlice.js
```

## Getting Started

### Prerequisites

- Node.js installed
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/mathewjebis/ShopEase.git

# Go to project folder
cd ShopEase

# Install dependencies
npm install

# Start JSON server (for products API)
npx json-server --watch db.json --port 4000

# Start the app
npm run dev
```

### Sample db.json

Create a `db.json` file in the root:

```json
{
  "products": [
    {
      "id": "1",
      "title": "Sample Product",
      "price": 500,
      "description": "A sample product description.",
      "category": "general",
      "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
      "rating": { "rate": 4.2, "count": 12 }
    }
  ]
}
```

## Notes on scope

- The products API is powered by **json-server**, a mock REST API for prototyping — not a production database. A real Express + MongoDB backend (with Passport.js authentication) is in progress as a separate project.
- The Login/Sign Up forms are UI-complete but not yet wired to a real authentication backend.
- The Todo App is a separate practice component bundled into this project, unrelated to the e-commerce functionality.

## React Concepts Used

- Functional Components
- useState, useEffect
- Custom Hooks (useFetch)
- React Router v7 (nested routes, dynamic params)
- Redux Toolkit (createSlice, configureStore)
- React Hook Form + Yup
- useSelector, useDispatch
- Context via Provider

## Author

**S. Mathew Jebis**

- GitHub: [mathewjebis](https://github.com/mathewjebis)
- Email: realmeuser1310@gmail.com
