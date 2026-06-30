import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ArticleBody from "@/components/field-guide/ArticleBody";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import { AUTHOR, LICENSE } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "About JC Nevarez — OpenTeachStack",
  description:
    "About JC Nevarez, the educator and builder behind OpenTeachStack.",
};

export default function AboutPage() {
  return (
    <FieldGuidePage
      eyebrow="Author Note"
      title="JC Nevarez"
      subtitle="Computer science, robotics, engineering, and cybersecurity educator based in New Jersey."
      meta={[
        { label: "Role", value: AUTHOR.role },
        { label: "Project", value: "OpenTeachStack" },
        { label: "License", value: LICENSE.content.spdx },
      ]}
      sidebarPosition="right"
      sidebar={
        <figure className="about-author-portrait">
          <Image
            src="/aboutme.jpg"
            alt="Black and white portrait of JC Nevarez"
            width={1024}
            height={1536}
            priority
            className="aspect-[4/5] h-auto w-full object-cover object-[50%_38%]"
          />
        </figure>
      }
    >
      <ArticleBody>
        <div className="prose-academic">
        <h2>About the Author</h2>
        <p>
          I built <strong>OpenTeachStack</strong> because I needed it myself.
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
          I created <strong>OpenTeachStack</strong> because I kept seeing the
          same problem: teachers are expected to design modern curriculum, use
          AI responsibly, manage digital resources, create assessments, align
          to standards, and deliver engaging lessons, but very few are ever
          taught the technical systems behind that work.
        </p>
        <p>OpenTeachStack is my answer to that gap.</p>
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
          I built OpenTeachStack from my own experience designing robotics,
          AI, cybersecurity, engineering, and technology courses while learning
          the tools, mistakes, and workflows that most professional development
          never explains. My goal is to make that knowledge usable for other
          educators, especially teachers who are trying to build better courses
          without waiting for a perfect system to be handed to them.
        </p>
        <p>
          OpenTeachStack is open-source, practical, and intentionally built
          from the classroom outward.
        </p>
        <p>
          Video walkthroughs and additional companion content are coming soon.
          The written course book is the foundation; the media layer will grow
          around it as the project matures.
        </p>

        <h2>Other Projects</h2>
        <p>
          OpenTeachStack connects to other classroom and build work I maintain:
        </p>
        <ul>
          {AUTHOR.projects.map((project) => (
            <li key={project.url}>
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                {project.name}
              </a>
              : {project.description}
            </li>
          ))}
        </ul>

        <h2>Why I Built OpenTeachStack</h2>
        <p>I built OpenTeachStack because I needed it myself.</p>
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
        <p>OpenTeachStack is my attempt to document that system.</p>
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
          Start with <Link href="/book/ots-000">OTS-000 Teacher Tech Stack Orientation</Link>.
          Then move into <Link href="/book/ots-101">OTS-101 AI Course Content Foundations</Link>
          and use the <Link href="/pathway">Pathway Overview</Link> when you are
          ready for later tracks.
        </p>

        <h2>Contact</h2>
        <p>
          OpenTeachStack is created and maintained by{" "}
          <a
            href={AUTHOR.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {AUTHOR.name}
          </a>
          , {AUTHOR.role}.
        </p>
        <ul>
          <li>
            <strong>LinkedIn:</strong>{" "}
            <a
              href={AUTHOR.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/gh0stly
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
      </ArticleBody>
    </FieldGuidePage>
  );
}


