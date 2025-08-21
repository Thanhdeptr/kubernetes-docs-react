import React from 'react';

const SetupControlplane = () => {
  return (
    <div>
      <div className="content-box">
        <h3>Control Plane Setup Overview</h3>
        <p>The Kubernetes control plane consists of the API server, etcd, scheduler, and controller manager. Setting up a control plane is the first step in creating a Kubernetes cluster.</p>
        <p>Choose your setup method based on your needs: kubeadm for production clusters, managed services (GKE/AKS/EKS) for cloud environments, or distributions (kOps, Rancher, OpenShift) for enterprise features.</p>
      </div>

      <div className="content-box">
        <h3>Prerequisites</h3>
        <p>Before setting up the control plane, ensure you have:</p>
        <ul>
          <li><strong>Hardware:</strong> At least 2 CPU cores, 2GB RAM, 20GB disk space</li>
          <li><strong>OS:</strong> Ubuntu 20.04+, CentOS 7+, or RHEL 7+</li>
          <li><strong>Network:</strong> Unique hostname, MAC address, and product_uuid</li>
          <li><strong>Ports:</strong> 6443 (API server), 2379-2380 (etcd), 10250 (kubelet), 10251 (scheduler), 10252 (controller manager)</li>
        </ul>
      </div>

      <div className="content-box">
        <h3>Step 1: Install Container Runtime</h3>
        <p>Install containerd (recommended) or Docker:</p>
        <pre><code>{`# Update package index
sudo apt-get update

# Install containerd
sudo apt-get install -y containerd

# Configure containerd
sudo mkdir -p /etc/containerd
containerd config default | sudo tee /etc/containerd/config.toml

# Restart containerd
sudo systemctl restart containerd
sudo systemctl enable containerd`}</code></pre>
      </div>

      <div className="content-box">
        <h3>Step 2: Install Kubernetes Components</h3>
        <p>Add Kubernetes repository and install components:</p>
        <pre><code>{`# Add Kubernetes signing key
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -

# Add Kubernetes repository
echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list

# Update and install
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl

# Hold versions to prevent auto-updates
sudo apt-mark hold kubelet kubeadm kubectl`}</code></pre>
      </div>

      <div className="content-box">
        <h3>Step 3: Initialize Control Plane</h3>
        <p>Initialize the first control plane node:</p>
        <pre><code>{`# Initialize the cluster
sudo kubeadm init --pod-network-cidr=10.244.0.0/16

# Set up kubectl for your user
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# Install CNI (Flannel example)
kubectl apply -f https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml`}</code></pre>
      </div>

      <div className="content-box">
        <h3>Step 4: Verify Installation</h3>
        <p>Check that all control plane components are running:</p>
        <pre><code>{`# Check node status
kubectl get nodes

# Check all pods in kube-system namespace
kubectl get pods -n kube-system

# Check control plane components
kubectl get componentstatuses`}</code></pre>
      </div>

      <div className="content-box">
        <h3>Cloud Managed Kubernetes</h3>
        <p>For cloud environments, use the official Kubernetes documentation for each cloud provider:</p>
        <ul>
          <li><strong>Google Kubernetes Engine (GKE):</strong> <a className="link" href="https://kubernetes.io/docs/setup/production-environment/turnkey/gce/" target="_blank" rel="noreferrer">Official GKE Setup Guide</a></li>
          <li><strong>Azure Kubernetes Service (AKS):</strong> <a className="link" href="https://kubernetes.io/docs/setup/production-environment/turnkey/azure/" target="_blank" rel="noreferrer">Official AKS Setup Guide</a></li>
          <li><strong>Amazon EKS:</strong> <a className="link" href="https://kubernetes.io/docs/setup/production-environment/turnkey/aws/" target="_blank" rel="noreferrer">Official EKS Setup Guide</a></li>
          <li><strong>DigitalOcean:</strong> <a className="link" href="https://kubernetes.io/docs/setup/production-environment/turnkey/digitalocean/" target="_blank" rel="noreferrer">Official DigitalOcean Setup Guide</a></li>
        </ul>
        <p><strong>Note:</strong> Cloud providers handle most of the infrastructure complexity, but you still need to understand Kubernetes concepts and management.</p>
      </div>

      <div className="content-box">
        <h3>Additional Resources</h3>
        <p>For more detailed information and advanced configurations:</p>
        <ul>
          <li><a className="link" href="https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/" target="_blank" rel="noreferrer">kubeadm Production Guide</a></li>
          <li><a className="link" href="https://kubernetes.io/docs/setup/production-environment/" target="_blank" rel="noreferrer">Production Environment Setup</a></li>
          <li><a className="link" href="https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/" target="_blank" rel="noreferrer">Installing kubeadm</a></li>
          <li><a className="link" href="https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/" target="_blank" rel="noreferrer">Creating a Cluster with kubeadm</a></li>
        </ul>
      </div>
    </div>
  );
};

export default SetupControlplane;
