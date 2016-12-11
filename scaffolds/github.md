---
title: {{ title }}
layout: github
tags:
gh:
    repo: {{ title }}
    type: get_contents
---
{% set page.content = gh_contents({ path: 'README.md' }) %}