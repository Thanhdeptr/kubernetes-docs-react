import React from 'react';

const Sidebar = ({ navigationItems, currentPath, onNavClick }) => {
  return (
    <div className="sidebar">
      <h2>Documentation</h2>
      
      {navigationItems.map((item) => (
        <div key={item.title}>
          <div 
            className={`nav-item ${currentPath === item.path ? 'active' : ''}`}
            onClick={() => onNavClick(item.path)}
            style={{ cursor: 'pointer' }}
          >
            {item.title}
          </div>
          {item.subsections.map((subsection) => (
            <div 
              key={subsection}
              className="nav-subitem"
              style={{ cursor: 'pointer' }}
            >
              {subsection}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
