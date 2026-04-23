import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

function richTextToHtml(
  richText: Array<{
    plain_text: string;
    annotations: {
      bold: boolean;
      italic: boolean;
      strikethrough: boolean;
      underline: boolean;
      code: boolean;
    };
    href: string | null;
  }>
): string {
  return richText
    .map((t) => {
      let text = t.plain_text;
      if (t.annotations.code) text = `<code>${text}</code>`;
      if (t.annotations.bold) text = `<strong>${text}</strong>`;
      if (t.annotations.italic) text = `<em>${text}</em>`;
      if (t.annotations.strikethrough) text = `<s>${text}</s>`;
      if (t.annotations.underline) text = `<u>${text}</u>`;
      if (t.href) text = `<a href="${t.href}" target="_blank" rel="noopener">${text}</a>`;
      return text;
    })
    .join("");
}

export default function NotionBlock({ block }: { block: BlockObjectResponse }) {
  const type = block.type;

  switch (type) {
    case "paragraph": {
      const b = block as Extract<BlockObjectResponse, { type: "paragraph" }>;
      const html = richTextToHtml(b.paragraph.rich_text);
      if (!html) return <br />;
      return <p dangerouslySetInnerHTML={{ __html: html }} />;
    }
    case "heading_1": {
      const b = block as Extract<BlockObjectResponse, { type: "heading_1" }>;
      return (
        <h1
          dangerouslySetInnerHTML={{
            __html: richTextToHtml(b.heading_1.rich_text),
          }}
        />
      );
    }
    case "heading_2": {
      const b = block as Extract<BlockObjectResponse, { type: "heading_2" }>;
      return (
        <h2
          dangerouslySetInnerHTML={{
            __html: richTextToHtml(b.heading_2.rich_text),
          }}
        />
      );
    }
    case "heading_3": {
      const b = block as Extract<BlockObjectResponse, { type: "heading_3" }>;
      return (
        <h3
          dangerouslySetInnerHTML={{
            __html: richTextToHtml(b.heading_3.rich_text),
          }}
        />
      );
    }
    case "bulleted_list_item": {
      const b = block as Extract<BlockObjectResponse, { type: "bulleted_list_item" }>;
      return (
        <li
          dangerouslySetInnerHTML={{
            __html: richTextToHtml(b.bulleted_list_item.rich_text),
          }}
        />
      );
    }
    case "numbered_list_item": {
      const b = block as Extract<BlockObjectResponse, { type: "numbered_list_item" }>;
      return (
        <li
          dangerouslySetInnerHTML={{
            __html: richTextToHtml(b.numbered_list_item.rich_text),
          }}
        />
      );
    }
    case "quote": {
      const b = block as Extract<BlockObjectResponse, { type: "quote" }>;
      return (
        <blockquote
          dangerouslySetInnerHTML={{
            __html: richTextToHtml(b.quote.rich_text),
          }}
        />
      );
    }
    case "code": {
      const b = block as Extract<BlockObjectResponse, { type: "code" }>;
      const text = b.code.rich_text.map((t) => t.plain_text).join("");
      return (
        <pre>
          <code>{text}</code>
        </pre>
      );
    }
    case "divider":
      return <hr className="my-8 border-gray-200" />;
    case "image": {
      const b = block as Extract<BlockObjectResponse, { type: "image" }>;
      const url =
        b.image.type === "external"
          ? b.image.external.url
          : b.image.type === "file"
            ? b.image.file.url
            : "";
      // eslint-disable-next-line @next/next/no-img-element
      return url ? <img src={url} alt="" className="rounded-xl my-6" /> : null;
    }
    case "callout": {
      const b = block as Extract<BlockObjectResponse, { type: "callout" }>;
      const icon =
        b.callout.icon?.type === "emoji" ? b.callout.icon.emoji : "💡";
      return (
        <div className="flex gap-3 bg-gray-50 rounded-lg p-4 my-4">
          <span className="text-lg">{icon}</span>
          <div
            dangerouslySetInnerHTML={{
              __html: richTextToHtml(b.callout.rich_text),
            }}
          />
        </div>
      );
    }
    default:
      return null;
  }
}
