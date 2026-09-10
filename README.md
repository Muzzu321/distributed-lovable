# 🚀 AI-Driven Code Generation SaaS Platform

### Lovable / v0.dev-style AI Application Builder

> A distributed AI SaaS platform that transforms natural-language prompts into complete React applications, manages project workspaces, and provisions live Kubernetes preview environments.

[![Java](https://img.shields.io/badge/Java-17+-orange)](https://www.java.com/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen)](https://spring.io/projects/spring-boot)
[![Spring AI](https://img.shields.io/badge/Spring%20AI-LLM%20Integration-blue)](https://spring.io/projects/spring-ai)
[![React](https://img.shields.io/badge/React-TypeScript-blue)](https://react.dev/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Container%20Orchestration-326CE5)](https://kubernetes.io/)
[![Docker](https://img.shields.io/badge/Docker-Containerization-2496ED)](https://www.docker.com/)

---

## 📌 Overview

**Distributed Lovable** is an AI-driven full-stack development platform inspired by products such as Lovable and v0.dev.

The platform allows users to describe an application using natural language, for example:

> **"Build a snake game in React"**

The system processes the request through a distributed Spring Boot architecture, uses Spring AI and OpenRouter for code generation, persists the generated project, and provisions an isolated Kubernetes runtime for a live application preview.

The core workflow is:

```text
Natural Language
       ↓
AI Code Generation
       ↓
Structured File Changes
       ↓
Project Workspace
       ↓
Persistent Storage
       ↓
Kubernetes Preview Runner
       ↓
Running React/Vite Application
       ↓
Live Preview
