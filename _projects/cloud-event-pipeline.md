---
title: Cloud Event Pipeline
stack: Go, PostgreSQL, Docker, Terraform, AWS, GitHub Actions
repo: https://github.com/your-github-username/cloud-event-pipeline   # TODO: replace with real repo URL
summary: A REST API in Go, deployed to AWS with a zero-inbound-SSH CI/CD flow.
order: 1
---

- Built a REST API in Go backed by PostgreSQL, containerized with multi-stage Docker builds to minimize image size and attack surface.
- Provisioned all AWS infrastructure with Terraform, including EC2, an IAM role and instance profile scoped to least privilege, and a locked-down security group.
- Designed a zero-inbound-SSH deployment flow: GitHub Actions triggers deploys through AWS SSM Run Command, eliminating direct SSH exposure to the instance entirely.
- Pulled application secrets from AWS SSM Parameter Store at deploy time instead of baking them into images or the CI pipeline.
