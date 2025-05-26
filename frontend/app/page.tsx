"use client";
import Link from "next/link";
import Banner_C from "@/components/combination/Banner_C";
import Header_C from "@/components/combination/Header_C";
import Footer_C from "@/components/combination/Footer_C";
import { sampleUser } from "@/data/sample";

const contents = [
  "1. YLaw",
  "2. Stacey-Ann Taylor Law",
  "3. Bick Law LLP",
  "4. Rasa",
  "5. Big Fire Law & Policy Group LLP",
  "6. Employment Law Center of Maryland",
  "7. Bend Law Group, PC",
  "8. HagEstad Law Group",
  "9. Bouhan Falligant",
  "10. Counsel for Creators LLP",
  "11. Levine Family Law Group",
];

export default function Home() {
  return (
    <>
      <Header_C logedUser={sampleUser} />
      <Banner_C />
      <div className="flex flex-col lg:flex-row max-w-screen-xl mx-auto px-4 py-8 gap-8">
        {/* Sidebar */}
        <aside className="lg:w-1/2 w-full bg-gray-50 p-6 border rounded">
          <h2 className="text-lg font-semibold mb-4">Contents</h2>
          <ul className="space-y-2 text-blue-600 text-sm">
            <li>
              <a href="#stackup" className="hover:underline">
                How does your law firm’s website stack up?
              </a>
            </li>
            {contents.map((item, i) => (
              <li key={i}>
                <a href={`#section${i + 1}`} className="hover:underline">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="lg:w-1/2 w-full space-y-4 text-gray-800">
          <p>
            Your law firm’s website is often a potential client’s first
            impression of you. Great{" "}
            <Link href="#" className="text-blue-600 hover:underline">
              law firm websites
            </Link>{" "}
            are well-designed, user-friendly, and clearly state what services
            the law firm offers.
          </p>
          <p>
            The best law firm websites use compelling content such as client
            testimonials and case studies to showcase expertise...
          </p>
          <p>We’ve updated our list of the 20 best legal websites in 2025...</p>
          <p className="italic">
            <span className="text-blue-600 font-medium">
              Clio’s Law Firm Website Builder
            </span>{" "}
            lets you create a standout site effortlessly—
            <Link href="#" className="text-blue-600 hover:underline">
              Book a free demo today and see how!
            </Link>
          </p>
          <h2 id="stackup" className="text-2xl font-bold text-gray-900 pt-6">
            How does your law firm’s website stack up?
          </h2>
          <p>
            Clio’s Law Firm Website Scorecard lets you compare your website
            against...
          </p>
        </main>
      </div>

      <Footer_C />
    </>
  );
}
