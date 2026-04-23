import type { ThoughtItem as ThoughtType } from "../lib/notion";

const iconBgMap: Record<string, string> = {
  "💡": "bg-amber-50",
  "📘": "bg-blue-50",
  "🪞": "bg-purple-50",
  "📝": "bg-gray-50",
};

export default function ThoughtItem({ item }: { item: ThoughtType }) {
  const bgClass = iconBgMap[item.icon] || "bg-gray-50";

  const formattedDate = item.date
    ? new Date(item.date).toLocaleDateString("ko-KR", {
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="group bg-white border border-gray-100 rounded-lg px-6 py-5 flex items-start gap-4 transition-all duration-200 hover:border-gray-200 hover:shadow-sm cursor-pointer">
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0 mt-0.5 ${bgClass}`}
      >
        {item.icon}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-[15px] font-semibold mb-1 group-hover:text-blue-600 transition-colors">
          {item.title}
        </h4>
        <p className="text-[13px] text-gray-500">{item.description}</p>
      </div>

      <span className="text-xs text-gray-400 whitespace-nowrap mt-1 flex-shrink-0">
        {formattedDate}
      </span>
    </div>
  );
}
