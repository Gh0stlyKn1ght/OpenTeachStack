import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AUTHOR, LICENSE } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "About JC Nevarez — Teaching Teachers",
  description:
    "About JC Nevarez, the educator and builder behind Teaching Teachers.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <header className="mb-12 grid gap-8 md:grid-cols-[minmax(0,1fr)_320px] md:items-end">
        <div>
          <span className="mb-4 inline-block rounded border border-accent/30 px-2.5 py-1 font-mono text-xs font-medium uppercase tracking-widest text-accent">
            About the Author
          </span>
          <h1 className="mb-4 font-serif text-3xl font-extrabold tracking-normal text-foreground sm:text-4xl">
            JC Nevarez
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-foreground/65">
            Computer science, robotics, engineering, and cybersecurity educator
            based in New Jersey.
          </p>
        </div>

        <figure className="overflow-hidden rounded-md border border-border bg-surface">
          <Image
            src="/aboutme.jpg"
            alt="Black and white portrait of JC Nevarez"
            width={1024}
            height={1536}
            priority
            className="aspect-[4/5] h-auto w-full object-cover object-[50%_38%]"
          />
        </figure>
      </header>

      <hr className="mb-10 border-t border-border" />

      <div className="prose-academic mx-auto max-w-3xl">
        <h2>About the Author</h2>
        <p>
          I built <strong>Teaching Teachers</strong> because I needed it myself.
        </p>
        <p>
          My name is <strong>JC Nevarez</strong>, and I am a computer science,
          robotics, engineering, and cybersecurity educator based in New Jersey.
          I was building robotics, AI, cybersecurity, engineering, and
          technology courses while also figuring out the tools behind the work:
          Google Workspace, prompts, standards, resources, websites,
          automation, and AI.
        </p>
        <p>
          Most professional development does not teach that part. We are handed
          platforms, templates, logins, and expectations, but not the system
          behind the work. So I started documenting the system.
        </p>
        <p>
          I did not come into teaching through a traditional straight-line path.
          My background includes cybersecurity, technology, mechanics,
          warehouse work, robotics, curriculum building, and years of learning
          systems the hard way. That experience shaped how I teach: practical
          first, theory with purpose, and always connected to something students
          or teachers can actually build.
        </p>
        <p>
          I created <strong>Teaching Teachers</strong> because I kept seeing the
          same problem: teachers are expected to design modern curriculum, use
          AI responsibly, manage digital resources, create assessments, align
          to standards, and deliver engaging lessons, but very few are ever
          taught the technical systems behind that work.
        </p>
        <p>Teaching Teachers is my answer to that gap.</p>
        <p>
          This project is built for educators who want more control over their
          curriculum, tools, resources, and professional workflow. It focuses on
          the practical skills teachers need now: prompting, standards
          alignment, course design, resource literacy, Google Workspace,
          automation, open educational resources, AI verification, and
          eventually tools like GitHub, Apps Script, course websites, and AI
          coding agents.
        </p>
        <p>
          I believe teachers should not be trapped inside disconnected files,
          random templates, and platforms they do not control. Teachers should
          understand how to build systems, evaluate resources, protect student
          privacy, document their work, and create curriculum that can grow
          over time.
        </p>
        <p>This is not a generic ed-tech course.</p>
        <p>This is a field guide for teacher independence.</p>
        <p>
          I built Teaching Teachers from my own experience designing robotics,
          AI, cybersecurity, engineering, and technology courses while learning
          the tools, mistakes, and workflows that most professional development
          never explains. My goal is to make that knowledge usable for other
          educators, especially teachers who are trying to build better courses
          without waiting for a perfect system to be handed to them.
        </p>
        <p>
          Teaching Teachers is open-source, practical, and intentionally built
          from the classroom outward.
        </p>

        <h2>Why I Built Teaching Teachers</h2>
        <p>I built Teaching Teachers because I needed it myself.</p>
        <p>
          As a teacher building courses in robotics, AI, cybersecurity,
          engineering, drones, and technology, I had to learn far more than
          lesson planning. I had to learn how to organize resources, align
          standards, create assessments, build digital systems, use AI
          responsibly, automate Google Workspace, evaluate open resources, and
          protect the curriculum I was creating.
        </p>
        <p>Most teachers are never formally taught those workflows.</p>
        <p>
          We are handed platforms, templates, logins, and expectations, but not
          the system behind the work.
        </p>
        <p>Teaching Teachers is my attempt to document that system.</p>
        <p>
          It is for educators who want to build better courses, use AI without
          losing their own voice, understand standards without turning them into
          copy-paste decoration, and create reusable curriculum infrastructure
          that can grow over time.
        </p>
        <p>
          This project comes from real classroom pressure, not conference
          theory. It is practical, open-source, and built for teachers who want
          to become builders.
        </p>

        <h2>Where to Start</h2>
        <p>
          Start with <Link href="/course">OTS-101 Foundations</Link>. Then use
          the <Link href="/pathway">Pathway Overview</Link> to choose the next
          track when you are ready.
        </p>

        <h2>Contact</h2>
        <p>
          Teaching Teachers is created and maintained by{" "}
          <a href={AUTHOR.url} target="_blank" rel="noopener noreferrer">
            {AUTHOR.name}
          </a>
          , {AUTHOR.role}.
        </p>
        <ul>
          <li>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${AUTHOR.email}`}>{AUTHOR.email}</a>
          </li>
          <li>
            <strong>Website:</strong>{" "}
            <a href={AUTHOR.url} target="_blank" rel="noopener noreferrer">
              {AUTHOR.url}
            </a>
          </li>
        </ul>

        <h2>License</h2>
        <p>
          Code is released under the{" "}
          <a href={LICENSE.code.url} target="_blank" rel="noopener noreferrer">
            {LICENSE.code.name}
          </a>
          . Content is licensed under{" "}
          <a
            href={LICENSE.content.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {LICENSE.content.name}
          </a>
          . <Link href="/license">Full license details &rarr;</Link>
        </p>
      </div>
    </div>
  );
}

