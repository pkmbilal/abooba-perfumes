# AGENT.md

## Project Overview
Abooba Perfumes is a modern perfume e-commerce web application focused on the Indian market, especially Kerala. The project prioritizes a premium look, fast performance, clean code, and safe handling of user data.

## Primary Goals
- Build a clean, modern, premium perfume shopping experience
- Keep the codebase maintainable and production-ready
- Prefer simple and scalable solutions over overengineering
- Protect existing work unless a change is explicitly requested
- Avoid risky or destructive actions

## Tech Stack
- Next.js
- React
- JavaScript only (do not convert to TypeScript unless explicitly requested)
- Tailwind CSS
- ShadCN UI if needed
- Supabase for backend/database/auth/storage when applicable

## Design Direction
- Premium, elegant, modern
- Suitable for a perfume brand
- Market context: India / Kerala
- Prefer refined spacing, strong typography, soft luxury feel
- Avoid clutter, excessive animation, and overly colorful UI
- Use green/blue tones only if already chosen in project direction
- Keep the UI conversion-friendly for e-commerce

## Coding Rules
- Use JavaScript, not TypeScript
- Keep components modular and reusable
- Prefer server-safe and production-safe patterns
- Follow existing project structure before introducing new patterns
- Reuse existing utilities/components where possible
- Do not add unnecessary dependencies
- Do not refactor unrelated files
- Do not rename files/functions unless necessary for the requested task
- Keep imports clean and remove dead code
- Write readable, minimal, maintainable code

## UI Rules
- Mobile-first responsive design
- Maintain visual consistency across sections/pages
- Prefer accessible semantic HTML
- Use clear hierarchy in headings, buttons, forms, and cards
- Keep product pages, cards, and CTAs practical and conversion-focused
- Do not introduce flashy effects unless explicitly requested
- Prefer subtle hover states and polished transitions

## Perfume E-commerce Context
When working on perfume-related features, prefer these common concepts:
- Products
- Categories
- Product images
- Featured products
- Best sellers
- New arrivals
- Fragrance notes
- Volume/size
- Price
- Availability
- WhatsApp inquiry or ordering flow if used in this project
- Wishlist/favorites if already part of the project scope

Do not invent advanced commerce workflows unless explicitly requested.

## Supabase Safety Rules
- Never expose secrets, service role keys, or private credentials
- Never hardcode API keys, tokens, passwords, or secrets
- Use environment variables for sensitive configuration
- Do not disable RLS unless explicitly instructed
- Prefer safe schema changes
- Do not delete tables, columns, policies, or data unless explicitly requested
- If a migration may be destructive, warn clearly in comments or output
- Prefer additive database changes over destructive ones
- Assume production data must be preserved

## File Safety Rules
- Only edit files relevant to the task
- Do not overwrite large files unnecessarily
- Do not remove existing functionality unless it is part of the request
- Preserve SEO, metadata, routing, and existing working flows unless asked to change them
- Avoid broad formatting-only rewrites across the entire codebase

## Git Safety Rules
- Do not delete branches
- Do not rewrite git history
- Do not force push
- Do not commit secrets
- Keep changes scoped and reviewable
- Prefer small, logical changes

## Command Safety Rules
- Do not run destructive commands
- Never run commands that remove files/data unless explicitly requested
- Avoid dangerous operations such as:
  - `rm -rf`
  - force resets
  - dropping databases
  - deleting migrations
  - mass dependency changes without reason
- Do not upgrade major dependencies unless explicitly requested

## Behavior Expectations for the Agent
When given a task:
1. First understand the existing code structure
2. Make the smallest correct change
3. Preserve current styling and architecture
4. Keep business logic clear and isolated
5. If something is ambiguous, choose the safest implementation
6. If a task may affect data, auth, payments, or SEO, be extra conservative

## What the Agent Should Avoid
- Do not hallucinate missing APIs, tables, or components
- Do not fake database fields or backend logic
- Do not assume payments are implemented unless they already exist
- Do not create unnecessary admin systems unless explicitly requested
- Do not replace the app’s visual identity with generic templates
- Do not add placeholder content that looks final unless requested

## Preferred Development Style
- Clear folder structure
- Reusable sections/components
- Good naming
- Minimal dependencies
- Stable and easy-to-review output
- Production-minded decisions

## Output Expectations
When completing a task, prefer:
- concise explanation of what changed
- list of files changed
- any required env variables
- any required database changes
- any follow-up step if necessary

## If Working on Homepage
Prefer sections such as:
- Hero
- Categories
- Featured / Best Sellers
- About Brand
- Why Choose Us
- Testimonials
- FAQ
- Footer

## If Working on Product Data
Prefer fields such as:
- name
- slug
- description
- short_description
- price
- sale_price
- category_id
- stock_quantity
- volume
- fragrance_notes
- image(s)
- featured
- best_seller
- is_active

Only use fields that match the actual database schema.

## Final Instruction
Always prioritize safety, maintainability, and minimal-risk implementation over speed or unnecessary creativity.