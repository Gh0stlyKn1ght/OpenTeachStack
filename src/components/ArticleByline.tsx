import Image from "next/image";
import ShareButton from "./ShareButton";

type ArticleBylineProps = {
  author: string;
  date: string;
  title: string;
  readingTime?: string;
};

export default function ArticleByline({
  author,
  date,
  title,
  readingTime,
}: ArticleBylineProps) {
  return (
    <div className="article-byline">
      <div className="article-byline-author">
        <Image
          src="/aboutme.jpg"
          alt="Black and white portrait of JC Nevarez"
          width={48}
          height={48}
          className="article-byline-avatar"
        />
        <div>
          <p>{author}</p>
          <span>
            {readingTime ? `${readingTime} · ` : ""}{date}
          </span>
        </div>
      </div>
      <ShareButton title={title} />
    </div>
  );
}
