import type { Metadata } from "next";
import Link from "next/link";
import ResourceCard from "@/components/ResourceCard";
import {
  OfficialCourseSources,
  SoftwareSourceInventory,
} from "@/components/OfficialSources";
import { REPOSITORY_URL } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Resource Library — Open TeachStack",
  description:
    "A curated library of official documentation, tools, repositories, and sources for Open TeachStack pathway courses.",
};

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* ── Header ───────────────────────────────────────────────────── */}
      <header className="mb-10">
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-normal text-foreground mb-3">
          Resource Library
        </h1>
        <p className="text-foreground/60 leading-relaxed max-w-2xl">
          A curated source list for the Open TeachStack pathway. When a course
          teaches software, platforms, automation, publishing, AI tools, or
          licensing, the default source should be official documentation first.
        </p>
        <Link
          href="/sources"
          className="mt-4 inline-flex text-sm font-semibold text-link no-underline hover:underline"
        >
          Open the official source audit
        </Link>
      </header>

      <hr className="border-t border-border mb-10" />

      <section className="mb-10">
        <h2 className="font-serif text-xl font-bold text-foreground mb-1">
          Official Documentation by Pathway Course
        </h2>
        <p className="text-sm text-foreground/50 mb-4">
          These are the primary sources to curate from before writing lessons,
          labs, templates, or prompts. Supplemental tutorials can help, but
          software behavior should be checked against the official docs.
        </p>

        <OfficialCourseSources />
      </section>

      <section className="mb-10">
        <h2 className="font-serif text-xl font-bold text-foreground mb-1">
          Software Documentation Inventory
        </h2>
        <p className="text-sm text-foreground/50 mb-4">
          Every app in the homepage carousel gets both a product link and an
          official documentation or help link. This is the checklist to use
          before writing software-facing lessons, labs, prompts, or teacher
          workflows.
        </p>

        <SoftwareSourceInventory />
      </section>

      <hr className="border-t border-border mb-10" />

      {/* ── AI Tools ─────────────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="font-serif text-xl font-bold text-foreground mb-1">
          AI Tools
        </h2>
        <p className="text-sm text-foreground/50 mb-4">
          AI assistants, image generators, and coding agents used throughout
          the course.
        </p>

        <ResourceCard
          title="Claude"
          description="AI assistant by Anthropic. Used throughout the course for prompting, lesson plan generation, rubric creation, and content revision. Free tier available; Pro tier provides higher usage limits."
          url="https://claude.ai"
          type="Tool"
          license="Free tier / Pro"
        />

        <ResourceCard
          title="ChatGPT"
          description="AI assistant by OpenAI. An alternative or complement to Claude for all prompting tasks in the course. Includes DALL-E for AI image generation. Free tier available; Plus tier provides GPT-4 access."
          url="https://chat.openai.com"
          type="Tool"
          license="Free tier / Plus"
        />

        <ResourceCard
          title="Google AI Studio"
          description="Google's official Gemini playground for trying models, testing prompts, adjusting run and safety settings, and moving from a prototype prompt toward code when appropriate."
          url="https://aistudio.google.com"
          type="Tool"
          license="Google account / API terms"
        />

        <ResourceCard
          title="OpenAI Codex / ChatGPT Code Interpreter"
          description="AI coding agent that generates code from natural language descriptions. Reserved for the future OTS-320 AI Coding Agents course, not required in OTS-101."
          url="https://openai.com/index/openai-codex/"
          type="Tool"
          license="Free tier / API"
        />

        <ResourceCard
          title="Claude Code"
          description="Anthropic's AI coding agent that operates in the terminal. Reserved for the future OTS-320 AI Coding Agents course, where diff review and content protection are taught directly."
          url="https://docs.anthropic.com/en/docs/claude-code"
          type="Tool"
          license="Requires Claude API access"
        />

        <ResourceCard
          title="Adobe Firefly"
          description="AI image generation tool with a focus on commercially safe outputs. An alternative to DALL-E and Midjourney for creating curriculum visuals. Free tier available with limited generations."
          url="https://firefly.adobe.com"
          type="Tool"
          license="Free tier / Creative Cloud"
        />
      </section>

      <hr className="border-t border-border mb-10" />

      {/* ── Google Workspace & Automation ─────────────────────────────── */}
      <section className="mb-10">
        <h2 className="font-serif text-xl font-bold text-foreground mb-1">
          Google Workspace &amp; Automation
        </h2>
        <p className="text-sm text-foreground/50 mb-4">
          Core productivity tools and automation platform used in Modules
          06&ndash;07.
        </p>

        <ResourceCard
          title="Google Workspace"
          description="The core productivity suite for this course. Docs, Sheets, Slides, Forms, Drive, and the Apps Script editor provide the foundation for building teacher-owned curriculum systems."
          url="https://workspace.google.com"
          type="Tool"
          license="Proprietary (free tier available)"
        />

        <ResourceCard
          title="Google Apps Script Documentation"
          description="The official reference for Apps Script. Includes guides, class references, sample projects, and troubleshooting. Primary reference for the future OTS-220 automation course."
          url="https://developers.google.com/apps-script"
          type="Article"
        />

        <ResourceCard
          title="Apps Script Sample Projects"
          description="Google's curated collection of Apps Script starter projects covering Sheets, Docs, Forms, and Drive integrations."
          url="https://developers.google.com/apps-script/samples"
          type="Repository"
        />
      </section>

      <hr className="border-t border-border mb-10" />

      {/* ── Standards & Curriculum Design ─────────────────────────────── */}
      <section className="mb-10">
        <h2 className="font-serif text-xl font-bold text-foreground mb-1">
          Standards &amp; Curriculum Design
        </h2>
        <p className="text-sm text-foreground/50 mb-4">
          Resources for finding, reading, and aligning to state standards.
        </p>

        <ResourceCard
          title="Common Core State Standards Initiative"
          description="The official CCSS website with full standards documents for English Language Arts and Mathematics. Includes search tools and standards-by-grade-level views."
          url="https://www.thecorestandards.org"
          type="Article"
        />

        <ResourceCard
          title="Next Generation Science Standards"
          description="Performance expectations, disciplinary core ideas, and crosscutting concepts for K-12 science education. Includes search by topic, grade band, and practice."
          url="https://www.nextgenscience.org"
          type="Article"
        />

        <ResourceCard
          title="Understanding by Design (UbD) Framework"
          description="The backward design framework by Wiggins and McTighe. Essential background for Module 04 (Course Architecture). The framework's three stages — desired results, assessment evidence, learning plan — inform the course design approach."
          url="https://cft.vanderbilt.edu/guides-sub-pages/understanding-by-design/"
          type="Article"
          license="Vanderbilt University CFT"
        />
      </section>

      <hr className="border-t border-border mb-10" />

      {/* ── Image Generation & Visual Design ─────────────────────────── */}
      <section className="mb-10">
        <h2 className="font-serif text-xl font-bold text-foreground mb-1">
          Image Generation &amp; Visual Design
        </h2>
        <p className="text-sm text-foreground/50 mb-4">
          AI image tools and design resources for the future OTS-260 media track.
        </p>

        <ResourceCard
          title="DALL-E (via ChatGPT)"
          description="OpenAI's image generation model, accessible through ChatGPT. Useful later for curriculum visuals, but not a required OTS-101 foundations outcome."
          url="https://openai.com/dall-e"
          type="Tool"
          license="Via ChatGPT Plus"
        />

        <ResourceCard
          title="Unsplash"
          description="Free, high-quality stock photography with a permissive license. A useful alternative or supplement to AI-generated images when you need verified, real-world photographs."
          url="https://unsplash.com"
          type="Tool"
          license="Unsplash License (free for commercial and non-commercial)"
        />

        <ResourceCard
          title="Prompt Engineering for Image Generation"
          description="OpenAI's guide to writing effective image generation prompts. Covers composition, style descriptors, and common pitfalls. Applicable to DALL-E and transferable to other image generators."
          url="https://platform.openai.com/docs/guides/images"
          type="Article"
        />
      </section>

      <hr className="border-t border-border mb-10" />

      {/* ── Video & Screen Recording ─────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="font-serif text-xl font-bold text-foreground mb-1">
          Video &amp; Screen Recording
        </h2>
        <p className="text-sm text-foreground/50 mb-4">
          Tools for creating instructional videos and screen recordings
          (Module 09).
        </p>

        <ResourceCard
          title="OBS Studio"
          description="Free, open-source screen recording and streaming software. Supports scene composition, multiple audio sources, and high-quality output. The recommended tool for screen recordings in this course."
          url="https://obsproject.com"
          type="Tool"
          license="GPL-2.0 (free, open-source)"
        />

        <ResourceCard
          title="Loom"
          description="Browser-based screen and camera recording tool. Simpler than OBS for quick recordings. Free tier includes up to 25 videos with 5-minute limit. Paid plans remove limits."
          url="https://www.loom.com"
          type="Tool"
          license="Free tier / paid"
        />

        <ResourceCard
          title="Canva"
          description="Design platform with slide templates, video editing, and export capabilities. Useful for creating polished slide presentations and short video content. Free tier covers most needs."
          url="https://www.canva.com"
          type="Tool"
          license="Free tier / Pro"
        />
      </section>

      <hr className="border-t border-border mb-10" />

      {/* ── Version Control & Publishing ──────────────────────────────── */}
      <section className="mb-10">
        <h2 className="font-serif text-xl font-bold text-foreground mb-1">
          Version Control &amp; Publishing
        </h2>
        <p className="text-sm text-foreground/50 mb-4">
          Platforms for version control, hosting, and deploying curriculum
          sites (Modules 10 and 12).
        </p>

        <ResourceCard
          title="GitHub"
          description="Version control and collaboration platform. Used throughout the course for hosting curriculum repositories, managing contributions, and publishing open-source projects."
          url="https://github.com"
          type="Tool"
          license="Free tier"
        />

        <ResourceCard
          title="Cloudflare Pages"
          description="Free static site hosting with automatic deployments from Git. Includes DNS management, SSL, and global CDN — an excellent option for publishing curriculum sites on a custom domain."
          url="https://pages.cloudflare.com"
          type="Tool"
          license="Free tier"
        />

        <ResourceCard
          title="Vercel"
          description="Deployment platform for Next.js and other frontend frameworks. The free hobby tier is sufficient for course projects. Provides preview deployments, serverless functions, and analytics."
          url="https://vercel.com"
          type="Tool"
          license="Free hobby tier"
        />
      </section>

      <hr className="border-t border-border mb-10" />

      {/* ── Web Development References ───────────────────────────────── */}
      <section className="mb-10">
        <h2 className="font-serif text-xl font-bold text-foreground mb-1">
          Web Development References
        </h2>
        <p className="text-sm text-foreground/50 mb-4">
          Documentation for the future OTS-301 Teacher Course Sites track.
        </p>

        <ResourceCard
          title="MDN Web Docs"
          description="The definitive reference for web technologies — HTML, CSS, and JavaScript. Essential background for understanding Apps Script (which is JavaScript-based) and static site development."
          url="https://developer.mozilla.org"
          type="Article"
          license="CC BY-SA 2.5"
        />

        <ResourceCard
          title="Next.js Documentation"
          description="Official documentation for the Next.js framework used to build this course site. Relevant to the future OTS-301 Teacher Course Sites track."
          url="https://nextjs.org/docs"
          type="Article"
          license="MIT"
        />

        <ResourceCard
          title="Docusaurus"
          description="Open-source documentation site generator by Meta. An alternative to Next.js for building curriculum sites, with built-in support for Markdown, versioning, and search."
          url="https://docusaurus.io"
          type="Tool"
          license="MIT"
        />
      </section>

      <hr className="border-t border-border mb-10" />

      {/* ── Open Education & Licensing ────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="font-serif text-xl font-bold text-foreground mb-1">
          Open Education &amp; Licensing
        </h2>
        <p className="text-sm text-foreground/50 mb-4">
          Resources for open licensing and open educational resources.
        </p>

        <ResourceCard
          title="Creative Commons License Chooser"
          description="Official tool for selecting and applying Creative Commons licenses to your work. Generates license badges, metadata, and attribution text for curriculum materials."
          url="https://chooser-beta.creativecommons.org/"
          type="Tool"
        />

        <ResourceCard
          title="OER Commons"
          description="A digital library of open educational resources. Search by subject, grade level, and standard. Useful for Module 05 (Resource Discovery) when building resource banks for your courses."
          url="https://www.oercommons.org"
          type="Tool"
          license="Varies by resource"
        />

        <ResourceCard
          title="Open TeachStack"
          description="The public home for this course pathway, including lessons, templates, official source lists, safety guidance, and the OTS-101 foundations course."
          url="https://openteachstack.dev"
          type="Tool"
          license="MIT / CC BY-NC-SA 4.0"
        />

        <ResourceCard
          title="Open TeachStack GitHub Repository"
          description="The source repository for the Open TeachStack site, MDX lessons, field notes, templates, and project documentation."
          url={REPOSITORY_URL}
          type="Repository"
          license="MIT / CC BY-NC-SA 4.0"
        />
      </section>

      <hr className="border-t border-border mb-10" />

      {/* ── Courses & Learning ───────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="font-serif text-xl font-bold text-foreground mb-1">
          Courses &amp; Learning
        </h2>
        <p className="text-sm text-foreground/50 mb-4">
          Supplementary courses and learning resources.
        </p>

        <ResourceCard
          title="Google Apps Script Fundamentals (Google)"
          description="Google's own introductory course for Apps Script, covering Workspace integration, triggers, and custom functions. A useful companion to the future OTS-220 automation course."
          url="https://developers.google.com/apps-script/guides"
          type="Course"
        />

        <ResourceCard
          title="Git and GitHub for Poets (The Coding Train)"
          description="A beginner-friendly video series that introduces Git and GitHub through a non-programmer lens. Excellent preparation for Module 10: GitHub and Open Source for Teachers."
          url="https://thecodingtrain.com/tracks/git-and-github-for-poets"
          type="Course"
          license="Free"
        />

        <ResourceCard
          title="Anthropic Prompt Engineering Guide"
          description="Anthropic's official guide to writing effective prompts for Claude. Covers system prompts, few-shot examples, chain-of-thought, and structured output. Directly applicable to Module 02."
          url="https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview"
          type="Article"
        />

        <ResourceCard
          title="OpenAI Prompt Engineering Guide"
          description="OpenAI's best practices for prompt engineering with GPT models. Covers strategies for getting better results, including clear instructions, reference text, and step-by-step reasoning."
          url="https://platform.openai.com/docs/guides/prompt-engineering"
          type="Article"
        />
      </section>

      {/* ── Attribution note ─────────────────────────────────────────── */}
      <aside className="mt-10 pt-6 border-t border-border">
        <p className="text-xs text-foreground/40 leading-relaxed">
          This resource library is maintained as part of the Open TeachStack
          project. Inclusion does not imply endorsement. All trademarks and
          product names belong to their respective owners. If you have a
          resource suggestion, use the contact information published with the
          project.
        </p>
      </aside>
    </div>
  );
}
