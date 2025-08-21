import React from 'react';

const ComponentsStorage = () => {
  return (
    <div>
      <div className="content-box">
        <h3>Storage Overview</h3>
        <p>Kubernetes provides a storage abstraction layer that decouples applications from storage implementation details. Persistent storage ensures data survives pod restarts and node failures.</p>
        <p>Key components include PersistentVolumes (PV) that represent storage resources, PersistentVolumeClaims (PVC) that request storage, and StorageClasses that define storage types and provisioning methods. This abstraction allows applications to request storage without knowing the underlying storage infrastructure.</p>
        <p>Docs: <a className="link" href="https://kubernetes.io/docs/concepts/storage/" target="_blank" rel="noreferrer">Storage</a></p>
      </div>

      <div className="content-box">
        <h3>PersistentVolume (PV)</h3>
        <p>PersistentVolume represents a piece of storage in the cluster that has been provisioned by an administrator or dynamically provisioned using StorageClasses. PVs are cluster resources that exist independently of pods.</p>
        <p>Access modes define how the volume can be mounted: ReadWriteOnce (RWO), ReadOnlyMany (ROM), and ReadWriteMany (RWM). Storage capacity and reclaim policy determine how the volume behaves when the PVC is deleted.</p>
        <p><a className="link" href="https://kubernetes.io/docs/concepts/storage/persistent-volumes/" target="_blank" rel="noreferrer">PersistentVolumes</a></p>
        <pre><code>{`apiVersion: v1
kind: PersistentVolume
metadata: { name: pv-demo }
spec:
  capacity: { storage: 5Gi }
  accessModes: ["ReadWriteOnce"]
  hostPath: { path: /data/pv-demo }
  persistentVolumeReclaimPolicy: Retain`}</code></pre>
      </div>

      <div className="content-box">
        <h3>PersistentVolumeClaim (PVC)</h3>
        <p>PersistentVolumeClaim is a request for storage by a user. PVCs consume PV resources and can request specific size and access modes. The Kubernetes control plane finds a PV that matches the PVC's requirements and binds them together.</p>
        <p>PVCs can specify storage classes for dynamic provisioning, and they support volume snapshots for backup and restore operations. Once bound, a PVC can be mounted by pods as a volume, providing persistent storage that survives pod restarts.</p>
        <p><a className="link" href="https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims" target="_blank" rel="noreferrer">PersistentVolumeClaims</a></p>
        <pre><code>{`apiVersion: v1
kind: PersistentVolumeClaim
metadata: { name: pvc-demo }
spec:
  accessModes: ["ReadWriteOnce"]
  resources:
    requests: { storage: 1Gi }
  storageClassName: fast-ssd`}</code></pre>
      </div>
    </div>
  );
};

export default ComponentsStorage;
