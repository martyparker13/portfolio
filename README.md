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
