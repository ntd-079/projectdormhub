import React, { useState } from 'react';

export default function Home() {
  const [dormType, setDormType] = useState('all');
  const [roomType, setRoomType] = useState('all');
  const [price, setPrice] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-background text-on-background min-h-screen">
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-outline-variant/30">
        <nav className="flex justify-between items-center w-full px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-2xl font-bold text-primary cursor-pointer hover:opacity-90 transition-opacity">
            DormHub
          </div>
          <div className="hidden md:flex items-center gap-2">
            <a className="relative group px-5 py-2 rounded-full text-primary font-semibold bg-primary/10 shadow-[0_0_20px_rgba(55,85,195,0.35)] transition-all duration-300 ease-out active:scale-95 overflow-hidden" href="/pages/home.html">
              <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-100 transition-opacity duration-300 blur-sm"></span>
              <span className="relative z-10">Home</span>
            </a>
            <a className="relative group px-5 py-2 rounded-full text-slate-600 font-medium hover:text-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(55,85,195,0.35)] transition-all duration-300 ease-out active:scale-95 overflow-hidden" href="/pages/explore.html">
              <span className="relative z-10">Explore</span>
            </a>
            <a className="relative group px-5 py-2 rounded-full text-slate-600 font-medium hover:text-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(55,85,195,0.35)] transition-all duration-300 ease-out active:scale-95 overflow-hidden" href="/pages/search.html">
              <span className="relative z-10">Search</span>
            </a>
            <a className="relative group px-5 py-2 rounded-full text-slate-600 font-medium hover:text-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(55,85,195,0.35)] transition-all duration-300 ease-out active:scale-95 overflow-hidden" href="/pages/about.html">
              <span className="relative z-10">About</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center bg-slate-200/60 rounded-full px-4 py-2">
              <span className="material-symbols-outlined text-slate-400 mr-2">search</span>
              <input 
                className="bg-transparent border-none focus:ring-0 text-sm w-32 placeholder:text-slate-400 outline-none"
                placeholder="Search..." 
                type="text" 
              />
            </div>
            <button className="bg-primary text-white px-6 py-2 rounded-lg font-medium active:scale-95 transition-transform duration-150 shadow-sm hover:bg-primary/90">
              Login
            </button>
          </div>
        </nav>
      </header>

      <main className="pt-32 md:pt-40">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 md:px-10 overflow-hidden">
          <div className="relative z-10 w-full max-w-7xl grid lg:grid-cols-2 gap-10 items-center pt-4 md:pt-10">
            <div className="space-y-6 text-center lg:text-left">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
                  Find Your Perfect <span className="text-primary">Student Home</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-lg mx-auto lg:mx-0">
                  Discover dormitories that fit your budget, lifestyle, and university life. DormHub connects you to high-quality housing across the city.
                </p>
              </div>

              {/* Unified White Box Search & Filter Container */}
              <div className="bg-white/90 backdrop-blur-md p-4 md:p-5 rounded-2xl shadow-xl max-w-4xl w-full mx-auto lg:mx-0 border border-slate-200/80 space-y-4">
                {/* Filters Row */}
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 pb-3 border-b border-slate-100 overflow-x-auto">
                  {/* Dormitory Type Filter */}
                  <div className="flex-1 min-w-[160px] flex items-center gap-1.5 px-3 h-10 bg-transparent rounded-xl border border-slate-200 text-sm hover:border-primary/50 transition-all group">
                    <span className="material-symbols-outlined text-primary text-lg group-hover:scale-110 transition-transform">home_work</span>
                    <select 
                      value={dormType}
                      onChange={(e) => setDormType(e.target.value)}
                      className="bg-transparent border-none focus:ring-0 text-sm p-0 font-medium text-slate-700 cursor-pointer outline-none w-full"
                    >
                      <option value="all">Dormitory type</option>
                      <option value="female">Female Only (หอพักหญิง)</option>
                      <option value="male">Male Only (หอพักชาย)</option>
                      <option value="coed">Co-ed / Mixed (หอพักรวม)</option>
                    </select>
                  </div>

                  {/* Room Type Filter */}
                  <div className="flex-1 min-w-[150px] flex items-center gap-1.5 px-3 h-10 bg-transparent rounded-xl border border-slate-200 text-sm hover:border-primary/50 transition-all group">
                    <span className="material-symbols-outlined text-primary text-lg group-hover:scale-110 transition-transform">bed</span>
                    <select 
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value)}
                      className="bg-transparent border-none focus:ring-0 text-sm p-0 font-medium text-slate-700 cursor-pointer outline-none w-full"
                    >
                      <option value="all">Room type</option>
                      <option value="fan">Fan Room (ห้องพัดลม)</option>
                      <option value="ac">AC Room (ห้องแอร์)</option>
                    </select>
                  </div>

                  {/* Price Filter */}
                  <div className="flex-1 min-w-[160px] flex items-center gap-2 shrink-0">
                    <div className="flex-1 flex items-center gap-1.5 px-3 h-10 bg-transparent rounded-xl border border-slate-200 text-sm hover:border-primary/50 transition-all group">
                      <span className="material-symbols-outlined text-primary text-lg group-hover:scale-110 transition-transform">payments</span>
                      <select 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="bg-transparent border-none focus:ring-0 text-sm p-0 font-medium text-slate-700 cursor-pointer outline-none w-full"
                      >
                        <option value="all">Price</option>
                        <option value="under3000">Under ฿3,000</option>
                        <option value="3000-5000">฿3,000 - ฿5,000</option>
                        <option value="5000-8000">฿5,000 - ฿8,000</option>
                        <option value="above8000">Above ฿8,000</option>
                      </select>
                    </div>

                    <button type="button" className="flex items-center justify-center w-10 h-10 bg-transparent hover:bg-slate-50/80 rounded-xl border border-slate-200 text-primary hover:border-primary/50 transition-all active:scale-95 shrink-0">
                      <span className="material-symbols-outlined text-xl">tune</span>
                    </button>
                  </div>
                </div>

                {/* Search Row */}
                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <div className="flex-1 relative flex items-center bg-slate-100/70 hover:bg-slate-100 backdrop-blur-sm rounded-xl px-4 py-3 border border-slate-200/70 focus-within:bg-white focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                    <span className="material-symbols-outlined text-primary mr-3 text-2xl">search</span>
                    <input 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent border-none focus:ring-0 text-base w-full placeholder:text-slate-400 outline-none text-slate-800"
                      placeholder="Dormitory name, university, or location..." 
                      type="text" 
                    />
                  </div>
                  <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 shrink-0">
                    <span className="material-symbols-outlined text-xl">search</span>
                    <span>Search</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Campus Image Illustration */}
            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 bg-primary/15 blur-3xl rounded-3xl"></div>
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/40 group">
                <img 
                  alt="KMITL Campus" 
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1200&auto=format&fit=crop"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Recommended Dormitories */}
        <section className="w-full max-w-7xl mx-auto px-4 md:px-10 mt-16 mb-20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Recommended for You</h2>
              <p className="text-slate-600 mt-1">Top rated stays curated based on your preferences</p>
            </div>
            <a className="group text-primary hover:text-primary font-bold text-sm flex items-center gap-2 px-4 py-2 rounded-full hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all duration-200" href="explore.html">
              <span>View All</span>
              <span className="material-symbols-outlined text-xl group-hover:translate-x-2 transition-all">arrow_forward</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Dorm Card 1 */}
            <div className="w-full group bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:border-primary/50 transition-all duration-300 cursor-pointer border border-slate-200/80">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=800&auto=format&fit=crop" 
                  alt="Skyline Residence"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">wc</span> Co-ed
                </div>
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-xl text-primary group-hover:bg-primary group-hover:text-white text-lg font-bold shadow-lg transition-colors">
                  ฿4,500/mo
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">Skyline Residence</h3>
                  <p className="text-sm text-slate-500 flex items-center gap-1 mt-1 font-medium">
                    <span className="material-symbols-outlined text-base text-primary">location_on</span> 500m from CU University
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap pt-1">
                  <span className="flex items-center gap-1 text-xs bg-slate-100 px-3 py-1 rounded-lg font-medium text-slate-600">
                    <span className="material-symbols-outlined text-sm">ac_unit</span> AC
                  </span>
                  <span className="flex items-center gap-1 text-xs bg-slate-100 px-3 py-1 rounded-lg font-medium text-slate-600">
                    <span className="material-symbols-outlined text-sm">wifi</span> Wifi
                  </span>
                  <span className="flex items-center gap-1 text-xs bg-slate-100 px-3 py-1 rounded-lg font-medium text-slate-600">
                    <span className="material-symbols-outlined text-sm">local_parking</span> Parking
                  </span>
                </div>
              </div>
            </div>

            {/* Dorm Card 2 */}
            <div className="w-full group bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:border-primary/50 transition-all duration-300 cursor-pointer border border-slate-200/80">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&auto=format&fit=crop" 
                  alt="The Hive Smart Living"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 bg-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">female</span> Female Only
                </div>
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-xl text-primary group-hover:bg-primary group-hover:text-white text-lg font-bold shadow-lg transition-colors">
                  ฿5,200/mo
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">The Hive Smart Living</h3>
                  <p className="text-sm text-slate-500 flex items-center gap-1 mt-1 font-medium">
                    <span className="material-symbols-outlined text-base text-primary">location_on</span> 200m from MU Tech
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap pt-1">
                  <span className="flex items-center gap-1 text-xs bg-slate-100 px-3 py-1 rounded-lg font-medium text-slate-600">
                    <span className="material-symbols-outlined text-sm">smart_toy</span> Smart Room
                  </span>
                  <span className="flex items-center gap-1 text-xs bg-slate-100 px-3 py-1 rounded-lg font-medium text-slate-600">
                    <span className="material-symbols-outlined text-sm">fitness_center</span> Gym
                  </span>
                </div>
              </div>
            </div>

            {/* Dorm Card 3 */}
            <div className="w-full group bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:border-primary/50 transition-all duration-300 cursor-pointer border border-slate-200/80">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop" 
                  alt="Green Garden Suites"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">male</span> Male Only
                </div>
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-xl text-primary group-hover:bg-primary group-hover:text-white text-lg font-bold shadow-lg transition-colors">
                  ฿3,800/mo
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">Green Garden Suites</h3>
                  <p className="text-sm text-slate-500 flex items-center gap-1 mt-1 font-medium">
                    <span className="material-symbols-outlined text-base text-primary">location_on</span> 1.2km from KU Center
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap pt-1">
                  <span className="flex items-center gap-1 text-xs bg-slate-100 px-3 py-1 rounded-lg font-medium text-slate-600">
                    <span className="material-symbols-outlined text-sm">park</span> Garden
                  </span>
                  <span className="flex items-center gap-1 text-xs bg-slate-100 px-3 py-1 rounded-lg font-medium text-slate-600">
                    <span className="material-symbols-outlined text-sm">pool</span> Pool
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose DormHub */}
        <section className="max-w-7xl mx-auto px-4 md:px-10 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Why Choose DormHub?</h2>
            <p className="text-slate-600 mt-2">We simplify the search so you can focus on your studies.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto">
                <span className="material-symbols-outlined text-4xl">verified_user</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Verified Listings</h3>
              <p className="text-slate-600">Every dormitory on our platform is personally verified by our team for safety and quality.</p>
            </div>
            <div className="text-center space-y-4 p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="w-16 h-16 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-600 mx-auto">
                <span className="material-symbols-outlined text-4xl">savings</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Student Discounts</h3>
              <p className="text-slate-600">Exclusive deals and lowered security deposits available only to registered students.</p>
            </div>
            <div className="text-center space-y-4 p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-600 mx-auto">
                <span className="material-symbols-outlined text-4xl">support_agent</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">24/7 Support</h3>
              <p className="text-slate-600">Our concierge service helps you handle everything from viewing to move-in day.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 md:px-10 mb-20">
          <div className="max-w-7xl mx-auto relative rounded-3xl bg-primary overflow-hidden py-16 px-6 text-center shadow-2xl">
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl font-extrabold text-white">Ready to move in?</h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Start your search today and find a place where university memories are made.
              </p>
              <button className="bg-white text-primary px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl">
                Start Search Now
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-6 py-12">
          <div className="space-y-4">
            <div className="text-2xl font-bold text-primary">DormHub</div>
            <p className="text-slate-400 text-sm">Your ultimate partner in finding the perfect student living experience.</p>
            <p className="text-xs text-slate-500 mt-6">© 2024 DormHub Inc. All rights reserved.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a className="hover:text-white transition-colors" href="#">University Partners</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Privacy Policy</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Terms of Service</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Support</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a className="hover:text-white transition-colors" href="#">Contact Us</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Help Center</a></li>
              <li><a className="hover:text-white transition-colors" href="#">FAQs</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Stay Updated</h4>
            <p className="text-slate-400 text-sm">Subscribe to our newsletter for the latest deals.</p>
            <div className="flex gap-2">
              <input 
                className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 flex-1 text-sm text-white focus:ring-2 focus:ring-primary outline-none"
                placeholder="Email address" 
                type="email"
              />
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90">
                Signup
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
