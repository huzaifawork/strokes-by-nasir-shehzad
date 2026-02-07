# Nasir Shehzad - Artist Portfolio

A modern, responsive portfolio website for visual artist Nasir Shehzad, featuring a public gallery and secure admin panel for content management.

## Features

### Public Portfolio
- **Hero Section**: Artist introduction with elegant animations
- **About Section**: Artist biography, philosophy, and mediums
- **Gallery**: Image lightbox with navigation and lazy loading
- **Exhibitions**: Showcase of exhibitions with lightbox
- **Residencies**: Artist residencies with lightbox
- **Contact Form**: Email integration with Gmail SMTP
- **Footer**: Artist information and contact details

### Admin Panel
- **Secure Authentication**: Firebase Authentication
- **Dashboard**: Overview statistics
- **Gallery Management**: Add, edit, delete gallery items
- **Exhibitions Management**: Manage exhibitions
- **Residencies Management**: Manage residencies
- **Image Upload**: Optimized image compression and Firebase Storage
- **Responsive Design**: Works on all devices

## Tech Stack

- **Framework**: Next.js 16.1.6 with Turbopack
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Authentication**: Firebase Auth
- **Email**: Nodemailer with Gmail SMTP
- **Icons**: React Icons
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Firebase project created
- Gmail account with App Password

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/nasir-shehzad-portfolio.git
cd nasir-shehzad-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file in root directory:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
```

4. Run development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Firebase Setup

### Storage Rules
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Firestore Rules
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

**Remember to add environment variables in Vercel dashboard!**

## Project Structure

```
artist-portfolio/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── admin/             # Admin panel pages
│   │   ├── api/               # API routes
│   │   ├── login/             # Login page
│   │   └── page.tsx           # Home page
│   ├── components/
│   │   ├── admin/             # Admin components
│   │   └── public/            # Public components
│   ├── lib/                   # Firebase configuration
│   └── services/              # Service functions
├── public/                    # Static assets
└── .env.local                 # Environment variables (not in repo)
```

## Admin Access

- URL: `/login`
- Credentials: Set up in Firebase Authentication

## Features Highlights

- ✅ Fully responsive design
- ✅ Image lazy loading for performance
- ✅ Image lightbox with keyboard navigation
- ✅ Image compression on upload
- ✅ Protected admin routes
- ✅ Email notifications via contact form
- ✅ Smooth animations throughout
- ✅ SEO optimized

## License

© 2026 Nasir Shehzad. All rights reserved.

## Support

For issues or questions, contact: strokesbynasirshehzad@gmail.com
