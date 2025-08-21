import React from 'react';
import demoImage from '../assets/demo_k8s_assistant.png';

const AIAssistantMCPServer = () => {
  return (
    <div>
      <div className="content-box">
        <h3>🚀 K8s AI Assistant MCP - Overview</h3>
        <p>A comprehensive Kubernetes management solution combining <strong>MCP (Model Context Protocol) Server</strong> and <strong>Rancher UI Extensions</strong> for intelligent, AI-powered Kubernetes cluster management.</p>
        <p>This project integrates two powerful technologies to create a seamless Kubernetes management experience through natural language prompts and visual interfaces.</p>
      </div>

      <div className="content-box">
        <h3>🎯 Key Features</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h4>🤖 MCP Server Features</h4>
            <ul>
              <li>Unified kubectl API - Complete kubectl command support</li>
              <li>AI-powered diagnostics with k8s-diagnose</li>
              <li>Helm operations - Chart management and deployment</li>
              <li>Port forwarding - Secure access to cluster services</li>
              <li>Non-destructive mode - Safe read-only operations</li>
              <li>Secrets masking - Security-focused data handling</li>
            </ul>
          </div>
          <div>
            <h4>🎨 Rancher UI Extensions</h4>
            <ul>
              <li>Visual dashboards - Real-time cluster monitoring</li>
              <li>Resource management UI - Intuitive resource operations</li>
              <li>Custom extensions - Extensible plugin architecture</li>
              <li>Multi-cluster support - Manage multiple clusters</li>
              <li>Role-based access - Secure access control</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="content-box">
        <h3>🔧 MCP Server Components</h3>
        <p>The MCP Server provides AI-powered Kubernetes management through natural language commands and automated operations.</p>
        
        <h4>Available Commands:</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <h5>Resource Management</h5>
            <ul>
              <li><code>kubectl_get</code> - Get resources</li>
              <li><code>kubectl_describe</code> - Describe resources</li>
              <li><code>kubectl_create</code> - Create resources</li>
              <li><code>kubectl_apply</code> - Apply YAML</li>
              <li><code>kubectl_delete</code> - Delete resources</li>
              <li><code>kubectl_scale</code> - Scale deployments</li>
            </ul>
          </div>
          <div>
            <h5>Monitoring & Debugging</h5>
            <ul>
              <li><code>kubectl_logs</code> - View pod logs</li>
              <li><code>port_forward</code> - Secure service access</li>
              <li><code>k8s-diagnose</code> - Automated troubleshooting</li>
              <li><code>install_helm_chart</code> - Helm operations</li>
              <li><code>upgrade_helm_chart</code> - Chart updates</li>
              <li><code>uninstall_helm_chart</code> - Remove charts</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="content-box">
        <h3>🎨 Rancher UI Extensions</h3>
        <p>The Rancher UI Extensions provide visual management interfaces for Kubernetes resources through the Rancher platform.</p>
        
        <h4>Extension Types (from rancher/ui-plugin-examples):</h4>
        <ul>
          <li><strong>Clock Extension:</strong> Real-time cluster time display</li>
          <li><strong>Homepage Extension:</strong> Custom dashboard views</li>
          <li><strong>CRD Extensions:</strong> Custom resource definitions</li>
          <li><strong>Node Driver Extensions:</strong> Cloud provider integrations</li>
          <li><strong>Top-level Product Extensions:</strong> Complete product integrations</li>
        </ul>
      </div>

      <div className="content-box">
        <h3>🔄 How It Works</h3>
        <p>The K8s AI Assistant follows a multi-layered architecture that processes natural language queries through AI analysis and executes Kubernetes operations via MCP protocols.</p>
        <ol>
          <li><strong>User Input:</strong> User asks question in natural language</li>
          <li><strong>AI Analysis:</strong> AI chooses appropriate MCP tool/function</li>
          <li><strong>Function Execution:</strong> Tool reads docs or queries APIs</li>
          <li><strong>Response Synthesis:</strong> AI synthesizes answer with citations</li>
          <li><strong>Visual Feedback:</strong> Results displayed in Rancher UI</li>
        </ol>
      </div>

      <div className="content-box">
        <h3>📸 Demo Screenshots</h3>
        <p>See the K8s AI Assistant in action:</p>
        
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <img 
            src={demoImage} 
            alt="K8s AI Assistant Demo" 
            style={{ 
              maxWidth: '100%',
              border: '1px solid #30363d',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}
          />
          <p className="architecture-image-caption">
            K8s AI Assistant Interface - MCP Server + Rancher UI Integration
          </p>
        </div>
      </div>

      <div className="content-box">
        <h3>🚀 Getting Started</h3>
        <h4>Prerequisites:</h4>
        <ul>
          <li>Kubernetes cluster (local or remote)</li>
          <li>Node.js 18+ and npm/bun</li>
          <li>kubectl configured with cluster access</li>
          <li>Rancher Manager (for UI extensions)</li>
          <li>Ollama server (for AI model)</li>
        </ul>

        <h4>Quick Installation:</h4>
        <pre><code>{`# Clone the repository
git clone https://github.com/Thanhdeptr/K8s_AI_Assistant_MCP.git
cd K8s_AI_Assistant_MCP

# Install MCP Server
cd mcp-server-kubernetes
npm install
npm run build

# Install Rancher UI Extensions
cd ../rancher-ui
npm install`}</code></pre>
      </div>

      <div className="content-box">
        <h3>🔗 Project Links</h3>
        <ul>
          <li><strong>GitHub Repository:</strong> <a className="link" href="https://github.com/Thanhdeptr/K8s_AI_Assistant_MCP" target="_blank" rel="noreferrer">https://github.com/Thanhdeptr/K8s_AI_Assistant_MCP</a></li>
          <li><strong>License:</strong> MIT License</li>
          <li><strong>Stars:</strong> ⭐ 1 star</li>
          <li><strong>Language:</strong> TypeScript (72.0%), Vue (7.6%), JavaScript (5.7%)</li>
        </ul>
      </div>

      <div className="content-box">
        <h3>🛠️ Architecture</h3>
        <p>The K8s AI Assistant follows a multi-layered architecture that processes natural language queries through AI analysis and executes Kubernetes operations via MCP protocols.</p>
        
        <h4>System Components:</h4>
        <ul>
          <li><strong>MCP Server:</strong> AI-powered command interface for Kubernetes operations</li>
          <li><strong>Rancher UI Extensions:</strong> Visual interface extensions for Rancher management platform</li>
          <li><strong>Kubernetes Cluster:</strong> Target cluster for management operations</li>
          <li><strong>AI Model:</strong> Natural language processing and decision making</li>
        </ul>
        
        <h4>Project Structure:</h4>
        <pre><code>{`K8s_AI_Assistant_MCP/
├── mcp-server-kubernetes/     # MCP Server backend
│   ├── src/                   # Source code
│   ├── tests/                 # Unit tests
│   └── dist/                  # Built artifacts
├── rancher-ui/               # Rancher UI extensions
│   ├── pkg/                  # Extension packages
│   ├── charts/               # Helm charts
│   └── assets/               # Extension assets
└── docs/                     # Documentation`}</code></pre>
      </div>

                    <div className="content-box">
         <h3>🔗 Access Rancher UI</h3>
         <p>Access the Rancher management interface to use the K8s AI Assistant features:</p>
         
         <div style={{ 
           margin: '24px 0',
           padding: '32px',
           background: 'linear-gradient(135deg, var(--content-bg) 0%, rgba(31, 111, 235, 0.05) 100%)',
           borderRadius: '16px',
           border: '1px solid var(--border-color)',
           boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
           position: 'relative',
           overflow: 'hidden'
         }}>
           {/* Background decoration */}
           <div style={{
             position: 'absolute',
             top: '-50%',
             right: '-50%',
             width: '200%',
             height: '200%',
             background: 'radial-gradient(circle, rgba(31, 111, 235, 0.03) 0%, transparent 70%)',
             pointerEvents: 'none'
           }} />
           
           <div style={{ position: 'relative', zIndex: 1 }}>
             {/* Header with icon */}
             <div style={{ 
               textAlign: 'center', 
               marginBottom: '32px'
             }}>
               
               <h4 style={{ 
                 margin: '0', 
                 fontSize: '24px', 
                 fontWeight: '700',
                 color: 'var(--text-color)',
                 marginBottom: '8px'
               }}>
                 Quick Access
               </h4>
               <p style={{ 
                 margin: '0', 
                 fontSize: '16px', 
                 color: 'var(--text-muted)',
                 opacity: 0.8
               }}>
                 One-click access with auto-filled credentials
               </p>
             </div>
             
             {/* Credentials Display */}
             <div style={{ 
               display: 'flex',
               gap: '20px',
               marginBottom: '32px',
               justifyContent: 'center'
             }}>
               <div style={{ 
                 flex: '1',
                 maxWidth: '200px',
                 padding: '20px',
                 background: 'var(--sidebar-bg)',
                 borderRadius: '12px',
                 border: '1px solid var(--border-color)',
                 textAlign: 'center',
                 position: 'relative',
                 overflow: 'hidden'
               }}>
                 <div style={{
                   position: 'absolute',
                   top: '0',
                   left: '0',
                   right: '0',
                   height: '3px',
                   background: 'linear-gradient(90deg, #10b981, #3b82f6)'
                 }} />
                 <div style={{ 
                   fontSize: '14px', 
                   fontWeight: '600', 
                   color: 'var(--text-muted)',
                   marginBottom: '8px',
                   textTransform: 'uppercase',
                   letterSpacing: '0.5px'
                 }}>
                   Username
                 </div>
                 <div style={{ 
                   color: 'var(--text-color)',
                   fontFamily: 'monospace',
                   fontSize: '18px',
                   fontWeight: '600',
                   padding: '8px 12px',
                   background: 'var(--content-bg)',
                   borderRadius: '6px',
                   border: '1px solid var(--border-color)'
                 }}>
                   admin2
                 </div>
               </div>
               
               <div style={{ 
                 flex: '1',
                 maxWidth: '200px',
                 padding: '20px',
                 background: 'var(--sidebar-bg)',
                 borderRadius: '12px',
                 border: '1px solid var(--border-color)',
                 textAlign: 'center',
                 position: 'relative',
                 overflow: 'hidden'
               }}>
                 <div style={{
                   position: 'absolute',
                   top: '0',
                   left: '0',
                   right: '0',
                   height: '3px',
                   background: 'linear-gradient(90deg, #f59e0b, #ef4444)'
                 }} />
                 <div style={{ 
                   fontSize: '14px', 
                   fontWeight: '600', 
                   color: 'var(--text-muted)',
                   marginBottom: '8px',
                   textTransform: 'uppercase',
                   letterSpacing: '0.5px'
                 }}>
                   Password
                 </div>
                 <div style={{ 
                   color: 'var(--text-color)',
                   fontFamily: 'monospace',
                   fontSize: '18px',
                   fontWeight: '600',
                   padding: '8px 12px',
                   background: 'var(--content-bg)',
                   borderRadius: '6px',
                   border: '1px solid var(--border-color)'
                 }}>
                   pass123@123
                 </div>
               </div>
             </div>
             
             {/* Access Button */}
             <div style={{ textAlign: 'center', marginBottom: '24px' }}>
               <button 
                 onClick={() => {
                   const newWindow = window.open('https://192.168.10.18:8005/', '_blank');
                   if (newWindow) {
                     setTimeout(() => {
                       try {
                         newWindow.eval(`
                           // Tìm input username - thử nhiều cách khác nhau
                           const usernameInput = document.querySelector('input[type="text"]') || 
                                                document.querySelector('input[name="username"]') ||
                                                document.querySelector('input[placeholder*="username"]') ||
                                                document.querySelector('input[placeholder*="user"]') ||
                                                document.querySelector('label:contains("Username") + input') ||
                                                document.querySelector('input[autocomplete="username"]');
                           
                           // Tìm input password - thử nhiều cách khác nhau  
                           const passwordInput = document.querySelector('input[type="password"]') ||
                                                document.querySelector('input[name="password"]') ||
                                                document.querySelector('input[placeholder*="password"]') ||
                                                document.querySelector('input[placeholder*="pass"]') ||
                                                document.querySelector('label:contains("Password") + input') ||
                                                document.querySelector('input[autocomplete="current-password"]');
                           
                           // Điền thông tin nếu tìm thấy
                           if (usernameInput) {
                             usernameInput.value = 'admin2';
                             usernameInput.dispatchEvent(new Event('input', { bubbles: true }));
                             usernameInput.dispatchEvent(new Event('change', { bubbles: true }));
                             console.log('Username filled successfully');
                           }
                           
                           if (passwordInput) {
                             passwordInput.value = 'pass123@123';
                             passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
                             passwordInput.dispatchEvent(new Event('change', { bubbles: true }));
                             console.log('Password filled successfully');
                           }
                           
                           // Thử tìm và click nút login nếu có
                           setTimeout(() => {
                             const loginBtn = document.querySelector('button[type="submit"]') ||
                                            document.querySelector('input[type="submit"]') ||
                                            document.querySelector('button:contains("Log in")') ||
                                            document.querySelector('button:contains("Login")');
                             if (loginBtn) {
                               loginBtn.click();
                               console.log('Login button clicked');
                             }
                           }, 500);
                         `);
                       } catch (e) {
                         console.log('Auto-fill not possible due to security restrictions:', e.message);
                       }
                     }, 3000);
                   }
                 }}
                 style={{
                   display: 'inline-flex',
                   alignItems: 'center',
                   gap: '12px',
                   padding: '18px 36px',
                   background: 'linear-gradient(135deg, var(--accent-color), var(--accent-hover))',
                   color: 'white',
                   textDecoration: 'none',
                   borderRadius: '12px',
                   fontSize: '18px',
                   fontWeight: '700',
                   transition: 'all 0.3s ease',
                   border: 'none',
                   cursor: 'pointer',
                   boxShadow: '0 8px 24px rgba(31, 111, 235, 0.3)',
                   position: 'relative',
                   overflow: 'hidden'
                 }}
                 onMouseOver={(e) => {
                   e.target.style.transform = 'translateY(-2px)';
                   e.target.style.boxShadow = '0 12px 32px rgba(31, 111, 235, 0.4)';
                 }}
                 onMouseOut={(e) => {
                   e.target.style.transform = 'translateY(0)';
                   e.target.style.boxShadow = '0 8px 24px rgba(31, 111, 235, 0.3)';
                 }}
               >
                 <span style={{ fontSize: '20px' }}>🚀</span>
                 <span>Access Rancher UI</span>
                 <span style={{ fontSize: '16px' }}>→</span>
               </button>
             </div>
             
             {/* Info Section */}
             <div style={{ 
               padding: '16px 20px', 
               background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 197, 253, 0.1))',
               borderRadius: '12px', 
               border: '1px solid rgba(59, 130, 246, 0.2)',
               display: 'flex',
               alignItems: 'center',
               gap: '12px',
               maxWidth: '500px',
               margin: '0 auto'
             }}>
               <div style={{
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 width: '32px',
                 height: '32px',
                 borderRadius: '50%',
                 background: 'rgba(59, 130, 246, 0.2)',
                 flexShrink: 0
               }}>
                 <span style={{ fontSize: '16px' }}>💡</span>
               </div>
               <div>
                 <div style={{ 
                   fontSize: '14px', 
                   fontWeight: '600',
                   color: 'var(--text-color)',
                   marginBottom: '4px'
                 }}>
                 </div>
                 <div style={{ 
                   fontSize: '13px', 
                   color: 'var(--text-muted)',
                   lineHeight: '1.4'
                 }}>
                   If you don't see the AIAssistant feature, please refresh the page.
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
    </div>
  );
};

export default AIAssistantMCPServer;
