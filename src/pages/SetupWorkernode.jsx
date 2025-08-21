import React from 'react';

const SetupWorkernode = () => {
  return (
    <div>
      <div className="content-box">
        <h3>Worker Node Setup Overview</h3>
        <p>Worker nodes run your application workloads. After setting up the control plane, you need to add worker nodes to scale your cluster and distribute workloads.</p>
        <p>Worker nodes contain kubelet, kube-proxy, and a container runtime. They communicate with the control plane to receive work assignments and report status.</p>
      </div>

      <div className="content-box">
        <h3>Prerequisites</h3>
        <p>Each worker node must meet the same requirements as the control plane:</p>
        <ul>
          <li><strong>Hardware:</strong> At least 2 CPU cores, 2GB RAM, 20GB disk space</li>
          <li><strong>OS:</strong> Same OS as control plane (Ubuntu 20.04+, CentOS 7+, RHEL 7+)</li>
          <li><strong>Network:</strong> Unique hostname, MAC address, and product_uuid</li>
          <li><strong>Connectivity:</strong> Must be able to reach control plane on port 6443</li>
        </ul>
      </div>

      <div className="content-box">
        <h3>Step 1: Install Container Runtime</h3>
        <p>Install the same container runtime as the control plane:</p>
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
        <p>Install kubelet, kubeadm, and kubectl:</p>
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
        <h3>Step 3: Get Join Command from Control Plane</h3>
        <p>On the control plane node, generate a join token:</p>
        <pre><code>{`# Generate new token (valid for 24 hours)
sudo kubeadm token create --print-join-command

# Example output:
# kubeadm join 192.168.1.100:6443 --token abcdef.1234567890abcdef \
#   --discovery-token-ca-cert-hash sha256:1234567890abcdef...`}</code></pre>
      </div>

      <div className="content-box">
        <h3>Step 4: Join Worker Node to Cluster</h3>
        <p>On the worker node, run the join command from step 3:</p>
        <pre><code>{`# Run the join command (replace with your actual command)
sudo kubeadm join 192.168.1.100:6443 --token abcdef.1234567890abcdef \
  --discovery-token-ca-cert-hash sha256:1234567890abcdef...

# Expected output:
# This node has joined the cluster:
# * Certificate signing request was sent to apiserver and a response was received.
# * The Kubelet was informed of the new secure connection details.`}</code></pre>
      </div>

      <div className="content-box">
        <h3>Step 5: Verify Node Addition</h3>
        <p>On the control plane, verify the worker node joined successfully:</p>
        <pre><code>{`# Check node status
kubectl get nodes

# Check node details
kubectl describe node <worker-node-name>

# Check if node is ready
kubectl get nodes -o wide`}</code></pre>
      </div>

      <div className="content-box">
        <h3>Step 6: Add Node Labels (Optional)</h3>
        <p>Add labels to organize and schedule workloads:</p>
        <pre><code>{`# Add environment label
kubectl label nodes <worker-node-name> environment=production

# Add role label
kubectl label nodes <worker-node-name> role=worker

# Add zone label
kubectl label nodes <worker-node-name> zone=us-west-1

# Verify labels
kubectl get nodes --show-labels`}</code></pre>
      </div>

      <div className="content-box">
        <h3>Troubleshooting</h3>
        <p>Common issues and solutions:</p>
        <ul>
          <li><strong>Token expired:</strong> Generate new token with <code>kubeadm token create</code></li>
          <li><strong>Network connectivity:</strong> Check firewall rules and network connectivity</li>
          <li><strong>Container runtime:</strong> Ensure containerd is running with <code>systemctl status containerd</code></li>
          <li><strong>kubelet issues:</strong> Check logs with <code>journalctl -u kubelet</code></li>
        </ul>
        <p><a className="link" href="https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/#join-nodes" target="_blank" rel="noreferrer">Official kubeadm Join Guide</a></p>
      </div>
    </div>
  );
};

export default SetupWorkernode;
