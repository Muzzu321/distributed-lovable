# AI-Driven Code Generation SaaS Platform

### Lovable / v0.dev-style AI Application Builder

Distributed Lovable is an AI-driven SaaS platform that enables users to generate complete React applications from natural-language prompts.

For example:

> "Build a snake game in React"

The platform processes the request through a distributed Spring Boot microservice architecture, uses Spring AI for AI-powered code generation, persists generated project files, and provisions live Kubernetes-based preview environments.

---

## 🚀 Key Capabilities

- 🤖 Generate complete React applications from natural-language prompts
- ⚡ Stream AI-generated responses in real time using Server-Sent Events (SSE)
- 💾 Persist generated source code using MinIO and NFS shared volumes
- ☸️ Provision auto-updating Kubernetes build and preview pods
- 🌐 Provide live previews through Kubernetes Ingress
- 👥 Support multi-tenant SaaS workflows
- 🎟️ Track token quotas and subscription plans
- 🔐 Provide role-based access control (RBAC)
- 📈 Scale horizontally using Kubernetes infrastructure

---

## 📊 Performance & Scalability

The platform was evaluated through instructor-led performance and scalability testing and demonstrated:

| Metric | Result |
|---|---:|
| Concurrent streaming sessions | **10K+** |
| Token streaming latency | **<200 ms** |
| Preview cold-start time | **<2 seconds** |
| Stream reliability | **99.9%** |
| Code-generation capacity | **50K+ requests/day** |
| Throughput scaling | **Linear** |

These results represent the performance targets and test results provided from the platform's instructor-led evaluation.

---

# 🏗️ Architecture

The platform follows a distributed microservice architecture built around Spring Boot and Spring Cloud.

```text
                         ┌─────────────────────────┐
                         │     React Frontend      │
                         │    project-companion    │
                         │                         │
                         │ React + TypeScript      │
                         │ Vite + Tailwind CSS     │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │      API Gateway        │
                         │   Spring Cloud Gateway  │
                         └────────────┬────────────┘
                                      │
             ┌────────────────────────┼────────────────────────┐
             │                        │                        │
             ▼                        ▼                        ▼
    ┌─────────────────┐      ┌─────────────────┐      ┌──────────────────┐
    │ Account Service  │      │ Workspace       │      │ Intelligence     │
    │                  │      │ Service         │      │ Service          │
    │ Authentication   │      │ Projects        │      │ AI Generation    │
    │ Authorization    │      │ Workspaces      │      │ File Editing     │
    └─────────────────┘      │ Preview Mgmt    │      │ Project Context  │
                             └────────┬────────┘      └────────┬─────────┘
                                      │                        │
                                      │                        ▼
                                      │                ┌─────────────────┐
                                      │                │ Spring AI       │
                                      │                │ + OpenRouter    │
                                      │                └─────────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │ Kubernetes Runner Pool  │
                         │                         │
                         │ Project Preview Pods    │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │      Vite / React       │
                         │       :5173             │
                         │                         │
                         │ Generated Application   │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │      Redis Routing      │
                         │                         │
                         │ hostname → runner IP    │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │     Preview Proxy       │
                         │                         │
                         │ Dynamic Project Routing │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │      NGINX Ingress      │
                         └─────────────────────────┘


                 Supporting Infrastructure
        ┌───────────────────────────────────────────────┐
        │                                               │
        │ Eureka       → Service Discovery              │
        │ Config       → Centralized Configuration      │
        │ PostgreSQL   → Persistent Application Data    │
        │ pgvector     → Vector Storage                 │
        │ Kafka        → Event / Messaging              │
        │ Redis        → Preview Routing                │
        │ MinIO        → Project Object Storage         │
        │ NFS          → Shared Project Volumes         │
        │                                               │
        └───────────────────────────────────────────────┘
