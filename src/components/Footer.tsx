export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-10 px-6 text-center">
      <div className="max-w-[1080px] mx-auto">
        <div className="flex justify-center gap-6 mb-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:krfrontman@gmail.com"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            Email
          </a>
        </div>
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} jiwoong. Built with Next.js &amp;
          Notion.
        </p>
      </div>
    </footer>
  );
}
