import Image from 'next/image';
import Link from 'next/link';
import { FiClock } from 'react-icons/fi';
import { FaFilePdf } from 'react-icons/fa';

export default function ArticlePreview() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-10 bg-gray-50 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
            {/* Left content */}
            <div className="flex-1 max-w-2xl">
                <nav className="text-sm text-gray-500 mb-4">
                    Clio &gt; Posts &gt; Marketing Posts
                </nav>

                <h1 className="text-4xl font-extrabold text-maincolor mb-4">
                    Top 20 Best Law Firm Websites in 2025
                </h1>

                <p className="mb-8 text-gray-700 text-sm flex items-center gap-2">
                    Written by{' '}
                    <Link
                        href="https://www.clio.com/blog/author/teresa-matich/"
                        className="text-maincolor hover:underline"
                        target="_blank" // optional: open in new tab if needed
                        rel="noopener noreferrer" // for security if target=_blank
                    >
                        Teresa Matich
                    </Link>
                    <FiClock className="inline w-4 h-4" />
                    <span>13 minutes well spent</span>
                </p>

                <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-maincolor px-6 py-3 font-semibold text-white shadow-lg hover:bg-blue-700 transition"
                >
                    Download This Article as a PDF
                    <FaFilePdf className="w-5 h-5" />
                </button>
            </div>

            {/* Right content */}
            <div className="flex-1 max-w-md">
                <Image
                    src="/7ab11155-11e4-476e-81c8-8281fd52662f.png"
                    alt="Article illustration"
                    width={600}
                    height={340}
                    className="object-cover rounded-md"
                    priority
                />
            </div>
        </div>
    );
}
