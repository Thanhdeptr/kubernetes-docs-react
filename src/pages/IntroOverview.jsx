import React from 'react';

const IntroOverview = () => {
  return (
    <div>
      {/* Hero */}
      <div className="content-box">
        <h1 className="hero-title">Kubernetes Documentation</h1>
        <p>
          This guide walks you through using Kubernetes (K8s) from planning and cluster setup to
          day‑to‑day operations. The goal is to help you progressively master modern cloud‑native
          practices: deployment, scaling, testing, logging, and resilient operations.
        </p>
      </div>

      {/* About */}
      <div className="content-box">
        <h3>About Kubernetes</h3>
        <p>
          Kubernetes is an open‑source system for automating deployment, scaling, and management of
          containerized applications. It provides service discovery, self‑healing, rollouts/rollbacks,
          and portability across cloud and on‑prem environments.
        </p>
        <p className="note">
          * This document is intended to help you customize Kubernetes usage for your team. For the
          full feature set, please read the original documentation.
        </p>
        <div className="cta-row">
          <a className="btn btn-primary" href="/Set_Up_Cluster/minikube">Get Started</a>
          <a
            className="btn btn-secondary"
            href="https://kubernetes.io/docs/home/"
            target="_blank"
            rel="noreferrer"
          >
            Read Official Docs
          </a>
        </div>
      </div>

      {/* Why use Kubernetes */}
      <div className="content-box">
        <h3>Why Kubernetes?</h3>
        <ul>
          <li>Declarative deployments and automated rollouts/rollbacks</li>
          <li>Self‑healing (restarts, rescheduling, health checks)</li>
          <li>Horizontal scaling and built‑in service discovery</li>
          <li>Portable across clouds and on‑prem</li>
        </ul>
      </div>
    </div>
  );
};

export default IntroOverview;
