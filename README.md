# Portfolio Website with Admin Dashboard

This is a personal portfolio website with a built-in admin dashboard for easy content management.

## Features

- Responsive design
- Dark/light mode toggle
- Dynamic content loading
- Admin dashboard for content management
- Contact form with EmailJS integration

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with your EmailJS credentials (see `.env.example`)
4. Run the development server: `npm run dev`

## Admin Dashboard

The admin dashboard allows you to manage your portfolio content without editing code:

- **Access**: Navigate to `/admin/login.html` or click the "Admin" link in the footer
- **Default Password**: `admin123` (change this in the admin settings)
- **Features**:
  - Add/edit/delete projects
  - Manage skills and proficiency levels
  - Add work experience
  - Export/import data

## Customization

- Edit `src/style.css` to customize the appearance
- Modify the structure in `index.html`
- Update content through the admin dashboard

## Technologies Used

- HTML5, CSS3, JavaScript
- EmailJS for contact form
- Local Storage for data persistence (can be extended to use a backend)