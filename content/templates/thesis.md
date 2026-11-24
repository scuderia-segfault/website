---
# New thesis or student project. Create a copy with:  npm run new -- thesis <id> "Title"
# The file name is the id and the address: content/theses/<id>.md -> work/<id>.html
title: {{title}}
# Keep `draft: true` until the topic and supervision are confirmed. Drafts are not published.
draft: true
# Position in the list on theses.html: lower numbers come first.
order: 1000
type: Master thesis              # e.g. PhD, Master thesis, Bachelor thesis, Student project
# Open: confirmed and supervised. In progress: someone works on it.
# Topic proposal: to be discussed. Closed: hidden from the overview.
status: Topic proposal
summary: One sentence that describes the topic.
project: aida                    # optional: id of the related project in content/projects/
topics:
  - Autonomous Racing
tasks:
  - First task.
  - Second task.
background:
  - What students should bring.
subject: {{title}}               # subject line of the prepared email
source: https://www.tuwien.at/inf/scuderia-segfault/
sourceLabel: Source material
# contact: someone@tuwien.ac.at  # optional, default: the team address
---

## About

Optional sections in Markdown. Each "## Heading" becomes a section on the topic page.

## Supervision

Supervisor: First Last.
