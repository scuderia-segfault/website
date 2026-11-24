---
# New project. Create a copy with:  npm run new -- project <id> "Title"
# The file name is the id and the address: content/projects/<id>.md -> projects/<id>.html
# Lines starting with # are comments and can stay or be deleted.
title: {{title}}
# Keep `draft: true` until the text is approved. Drafts are not published.
draft: true
# Position in the project lists: lower numbers come first (existing projects use 10, 20, ...).
order: 1000
subtitle: ""                       # optional, shown under the title; "" for none
period: "{{year}}"                 # e.g. "2026–2029 · FWF P12345" or "2025 · ICRA"
category: Research collection      # used by the category filter
status: Research project           # e.g. Funded project, Team project, Research archive
summary: One or two sentences for the project cards and search results.
# Cover image, relative to public/ (put the file in public/uploads/ or public/media/).
image: uploads/your-image.jpg
imageCaption: Describe what the image shows
imageCredit: Scuderia Segfault
# imageSource: https://example.org/original-image   # optional link instead of the credit
# Names exactly as in content/members/*.yml are linked to the member profile.
people:
  - First Last
# Publications whose title contains one of these words are listed on the project page.
keywords: []
# YouTube ids from content/data/videos.json, e.g. [MX27fhUuLJw]
videos: []
sources:
  - label: Project record
    url: https://example.org/project
# Optional fields (remove the # to use them):
# parentId: aida                    # shows this project as a theme of another project
# associates:
#   - name: Jane Doe
#     url: https://example.org/jane
# repositories:
#   - label: scuderia-segfault/example
#     url: https://github.com/scuderia-segfault/example
#     description: What the repository contains.
# photos:                           # files in public/uploads/
#   - file: your-photo.jpg
#     caption: What the photo shows
# clips:                            # video files in public/uploads/
#   - file: your-video.mp4
#     title: What the video shows
---

Write the project description here in Markdown. Leave an empty line between paragraphs.

A second paragraph. Links look like [this](https://example.org).
