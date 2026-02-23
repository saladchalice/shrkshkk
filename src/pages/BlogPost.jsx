import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const posts = import.meta.glob(
  "../docs/blog/posts/*.md",
  { eager: true, query: '?raw', import: 'default' }
);

function stripFrontmatter(content) {
  return content.replace(/---[\s\S]*?---/, "");
}

export default function BlogPost() {
  const { slug } = useParams();

  const postEntry = Object.entries(posts).find(([path]) =>
    path.includes(`${slug}.md`)
  );

  if (!postEntry) return <div>Post not found</div>;

  const content = stripFrontmatter(postEntry[1]);

  return (
    <div className="blog-post">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}