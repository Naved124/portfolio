---
layout: home
title: Home
---

## MD Naved Raja Khan

Computer Science undergraduate (B.Tech, 4th year) with hands-on experience provisioning
and deploying cloud infrastructure on AWS. Comfortable across the stack — writing
Terraform to stand up VPCs, EC2, IAM roles, and EKS clusters; containerizing services
with multi-stage Docker builds; and shipping CI/CD pipelines over GitHub Actions,
including SSH-free deploys via AWS Systems Manager.

Backed by a strong Linux and networking foundation built through independent CTF work
and HackTheBox writeups, which translates into a security-conscious approach to
infrastructure design — least-privilege IAM, no inbound-SSH exposure, secrets kept out
of source control.

**Contact:** [{{ site.email }}](mailto:{{ site.email }}) · {{ site.phone }} ·
[GitHub](https://github.com/{{ site.github_username }}) ·
[LinkedIn]({{ site.linkedin_url }}) · [Blog]({{ site.blog_url }})

---

### Skills

| Category | Tools |
|---|---|
| Cloud (AWS) | EC2, VPC, IAM, EKS, SSM Parameter Store, SSM Run Command |
| IaC & Containers | Terraform, Docker (multi-stage builds), Kubernetes |
| CI/CD | GitHub Actions, GitLab |
| Languages | Go, Python, Bash, JavaScript |
| Databases | PostgreSQL, MongoDB |
| Security Tooling | Nmap, Burp Suite, Wireshark, Metasploit |

---

### Featured Projects

<div class="project-grid">
{% for project in site.projects %}
  <div class="project-card">
    <h3><a href="{{ project.url }}">{{ project.title }}</a></h3>
    <p class="project-stack">{{ project.stack }}</p>
    <p>{{ project.summary }}</p>
  </div>
{% endfor %}
</div>

---

### Achievements & Certifications

- Google Cybersecurity Professional Certificate — Coursera
- Bronze/Silver badges on HackTheBox Seasonal machines, reflecting fast solve times on active-season boxes

### Education

**Prestige Institute of Engineering, Management and Research** — B.Tech, Computer Science and Engineering (2023 – 2027)
