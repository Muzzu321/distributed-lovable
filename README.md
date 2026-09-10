# 🚀 AI-Driven Code Generation SaaS Platform

### Lovable / v0.dev-style AI Application Builder

> A distributed AI SaaS platform that transforms natural-language prompts into complete React applications, manages project workspaces, and provisions live Kubernetes preview environments.

[![Java](https://img.shields.io/badge/Java-17%2B-orange)](https://www.java.com/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen)](https://spring.io/projects/spring-boot)
[![Spring AI](https://img.shields.io/badge/Spring%20AI-LLM%20Integration-blue)](https://spring.io/projects/spring-ai)
[![React](https://img.shields.io/badge/React-18-61DAFB)](https://react.dev/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Container%20Orchestration-326CE5)](https://kubernetes.io/)
[![Docker](https://img.shields.io/badge/Docker-Containerization-2496ED)](https://www.docker.com/)

---

## 📌 Overview

**Distributed Lovable** is an AI-driven full-stack development platform inspired by products such as **Lovable** and **v0.dev**.

Users can describe an application using natural language:

> **"Build a snake game in React"**

The platform uses AI to generate the application source code, persists the project files, synchronizes them with object/shared storage, launches a Kubernetes preview environment, and exposes the generated application through a dynamic preview URL.

### Core workflow

```text
Natural Language Prompt
          │
          ▼
┌───────────────────────┐
│   AI Code Generation  │
│ Spring AI + OpenRouter│
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│ Structured File Changes│
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│   Project Workspace   │
└───────────┬───────────┘
            │
            ▼
┌────────────────────────────┐
│ PostgreSQL + MinIO + NFS   │
└────────────┬───────────────┘
             │
             ▼
┌────────────────────────────┐
│ Kubernetes Runner Pool     │
│ Node.js + Vite              │
└────────────┬───────────────┘
             │
             ▼
┌────────────────────────────┐
│ Dynamic Preview Proxy       │
└────────────┬───────────────┘
             │
             ▼
       Live React App
