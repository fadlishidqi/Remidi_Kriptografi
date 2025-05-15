import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Key, Lock, Unlock, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-zinc-100 sticky top-0 z-10 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl flex items-center justify-between py-4 px-4 sm:px-6">
          <Link href="/" className="text-xl font-medium tracking-tight">
            RSA<span className="text-emerald-600">Crypto</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-zinc-500 hover:text-emerald-600 transition-colors">
              Beranda
            </Link>
            <Link
              href="/encrypt-decrypt"
              className="text-sm font-medium text-zinc-500 hover:text-emerald-600 transition-colors"
            >
              Enkripsi/Dekripsi
            </Link>
            <Link href="/about" className="text-sm font-medium text-zinc-900 hover:text-emerald-600 transition-colors">
              Tentang RSA
            </Link>
          </nav>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="text-zinc-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero section */}
        <section className="py-20 border-b border-zinc-100">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              <Link href="/" className="inline-flex items-center text-sm text-zinc-500 hover:text-emerald-600 mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Beranda
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-6">
                Kriptografi <span className="text-emerald-600">RSA</span>
              </h1>
              <p className="text-xl text-zinc-600 leading-relaxed">
                RSA (Rivest-Shamir-Adleman) adalah algoritma kriptografi kunci publik yang digunakan secara luas untuk 
                pengiriman data yang aman. Dikembangkan pada tahun 1977, RSA menjadi salah satu algoritma kriptografi 
                yang paling penting dalam sejarah keamanan informasi.
              </p>
            </div>
          </div>
        </section>

        {/* Overview section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className="max-w-3xl mx-auto space-y-16">
              {/* Concept */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-zinc-900">Konsep Dasar</h2>
                <p className="text-zinc-600 leading-relaxed">
                  RSA menggunakan sepasang kunci: kunci publik untuk enkripsi dan kunci privat untuk dekripsi. 
                  Keamanan RSA didasarkan pada kesulitan memfaktorkan hasil perkalian dua bilangan prima besar. 
                  Ini membuat RSA menjadi salah satu algoritma yang sangat aman untuk pengiriman data sensitif.
                </p>

                <div className="grid sm:grid-cols-2 gap-6 pt-4">
                  <div className="border border-zinc-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:border-emerald-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-emerald-50 p-3 rounded-lg">
                        <Lock className="h-5 w-5 text-emerald-600" />
                      </div>
                      <h3 className="font-medium text-zinc-900">Enkripsi</h3>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      Pesan dienkripsi menggunakan kunci publik penerima, 
                      sehingga hanya penerima yang dapat membacanya dengan kunci privat.
                    </p>
                  </div>

                  <div className="border border-zinc-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:border-emerald-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <Unlock className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="font-medium text-zinc-900">Dekripsi</h3>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      Pesan terenkripsi didekripsi menggunakan kunci privat penerima 
                      untuk mendapatkan pesan asli yang dapat dibaca.
                    </p>
                  </div>
                </div>
              </div>

              {/* How it works */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-zinc-900">Cara Kerja RSA</h2>
                <p className="text-zinc-600 leading-relaxed">
                  RSA bekerja berdasarkan prinsip matematika yang kuat, khususnya teori bilangan. 
                  Proses kriptografi RSA melibatkan pembangkitan kunci, enkripsi, dan dekripsi.
                </p>

                <div className="space-y-4 mt-8">
                  <div className="border-l-2 border-emerald-500 pl-6 py-2">
                    <h3 className="font-medium text-zinc-900 mb-2">1. Pembangkitan Kunci</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      Pilih dua bilangan prima besar p dan q, hitung n = p × q dan φ(n) = (p-1) × (q-1).
                      Pilih e sehingga gcd(e, φ(n)) = 1, kemudian hitung d sehingga d × e ≡ 1 (mod φ(n)).
                      Kunci publik adalah (n, e) dan kunci privat adalah (n, d).
                    </p>
                  </div>

                  <div className="border-l-2 border-blue-500 pl-6 py-2">
                    <h3 className="font-medium text-zinc-900 mb-2">2. Enkripsi</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      Untuk pesan m, enkripsi dilakukan dengan menghitung c = m^e mod n, 
                      di mana c adalah ciphertext atau pesan terenkripsi.
                    </p>
                  </div>

                  <div className="border-l-2 border-purple-500 pl-6 py-2">
                    <h3 className="font-medium text-zinc-900 mb-2">3. Dekripsi</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      Untuk ciphertext c, dekripsi dilakukan dengan menghitung m = c^d mod n,
                      di mana m adalah pesan asli.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mathematical basis */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-zinc-900">Dasar Matematika</h2>
                <p className="text-zinc-600 leading-relaxed">
                  Keamanan RSA didasarkan pada kesulitan memfaktorkan hasil perkalian dua bilangan prima besar. 
                  Ini melibatkan beberapa konsep matematika penting.
                </p>

                <div className="grid gap-6 sm:grid-cols-2 mt-8">
                  <div className="bg-zinc-50 p-6 rounded-xl">
                    <h3 className="text-lg font-medium text-zinc-900 mb-3">Teorema Euler</h3>
                    <p className="text-sm text-zinc-600 leading-relaxed">
                      Jika a dan n adalah bilangan bulat yang relatif prima, maka a^φ(n) ≡ 1 (mod n).
                      RSA menggunakan teorema ini untuk memastikan bahwa enkripsi dan dekripsi berfungsi.
                    </p>
                  </div>

                  <div className="bg-zinc-50 p-6 rounded-xl">
                    <h3 className="text-lg font-medium text-zinc-900 mb-3">Fungsi Euler's Totient</h3>
                    <p className="text-sm text-zinc-600 leading-relaxed">
                      Fungsi φ(n) menghitung jumlah bilangan bulat positif kurang dari n yang relatif prima dengan n.
                      Untuk dua bilangan prima p dan q, φ(p × q) = (p - 1) × (q - 1).
                    </p>
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-zinc-900">Keamanan RSA</h2>
                <p className="text-zinc-600 leading-relaxed">
                  Keamanan RSA bergantung pada beberapa faktor penting, termasuk panjang kunci dan implementasinya.
                </p>

                <div className="border border-zinc-100 rounded-xl p-6 shadow-sm mt-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="bg-amber-50 p-3 rounded-lg mt-1">
                      <Shield className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-zinc-900 mb-2">Praktik Terbaik Keamanan</h3>
                      <ul className="space-y-2 text-sm text-zinc-500">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span>Gunakan kunci minimal 2048-bit untuk keamanan modern</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span>Gunakan padding yang aman seperti OAEP untuk mencegah serangan</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span>Implementasikan kriptografi RSA dengan library yang teruji dan aman</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span>Perbarui kunci secara berkala untuk meningkatkan keamanan</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span>Kombinasikan dengan algoritma simetris untuk enkripsi data berukuran besar</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Applications */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-zinc-900">Aplikasi RSA</h2>
                <p className="text-zinc-600 leading-relaxed">
                  RSA digunakan secara luas dalam berbagai aplikasi keamanan informasi modern.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                  {[
                    { title: "SSL/TLS", desc: "Enkripsi koneksi web aman" },
                    { title: "Tanda Tangan Digital", desc: "Verifikasi keaslian dokumen" },
                    { title: "Email Aman", desc: "Enkripsi komunikasi email" },
                    { title: "Sistem Pembayaran", desc: "Keamanan transaksi keuangan" },
                    { title: "Smart Cards", desc: "Identifikasi dan autentikasi" },
                    { title: "VPN", desc: "Koneksi jaringan privat virtual" },
                  ].map((item, index) => (
                    <div key={index} className="border border-zinc-100 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <h4 className="font-medium text-zinc-900 mb-1">{item.title}</h4>
                      <p className="text-xs text-zinc-500">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* CTA */}
              <div className="border-t border-zinc-100 pt-16 text-center">
                <h2 className="text-2xl font-bold text-zinc-900 mb-4">Coba Enkripsi RSA Sekarang</h2>
                <p className="text-zinc-600 mb-8">
                  Praktikkan pemahaman Anda tentang RSA dengan mencoba fitur enkripsi dan dekripsi kami
                </p>
                <Link href="/encrypt-decrypt">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full h-12 px-8 transition-all">
                    Mulai Enkripsi
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-100 py-12 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start">
              <Link href="/" className="text-xl font-medium tracking-tight mb-2">
                RSA<span className="text-emerald-600">Crypto</span>
              </Link>
              <p className="text-sm text-zinc-500">Keamanan data dengan kriptografi kunci publik</p>
            </div>

            <div className="flex gap-8">
              <Link href="/" className="text-sm text-zinc-500 hover:text-emerald-600 transition-colors">
                Beranda
              </Link>
              <Link href="/encrypt-decrypt" className="text-sm text-zinc-500 hover:text-emerald-600 transition-colors">
                Enkripsi/Dekripsi
              </Link>
              <Link href="/about" className="text-sm text-zinc-500 hover:text-emerald-600 transition-colors">
                Tentang RSA
              </Link>
            </div>

            <div className="text-sm text-zinc-400">
              &copy; {new Date().getFullYear()} RSACrypto. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}