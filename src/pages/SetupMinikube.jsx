import React from 'react';

const SetupMinikube = () => {
  return (
    <div>
      <div className="content-box">
        <h3>Minikube Setup Overview</h3>
        <p>Minikube is a tool that runs a single-node Kubernetes cluster in a virtual machine on your local machine. It's perfect for learning Kubernetes, daily development work, and testing applications locally.</p>
        <p>Minikube provides a lightweight Kubernetes environment that supports most Kubernetes features, including DNS, NodePorts, ConfigMaps, Secrets, and Ingress.</p>
      </div>

      <div className="content-box">
        <h3>Prerequisites</h3>
        <p>Before installing Minikube, ensure you have:</p>
        <ul>
          <li><strong>Virtualization:</strong> VT-x/AMD-v virtualization must be enabled in BIOS</li>
          <li><strong>Hypervisor:</strong> Docker, Hyper-V, KVM, Parallels, VirtualBox, or VMware</li>
          <li><strong>System:</strong> 2GB free memory, 20GB free disk space</li>
          <li><strong>Network:</strong> Internet connection for downloading images</li>
        </ul>
      </div>

      <div className="content-box">
        <h3>Step 1: Install kubectl</h3>
        <p>Install kubectl command-line tool:</p>
        <pre><code>{`# For Linux/macOS
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl
sudo mv kubectl /usr/local/bin/

# For Windows (using Chocolatey)
choco install kubernetes-cli

# For macOS (using Homebrew)
brew install kubectl`}</code></pre>
      </div>

      <div className="content-box">
        <h3>Step 2: Install Minikube</h3>
        <p>Install Minikube based on your operating system:</p>
        <pre><code>{`# For Linux
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# For macOS
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-amd64
sudo install minikube-darwin-amd64 /usr/local/bin/minikube

# For Windows (using Chocolatey)
choco install minikube

# For Windows (manual)
# Download minikube-windows-amd64.exe and rename to minikube.exe`}</code></pre>
      </div>

      <div className="content-box">
        <h3>Step 3: Start Minikube</h3>
        <p>Start your local Kubernetes cluster:</p>
        <pre><code>{`# Start with default settings
minikube start

# Start with specific driver
minikube start --driver=docker

# Start with more resources
minikube start --cpus=4 --memory=8192 --disk-size=20g

# Start with specific Kubernetes version
minikube start --kubernetes-version=v1.28.0`}</code></pre>
      </div>

      <div className="content-box">
        <h3>Step 4: Verify Installation</h3>
        <p>Check that your cluster is running correctly:</p>
        <pre><code>{`# Check cluster status
minikube status

# Check nodes
kubectl get nodes

# Check all pods in kube-system
kubectl get pods -n kube-system

# Check cluster info
kubectl cluster-info`}</code></pre>
      </div>

      <div className="content-box">
        <h3>Step 5: Enable Add-ons (Optional)</h3>
        <p>Enable useful add-ons for development:</p>
        <pre><code>{`# Enable dashboard
minikube addons enable dashboard

# Enable ingress
minikube addons enable ingress

# Enable metrics server
minikube addons enable metrics-server

# Enable storage provisioner
minikube addons enable storage-provisioner

# List all add-ons
minikube addons list`}</code></pre>
      </div>



      <div className="content-box">
        <h3>Common Commands</h3>
        <p>Essential Minikube commands for daily use:</p>
        <pre><code>{`# Stop cluster
minikube stop

# Delete cluster
minikube delete

# Pause cluster (save resources)
minikube pause

# Unpause cluster
minikube unpause

# SSH into node
minikube ssh

# Open service in browser
minikube service <service-name>

# Get cluster IP
minikube ip`}</code></pre>
      </div>

      <div className="content-box">
        <h3>Troubleshooting</h3>
        <p>Common issues and solutions:</p>
        <ul>
          <li><strong>Virtualization not enabled:</strong> Enable VT-x/AMD-v in BIOS</li>
          <li><strong>Driver issues:</strong> Try different drivers: <code>minikube start --driver=docker</code></li>
          <li><strong>Resource constraints:</strong> Increase memory/CPU: <code>minikube start --memory=4096 --cpus=2</code></li>
          <li><strong>Network issues:</strong> Check firewall and proxy settings</li>
        </ul>
        <p><a className="link" href="https://minikube.sigs.k8s.io/docs/start/" target="_blank" rel="noreferrer">Official Minikube Documentation</a></p>
      </div>
    </div>
  );
};

export default SetupMinikube;
