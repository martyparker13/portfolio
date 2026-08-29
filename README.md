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
