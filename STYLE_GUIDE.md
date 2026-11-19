# Copy style guide (modelled on AMZ Racing)

Reference: amzracing.ch/en (home, about-us, recruiting, sponsors, research, cars), read 2026-11-19.
Use AMZ's *patterns*, not their sentences. Never copy their slogans verbatim
("Where Student Engineers Build Champions", "Don't Limit Your Challenges…" etc.).
Only state facts that are verified in `content/data/*` (results, years, people).

## 1. Voice in one line

Proud, energetic, optimistic and welcoming. Plain about *who we are*, big about *what we aim for*,
grateful to partners, and direct with students ("you"). No irony, no noir fragments, no clichés.

## 2. Headline patterns

| Pattern | AMZ example | Scuderia Segfault use |
|---|---|---|
| **Name: claim** | "AMZ Racing: Where Student Engineers Build Champions" | "Scuderia Segfault: Autonomous Racing from TU Wien" |
| **Name: Where X Meets Y** | "AMZ Racing: Where Innovation Meets Passion" | "Scuderia Segfault: Where Research Meets the Race Track" |
| **Gerund + object** | "Conquering the Race Track", "Driving Success with Generous Sponsorship" | "Racing Autonomy Around the World", "Driving Research with Our Partners" |
| **Gerund: subtitle** | "Revving Up Innovation: Exploring the World of Formula Student" | "Pushing the Line: Exploring the World of RoboRacer" |
| **Inspiring Through X** | "Inspiring Through Electric and Autonomous Racing" | "Inspiring Through Autonomous Racing and Research" |
| **Discover the World of …** | "Discover the World of AMZ Racing" | "Discover the World of Scuderia Segfault" |
| **Stay Updated …!** | "Stay Updated with Our Latest News!" | "Stay Updated with Our Latest News!" (generic, fine to reuse) |
| **Chiasmus (use once, max)** | "Don't Limit Your Challenges. Challenge Your Limits." | write our own; do not reuse theirs |

Rules: headlines in **Title Case**; colon to pair a theme with a payoff; one idea per headline.

## 3. Page building blocks

1. **Section label** in CAPS, short noun: `ABOUT US`, `OUR TEAM`, `OUR RACE CARS`, `NEWS`, `RESEARCH`.
2. **Title Case headline** (patterns above).
3. **One plain sentence** of description.
4. **CAPS action button**, verb-first: `LEARN MORE`, `MEET OUR TEAM`, `GET STARTED`, `TO THE GARAGE`, `TO THE TEAM`.

## 4. Self-description formula

> AMZ: engineering students who design, build, and race a single-seat car in Formula Student.
> Pushing limits to produce a winning machine and compete against 100+ universities.

Formula: **Name: [who] who [verb], [verb], and [verb] [what] in/at [competition].** + one gerund line with the ambition.
Ours: "Scuderia Segfault: students and researchers at TU Wien who build, program, and race autonomous cars at RoboRacer competitions around the world."

## 5. Numbers up front

AMZ shows stat counters near the top: *Founded in*, *Years of experience*, *World record holders since*;
car pages use spec cards: *Output*, *Top Speed*, *Acceleration*, *Weight*.
Ours (verified): **OUR RACE RECORD · 3 × 1ST PLACE · 2 × 2ND PLACE · 1 × 3RD PLACE · 2 × 4TH PLACE**. Counts come from the race table in `scripts/build-site.mjs`; update when results change.

## 6. One-line cards (gerund-led)

AMZ About cards: "Pushing Limits in Electric Racing and Inspiring Young Minds." / "Pioneering Autonomous Racing and Building Electric Race Cars since 2010." / "Offering Active and Passive Membership for Students and Alumni." / "Welcoming Enthusiastic Young Engineers from Swiss Universities."

Use for mission / history / organisation / participation cards. Start with a gerund, end with the audience or a date.

## 7. Recruiting voice

- Opening question to the reader: "You are a student …, willing to learn … and fascinated by motorsports?"
- Imperatives with energy: "Join our driverless team!", "Dive deep into …", "Be the eyes of our autonomous race car!", "Push the limits of racing technology from behind the screen!"
- Every role matters: "Every team member … is essential to achieving our goal."
- Open door: "We welcome students from all disciplines and backgrounds to apply!"
- Close with motivation: "If you're motivated and ready to grow beyond your limits, we want you on our team!"
- Exclamation marks are fine **here and in news**, not in research or sponsor copy.

## 8. Sponsor voice

Gratitude + necessity: "Driving Success with Generous Sponsorship" / "In order to carry out a project such as …, a big amount of financial and material support is needed."
Group partners in named tiers when we have them (AMZ: Main, Premium, Sponsors, Favourers, Patrons). Don't invent tiers or commitments.

## 9. Navigation micro-copy

Short verb phrase under each menu item: "Discover our story and mission", "Stay up-to-date with our racing world", "Reach out to us easily", "Learn more about our latest research".

## 10. Word bank

**Use:** push the limits · passion / passionate · inspire · young engineers / young minds · enthusiastic · innovative · cutting-edge · excellence · pioneering · conquering · driving success · generous · dive into · essential · backbone · winning · stay tuned · aim for victory · on track · race car · team.

**No em dashes** (—). Use a comma, colon, full stop or brackets instead.
**No arrow glyphs** (↗ ↓ ←) on buttons or links. Button text alone carries the action.
**No stacked fragment taglines** like "Explore the methods. / Read the papers. / Watch them on track." Use a plain sentence or a topic list instead.

**Avoid:** "X WINS · Y PODIUMS" summaries, "CONTROL + PERCEPTION + …" keyword chains, "proving ground", "test bed" as a slogan, "just getting started", "the hunger", "Less talk", "on the edge", "Find the line. Keep learning."-style two-word fragments, ironic or dark tone, and anything we can't back with a source.
