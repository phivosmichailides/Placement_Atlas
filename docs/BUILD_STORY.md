# From an MPharm problem to a launched web product

**A product-building case study by Phivos Michailides, creator of [Placement Atlas](https://placementatlas.co.uk/).**

I study pharmacy at University College London, not computer science. While comparing foundation pharmacist training programmes, I found that the data existed but the decision-making experience was fragmented. Salary, working hours, training settings, split sites, location and visa information all affected the choice; it was difficult to compare them together.

**The question:** could I turn an overwhelming list into a usable decision workspace — without pretending that software could make the choice for each applicant?

## 1. Start with a user decision, not a feature list

My starting point was the applicant's workflow: discover the options, understand the differences, apply personal constraints, compare trade-offs, shortlist possibilities and organise an official ranking. That led to the product principles:

- Make the catalogue searchable without forcing people through unnecessary setup.
- Distinguish verified programme fields from inferred signals and estimates.
- Let people express priorities instead of deciding what the “best” placement is.
- Keep users' saved workspace separate from the official recruitment system.
- Explain recommendations, including the trade-offs.

## 2. Turn a historical dataset into an interface

The initial public catalogue uses a dated **October 2026 Oriel CSV export supplied to the project on 7 November 2026**, with **4,064 England and Wales entries**. I structured the app around what the available fields could support: programme names, sectors, location context, salary, hours and sponsorship indicators. None of these fields makes the data a live vacancy feed.

The user-facing experience includes:

- Search, region and setting filters, and list/grid views.
- Interactive maps with context for training locations and split programmes.
- Salary, working-hours and indicative pay comparisons.
- Personal priorities and explainable fit signals, with an explicit non-personalised state.
- Shortlisting, notes, comparisons, a swipe-based exploration mode and an independent Oriel-style simulation.
- Optional accounts, saved workspaces and export/backup features.

The design makes room for imperfect information. A missing postcode, incomplete rotation description or unconfirmed sponsorship status is not silently treated as a known fact.

## 3. Own the product decisions while learning the engineering

My main responsibilities were identifying friction, defining requirements, deciding how the interface should work, prioritising improvements, testing edge cases, reviewing output and managing iterative releases.

**Development involved AI-assisted software implementation as well as hands-on technical learning, testing and refinement.** I am not claiming every line of code was written unaided. This project instead demonstrates product ownership, implementation literacy, working with structured data, user-experience decisions, debugging and the ability to ship and improve a functional application.

Some harder product challenges were less glamorous than adding features:

- Preventing a new account from inheriting another visitor's preferences or shortlist.
- Keeping persistent browser state and cloud state consistent after sign-in or switching accounts.
- Preventing map rendering and full-catalogue fit calculations from freezing the interface.
- Making cards, dropdowns, labels and mobile navigation work across light/dark themes and changing window sizes.
- Distinguishing a genuinely personalised recommendation from an unconfigured default.
- Maintaining deployment, cache invalidation and regression checks while changing the site.

## 4. Release and learn

Placement Atlas is deployed as an independent web application at **[placementatlas.co.uk](https://placementatlas.co.uk/)**. It is also documented in [the public GitHub repository](https://github.com/phivosmichailides/Placement_Atlas).

The shipped catalogue and features show **product scope**, not active-user growth. I do not present the number of programme records as a user count, a hiring outcome or proof of commercial traction. The next phase is distribution, responsible feedback collection and prioritising changes based on applicant needs.

## 5. What I would do differently next time

- Define a small set of measurable outcomes early: successful search/filter journeys, repeat visits, shortlist completion, and usability feedback.
- Reduce duplicate interface paths and simplify complex interactions before adding new features.
- Formalise tests for first-time visitors, account switching, stale cached scripts, mobile layouts and slow network conditions.
- Add clearer release notes and a short visual demonstration.
- Reach users where they already are — not only through search results.

## Why this project matters beyond pharmacy

I built Placement Atlas because I wanted to solve a real user problem in a domain I understood. The result is an example of bringing **domain expertise, product thinking, AI-assisted development, interface design and iteration** together.

My broader interests include product management, technology, data-driven products, and building tools that make complicated decisions easier. This is one practical project demonstrating that direction, not a claim to professional software-engineering credentials.

**Explore the product:** https://placementatlas.co.uk/

**Read the data and independence caveats:** https://placementatlas.co.uk/about.html

**Connect with the creator:** https://www.linkedin.com/in/phivos-michailides-601b0329b/

---

*Placement Atlas is independent of UCL, Oriel, NHS England and the GPhC. The programme catalogue is a historical snapshot; applicants should confirm current details with official recruitment and employer sources.*
