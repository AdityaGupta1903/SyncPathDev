"use client"
import Head from 'next/head';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
export default function Home() {
  const router = useRouter();
  const {data,status} = useSession();
  console.log(data);
  if(status =='authenticated'){
    router.push('/workflows')
  }
  return (
    <>
      <Head>
        <title>SyncPath - Streamline Your Workflows</title>
        <meta name="description" content="SyncPath: Simplifying team collaboration and task management." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">SyncPath</h1>
            <nav>
              <ul className="flex space-x-6">
                <li><a href="#features" className="text-gray-600 hover:text-gray-900">Features</a></li>
                <li><a href="#about" className="text-gray-600 hover:text-gray-900">About</a></li>
                <li><a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a></li>
                <li>
                  <Link href={'/api/auth/signin'} className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500">
                    Get Started
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex-1 flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
          <div className="text-center max-w-2xl p-10">
            <h2 className="text-4xl font-bold text-white mb-4">
              Streamline Your Team’s Workflows with SyncPath
            </h2>
            <p className="text-lg text-white mb-8">
              Simplify collaboration, task tracking, and project management with an intuitive, all-in-one solution.
            </p>
            <a
              href="#features"
              className="inline-block bg-white text-blue-600 py-3 px-6 rounded-md font-semibold hover:bg-gray-100"
            >
              Learn More
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-800">Features</h3>
              <p className="text-lg text-gray-600">
                SyncPath offers all the tools you need to streamline your workflows and boost productivity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Feature 1 */}
              <div className="p-6 bg-white shadow-md rounded-lg text-center">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Team Collaboration</h4>
                <p className="text-gray-600">
                  SyncPath enhances communication and ensures your team is always aligned.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-6 bg-white shadow-md rounded-lg text-center">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Task Management</h4>
                <p className="text-gray-600">
                  Stay organized with easy-to-use task and project management tools.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-6 bg-white shadow-md rounded-lg text-center">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Real-time Updates</h4>
                <p className="text-gray-600">
                  Get instant notifications and updates for better time management.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">About SyncPath</h3>
            <p className="text-lg text-gray-600">
              SyncPath is built to streamline team workflows, offering an intuitive, powerful platform for managing projects, tasks, and communication.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="bg-gray-800 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h4 className="text-2xl font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400">
              Have questions? Reach out to us at <a href="guptaditya19@gmail.com" className="text-blue-400 underline">guptaditya19@gmail.com</a>
            </p>
            <p className="text-gray-400 mt-4">© 2024 SyncPath. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

