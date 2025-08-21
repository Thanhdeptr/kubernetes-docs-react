# Kubernetes Documentation React App

A comprehensive React-based documentation application for Kubernetes concepts, components, and deployment guides.

## Features

- **Interactive Documentation**: Browse through Kubernetes concepts with an intuitive interface
- **AI Assistant Integration**: Built-in AI assistant for Kubernetes-related queries
- **Component Guides**: Detailed guides for Kubernetes components (Control Plane, Worker Nodes, etc.)
- **Deployment Instructions**: Step-by-step setup guides for various Kubernetes environments
- **Rancher Integration**: Guides for using Rancher with Kubernetes
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: CSS3 with modern design patterns
- **Build Tool**: Vite for fast development and optimized builds
- **Deployment**: Docker containerization with Nginx

## Project Structure

```
kubernetes-docs-react/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page components and routing
│   ├── layouts/            # Layout components
│   ├── assets/             # Static assets (images, videos)
│   └── utils/              # Utility functions
├── public/                 # Public assets
├── docker-compose.yml      # Docker development setup
├── Dockerfile              # Production Docker configuration
└── nginx.conf              # Nginx configuration
```

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Docker (optional, for containerized deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kubernetes-docs-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

### Docker Deployment

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Production deployment**
   ```bash
   docker-compose -f docker-compose.prod.yml up --build
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to production (Windows)
- `./deploy.sh` - Deploy to production (Linux/Mac)

## Documentation Sections

1. **Introduction**
   - Kubernetes Overview
   - Architecture Overview

2. **Components**
   - Control Plane Components
   - Worker Node Components
   - Storage Components
   - Service Components

3. **Setup Guides**
   - Minikube Setup
   - Control Plane Setup
   - Worker Node Setup

4. **Rancher Integration**
   - Adding Clusters to Rancher
   - Using Rancher UI

5. **AI Assistant**
   - MCP Server Setup
   - Plugin Configuration
   - Use Cases

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions and support, please open an issue in the GitHub repository.
