---
description: Specifies the best practices for building React components within the Next.js 15 App Router structure.
globs: src/app/**/*
alwaysApply: false
---
- Favor React Server Components (RSC) where possible.
- Minimize 'use client' directives.
- Implement proper error boundaries.
- Use Suspense for async operations.
- Optimize for performance and Web Vitals.