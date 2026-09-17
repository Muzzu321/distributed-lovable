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

## Architecture

The platform follows a distributed microservice architecture with independently
deployable services for authentication, AI orchestration, workspace management,
and code execution.

Client requests enter through the Spring Cloud API Gateway, which handles JWT
authentication and routes requests to the appropriate backend service through
Eureka service discovery.

The Intelligence Service coordinates AI interactions, including LLM requests,
conversation context, and code generation. The Workspace Service manages
projects and generated files, while Kafka provides asynchronous event
communication between services.

PostgreSQL provides persistent storage for service-specific data, MinIO stores
project files and generated artifacts, and Redis provides caching and runtime
state. Kubernetes manages service deployment and isolated workloads used for
application execution.

### Service Components

| Service | Responsibility |
|---|---|
| API Gateway | Request routing, authentication, and service entry point |
| Account Service | User accounts, authentication, subscriptions, and billing |
| Intelligence Service | LLM orchestration, AI context, and code generation |
| Workspace Service | Projects, files, and workspace lifecycle |
| Chat Service | Conversation and chat-session management |
| Execution Service | Application execution and isolated runtime workloads |
| Config Service | Centralized service configuration |
| Discovery Service | Service registration and discovery |

<img width="1200" height="747" alt="Lovable Clone Architecture" src="https://github.com/user-attachments/assets/cdce4336-f220-40fc-b487-f71e141ba57e" />


## AI Code Generation Flow
The application generation workflow is coordinated by the Intelligence Service,
which combines LLM-based generation with project context, chat history, and
retrieval-augmented generation (RAG).

1. The user submits a natural-language prompt through the Spring Cloud API Gateway.
2. The Intelligence Service retrieves relevant conversation and project context.
3. Qdrant performs similarity search over chunked and embedded project code.
4. The LLM uses the retrieved context and available file tools to generate or
   modify application code.
5. Generated file content is published through Kafka and persisted using MinIO.
6. The Workspace Service manages the generated project files and workspace state.
7. The Execution Service creates an isolated Kubernetes workload for the project.
8. The generated application is executed and exposed through a live preview.
9. Server-Sent Events (SSE) stream generation progress and content back to the client.
### Generation & Execution Workflow
<img width="1200" alt="AI Code Generation and Execution Flow" src="https://github.com/user-attachments/assets/27e480f6-77b8-44ac-88cb-2e62f72e6b61" />

## RAG & Codebase Context
The Intelligence Service maintains project-aware context using Qdrant as a
vector store. This allows subsequent prompts to work against the existing
codebase instead of treating each generation request as an isolated interaction.

When project files are created or updated, the codebase is chunked, embedded,
and indexed in Qdrant. During a generation request, the Intelligence Service
performs a similarity search to retrieve relevant project context.

The LLM generation process combines:

- **Project context** retrieved through Qdrant similarity search
- **Conversation history** from the current chat session
- **System instructions** defining the generation behavior
- **Workspace tools** such as `list_files` and `get_file_content`

This allows the model to inspect the current project and generate or modify
files while maintaining context across iterative development requests.

### RAG Pipeline
```text
                    Project Files
                         │
                         ▼
                 Chunk + Embed
                         │
                         ▼
                Qdrant Vector DB
                         │
                         │ Similarity Search
                         ▼
              Relevant Code Context
                         │
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
   Chat History    System Prompt     Workspace Tools
        │                │                │
        └────────────────┼────────────────┘
                         ▼
                Intelligence Service
                         │
                         ▼
                        LLM
                   ┌─────┴─────┐
                   │           │
                   ▼           ▼
              File Tools   Code Generation
                   │           │
                   └─────┬─────┘
                         ▼
              Generated / Updated Files
```
## Data Model & Persistence

The platform uses service-owned PostgreSQL data to persist users, subscriptions,
projects, workspace membership, project files, previews, and chat sessions.

The data model separates account, project, workspace, and conversation concerns
while maintaining relationships between users and the projects they own or
participate in.

Key persistence areas include:

- **Users & Accounts** — user identity, authentication metadata, and account information
- **Subscriptions & Plans** — subscription state, plans, limits, and billing identifiers
- **Projects** — project metadata, ownership, visibility, and lifecycle
- **Project Membership** — workspace/project access and member roles
- **Project Files** — generated files and their MinIO object references
- **Chat Sessions & Messages** — conversation history and LLM interaction data
- **Previews** — generated application preview environments and runtime state
- **Usage Logs** — token usage and AI-generation activity

