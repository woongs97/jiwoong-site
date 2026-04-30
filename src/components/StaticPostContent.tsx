import type { PostBlock, PostSpan } from "../data/posts";

function Spans({ spans }: { spans: PostSpan[] }) {
  return (
    <>
      {spans.map((s, i) => {
        let node: React.ReactNode = s.text;
        if (s.italic) node = <em key={i}>{node}</em>;
        if (s.bold) node = <strong key={i}>{node}</strong>;
        return <span key={i}>{node}</span>;
      })}
    </>
  );
}

export default function StaticPostContent({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="space-y-5 text-[15.5px] text-gray-800 leading-[1.9]">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i}>
                <Spans spans={block.spans} />
              </p>
            );
          case "h2":
            return (
              <h2
                key={i}
                className="text-xl font-bold text-gray-900 mt-10 mb-3 tracking-tight"
              >
                {block.text}
              </h2>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="my-8 py-6 px-1 text-center border-y border-gray-100"
              >
                <p className="text-[17px] italic text-gray-700 leading-relaxed">
                  “{block.text}”
                </p>
                {block.cite && (
                  <p className="mt-3 text-xs text-gray-400 tracking-wide">
                    — {block.cite}
                  </p>
                )}
              </blockquote>
            );
          case "ul":
            return (
              <ul key={i} className="list-disc pl-6 space-y-1.5">
                {block.items.map((item, j) => (
                  <li key={j}>
                    <Spans spans={item} />
                  </li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
