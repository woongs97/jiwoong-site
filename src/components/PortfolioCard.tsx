import type { PortfolioItem } from "../lib/notion";

export default function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <div className="group bg-white border border-gray-100 rounded-xl overflow-hidden transition-all duration-200 hover:border-gray-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer">
      {/* Gradient thumbnail */}
      <div
        className={`w-full h-[180px] bg-gradient-to-br ${item.color} flex items-center justify-center`}
      >
        <span className="text-4xl font-bold text-white/90">
          {item.title.charAt(0)}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-[17px] font-semibold mb-2 group-hover:text-blue-600 transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-3.5">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-gray-50 rounded-full text-xs text-gray-500 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
