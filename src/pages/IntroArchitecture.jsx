import React from 'react';
import componentsImage from '../assets/components-of-kubernetes.svg';

const IntroArchitecture = () => {
  return (
    <div>
      <div className="content-box">
        <h3>Kubernetes Architecture Overview</h3>
        <p>Kubernetes follows a client-server architecture with two main types of components:</p>
        <ul>
          <li><strong>Control Plane Components:</strong> Manage the overall state of the cluster</li>
          <li><strong>Node Components:</strong> Run on every node, maintaining running pods and providing the Kubernetes runtime environment</li>
        </ul>
        
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <img 
            src={componentsImage} 
            alt="Kubernetes Components Architecture" 
            className="architecture-image"
          />
          <p className="architecture-image-caption">
            Kubernetes Architecture Components
          </p>
        </div>
        
        <p>
          Official docs: <a className="link" href="https://kubernetes.io/docs/concepts/overview/components/" target="_blank" rel="noreferrer">Kubernetes Components</a>
        </p>
        
      </div>

      <div className="content-box">
        <h3>Control Plane Components</h3>
        <p>Manage the overall state of the cluster:</p>
        
        <h4>kube-apiserver</h4>
        <p>The core component server that exposes the Kubernetes HTTP API. All communication between components goes through the API server.</p>
        
        <h4>etcd</h4>
        <p>Consistent and highly-available key value store for all API server data. The source of truth for cluster state.</p>
        
        <h4>kube-scheduler</h4>
        <p>Looks for Pods not yet bound to a node, and assigns each Pod to a suitable node based on resource requirements, hardware/software constraints, and scheduling policies.</p>
        
        <h4>kube-controller-manager</h4>
        <p>Runs controllers to implement Kubernetes API behavior. Controllers include Node Controller, Replication Controller, Endpoints Controller, and Service Account & Token Controllers.</p>
        
        <h4>cloud-controller-manager (optional)</h4>
        <p>Integrates with underlying cloud provider(s) to manage cloud-specific resources like load balancers, storage, and networking.</p>
        
      </div>

      <div className="content-box">
        <h3>Node Components</h3>
        <p>Run on every node, maintaining running pods and providing the Kubernetes runtime environment:</p>
        
        <h4>kubelet</h4>
        <p>Ensures that Pods are running, including their containers. The primary node agent that manages the lifecycle of pods on the node.</p>
        
        <h4>kube-proxy (optional)</h4>
        <p>Maintains network rules on nodes to implement Services. Handles network communication between pods and services.</p>
        
        <h4>Container runtime</h4>
        <p>Software responsible for running containers. Common runtimes include containerd, CRI-O, and Docker. Read <a className="link" href="https://kubernetes.io/docs/setup/production-environment/container-runtimes/" target="_blank" rel="noreferrer">Container Runtimes</a> to learn more.</p>
      </div>

    </div>
  );
};

export default IntroArchitecture;
