import React from 'react';

const ComponentsConfiguration = () => {
  return (
    <div>
      <div className="content-box">
        <h3>Configuration Overview</h3>
        <p>Kubernetes provides mechanisms to externalize configuration from container images, enabling the same image to be used across different environments. This separation of configuration from code follows the twelve-factor app methodology and improves security, portability, and maintainability.</p>
        <p>Key components include ConfigMaps for non-sensitive configuration data and Secrets for sensitive information like passwords, tokens, and keys. Both can be mounted as files, environment variables, or command-line arguments in pods, allowing applications to access configuration without rebuilding images.</p>
        <p>Docs: <a className="link" href="https://kubernetes.io/docs/concepts/configuration/overview/" target="_blank" rel="noreferrer">Configuration</a></p>
      </div>

      <div className="content-box">
        <h3>ConfigMaps</h3>
        <p>ConfigMaps allow you to decouple configuration artifacts from image content to keep containerized applications portable. They store configuration data in key-value pairs and can contain entire configuration files or individual properties.</p>
        <p>ConfigMaps can be consumed in pods as environment variables, command-line arguments, or configuration files in a volume. They support both literal values and file-based data, making them flexible for various application configuration needs. Changes to ConfigMaps can trigger pod restarts when mounted as volumes.</p>
        <p><a className="link" href="https://kubernetes.io/docs/concepts/configuration/configmap/" target="_blank" rel="noreferrer">ConfigMaps</a></p>
        <pre><code>{`apiVersion: v1
kind: ConfigMap
metadata: { name: app-config }
data:
  APP_MODE: production
  LOG_LEVEL: info
  DATABASE_URL: postgresql://db:5432/app`}</code></pre>
      </div>

      <div className="content-box">
        <h3>Secrets</h3>
        <p>Secrets are Kubernetes objects that store sensitive information such as passwords, OAuth tokens, and SSH keys. They provide a more secure way to store and distribute sensitive data than putting it directly in a Pod definition or in a container image.</p>
        <p>Secrets are base64 encoded and can be consumed in pods similar to ConfigMaps. They support different types including Opaque (generic), kubernetes.io/service-account-token, kubernetes.io/dockerconfigjson, and kubernetes.io/tls. For production environments, consider using external secret management solutions like HashiCorp Vault or cloud provider KMS.</p>
        <p><a className="link" href="https://kubernetes.io/docs/concepts/configuration/secret/" target="_blank" rel="noreferrer">Secrets</a></p>
        <pre><code>{`apiVersion: v1
kind: Secret
metadata: { name: db-secret }
type: Opaque
data:
  username: YWRtaW4=
  password: cGFzc3dvcmQ=
  api-key: c2VjcmV0LWtleQ==`}</code></pre>
      </div>
    </div>
  );
};

export default ComponentsConfiguration;
