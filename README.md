# Lovable Clone

An AI-powered SaaS platform inspired by Lovable/v0.dev that generates complete React applications from natural language prompts.

## Features

- Generate React applications from natural language prompts
- Real-time AI response streaming using SSE
- AI-powered code generation using Spring AI
- Workspace and project management
- RAG-based codebase context using Qdrant
- Codebase chunking, embedding, and similarity search
- File generation and persistence using MinIO
- Code execution in isolated Kubernetes pods
- Live previews for generated applications
- JWT authentication and authorization
- Token quota tracking and subscription plans
- RBAC for multi-tenant SaaS support
- Event-driven communication using Kafka

## Architecture

The platform consists of independent services:

- API Gateway
- Account Service
- Workspace Service
- Intelligence Service
- Chat Service
- Execution Service
- Config Service
- Discovery Service

### Technologies

- Java & Spring Boot
- Spring AI
- Spring Cloud
- Apache Kafka
- Qdrant
- MinIO
- Kubernetes
- Docker
- JWT
- SSE
- NFS

## Architecture Diagram

<img width="1233" height="1275" alt="bf410f01-5f7b-49d1-8a6f-f8c19aa41043" src="https://github.com/user-attachments/assets/cb874c57-53ad-4cab-9fa7-79c08a580a83" />
