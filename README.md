# Palate 🍽️

An AI-powered restaurant menu analyzer that provides personalized recommendations based on your preferences, dietary restrictions, allergies, and past favorites.

## Features

- 🤖 **AI Menu Analysis**: Upload any restaurant menu and get instant intelligent analysis
- ❤️ **Personal Preferences**: Learn your taste profile for perfect recommendations  
- 🛡️ **Safety First**: Automatic allergy and dietary restriction checking
- ⭐ **Smart Suggestions**: Get alternatives and similar dishes you'll love
- 📱 **Beautiful UI**: Built with Headless UI and Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Headless UI for accessibility
- **Icons**: Heroicons
- **Database**: Supabase
- **Deployment**: Vercel
- **AI/ML**: (Coming soon)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Vercel account (for deployment)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/palate.git
cd palate
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your `.env.local` with Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
DATABASE_URL=your_supabase_database_url
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) to see the app.

## Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Update your `.env.local` file with the credentials
4. (Database schema will be added as we build features)

## Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Add your environment variables in Vercel dashboard
3. Deploy automatically on every push to main

## Development Roadmap

- [ ] User authentication and profiles
- [ ] Menu upload and OCR processing  
- [ ] AI recommendation engine
- [ ] Preference learning system
- [ ] Restaurant database integration
- [ ] Mobile app version

## Contributing

This project is in early development. Features and architecture may change rapidly.

## License

MIT License - feel free to use this project as inspiration for your own AI-powered food apps!
