import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 sm:py-32">
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-8 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
            Social Media Analytics
          </h1>
          
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Track followers, likes, and shares across platforms with beautiful visualizations, 
            real-time insights, and powerful analytics tools.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="/auth/register" 
              className="group inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <span>Get Started Free</span>
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a 
              href="/auth/login" 
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/80 backdrop-blur-sm text-gray-900 font-semibold border border-gray-200 hover:bg-white hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Sign In
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to grow
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful analytics tools designed for modern social media management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/80 hover:shadow-xl transition-all duration-300 animate-slide-in">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-time Analytics</h3>
            <p className="text-gray-600 leading-relaxed">
              Monitor your social media performance with live data updates and comprehensive metrics across all platforms.
            </p>
          </div>

          <div className="group p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/80 hover:shadow-xl transition-all duration-300 animate-slide-in" style={{animationDelay: '0.1s'}}>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Multi-Platform Support</h3>
            <p className="text-gray-600 leading-relaxed">
              Connect and analyze data from YouTube, Instagram, Twitter, LinkedIn, and more in one unified dashboard.
            </p>
          </div>

          <div className="group p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/80 hover:shadow-xl transition-all duration-300 animate-slide-in" style={{animationDelay: '0.2s'}}>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Export & Reports</h3>
            <p className="text-gray-600 leading-relaxed">
              Generate detailed reports and export your data in CSV or PDF format for presentations and analysis.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
