# Feedback Pro - Modern Feedback Application
A beautiful, modern, and responsive feedback application built with Next.js 14, featuring real-time feedback submission and display with stunning animations.

![Feedback App](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)

## 🚀 Live Demo

[**Live Demo on Vercel**](https://your-app-name.vercel.app)

## ✨ Features

- 🎨 Modern Dark Theme - Professional dark UI with gradient backgrounds
- 📱Fully Responsive - Optimized for all devices (mobile, tablet, desktop)
- ⚡ Real-time Feedback - Instant submission and display of feedback
- 🎭 Smooth Animations - Framer Motion powered animations
- 🔔 Toast Notifications - React Hot Toast for success/error messages
- 📋Copy to Clipboard- Click any feedback to copy text
- 🎯 Form Validation- Client-side validation with error messages
- 🔄 Loading States - Beautiful loading animations
- ♿ Accessible - ARIA labels and keyboard navigation

 🛠️ Tech Stack

- Framework: Next.js 14 (App Router)
- Frontend: React 18, Framer Motion
- Styling: Tailwind CSS
- Notifications: React Hot Toast
- Icons: Heroicons
- Deployment: Vercel
- Backend: Next.js API Routes

 📦 Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/feedback-app.git
   cd feedback-app
2. Install dependencies   
    npm install
3. Run the development server
4. Open your browser
    Navigate to http://localhost:3000
🎮 Usage
1. Submit Feedback:

2. Fill in your name, email, and feedback

3. Click "Submit Your Feedback" button

4. Receive success notification

5. View Feedback:

6. All submitted feedback appears in real-time

7. Click any feedback card to copy text

8. Responsive design works on all devices

Features:
1. Form validation ensures all fields are filled
2. Email format validation
3. Loading states during API calls
4. Error handling with user-friendly messages

🏗️ Project Structure
text
feedback-app/
├── app/
│   ├── api/
│   │   └── feedback/
│   │       └── route.js      # API routes for feedback
│   ├── layout.js             # Root layout with Toaster
│   ├── page.js               # Main application page
│   └── globals.css           # Global styles
├── public/
│   └── favicon.ico           # App favicon
├── package.json
└── README.md
🔧 API Endpoints
GET /api/feedback
Description: Fetch all feedback entries

Response: Array of feedback objects

POST /api/feedback
Description: Submit new feedback

Body:

json
{
  "name": "string",
  "email": "string", 
  "feedback": "string"
}
Response: Success message or error

🎨 Customization
Changing Colors
Edit the Tailwind classes in app/page.js:

jsx
// Current gradient
bg-gradient-to-r from-cyan-500 to-blue-500

// Change to different colors
bg-gradient-to-r from-green-500 to-teal-500
Adding New Fields
Update the form state in app/page.js

Add new input fields

Update API route validation

🤝 Contributing
Fork the project
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request


🙏 Acknowledgments
Next.js - The React Framework
Tailwind CSS - For amazing utility classes
Framer Motion - For smooth animations
React Hot Toast - For beautiful notifications
📞 Contact
Your Name - Md Maidul Islam
Phone: +86 131-6175-0176
Whatsapp: +88 01792887606 
GitHub: https://github.com/Dev-Maidul
LinkedIn: www.linkedin.com/in/maidul-devs
Portfolio: https://maiduldevs.netlify.app/
Codeforces: https://codeforces.com/profile/Maidul
Leetcode: https://leetcode.com/u/maidulislammanik8991/
ProblemSolving:https://www.youtube.com/watch?v=5ybL99W9Bfk&list=PL-weXfnSsDpwMiW9SaIhspMfgSkoYIa

