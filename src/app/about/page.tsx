export default function AboutPage() {
  return (
    <section className="max-w-[1080px] mx-auto px-6 pt-16 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-10 items-center md:items-start mb-14">
        {/* Avatar */}
        <div className="w-36 h-36 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-5xl text-white font-bold flex-shrink-0">
          J
        </div>

        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold mb-2">지웅</h1>
          <p className="text-blue-600 font-medium mb-3">
            Developer &amp; Creator
          </p>
          <p className="text-gray-500 leading-relaxed max-w-lg">
            기술과 사람 사이에서 가치를 만드는 것을 좋아합니다. 배운 것을
            기록하고, 만든 것을 공유하며, 함께 성장하는 것을 믿습니다.
          </p>
        </div>
      </div>

      {/* Career */}
      <div className="mb-14">
        <h2 className="text-lg font-bold mb-5 pb-2.5 border-b-2 border-gray-100">
          Career
        </h2>
        <div className="divide-y divide-gray-100">
          <div className="flex gap-5 py-4">
            <span className="text-[13px] text-gray-400 font-medium min-w-[100px] pt-0.5">
              2024 — 현재
            </span>
            <div>
              <h3 className="text-[15px] font-semibold mb-1">
                회사명 / 직무
              </h3>
              <p className="text-sm text-gray-500">
                담당 업무 및 주요 성과를 여기에 작성
              </p>
            </div>
          </div>
          <div className="flex gap-5 py-4">
            <span className="text-[13px] text-gray-400 font-medium min-w-[100px] pt-0.5">
              2022 — 2024
            </span>
            <div>
              <h3 className="text-[15px] font-semibold mb-1">
                이전 회사 / 직무
              </h3>
              <p className="text-sm text-gray-500">
                담당 업무 및 주요 성과를 여기에 작성
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-14">
        <h2 className="text-lg font-bold mb-5 pb-2.5 border-b-2 border-gray-100">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {[
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js",
            "Node.js",
            "Python",
            "Git",
            "Figma",
          ].map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-500"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div>
        <h2 className="text-lg font-bold mb-5 pb-2.5 border-b-2 border-gray-100">
          Contact
        </h2>
        <div className="text-[15px] text-gray-500 space-y-2">
          <p>
            <span className="text-gray-400 mr-3">Email</span>
            <a
              href="mailto:krfrontman@gmail.com"
              className="text-blue-600 hover:underline"
            >
              krfrontman@gmail.com
            </a>
          </p>
          <p>
            <span className="text-gray-400 mr-3">GitHub</span>
            <a
              href="https://github.com"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/jiwoong
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
