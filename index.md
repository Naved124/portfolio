---
title: Home
---

<section class="hero">
  <h1>MD Naved Raja Khan</h1>
  <p class="role">cloud &amp; devops engineer, in progress</p>
  <p class="lede">
    Computer Science undergraduate (B.Tech, 4th year) provisioning and deploying
    cloud infrastructure on AWS — Terraform for VPCs, EC2, IAM, and EKS; multi-stage
    Docker builds; CI/CD over GitHub Actions, including SSH-free deploys via AWS
    Systems Manager. A Linux and networking foundation from independent CTF work
    shapes a security-conscious approach: least-privilege IAM, no inbound SSH,
    secrets kept out of source control.
  </p>
  <p class="contact-row">
    <a href="mailto:{{ site.email }}">{{ site.email }}</a>
    <a href="tel:{{ site.phone | replace: ' ', '' }}">{{ site.phone }}</a>
    <a href="https://github.com/{{ site.github_username }}">github</a>
    <a href="{{ site.linkedin_url }}">linkedin</a>
    <a href="{{ site.blog_url }}">blog</a>
  </p>
</section>

<section id="capabilities">
  <h2 class="section-head">capabilities</h2>

  <div class="cap-row">
    <span class="cap-label">cloud (aws)</span>
    <span class="cap-items">
      <span class="chip">EC2</span><span class="chip">VPC</span><span class="chip">IAM</span>
      <span class="chip">EKS</span><span class="chip">SSM Parameter Store</span><span class="chip">SSM Run Command</span>
    </span>
  </div>
  <div class="cap-row">
    <span class="cap-label">iac &amp; containers</span>
    <span class="cap-items">
      <span class="chip">Terraform</span><span class="chip">Docker</span><span class="chip">Kubernetes</span>
    </span>
  </div>
  <div class="cap-row">
    <span class="cap-label">ci/cd</span>
    <span class="cap-items">
      <span class="chip">GitHub Actions</span><span class="chip">GitLab</span>
    </span>
  </div>
  <div class="cap-row">
    <span class="cap-label">languages</span>
    <span class="cap-items">
      <span class="chip">Go</span><span class="chip">Python</span><span class="chip">Bash</span>
    </span>
  </div>
  <div class="cap-row">
    <span class="cap-label">databases</span>
    <span class="cap-items">
      <span class="chip">PostgreSQL</span><span class="chip">MongoDB</span>
    </span>
  </div>
  <div class="cap-row">
    <span class="cap-label">security tooling</span>
    <span class="cap-items">
      <span class="chip">Nmap</span><span class="chip">Burp Suite</span><span class="chip">Wireshark</span><span class="chip">Metasploit</span>
    </span>
  </div>
</section>

<section id="work">
  <h2 class="section-head">selected work</h2>

  {% assign sorted_projects = site.projects | sort: "order" %}
  {% for project in sorted_projects %}
  <a class="proj-row" href="{{ project.url | relative_url }}">
    <div class="proj-head">
      <span class="proj-title"><span class="proj-num">{{ forloop.index | prepend: "0" | slice: -2, 2 }}</span>{{ project.title }}</span>
      <span class="proj-stack">{{ project.stack }}</span>
    </div>
    <p class="proj-summary">{{ project.summary }}</p>
    <div class="proj-link-line">
      <span>view repository</span>
      <span class="leader"></span>
    </div>
  </a>
  {% endfor %}
</section>

<section id="notes">
  <h2 class="section-head">notes</h2>
  <ul class="note-list">
    <li>Google Cybersecurity Professional Certificate — Coursera</li>
    <li>Bronze/Silver badges on HackTheBox Seasonal machines, reflecting fast solve times on active-season boxes</li>
  </ul>
  <div class="edu-block">
    <strong>Prestige Institute of Engineering, Management and Research</strong><br>
    B.Tech, Computer Science and Engineering · 2023 – 2027
  </div>
</section>
