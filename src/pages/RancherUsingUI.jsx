import React from 'react';
import rancherUIVideo from '../assets/add_component_with_rancher.mp4';

const RancherUsingUI = () => {
  return (
    <div>
      <div className="content-box">
        <h3>Rancher UI - Component Management Overview</h3>
        <p>Rancher provides multiple ways to create and manage Kubernetes components: through the traditional CLI approach and through the user-friendly web interface. Both methods offer advantages depending on your workflow and expertise level.</p>
        <p>The UI approach is particularly useful for beginners, quick deployments, and visual verification, while CLI remains powerful for automation, scripting, and advanced users.</p>
      </div>

      <div className="content-box">
        <h3>Method 1: Traditional CLI Approach</h3>
        <p>Using kubectl commands directly from your terminal:</p>
        
        <h4>Create Namespace</h4>
        <pre><code>{`# Create namespace
kubectl create namespace my-app

# Or using YAML file
kubectl apply -f - <<EOF
apiVersion: v1
kind: Namespace
metadata:
  name: my-app
EOF`}</code></pre>

        <h4>Create Deployment</h4>
        <pre><code>{`# Create deployment using kubectl
kubectl create deployment nginx --image=nginx:latest -n my-app

# Or using YAML file
kubectl apply -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
EOF`}</code></pre>

        <h4>Create Service</h4>
        <pre><code>{`# Create service
kubectl expose deployment nginx-deployment --port=80 --target-port=80 --type=NodePort -n my-app

# Or using YAML file
kubectl apply -f - <<EOF
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
  namespace: my-app
spec:
  selector:
    app: nginx
  ports:
  - port: 80
    targetPort: 80
    nodePort: 30080
  type: NodePort
EOF`}</code></pre>

        <h4>Create ConfigMap</h4>
        <pre><code>{`# Create configmap from file
kubectl create configmap app-config --from-file=config.properties -n my-app

# Or using YAML file
kubectl apply -f - <<EOF
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: my-app
data:
  database_url: "mysql://localhost:3306/mydb"
  api_key: "your-api-key"
EOF`}</code></pre>
      </div>

      <div className="content-box">
        <h3>Method 2: Rancher UI Approach</h3>
        <p>Using Rancher's web interface for visual component creation:</p>
        
        <h4>Step 1: Navigate to Cluster</h4>
        <ol>
          <li>Login to Rancher UI</li>
          <li>Select your cluster from the cluster list</li>
          <li>Click on "Projects/Namespaces" in the left sidebar</li>
        </ol>

        <h4>Step 2: Create Namespace</h4>
        <ol>
          <li>Click "Add Namespace" button</li>
          <li>Enter namespace name (e.g., "my-app")</li>
          <li>Set resource quotas if needed</li>
          <li>Click "Create"</li>
        </ol>

        <h4>Step 3: Create Workload</h4>
        <ol>
          <li>Navigate to "Workloads" → "Deployments"</li>
          <li>Click "Deploy" button</li>
          <li>Fill in the form:
            <ul>
              <li><strong>Name:</strong> nginx-deployment</li>
              <li><strong>Namespace:</strong> my-app</li>
              <li><strong>Replicas:</strong> 3</li>
              <li><strong>Container Image:</strong> nginx:latest</li>
              <li><strong>Port:</strong> 80</li>
            </ul>
          </li>
          <li>Click "Launch"</li>
        </ol>

        <h4>Step 4: Create Service</h4>
        <ol>
          <li>Navigate to "Service Discovery" → "Services"</li>
          <li>Click "Add Service"</li>
          <li>Select "Node Port" service type</li>
          <li>Configure:
            <ul>
              <li><strong>Name:</strong> nginx-service</li>
              <li><strong>Target Workload:</strong> nginx-deployment</li>
              <li><strong>Port:</strong> 80</li>
              <li><strong>Target Port:</strong> 80</li>
            </ul>
          </li>
          <li>Click "Create"</li>
        </ol>
      </div>

      <div className="content-box">
        <h3>Video Tutorial: Adding Components via Rancher UI</h3>
        <p>Watch this video to see the complete process of creating components using Rancher's web interface:</p>
        
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <video 
            controls 
            width="100%" 
            style={{ 
              maxWidth: '800px',
              border: '1px solid #30363d',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            <source src={rancherUIVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="architecture-image-caption">
            Complete Guide: Adding Components via Rancher UI
          </p>
        </div>
      </div>

      <div className="content-box">
        <h3>Advanced UI Features</h3>
        <p>Rancher UI provides advanced features for component management:</p>
        
        <h4>YAML Editor</h4>
        <ul>
          <li><strong>Import YAML:</strong> Paste or upload YAML files directly</li>
          <li><strong>Edit in Place:</strong> Modify YAML with syntax highlighting</li>
          <li><strong>Validation:</strong> Real-time YAML validation</li>
          <li><strong>Version Control:</strong> Track changes and rollback</li>
        </ul>

        <h4>Multi-Cluster Management</h4>
        <ul>
          <li><strong>Cross-Cluster Deployment:</strong> Deploy to multiple clusters</li>
          <li><strong>Template Management:</strong> Save and reuse deployment templates</li>
          <li><strong>Environment Promotion:</strong> Promote deployments across environments</li>
        </ul>

        <h4>Monitoring and Logs</h4>
        <ul>
          <li><strong>Real-time Logs:</strong> View container logs in real-time</li>
          <li><strong>Metrics Dashboard:</strong> CPU, memory, and network metrics</li>
          <li><strong>Event History:</strong> Track all cluster events</li>
          <li><strong>Health Checks:</strong> Monitor pod health and readiness</li>
        </ul>
      </div>

      <div className="content-box">
        <h3>Comparison: CLI vs UI</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h4>CLI Advantages</h4>
            <ul>
              <li>✅ Faster for experienced users</li>
              <li>✅ Scriptable and automatable</li>
              <li>✅ Version control friendly</li>
              <li>✅ Works offline</li>
              <li>✅ More precise control</li>
            </ul>
          </div>
          <div>
            <h4>UI Advantages</h4>
            <ul>
              <li>✅ Beginner friendly</li>
              <li>✅ Visual feedback</li>
              <li>✅ No command memorization</li>
              <li>✅ Built-in validation</li>
              <li>✅ Real-time monitoring</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="content-box">
        <h3>Best Practices</h3>
        <ul>
          <li><strong>Use UI for:</strong> Learning, quick deployments, troubleshooting</li>
          <li><strong>Use CLI for:</strong> Automation, CI/CD pipelines, bulk operations</li>
          <li><strong>Version Control:</strong> Always store YAML files in Git</li>
          <li><strong>Documentation:</strong> Document your deployment procedures</li>
          <li><strong>Testing:</strong> Test deployments in staging first</li>
        </ul>
        <p><a className="link" href="https://ranchermanager.docs.rancher.com/how-to-guides/new-user-guides/manage-clusters/projects-and-namespaces" target="_blank" rel="noreferrer">Official Rancher Documentation</a></p>
      </div>
    </div>
  );
};

export default RancherUsingUI;
