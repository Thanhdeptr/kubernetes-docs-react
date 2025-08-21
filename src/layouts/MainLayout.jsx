import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import ChatInterface from '../components/ChatInterface';
import '../App.css';

const MainLayout = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const nav = [
    {
      title: 'Introduction',
      icon: '📘',
      children: [
        { label: 'Overview', path: '/Introduction/overview' },
        { label: 'Architecture', path: '/Introduction/architecture' },
      ],
    },
    {
      title: 'Kubernetes Components',
      icon: '🧩',
      children: [
        { label: 'Workload', path: '/Kubernetes_Components/workload' },
        { label: 'Service', path: '/Kubernetes_Components/service' },
        { label: 'Storage', path: '/Kubernetes_Components/storage' },
        { label: 'Configuration', path: '/Kubernetes_Components/configuration' },
      ],
    },
    {
      title: 'Set Up Cluster',
      icon: '🛠️',
      children: [
        { label: 'Controlplane', path: '/Set_Up_Cluster/controlplane' },
        { label: 'Workernode', path: '/Set_Up_Cluster/workernode' },
        { label: 'Minikube', path: '/Set_Up_Cluster/minikube' },
      ],
    },
    {
      title: 'Rancher UI',
      icon: '🧭',
      children: [
        { label: 'Setup & Add Cluster', path: '/Rancher_UI/setup-and-add-cluster' },
        { label: 'Use UI to apply YAML', path: '/Rancher_UI/use-ui-to-apply-yaml' },
      ],
    },
    {
      title: 'K8s AI Assistant',
      icon: '🤖',
      children: [
        { label: 'AI Assistant Overview', path: '/K8s_AI_Assistant' },
      ],
    },
  ];

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);
  const go = (p) => {
    try { navigate(p); } catch (e) { setError(e.message); }
  };
  const openChat = () => setIsChatOpen(true);
  const closeChat = () => {
    setIsChatOpen(false);
    // Reset easter egg state when closing chat
    // Note: This will be handled by the ChatInterface component itself
  };

  return (
    <div className={`app ${isDarkTheme ? 'dark' : 'light'}`}>
      {/* Left Sidebar */}
      <div className="sidebar">
        {nav.map((group) => (
          <div key={group.title} className="group">
            <div className="group-title">
              <span className="group-icon" aria-hidden>{group.icon}</span>
              <span>{group.title}</span>
            </div>
            {group.children.map((item) => (
              <div
                key={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => go(item.path)}
              >
                {item.label}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="top-bar">
          <h1>KUBERNETES DOCUMENTATION</h1>
          <div className="search-bar">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Ask AI a question..." 
              onClick={openChat}
              readOnly
            />
          </div>
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkTheme ? '🌙' : '☀️'}
          </button>
        </div>

        <div className="content">
          <div className="breadcrumb"></div>
          <h1 className="page-title">{nav.find(g => g.children.some(c => c.path === location.pathname))?.title || ''}</h1>
          <Outlet />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="right-sidebar">
        <h3>On this page</h3>
        <ul className="on-this-page">
          {nav.flatMap(group => group.children).map((item) => (
            <li key={item.path}>
              <a
                href="#"
                className={location.pathname === item.path ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); go(item.path); }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Interface */}
      <ChatInterface isOpen={isChatOpen} onClose={closeChat} />
    </div>
  );
};

export default MainLayout;
