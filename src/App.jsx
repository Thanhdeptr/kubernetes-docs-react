import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import './App.css';

// Introduction
import IntroOverview from './pages/IntroOverview';
import IntroArchitecture from './pages/IntroArchitecture';

// Kubernetes Components (combined)
import ComponentsWorkload from './pages/ComponentsWorkload';
import ComponentsService from './pages/ComponentsService';
import ComponentsStorage from './pages/ComponentsStorage';
import ComponentsConfiguration from './pages/ComponentsConfiguration';

// Set Up Cluster
import SetupControlplane from './pages/SetupControlplane';
import SetupWorkernode from './pages/SetupWorkernode';
import SetupMinikube from './pages/SetupMinikube';

// Rancher UI
import RancherSetupAddCluster from './pages/RancherSetupAddCluster';
import RancherUsingUI from './pages/RancherUsingUI';

// K8s AI Assistant
import AIAssistantMCPServer from './pages/AIAssistantMCPServer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/Introduction/overview" replace />} />

          {/* Introduction */}
          <Route path="Introduction/overview" element={<IntroOverview />} />
          <Route path="Introduction/architecture" element={<IntroArchitecture />} />

          {/* Kubernetes Components (combined only) */}
          <Route path="Kubernetes_Components/workload" element={<ComponentsWorkload />} />
          <Route path="Kubernetes_Components/service" element={<ComponentsService />} />
          <Route path="Kubernetes_Components/storage" element={<ComponentsStorage />} />
          <Route path="Kubernetes_Components/configuration" element={<ComponentsConfiguration />} />

          {/* Set Up Cluster */}
          <Route path="Set_Up_Cluster/controlplane" element={<SetupControlplane />} />
          <Route path="Set_Up_Cluster/workernode" element={<SetupWorkernode />} />
          <Route path="Set_Up_Cluster/minikube" element={<SetupMinikube />} />

          {/* Rancher UI */}
          <Route path="Rancher_UI/setup-and-add-cluster" element={<RancherSetupAddCluster />} />
          <Route path="Rancher_UI/use-ui-to-apply-yaml" element={<RancherUsingUI />} />

          {/* K8s AI Assistant */}
                             <Route path="K8s_AI_Assistant" element={<AIAssistantMCPServer />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
