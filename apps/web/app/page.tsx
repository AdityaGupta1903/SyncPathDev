"use client"
import Head from 'next/head';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { data, status } = useSession();
  if (status == 'authenticated') {
    const email = data.user?.email;
    router.push(`/workflows?id=${email}`);
  }
  return (
    <>
      <Head>
        <title>SyncPath - Streamline Your Workflows</title>
        <meta
          name="description"
          content="SyncPath: Simplifying team collaboration and task management."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-extrabold text-blue-600">SyncPath</h1>
            <nav>
              <ul className="flex space-x-8">
                <li>
                  <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">
                    Contact
                  </a>
                </li>
                <li>
                  <Link
                    href={'/api/auth/signin'}
                    className="bg-blue-600 text-white py-2 px-5 rounded-lg hover:bg-blue-500 shadow-lg"
                  >
                    Get Started
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex-1 flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="text-center max-w-2xl px-6 py-16">
            <h2 className="text-5xl font-extrabold leading-tight mb-6">
              Streamline Your Team’s Workflows with SyncPath
            </h2>
            <p className="text-xl mb-8">
              Simplify collaboration, task tracking, and project management with an intuitive, all-in-one solution.
            </p>
            <a
              href="#features"
              className="inline-block bg-white text-blue-600 py-3 px-8 rounded-lg text-lg font-bold shadow-lg hover:bg-gray-100"
            >
              Learn More
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-extrabold text-gray-800">Features</h3>
              <p className="text-lg text-gray-600 mt-4">
                SyncPath offers all the tools you need to streamline your workflows and boost productivity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-8 bg-blue-50 shadow-md rounded-xl text-center">
                <h4 className="text-2xl font-semibold text-blue-600 mb-3">Team Collaboration</h4>
                <p className="text-gray-600">
                  SyncPath enhances communication and ensures your team is always aligned.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-8 bg-blue-50 shadow-md rounded-xl text-center">
                <h4 className="text-2xl font-semibold text-blue-600 mb-3">Task Management</h4>
                <p className="text-gray-600">
                  Stay organized with easy-to-use task and project management tools.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-8 bg-blue-50 shadow-md rounded-xl text-center">
                <h4 className="text-2xl font-semibold text-blue-600 mb-3">Real-time Updates</h4>
                <p className="text-gray-600">
                  Get instant notifications and updates for better time management.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h3 className="text-4xl font-extrabold text-gray-800 mb-6">About SyncPath</h3>
            <p className="text-lg text-gray-600">
              SyncPath is built to streamline team workflows, offering an intuitive, powerful platform for managing
              projects, tasks, and communication.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="bg-gray-900 py-10 text-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h4 className="text-2xl font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400">
              Have questions? Reach out to us at{' '}
              <a href="mailto:guptaditya19@gmail.com" className="text-blue-400 underline">
                guptaditya19@gmail.com
              </a>
            </p>
            <p className="text-gray-400 mt-4">© 2024 SyncPath. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
