---
# New news post. Create a copy with:  npm run new -- news <id> "Title"
# The file name is the address: content/news/<id>.md -> news/<id>/index.html
title: {{title}}
date: "{{date}}"                 # YYYY-MM-DD; posts with a future date wait until that day (UTC)
# Keep `draft: true` until the post is approved. Drafts are not published.
draft: true
author: Scuderia Segfault
summary: A short introduction for the overview page.
# cover: uploads/your-image.jpg   # optional card image, relative to public/
# repositories:                   # optional list below the article
#   - label: scuderia-segfault/example
#     url: https://github.com/scuderia-segfault/example
#     description: What the repository contains.
---

## What happened?

Add the content here in **Markdown**.

![Describe the image](../../uploads/your-image.jpg)

## Sources

- [Original source](https://www.tuwien.at/inf/scuderia-segfault/)

<!-- Put images in public/uploads/ and use ../../uploads/filename.jpg. Include the photo credit. -->
