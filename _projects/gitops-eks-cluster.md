---
title: GitOps EKS Cluster
stack: Terraform, AWS EKS, Kubernetes, ArgoCD, GitLab
repo: https://github.com/your-github-username/gitops-eks-cluster   # TODO: replace with real repo URL
summary: A production-style EKS cluster provisioned with Terraform and managed via GitOps.
order: 2
---

- Provisioned a production-style EKS cluster and custom VPC from scratch using Terraform and the official terraform-aws-modules, with managed node groups for worker capacity.
- Deployed ArgoCD onto the cluster to implement GitOps-style continuous delivery, syncing application manifests directly from a Git repository as the single source of truth.
- Structured infrastructure as modular, reusable Terraform code to keep cluster and networking configuration version-controlled and repeatable.
