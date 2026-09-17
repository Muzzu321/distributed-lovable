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
vector store. This allows subsequent prompts to operate against the existing
codebase rather than treating every generation request as an isolated prompt.

When project files are created or modified, the file content is processed into
chunks, embedded, and indexed in Qdrant. During a generation request, the
Intelligence Service performs semantic similarity search to retrieve relevant
code context.

The generation workflow combines three sources of context:

- **Project context** retrieved from Qdrant
- **Conversation context** from recent chat history
- **Current workspace state** accessed through file tools

The LLM can use tools such as `list_files` and `get_file_content` to inspect
the current project before generating or modifying files.

### RAG Pipeline

```text
Project Files
      │
      ▼
Chunking + Embedding
      │
      ▼
Qdrant Vector Store
      │
      │ semantic similarity search
      ▼
Relevant Project Context
      │
      ├───────────────┐
      │               │
      ▼               ▼
Chat History     System Prompt
      │               │
      └───────┬───────┘
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
