# Distributed AI Code Generation Platform

A distributed, Kubernetes-native SaaS platform that uses Large Language Models to generate, modify, and execute complete React applications from natural-language prompts.

The platform is designed around independently deployable microservices for AI orchestration, workspace management, code execution, authentication, billing, and asynchronous event processing.

Users can describe an application in natural language, receive AI-generated source code through a streaming interface, preview the generated application, and iterate on the project through subsequent prompts.

## What It Does

The platform provides an end-to-end workflow for AI-assisted application development:

1. User submits a natural-language application prompt.
2. API Gateway authenticates and routes the request.
3. Intelligence Service orchestrates the LLM interaction and application generation.
4. RAG retrieves relevant project and codebase context from Qdrant.
5. Generated files are persisted through the Workspace Service and MinIO.
6. File updates are propagated asynchronously through Kafka.
7. Execution Service creates isolated Kubernetes workloads for running generated applications.
8. The generated application is exposed through a live preview environment.
9. Chat history and project state are persisted for subsequent iterations.

## Engineering Focus

The system focuses on the distributed-systems problems involved in building an AI code-generation platform:

- Distributed microservice architecture
- LLM orchestration and context management
- Retrieval-Augmented Generation (RAG)
- Real-time streaming with Server-Sent Events (SSE)
- Event-driven communication with Apache Kafka
- Isolated code execution using Kubernetes
- Multi-tenant workspace and project management
- JWT-based authentication and authorization
- Subscription and token-quota management
- Object storage and persistent file management
- Service discovery and centralized configuration
- Distributed tracing and observability
## Key Features

### AI Application Generation

- Generate complete React applications from natural-language prompts
- Stream AI responses and generated content in real time using Server-Sent Events (SSE)
- Use Spring AI to integrate LLM-based code generation
- Maintain conversation context and recent chat history during generation

### Intelligent Codebase Context

- Index generated project files using chunking and embeddings
- Store vector representations in Qdrant
- Perform similarity search to retrieve relevant codebase context
- Use retrieved context to improve subsequent AI-generated code

### Workspace & Project Management

- Manage multiple workspaces and projects
- Create, update, and persist project files
- Store generated files and project artifacts using MinIO
- Publish file-update events through Kafka for asynchronous processing

### Code Execution & Live Preview

- Execute generated applications in isolated Kubernetes workloads
- Create independent execution environments for projects
- Support package installation and application build/runtime execution
- Provide live previews of generated applications

### Authentication & SaaS Controls

- JWT-based authentication and authorization
- Role-based access control (RBAC)
- Multi-tenant workspace isolation
- Subscription and token-quota management
- Account and billing integration

### Distributed System Infrastructure

- Spring Cloud API Gateway for request routing
- Eureka-based service discovery
- Centralized configuration using Config Server
- Kafka-based asynchronous communication
- Redis for caching and runtime state
- PostgreSQL for service-specific persistent data  

## Architecture Diagram

<img width="900" alt="Lovable Clone Architecture" src="https://github.com/user-attachments/assets/cdce4336-f220-40fc-b487-f71e141ba57e" />

<img width="900" alt="Lovable Clone Architecture" src="https://github.com/user-attachments/assets/cb874c57-53ad-4cab-9fa7-79c08a580a83" />
