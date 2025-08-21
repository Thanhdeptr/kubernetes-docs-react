import React from 'react';
import ingressImage from '../assets/ingress.svg';

const ComponentsService = () => {
  return (
    <div>
      <div className="content-box">
        <h3>Service & Networking Overview</h3>
        <p>Services provide stable network endpoints for pods, enabling communication between applications. They abstract away the dynamic nature of pods and provide load balancing, service discovery, and external access patterns.</p>
        <p>Key concepts include Services (ClusterIP, NodePort, LoadBalancer) for internal/external access, and Ingress for HTTP/HTTPS traffic routing with advanced features like SSL termination, path-based routing, and host-based routing.</p>
        
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <img 
            src={ingressImage} 
            alt="Ingress Traffic Flow" 
            className="architecture-image"
          />
          <p className="architecture-image-caption">
            Ingress Traffic Flow: Client → Ingress → Service → Pods
          </p>
        </div>
        
        <p>Docs: <a className="link" href="https://kubernetes.io/docs/concepts/services-networking/service/" target="_blank" rel="noreferrer">Service</a></p>
      </div>

      <div className="content-box">
        <h3>Service</h3>
        <p>Service provides a stable endpoint for a set of Pods. Types: ClusterIP, NodePort, LoadBalancer, ExternalName.</p>
        <p><a className="link" href="https://kubernetes.io/docs/concepts/services-networking/service/" target="_blank" rel="noreferrer">Service</a></p>
        <pre><code>{`apiVersion: v1
kind: Service
metadata: { name: demo-svc }
spec:
  selector: { app: demo }
  ports:
    - port: 80
      targetPort: 80
  type: ClusterIP`}</code></pre>
      </div>

      <div className="content-box">
        <h3>Ingress</h3>
        <p>Ingress routes external HTTP/HTTPS traffic to Services in the cluster.</p>
        <p>Docs: <a className="link" href="https://kubernetes.io/docs/concepts/services-networking/ingress/" target="_blank" rel="noreferrer">Ingress</a></p>
        <pre><code>{`apiVersion: networking.k8s.io/v1
kind: Ingress
metadata: { name: demo-ingress }
spec:
  rules:
    - host: demo.local
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: demo-svc
                port: { number: 80 }`}</code></pre>

      </div>
    </div>
  );
};

export default ComponentsService;
