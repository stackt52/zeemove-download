"use client";

import { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

export default function Home() {
  const [zeemoveUrl, setZeemoveUrl] = useState<string>("#");
  const [zampostUrl, setZampostUrl] = useState<string>("#");

  useEffect(() => {
    const fetchUrls = async () => {
      console.log("Fetching APK URLs...");
      try {
        if (!storage.app.options.storageBucket) {
          console.error("Firebase Storage bucket is not configured. Check your environment variables.");
          return;
        }

        const zeemoveRef = ref(storage, "agent_uat_release.apk");
        const zampostRef = ref(storage, "customer_uat_app.apk");

        const [zeemoveDownloadUrl, zampostDownloadUrl] = await Promise.all([
          getDownloadURL(zeemoveRef),
          getDownloadURL(zampostRef),
        ]);

        console.log("Fetched ZeeMove URL:", zeemoveDownloadUrl);
        console.log("Fetched Zampost URL:", zampostDownloadUrl);

        setZeemoveUrl(zeemoveDownloadUrl);
        setZampostUrl(zampostDownloadUrl);
      } catch (error) {
        console.error("Error fetching APK download URLs:", error);
      }
    };

    fetchUrls();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-zinc-950 dark:text-zinc-100 font-sans">
      <div className="fixed inset-0 z-0 w-full h-full bg-center bg-cover opacity-60" style={{ backgroundImage: "url('images/bg.jpg')" }}></div>
      <div className="fixed inset-0 z-0 bg-white" style={{transform: "rotate(-30deg)", top: "-50%", left: "-25%", width: "140%", height: "130%"}}></div>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">Z</div>
            <span className="text-xl font-bold tracking-tight">ZeeMove</span>
          </div>
          <div className="hidden space-x-8 md:flex">
            <a href="#zeemove" className="text-sm font-medium hover:text-blue-600 transition-colors">ZeeMove Rider</a>
            <a href="#zampost" className="text-sm font-medium hover:text-blue-600 transition-colors">Zampost Express</a>
          </div>
        </div>
      </nav>

      <main className="z-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">
                The Future of Logistics and <span className="text-blue-600">Mobility</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-zinc-400">
                Download our official apps to start riding or sending parcels with ease. 
                Reliable, fast, and built for your convenience.
              </p>
            </div>
          </div>
        </section>

        {/* Apps Section */}
        <section className="py-20 bg-white dark:bg-zinc-900">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
              
              {/* ZeeMove Rider App */}
              <div id="zeemove" className="relative flex flex-col bg-white/80 backdrop-blur-md justify-between rounded-3xl border border-gray-200 p-8 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
                <div>
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/30">
                    <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">ZeeMove Rider</h2>
                  <p className="text-gray-600 dark:text-zinc-400 mb-8 leading-relaxed">
                    Join our fleet of professional riders. The ZeeMove Rider app allows you to accept ride orders, navigate efficiently, and earn on your own schedule. Perfect for anyone looking to provide reliable transport services.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {["Real-time order notifications", "Integrated navigation", "Earning tracking", "Flexible schedule"].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-gray-600 dark:text-zinc-400">
                        <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={zeemoveUrl}
                  className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-blue-600 text-white font-semibold transition-all hover:bg-blue-700 active:scale-95"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.523 15.3414c-.5511 0-.9993.4486-.9993.9997 0 .5511.4482.9997.9993.9997.5511 0 .9993-.4486.9993-.9997 0-.5511-.4482-.9997-.9993-.9997zm-11.046 0c-.5511 0-.9993.4486-.9993.9997 0 .5511.4482.9997.9993.9997.5511 0 .9993-.4486.9993-.9997 0-.5511-.4482-.9997-.9993-.9997zm11.4045-3.3218l1.1116-1.9254c.0506-.0876.0206-.1994-.067-.2498-.0874-.0506-.1994-.0204-.2498.0672l-1.1272 1.9525c-1.0776-.4928-2.2855-.7744-3.5491-.7744s-2.4715.2816-3.5491.7744l-1.1272-1.9525c-.0504-.0876-.1624-.1178-.2498-.0672-.0876.0504-.1176.1622-.067.2498l1.1116 1.9254c-2.4468 1.3094-4.148 3.7788-4.3854 6.6908h16.485c-.2374-2.912-1.9386-5.3814-4.3854-6.6908z" />
                  </svg>
                  Download ZeeMove APK
                </a>
              </div>

              {/* Zampost Express App */}
              <div id="zampost" className="relative bg-white/80 backdrop-blur-md flex flex-col justify-between rounded-3xl border border-gray-200 p-8 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
                <div>
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 dark:bg-orange-900/30">
                    <svg className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Zampost Express</h2>
                  <p className="text-gray-600 dark:text-zinc-400 mb-8 leading-relaxed">
                    The easiest way to send and track your parcels. Zampost Express connects customers with reliable courier services for quick pick-up and delivery. Manage your shipments all in one place.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {["Schedule parcel pick-ups", "Real-time package tracking", "Secure payment options", "Delivery history"].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-gray-600 dark:text-zinc-400">
                        <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={zampostUrl}
                  className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-orange-600 text-white font-semibold transition-all hover:bg-orange-700 active:scale-95"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.523 15.3414c-.5511 0-.9993.4486-.9993.9997 0 .5511.4482.9997.9993.9997.5511 0 .9993-.4486.9993-.9997 0-.5511-.4482-.9997-.9993-.9997zm-11.046 0c-.5511 0-.9993.4486-.9993.9997 0 .5511.4482.9997.9993.9997.5511 0 .9993-.4486.9993-.9997 0-.5511-.4482-.9997-.9993-.9997zm11.4045-3.3218l1.1116-1.9254c.0506-.0876.0206-.1994-.067-.2498-.0874-.0506-.1994-.0204-.2498.0672l-1.1272 1.9525c-1.0776-.4928-2.2855-.7744-3.5491-.7744s-2.4715.2816-3.5491.7744l-1.1272-1.9525c-.0504-.0876-.1624-.1178-.2498-.0672-.0876.0504-.1176.1622-.067.2498l1.1116 1.9254c-2.4468 1.3094-4.148 3.7788-4.3854 6.6908h16.485c-.2374-2.912-1.9386-5.3814-4.3854-6.6908z" />
                  </svg>
                  Download Zampost APK
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-20 z-50 relative bg-white dark:bg-zinc-900">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 md:grid-cols-3">
              <div className="text-center">
                <h3 className="text-lg font-bold mb-2">Fast Delivery</h3>
                <p className="text-sm text-gray-600 dark:text-zinc-400">Our optimized routing ensures your rides and parcels reach their destination in record time.</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold mb-2">Safe & Secure</h3>
                <p className="text-sm text-gray-600 dark:text-zinc-400">We prioritize safety for both our riders and customers with verified profiles and secure payments.</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold mb-2">24/7 Support</h3>
                <p className="text-sm text-gray-600 dark:text-zinc-400">Our dedicated support team is always available to assist you with any questions or concerns.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t relative border-gray-200 z-30 bg-white py-12 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm text-gray-500 dark:text-zinc-500">
            © {new Date().getFullYear()} ZeeMove Logistics. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
