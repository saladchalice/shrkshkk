import { Link } from "react-router-dom";

const posts = import.meta.glob(
  "../docs/blog/posts/*.md",
  { eager: true, query: '?raw', import: 'default'}
);

function parseFrontmatter(content) {
  const match = content.match(/---([\s\S]*?)---/);
  if (!match) return {};

  const frontmatter = {};
  match[1]
    .split("\n")
    .forEach(line => {
      const [key, ...rest] = line.split(":");
      if (key) frontmatter[key.trim()] = rest.join(":").trim();
    });

  return frontmatter;
}

const postList = Object.entries(posts).map(([path, content]) => {
  const slug = path.split("/").pop().replace(".md", "");
  const meta = parseFrontmatter(content);

  return { slug, ...meta };
});

export default function Blog() {
  return (
    <div className="alt-page">
        <div className="blog-container">
            <div className="background-container">
                <div id="blog-container">
                    <h2 className="page-heading2">my blog</h2>
                </div>

                {postList.map(post => (
                    <div key={post.slug} className="blog-card">
                    <h2>
                        <Link to={`/blog/${post.slug}`}>
                        {post.title}
                        </Link>
                    </h2>
                    <p>{post.description}</p>
                    <small>{post.date}</small>
                    </div>
                ))}
            </div>
                

        </div>
            
    </div>
    
  );
}