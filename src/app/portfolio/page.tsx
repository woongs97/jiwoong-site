import { getPortfolioItems } from "../../lib/notion";
import PortfolioCard from "../../components/PortfolioCard";

export const revalidate = 60;

export default async function PortfolioPage() {
  const items = await getPortfolioItems();

  return (
    <section className="max-w-[1080px] mx-auto px-6 pt-16 pb-20">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Portfolio</h1>
      <p className="text-gray-500 mb-10">
        직접 만든 프로젝트들을 소개합니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>

      {items.length === 0 && (
        <p className="text-center text-gray-400 py-20">
          아직 등록된 프로젝트가 없습니다.
        </p>
      )}
    </section>
  );
}
