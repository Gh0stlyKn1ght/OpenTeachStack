import fs from "node:fs";
import path from "node:path";

const injections = [
  {
    file: "content/courses/ots-240/lessons/05-publishing-attribution/05-3.mdx",
    component: "\n<LicenseSelector />\n",
  },
  {
    file: "content/courses/ots-280/lessons/01-teacher-threat-model/01-4.mdx",
    component: "\n<ThreatProfileEstimator />\n",
  },
  {
    file: "content/courses/ots-301/lessons/05-deployment-maintenance/05-2.mdx",
    component: "\n<SiteConfigPreviewer />\n",
  },
];

for (const inj of injections) {
  const filePath = path.resolve(inj.file);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${inj.file}`);
    continue;
  }
  let content = fs.readFileSync(filePath, "utf8");
  if (content.includes(inj.component.trim())) {
    console.log(`Already injected in: ${inj.file}`);
    continue;
  }
  content = content.replace("## Do This", `${inj.component}\n## Do This`);
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Injected component into: ${inj.file}`);
}