### Entity Relationship Diagram

<img width="1200" alt="data-model-erd-clear" src="https://github.com/user-attachments/assets/f16db0b5-6dc7-434e-81d0-d7abd6e88ec4" />

## Event-Driven Architecture

The platform uses Apache Kafka for asynchronous communication between services.
File and project updates can be propagated through events without requiring
every downstream operation to be handled synchronously.

The Workspace Service manages project files and publishes file-update events,
while downstream services can consume these events for asynchronous processing.

### Event Flow

```text
Workspace Service
        │
        │ File Update Event
        ▼
    Kafka Topic
        │
        ▼
Intelligence Service
        │
        ▼
Chunking + Embedding
        │
        ▼
Qdrant
```
## Code Execution & Isolation

Generated applications are executed through the Execution Service in isolated
Kubernetes workloads rather than inside the core application services.

The Execution Service manages the runtime environment required to build and
run generated React applications, keeping generated workloads separated from
the platform's backend services.

### Execution Flow

```text
Generated Project
       │
       ▼
Workspace Service
       │
       ▼
      MinIO
       │
       ▼
Execution Service
       │
       ▼
Kubernetes Workload
       │
       ▼
React Application
       │
       ▼
Live Preview
```
## Real-Time AI Streaming

The platform uses Server-Sent Events (SSE) to stream AI generation responses
from the backend to the client in real time.

Instead of waiting for the complete LLM response and generated application to
finish, the client can receive generation output progressively.

### Streaming Flow

```text
User Prompt
     │
     ▼
API Gateway
     │
     ▼
Intelligence Service
     │
     ▼
      LLM
     │
     │ streamed response
     ▼
SSE Connection
     │
     ▼
Client
```
## Authentication & Multi-Tenancy

The platform uses JWT-based authentication and role-based access control (RBAC)
to secure API access and isolate user and project resources.

Authentication is handled at the API Gateway before requests are routed to the
appropriate backend service.

Projects and workspaces maintain ownership and membership information, allowing
access to be controlled according to the user's assigned role.

### Access Flow

```text
Client
  │
  │ JWT
  ▼
API Gateway
  │
  │ Authentication
  ▼
Backend Services
  │
  ├── Account Service
  ├── Workspace Service
  ├── Chat Service
  ├── Intelligence Service
  └── Execution Service
```
## Distributed System Design

The platform uses several architectural patterns and mechanisms to address
the challenges of distributed AI generation, asynchronous processing,
service isolation, and multi-tenant application execution.

| Pattern / Mechanism | Purpose |
|---|---|
| API Gateway | Provides a single entry point for authentication and request routing |
| Service Discovery | Enables dynamic service registration and discovery through Eureka |
| Event-Driven Communication | Decouples asynchronous file and project update processing |
| RAG | Retrieves relevant project context for AI generation |
| Tool Calling | Allows the LLM to inspect the current workspace and project files |
| Server-Sent Events | Streams AI generation output to the client in real time |
| Service-Owned Data | Separates persistent data across service boundaries |
| Object Storage | Stores generated project files and application artifacts |
| Isolated Execution | Runs generated applications in independent Kubernetes workloads |
| RBAC | Controls access to projects and workspace resources |

## Observability

The platform includes observability components for monitoring service behavior
and tracing requests across the distributed architecture.

The observability layer helps track activity across the API Gateway, backend
services, asynchronous Kafka workflows, AI generation, and execution services.

### Observability Stack

- **Prometheus** — collects application and service metrics
- **Grafana** — provides dashboards for monitoring system metrics
- **Zipkin** — provides distributed request tracing across services

The combination of metrics and distributed tracing provides visibility into
request flow and service behavior across the platform.
## Kubernetes Deployment

The platform is deployed as independently managed services within Kubernetes.
Kubernetes also provides the runtime environment for executing generated
applications.

Kubernetes is used for:

- Deploying and managing platform microservices
- Service-to-service communication
- Managing application lifecycle
- Running isolated generated application workloads
- Scaling services independently
- Providing workload isolation for generated applications

The core platform services and generated application workloads are managed
independently, allowing application execution to remain isolated from the
platform's backend services.

