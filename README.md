# Next-Gen Portfolio with AI Twin — Built with Next.js 16, Sanity CMS, Clerk & OpenAI's NEW AgentKit & ChatKit

A stunning, AI-powered portfolio website featuring your **AI Twin** that represents you 24/7. Your digital clone answers questions about your experience, skills, and projects with intelligent, context-aware responses. Built with Next.js 16, Sanity CMS, Clerk authentication, and OpenAI ChatKit.

> **Note:** This is a **Dual App Architecture** - You get TWO powerful applications in one repository:
> 1. **Frontend Portfolio** - Your stunning public-facing portfolio with AI Twin
> 2. **Sanity Studio Backend** - Complete CMS for managing all your content at `/studio`
> 
> Plus a cutting-edge **AI Twin** feature—an intelligent chat assistant that knows everything about you and can engage with visitors even when you're not available.

## 👇🏼 DO THIS Before you get started

> Note: Using the referral links below helps support the development of this project through affiliate partnerships, allowing me to provide these tutorials for free!

### 1) Set up Clerk using our link! (It supports us in doing this for FREE!)

Create a Clerk account at [Clerk](https://go.clerk.com/O6Jzq2c) for authentication

### 2) Set up Sanity

Create a Sanity account at [Sanity](https://www.sanity.io/sonny?utm_source=youtube&utm_medium=video&utm_content=next-gen-portfolio) for content management

### 3) Set up OpenAI

Create an OpenAI account at [OpenAI](https://openai.com) to power your AI Twin

## Features

### For Visitors

- **Your AI Twin** 🤖: An intelligent digital clone of you that engages with visitors 24/7, answering questions about your experience, skills, and projects as if they're talking to you directly
- **Dynamic Hero Section** ✨: Animated headline with text-flipping effects showcasing your expertise
- **Comprehensive Sections**: 
  - Hero with animated headlines
  - About with rich bio content
  - Skills visualization with interactive charts
  - Work experience timeline
  - Education history
  - Portfolio projects showcase
  - Professional certifications
  - Awards & achievements
  - Service offerings
  - Client testimonials with animated carousel
  - Blog posts
  - Contact form with validation
- **Floating Navigation Dock**: Beautiful macOS-style dock for smooth section navigation
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Dark Mode Toggle** 🌓: Seamless theme switching with system preference detection (Light/Dark/System modes)
- **Beautiful Animations**: Smooth transitions and micro-interactions using Framer Motion
- **Real-Time Content**: Live content updates with Sanity's Live API

### AI Twin Features

- **Your Digital Clone**: An AI Twin powered by OpenAI ChatKit that represents you with customizable personality modes:
  - **Crisp**: Concise and factual responses (professional mode)
  - **Clear**: Focused and helpful answers (balanced mode)
  - **Chatty**: Conversational companion mode (friendly mode)
- **Context-Aware Intelligence**: Your AI Twin knows everything about your portfolio—experience, skills, projects, achievements, and more
- **Personalized Greetings**: Introduces itself as you, creating a personal connection with visitors
- **Suggested Prompts**: Pre-built conversation starters to guide visitor interactions
- **Real-Time Streaming**: Responses stream in naturally like a real conversation
- **Always Available**: Your AI Twin engages visitors 24/7, even when you're sleeping or busy

### Dual App Architecture - Two Apps in One Repo

- **Frontend Portfolio (User-Facing)**: 
  - Beautiful, responsive portfolio website at `/`
  - AI Twin chat interface
  - All your sections: hero, about, skills, projects, blog, contact, etc.
  - Real-time content updates with Sanity's Live API

- **Sanity Studio Backend (Admin CMS)**: 
  - Powerful content management system built into your app at `/studio`
  - Manage all content: profile, skills, projects, blog posts, testimonials, and more
  - Visual editing with Presentation Tool - see changes in real-time
  - Draft mode - preview unpublished content before going live
  - Media management - upload and manage images with automatic optimization
  - Structured content with type-safe, auto-generated TypeScript types
  - GROQ query playground for testing data queries
  - 61 sample documents included - start with pre-populated content

### Technical Features

- **Next.js 16** with App Router and React 19
- **Turbopack** for lightning-fast development builds
- **TypeScript** end-to-end with strict mode
- **Tailwind CSS v4** for modern styling
- **next-themes** for dark mode support with system preference detection
- **Clerk** for secure authentication
- **Sanity CMS** with real-time preview
- **OpenAI ChatKit** for your AI Twin chat interface
- **Framer Motion** for smooth animations
- **Recharts** for data visualization
- **Biome** for linting and formatting
- **Server Components** for optimal performance
- **🎯 Dual App Architecture**: Two complete applications in one codebase
  - Portfolio frontend for visitors
  - Sanity Studio backend for content management

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Accounts: Clerk, Sanity, OpenAI

### 1) Clone & Install

```bash
# Clone the repository
git clone <your-repo-url>
cd next-gen-portfolio-sanity-nextjs-clerk

# Install dependencies
pnpm install
# or
npm install
# or
yarn install
```

### 2) Environment Variables

Create a `.env.local` file in the **project root**:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZXhhbXBsZS1jbGVyay1wdWJsaXNoYWJsZS1rZXktMTIzNDU2
CLERK_SECRET_KEY=sk_test_ZXhhbXBsZS1jbGVyay1zZWNyZXQta2V5LTEyMzQ1Ng

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123de
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-10-15

# Sanity Studio Preview (for local development)
SANITY_STUDIO_PREVIEW_ORIGIN=http://localhost:3000

# OpenAI for AI Chat
OPENAI_API_KEY=sk-proj-AbCdEfGhIjKlMnOpQrStUvWxYz1234567890AbCdEfGhIjKlMnOpQrStUvWxYz
```

**Important Notes:**

- **NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY**: Found in Clerk Dashboard → API Keys (starts with `pk_test_` or `pk_live_`)
- **CLERK_SECRET_KEY**: Found in Clerk Dashboard → API Keys (starts with `sk_test_` or `sk_live_`) - **Never expose this publicly!**
- **NEXT_PUBLIC_SANITY_PROJECT_ID**: Found in Sanity project settings (8-character alphanumeric ID)
- **NEXT_PUBLIC_SANITY_DATASET**: Usually `production` or `development` - matches your Sanity dataset name
- **OPENAI_API_KEY**: Found in OpenAI Dashboard → API Keys (starts with `sk-proj-` or `sk-`)

> **Security:** The `NEXT_PUBLIC_` prefix makes these variables available in client-side code. Only use this prefix for non-sensitive data like project IDs and publishable keys. Never prefix secret keys with `NEXT_PUBLIC_`!

### 3) Configure Clerk

1. Create a new application at [Clerk](https://go.clerk.com/O6Jzq2c)
2. Enable **Email** and **Google** as authentication providers (or your preferred methods)
3. Copy the **Publishable Key** and **Secret Key** into `.env.local`
4. Configure allowed origins in Clerk Dashboard:
   - Add `http://localhost:3000` for development
   - Add your production domain for deployment
5. (Optional) Customize the appearance in Clerk Dashboard → Customization

### 4) Configure Sanity

1. Create a Sanity account at [Sanity](https://www.sanity.io/sonny?utm_source=youtube&utm_medium=video&utm_content=next-gen-portfolio)
2. Initialize your Sanity project:

```bash
# Install Sanity CLI globally (if not already installed)
npm install -g @sanity/cli

# Login to Sanity
sanity login
```

3. Create a new project or link to an existing one:

```bash
# Initialize in the current directory (it will detect existing config)
sanity init
```

4. Copy your **Project ID** and add to `.env.local` as `NEXT_PUBLIC_SANITY_PROJECT_ID`
5. Set up CORS settings:
   - Go to [manage.sanity.io](https://manage.sanity.io)
   - Select your project → API → CORS Origins
   - Add `http://localhost:3000` for development
   - Add your production domain for deployment
6. Import sample data:

```bash
# Navigate to Data folder
cd Data

# Option 1: Use the automated import script (Mac/Linux)
chmod +x import-all.sh
./import-all.sh production

# Option 2: Use the automated import script (Windows)
import-all.bat production

# Option 3: Import manually
sanity dataset import skills.ndjson production --replace
sanity dataset import profile.ndjson production --replace
sanity dataset import education.ndjson production --replace
sanity dataset import experience.ndjson production --replace
sanity dataset import projects.ndjson production --replace
sanity dataset import blog.ndjson production --replace
sanity dataset import services.ndjson production --replace
sanity dataset import achievements.ndjson production --replace
sanity dataset import certifications.ndjson production --replace
sanity dataset import testimonials.ndjson production --replace
sanity dataset import siteSettings.ndjson production --replace
sanity dataset import contact.ndjson production --replace
sanity dataset import navigation.ndjson production --replace
```

7. Generate TypeScript types:

```bash
# From project root
npm run typegen
```

### 5) Configure OpenAI

1. Create an OpenAI account at [OpenAI](https://openai.com)
2. Create a Realtime Session:
   - Navigate to [API Keys](https://platform.openai.com/api-keys)
   - Create a new API key
   - Add to `.env.local` as `OPENAI_API_KEY`
3. Ensure you have access to **GPT-4o** model or modify the chat configuration for other models

### 6) Run Both Apps

**Development mode - One command runs BOTH apps:**

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

**🎉 Both apps will be running simultaneously:**
- **Frontend Portfolio** (public-facing): http://localhost:3000
- **Sanity Studio** (admin CMS): http://localhost:3000/studio

> Tip: Open both URLs in separate browser tabs - edit content in Studio and watch it update live in your Portfolio!

**Production build:**

```bash
# Build the application
npm run build

# Start production server
npm start
```

**Deploy Sanity Studio:**

```bash
# Deploy Studio to Sanity's hosting
sanity deploy
```

## Sample Data

The project includes comprehensive sample data in the `Data/` folder:

### What's Included (61 Documents)

| Content Type | Count | Description |
|--------------|-------|-------------|
| Profile | 1 | Complete professional profile |
| Skills | 15 | Frontend, Backend, AI/ML, DevOps, etc. |
| Experience | 4 | Work history with achievements |
| Education | 2 | University degrees |
| Projects | 6 | Portfolio projects (3 featured) |
| Blog Posts | 6 | Technical articles (3 featured) |
| Services | 5 | Service offerings with pricing |
| Achievements | 7 | Awards and recognitions |
| Certifications | 5 | Professional certifications |
| Testimonials | 6 | Client testimonials (5-star) |
| Site Settings | 1 | Configuration and branding |
| Contact | 3 | Sample inquiries |
| Navigation | 16 | Floating dock menu items |

### Quick Import

```bash
cd Data

# Mac/Linux
chmod +x import-all.sh
./import-all.sh production

# Windows
import-all.bat production
```

For detailed import instructions, see [`Data/README.md`](Data/README.md)

## Common Issues

### Development Issues

- **Port 3000 already in use**: Change port with `npm run dev -- -p 3001`
- **TypeScript errors**: Run `npm run typegen` to regenerate Sanity types
- **Build errors**: Clear `.next` folder and rebuild: `rm -rf .next && npm run build`
- **Missing environment variables**: Check `.env.local` exists with all required variables

### Sanity Issues

- **Studio not loading**: Ensure `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
- **Can't upload images**: Check CORS settings in Sanity Dashboard
- **Data not appearing**: Verify dataset name matches in `.env.local`
- **Import fails**: Run imports in correct order (skills first, then others)
- **Schema changes not reflecting**: Restart dev server and run `npm run typegen`

### Clerk Issues

- **Authentication not working**: Verify Clerk keys are correct in `.env.local`
- **Redirect errors**: Check allowed origins in Clerk Dashboard match your domain
- **Session issues**: Clear browser cookies and try again

### OpenAI Chat Issues

- **Chat not loading**: Verify `OPENAI_API_KEY` is set correctly
- **Rate limit errors**: Check OpenAI usage limits in your dashboard
- **Streaming not working**: Ensure ChatKit script loads (check Network tab)

## 🚀 Join the World's Best Developer Course & Community - Zero to Full Stack Hero!

### Transform Your Career with Modern Full-Stack Development

Ready to build production-ready applications like this Next-Gen Portfolio? Join **Zero to Full Stack Hero** - the ultimate course that teaches you to build real-world, revenue-generating applications using the latest technologies.

### 🎯 What You'll Learn:

- **React Native & Expo** - Build cross-platform mobile apps for iOS, Android, and Web
- **AI Integration** - Build intelligent apps with OpenAI, Claude, and custom AI workflows
- **Full-Stack Architecture** - From frontend to backend, databases to deployment
- **Modern Authentication** - Clerk, Auth0, and custom auth solutions
- **CMS Integration** - Sanity, Contentful, and headless CMS architectures
- **Database Mastery** - SQL, NoSQL, Prisma, Convex, and more
- **Payment Integration** - Stripe, subscription models, and billing systems
- **Real-Time Features** - WebSockets, live updates, and collaborative apps
- **Deployment & DevOps** - Vercel, AWS, Docker, and CI/CD pipelines

### 👥 Join the PAPAFAM Community:

- **1,000+ Active Developers** helping each other succeed
- **Weekly Live Coding Sessions** with Sonny Sangha
- **Code Reviews & Feedback** from industry professionals
- **Job Placement Support** and career guidance
- **Exclusive Discord Community** with 24/7 support
- **Networking Opportunities** with like-minded developers

### 💼 Career Transformation:

- **$50k-$150k+ Salary Increases** reported by graduates
- **Portfolio Projects** that impress employers
- **Interview Preparation** and technical assessment practice
- **Freelancing Guidance** to start your own business
- **Lifetime Access** to all course materials and updates

### 🎁 Special Bonuses:

- **100+ Hours** of premium video content
- **Private GitHub Repositories** with complete source code
- **Exclusive Templates & Boilerplates** to accelerate development
- **Monthly Q&A Sessions** with industry experts
- **Certificate of Completion** to showcase your skills

---

**Ready to level up your development skills and build the future?**

[🚀 **Join Zero to Full Stack Hero NOW**](https://www.papareact.com/course)

_Join thousands of developers who've transformed their careers with PAPAFAM!_

## 🏆 Take It Further - Challenge Time!

### AI Twin Enhancements
- Train your AI Twin on custom conversation flows and FAQs
- Add voice capabilities to your AI Twin (text-to-speech)
- Implement conversation memory so your AI Twin remembers past interactions
- Add sentiment analysis to track visitor engagement
- Create AI-generated portfolio summaries based on visitor interests
- Build a feedback system to improve your AI Twin's responses

### Portfolio Features
- Add a resume/CV download feature
- Implement a newsletter subscription with email integration
- Extend dark mode with custom color themes (e.g., blue, purple, green variants)
- Add automatic theme switching based on time of day
- Create theme preview cards before applying
- Add analytics dashboard to track portfolio visits and AI Twin conversations
- Create a case study section with detailed project walkthroughs
- Add video introductions to sections
- Implement multi-language support (i18n)
- Add a timeline visualization for career journey
- Create interactive demos of your projects
- Add a booking system for consultation calls
- Implement real-time visitor counter
- Add badge/certification verification system
- Create a resources/downloads section
- Build a mini-blog with comments (using Sanity comments API)
- Add reading time estimates for blog posts
- Implement tag-based filtering for projects and blog posts
- Create a "hire me" workflow with availability calendar
- Add testimonial submission form for clients
- Build an admin dashboard for analytics
- Implement A/B testing for different hero sections
- Add webhook integrations for form submissions

## 📄 License & Commercial Use

This project is provided for **educational and learning purposes only**.

### 🚨 Important Licensing Information:

- **Personal Learning**: You are free to use this code for personal learning, experimentation, and portfolio demonstration
- **Commercial Use**: Any commercial use, redistribution, or deployment of this code requires **explicit written permission** from Sonny Sangha
- **No Resale**: You may not sell, redistribute, or claim ownership of this codebase
- **Attribution Required**: If showcasing this project, proper attribution to Sonny Sangha and the original tutorial must be included

### 📧 For Commercial Licensing:

If you wish to use this code commercially or have licensing questions, please contact us at **team@papareact.com** with details about your intended use case.

**Violation of these terms may result in legal action.**

---

## Support

For support, email team@papareact.com

Built with ❤️ for the PAPAFAM

---
