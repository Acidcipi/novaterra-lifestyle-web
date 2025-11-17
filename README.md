# LUXE Real Estate - Luxury Property Platform

A comprehensive, secure, and multilingual real estate platform built with Next.js 16, featuring luxury property listings, VIP experiences, and integrated concierge services.

## Features

### Core Functionality
- **Multi-language Support**: 9 languages (ES, EN, FR, DE, SV, NO, DA, RU, MK) with native names
- **Authentication System**: Secure login/registration with Firebase integration
- **Property Management**: Browse, search, and favorite luxury properties
- **Admin Dashboard**: Complete CRUD operations for properties, users, and carousel images
- **Concierge Services**: Integrated transport, flights, and hotel booking
- **VIP Experiences**: Exclusive property listings for premium clients
- **Responsive Design**: Mobile-first approach with elegant UI

### Design
- **Theme**: Luxury black (#000000, #1F1F1F) and gold (#D4AF37) color scheme
- **Typography**: Inter for body text, Playfair Display for headings
- **Components**: Built with shadcn/ui and Tailwind CSS v4
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

### Security Features
- HTTPS enforcement
- Content Security Policy (CSP)
- CSRF protection
- Rate limiting (100 req/min)
- Input sanitization (XSS prevention)
- Password hashing with bcrypt
- Firebase security rules
- Secure HTTP headers
- Cookie consent management

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase account (free tier)

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/your-username/luxe-realestate.git
cd luxe-realestate
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
Create a `.env.local` file in the root directory:

\`\`\`env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable Authentication → Email/Password
4. Create a Realtime Database
5. Deploy security rules:
\`\`\`bash
firebase deploy --only database
\`\`\`
6. Copy your configuration to `.env.local`

## Project Structure

\`\`\`
luxe-realestate/
├── app/
│   ├── page.tsx                 # Home page
│   ├── properties/              # Properties listing
│   ├── services/                # Concierge services
│   ├── experiences/             # VIP/Basic experiences
│   ├── admin/                   # Admin dashboard
│   ├── legal/                   # Legal pages
│   └── layout.tsx               # Root layout
├── components/
│   ├── header/                  # Header & navigation
│   ├── footer/                  # Footer & cookie banner
│   ├── properties/              # Property cards & modals
│   ├── auth/                    # Login/register modals
│   ├── admin/                   # Admin management panels
│   └── ui/                      # shadcn/ui components
├── lib/
│   ├── i18n-config.ts          # Internationalization
│   ├── i18n-provider.tsx       # i18n context
│   ├── auth-context.tsx        # Authentication context
│   ├── firebase-config.ts      # Firebase setup
│   ├── validations.ts          # Zod schemas
│   ├── security-utils.ts       # Security helpers
│   ├── types.ts                # TypeScript types
│   └── mock-data.ts            # Sample properties
├── public/                      # Static assets
├── middleware.ts                # Rate limiting & CSRF
├── next.config.mjs             # Next.js config & CSP
├── database.rules.json         # Firebase security rules
├── SECURITY.md                 # Security documentation
└── README.md                   # This file
\`\`\`

## User Roles

### Visitor (Not Authenticated)
- View 3 featured properties on home
- Browse top 10 most visited properties
- View basic/VIP experiences
- Access legal pages

### User (Authenticated)
- Full access to all properties
- Infinite scroll pagination
- Favorite properties
- View visited properties
- Access concierge services
- Manage profile

### Admin
- All user permissions
- CRUD operations on properties
- User management (edit roles, block users)
- Upload carousel images
- Access admin dashboard

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Netlify

1. Build the project:
\`\`\`bash
npm run build
\`\`\`

2. Deploy the `out` directory to Netlify

3. Add environment variables in Netlify dashboard

4. Configure `_headers` file for security headers (already included)

## Security

Please read [SECURITY.md](SECURITY.md) for detailed security implementation and best practices.

### Quick Security Checklist
- ✅ HTTPS enforced
- ✅ CSP headers configured
- ✅ CSRF protection
- ✅ Rate limiting
- ✅ Input sanitization
- ✅ Password hashing
- ✅ Zod validation
- ✅ Firebase security rules
- ✅ Cookie consent

## Technologies

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19.2, Tailwind CSS v4, shadcn/ui
- **Authentication**: Firebase Auth
- **Database**: Firebase Realtime Database
- **Validation**: Zod
- **Internationalization**: Custom i18n with 9 languages
- **TypeScript**: Full type safety
- **Security**: bcrypt, DOMPurify, CSP, CSRF protection

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Copyright © 2025 LUXE Real Estate. All rights reserved.

## Support

For support, email support@luxe-realestate.com or create an issue in the GitHub repository.

## Acknowledgments

- Design inspiration from luxury real estate brands
- shadcn/ui for beautiful components
- Vercel for hosting and deployment
- Firebase for authentication and database
