# 📦 Sanity Dummy Data - Quick Start

This project includes comprehensive dummy data for your Sanity portfolio database.

## 🚀 Quick Import

### Option 1: Automated Import (Recommended)

```bash
# Make the script executable (Mac/Linux)
chmod +x Data/import-all.sh

# Run the import script
cd Data && ./import-all.sh production
```

**Windows:**
```bash
cd Data
import-all.bat production
```

### Option 2: Manual Import

```bash
cd Data

# Import in order (important for references!)
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
```

## 📂 What's Included

The `/Data` folder contains:

- **12 NDJSON files** - 61 ready-to-import documents
- **README.md** - Complete import guide with troubleshooting
- **GROQ-EXAMPLES.md** - Query examples for all data types
- **DATA-OVERVIEW.md** - Detailed breakdown of all content
- **import-all.sh** - Automated import script (Mac/Linux)
- **import-all.bat** - Automated import script (Windows)

## 📊 Data Summary

| Content Type | Count | Details |
|--------------|-------|---------|
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
| **TOTAL** | **61** | **Ready to import!** |

## ⚙️ Prerequisites

1. Sanity CLI installed: `npm install -g @sanity/cli`
2. Environment variables configured in `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
3. Logged into Sanity: `sanity login`

## 🎯 After Import

1. **Visit Sanity Studio**: `npm run dev` → `http://localhost:3000/studio`
2. **Upload Images**: Add images to all documents with image fields
3. **Customize Content**: Replace "John Doe" with your actual information
4. **Test Queries**: Use examples from `/Data/GROQ-EXAMPLES.md`

## 📚 Full Documentation

For complete details, see:
- **[Data/README.md](./Data/README.md)** - Full import guide
- **[Data/GROQ-EXAMPLES.md](./Data/GROQ-EXAMPLES.md)** - Query examples
- **[Data/DATA-OVERVIEW.md](./Data/DATA-OVERVIEW.md)** - Content breakdown

## ⚡ One-Line Import (Advanced)

```bash
cd Data && for file in skills.ndjson profile.ndjson education.ndjson experience.ndjson projects.ndjson blog.ndjson services.ndjson achievements.ndjson certifications.ndjson testimonials.ndjson siteSettings.ndjson contact.ndjson; do sanity dataset import $file production --replace; done
```

## 🆘 Troubleshooting

**"Command not found: sanity"**
```bash
npm install -g @sanity/cli
```

**"Unable to find project"**
```bash
# Check your .env.local file has correct values
cat .env.local
```

**"Authentication required"**
```bash
sanity login
```

---

✅ **Ready to go!** Your portfolio will be populated with professional-looking content in minutes.

