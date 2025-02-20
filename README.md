# AI-Powered Task Management System 🤖

![Task Manager Demo](demo.gif)

A modern, AI-enhanced task management system built with React, TypeScript, and Supabase. Features an intelligent task organization system, real-time AI assistant, and intuitive Kanban board interface.

## 🌟 Live Demo

[![Live Demo](https://img.shields.io/badge/Live-Demo-indigo.svg?style=for-the-badge)](https://your-demo-link.com)

## ✨ Features

- 🤖 AI-powered task assistant
- 📊 Interactive dashboard with performance metrics
- 📋 Kanban board for task management
- 🔄 Real-time updates and collaboration
- 🎯 Task prioritization system
- 📱 Fully responsive design
- 🌙 Dark/Light mode support
- 🔐 Secure authentication

## 🛠️ Technologies

<div style="display: flex; gap: 20px; flex-wrap: wrap;">

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.io/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

</div>

### Core Technologies
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui
- **Backend**: Supabase
- **Build Tool**: Vite
- **State Management**: React Context + Hooks
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL (via Supabase)

### UI Components
- **Component Library**: shadcn/ui
- **Icons**: Lucide Icons
- **Animations**: Framer Motion
- **Drag & Drop**: react-beautiful-dnd

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
2. Install dependencies
```cd ai-task-manager
npm install
```
3. Set up environment variables

```cp .env.example .env```
env
```VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key```

4. Start the development server
```npm run dev```

## 🔐 Authentication Flow

1. User signs up/logs in using email
2. Email verification sent for new accounts
3. JWT token stored securely
4. Protected routes and API calls

## 🎯 Key Features Explained

### AI Assistant
- Real-time task suggestions
- Natural language processing
- Context-aware responses
- Task optimization recommendations

### Task Management
- Drag-and-drop Kanban board
- Priority levels (High, Medium, Low)
- Due date tracking
- Progress monitoring

### Performance Analytics
- Task completion rates
- Productivity metrics
- Time tracking
- Progress visualization

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - [GitHub](https://github.com/vaibhavk10/Ai-Task)

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for the beautiful components
- [Supabase](https://supabase.io/) for the backend infrastructure
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
