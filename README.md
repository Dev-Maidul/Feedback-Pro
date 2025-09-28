# Feedback Pro – Modern Feedback Application

A sleek, modern, and fully responsive feedback application built with **Next.js 14**, featuring real-time feedback submission and display with engaging animations.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge\&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge\&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge\&logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge\&logo=vercel)



## 🚀 Live Demo

[View Live Demo on Vercel](https://feedback-pro-psi.vercel.app/)

## ✨ Features
* 🎨 **Modern Dark Theme** – Professional dark UI with gradient backgrounds
* 📱 **Fully Responsive** – Optimized for mobile, tablet, and desktop devices
* ⚡ **Real-time Feedback** – Instant submission and display of feedback
* 🎭 **Smooth Animations** – Powered by Framer Motion
* 🔔 **Toast Notifications** – React Hot Toast for success/error messages
* 📋 **Copy to Clipboard** – Click any feedback to copy text
* 🎯 **Form Validation** – Client-side validation with helpful error messages
* 🔄 **Loading States** – Elegant loading animations
* ♿ **Accessible** – ARIA labels and keyboard navigation

## 🛠️ Tech Stack
* **Framework:** Next.js 14 (App Router)
* **Frontend:** React 18, Framer Motion
* **Styling:** Tailwind CSS
* **Notifications:** React Hot Toast
* **Icons:** Heroicons
* **Deployment:** Vercel
* **Backend:** Next.js API Routes

## 📦 Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/Dev-Maidul/Feedback-Pro
   cd Feedback-Pro
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 Usage
### 1. Submit Feedback

1. Enter your **name**, **email**, and **feedback**.
2. Click **"Submit Your Feedback"**.
3. Receive a success notification.

### 2. View Feedback

1. All submitted feedback appears **below the form in real-time**.
2. Click any feedback card to copy the feedback text.
3. Works seamlessly on **all screen sizes**.

---

### ✅ Key Features in Detail

* Form validation ensures all fields are filled
* Email format validation
* Loading states during API calls
* Error handling with user-friendly messages

---

## 🏗️ Project Structure

```
feedback-app/
├── app/
│   ├── api/
│   │   └── feedback/
│   │       └── route.js       # API routes for feedback
│   ├── layout.js              # Root layout with Toaster
│   ├── page.js                # Main application page
│   └── globals.css            # Global styles
├── public/
│   └── favicon.ico            # App favicon
├── package.json
└── README.md
```

---

## 🔧 API Endpoints

### GET `/api/feedback`

**Description:** Fetch all feedback entries
**Response:** Array of feedback objects

### POST `/api/feedback`

**Description:** Submit new feedback

**Request Body:**

```json
{
  "name": "string",
  "email": "string", 
  "feedback": "string"
}
```

**Response:** Success message or error

---

## 🎨 Customization

### Changing Colors

Edit Tailwind classes in `app/page.js`:

```jsx
// Current gradient
bg-gradient-to-r from-cyan-500 to-blue-500

// Change to different colors
bg-gradient-to-r from-green-500 to-teal-500
```

### Adding New Fields

1. Update the **form state** in `app/page.js`
2. Add new **input fields** in the form
3. Update **API route validation**

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch

   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes

   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch

   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

---

## 🙏 Acknowledgments

* [Next.js](https://nextjs.org/) – The React Framework
* [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework
* [Framer Motion](https://www.framer.com/motion/) – Animation library
* [React Hot Toast](https://react-hot-toast.com/) – Beautiful notifications

---

## 📞 Contact

**Md Maidul Islam**

* Phone: +86 131-6175-0176
* WhatsApp: +88 01792887606
* GitHub: [Dev-Maidul](https://github.com/Dev-Maidul)
* LinkedIn: [maidul-devs](https://www.linkedin.com/in/maidul-devs)
* Portfolio: [maiduldevs.netlify.app](https://maiduldevs.netlify.app/)
* Codeforces: [Maidul](https://codeforces.com/profile/Maidul)
* LeetCode: [Maidul](https://leetcode.com/u/maidulislammanik8991/)
* Problem-Solving YouTube Playlist: [Watch Here](https://www.youtube.com/watch?v=5ybL99W9Bfk&list=PL-weXfnSsDpwMiW9SaIhspMfgSkoYIa)

