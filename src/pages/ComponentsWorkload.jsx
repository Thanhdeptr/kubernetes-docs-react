import React from 'react';

const ComponentsWorkload = () => {
  return (
    <div>
      <div className="content-box">
        <h3>Workload Overview</h3>
        <p>A workload is an application running on Kubernetes, represented by a set of pods. Pods are the smallest deployable compute objects that contain one or more containers running on your cluster.</p>
        <p>Kubernetes pods have a defined lifecycle and are ephemeral - if a node fails, all pods on that node are lost and need to be recreated. To manage pods efficiently, use workload resources (Deployments, StatefulSets, DaemonSets, Jobs) that configure controllers to maintain the desired state automatically.</p>
        <p>Docs: <a className="link" href="https://kubernetes.io/docs/concepts/workloads/" target="_blank" rel="noreferrer">Workloads</a></p>
      </div>

      <div className="content-box">
        <h3>Pods</h3>
        <p>Smallest deployable unit in Kubernetes. One or more containers that share network and storage.</p>
        <p><a className="link" href="https://kubernetes.io/docs/concepts/workloads/pods/" target="_blank" rel="noreferrer">Pods</a></p>
        <pre><code>{`apiVersion: v1
kind: Pod
metadata: { name: demo-pod }
spec:
  containers:
    - name: app
      image: nginx:stable`}</code></pre>

      </div>

      <div className="content-box">
        <h3>Deployment</h3>
        <p>Declarative updates for Pods and ReplicaSets, with rollout/rollback control.</p>
        <p><a className="link" href="https://kubernetes.io/docs/concepts/workloads/controllers/deployment/" target="_blank" rel="noreferrer">Deployment</a></p>
        <pre><code>{`apiVersion: apps/v1
kind: Deployment
metadata: { name: demo-deploy }
spec:
  replicas: 2
  selector: { matchLabels: { app: demo } }
  template:
    metadata: { labels: { app: demo } }
    spec:
      containers:
        - name: app
          image: nginx:stable`}</code></pre>

      </div>
    </div>
  );
};

export default ComponentsWorkload;
