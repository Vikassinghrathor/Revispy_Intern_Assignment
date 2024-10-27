# React Authentication Flow

A modern React authentication system featuring user registration with email verification. This project implements a secure and user-friendly authentication flow using React, React Router, and local storage for demonstration purposes.

## 🚀 Features

- User Registration
- Email Verification System
- Protected Routes
- Modern UI with Tailwind CSS
- Form Validation
- Responsive Design
- Session Management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/Vikassinghrathor/Revispy_Intern_Assignment.git
```

2. Navigate to the project directory:
```bash
cd client
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

## 💻 Usage

### Registration Flow

1. Users fill out the registration form with:
   - Name
   - Email
   - Password

2. Form validation checks:
   - Required fields
   - Email format
   - Password length (minimum 6 characters)
   - Duplicate email prevention

3. Upon successful registration:
   - User data is stored
   - Verification code is generated
   - User is redirected to verification page

### Email Verification

1. Users receive an 8-digit verification code in console
2. Features:
   - Auto-focus on input fields
   - Paste support for verification code
   - Resend code functionality
   - Input validation
   - Protected route access

## 🔒 Security Features

- Password validation
- Protected routes
- Session management
- Email verification
- Input sanitization
- Form validation

## 🎨 UI Features

- Responsive design
- Loading states
- Error handling
- Input focus management
- Clear user feedback
- Modern and clean interface

### Protected Routes

The categories page is protected and only accessible after successful Login . Users attempting to access it directly will be redirected to the registration page.

## 🔄 State Management

The project uses React's built-in state management with:
- `useState` for local component state
- `sessionStorage` for temporary data
- `localStorage` for persistent data

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🚨 Important Notes

- This is a demonstration project using local storage. For production use, implement proper backend authentication.
- The verification code is currently logged to the console. In a production environment, implement proper email sending functionality.
- Sensitive data should be properly encrypted in a production environment.

## ✨ Future Improvements

- Add password reset functionality
- Implement JWT authentication
- Add OAuth integration
- Add remember me functionality
- Implement rate limiting for verification attempts
- Add email sending functionality
