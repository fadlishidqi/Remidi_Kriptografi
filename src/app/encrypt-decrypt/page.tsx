import Link from "next/link"
import { ArrowRight, Lock, Unlock, Info, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="border-b border-zinc-100 sticky top-0 z-10 bg-white/80 backdrop-blur-sm">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="text-xl font-medium tracking-tight">
            RSA<span className="text-emerald-600">Crypto</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-zinc-900 hover:text-emerald-600 transition-colors">
              Beranda
            </Link>
            <Link
              href="/encrypt-decrypt"
              className="text-sm font-medium text-zinc-900 hover:text-emerald-600 transition-colors"
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
                className="lucide lucide-menu"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-24 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium mb-4">
                Keamanan Data Modern
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 leading-tight">
                Amankan Pesan Anda dengan <span className="text-emerald-600">Kriptografi RSA</span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto">
                Enkripsi dan dekripsi pesan dengan algoritma kriptografi kunci publik yang aman dan terpercaya.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/encrypt-decrypt">
                  <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white rounded-full h-12 px-8 transition-all">
                    Mulai Enkripsi
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto rounded-full h-12 px-8 border-zinc-200 hover:bg-zinc-50 transition-all"
                  >
                    Pelajari RSA
                    <Info className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-zinc-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 flex flex-col items-center text-center transition-all hover:shadow-md hover:border-emerald-100">
                <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
                  <Lock className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-medium mb-3 text-zinc-900">Enkripsi Pesan</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Enkripsi pesan Anda menggunakan kunci publik RSA untuk menjaga kerahasiaan informasi.
                </p>
                <Link
                  href="/encrypt-decrypt"
                  className="mt-6 inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700"
                >
                  Coba Enkripsi
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 flex flex-col items-center text-center transition-all hover:shadow-md hover:border-emerald-100">
                <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                  <Unlock className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium mb-3 text-zinc-900">Dekripsi Pesan</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Dekripsi pesan terenkripsi menggunakan kunci privat RSA untuk membaca pesan asli.
                </p>
                <Link
                  href="/encrypt-decrypt?tab=decrypt"
                  className="mt-6 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Coba Dekripsi
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 flex flex-col items-center text-center transition-all hover:shadow-md hover:border-emerald-100">
                <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center mb-6">
                  <Info className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-medium mb-3 text-zinc-900">Pelajari RSA</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Pelajari cara kerja algoritma RSA, termasuk matematika di balik keamanannya.
                </p>
                <Link
                  href="/about"
                  className="mt-6 inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-700"
                >
                  Baca Selengkapnya
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">
                  Keunggulan RSA
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">
                  Mengapa Menggunakan Kriptografi RSA?
                </h2>
                <p className="text-zinc-500 leading-relaxed">
                  RSA adalah salah satu algoritma kriptografi kunci publik yang paling banyak digunakan dan terpercaya
                  di dunia. Dikembangkan pada tahun 1977, RSA tetap menjadi standar keamanan untuk komunikasi digital.
                </p>

                <div className="space-y-4 pt-4">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-emerald-600"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-zinc-900 mb-1">Keamanan Tinggi</h3>
                      <p className="text-sm text-zinc-500">
                        Didasarkan pada masalah faktorisasi bilangan prima yang sangat sulit dipecahkan.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-emerald-600"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-zinc-900 mb-1">Kunci Publik & Privat</h3>
                      <p className="text-sm text-zinc-500">
                        Memungkinkan enkripsi dengan kunci publik dan dekripsi hanya dengan kunci privat.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-emerald-600"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-zinc-900 mb-1">Standar Industri</h3>
                      <p className="text-sm text-zinc-500">
                        Digunakan secara luas dalam SSL/TLS, tanda tangan digital, dan sistem keamanan.
                      </p>
                    </div>
                  </div>
                </div>

                <Link href="/about">
                  <Button variant="link" className="text-emerald-600 hover:text-emerald-700 p-0 h-auto font-medium">
                    Pelajari lebih lanjut tentang RSA
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl transform rotate-3 opacity-70"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-sm border border-zinc-100">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                    </div>
                    <div className="text-xs text-zinc-400">RSA Encryption</div>
                  </div>

                  <div className="space-y-4 font-mono text-sm">
                    <div className="bg-zinc-50 p-3 rounded-lg">
                      <div className="text-zinc-400"># Generate RSA key pair</div>
                      <div className="text-emerald-600">
                        generateRSAKeyPair()<span className="text-zinc-800">;</span>
                      </div>
                    </div>

                    <div className="bg-zinc-50 p-3 rounded-lg">
                      <div className="text-zinc-400"># Encrypt message</div>
                      <div className="text-blue-600">
                        encryptRSA<span className="text-zinc-800">(message, publicKey);</span>
                      </div>
                    </div>

                    <div className="bg-zinc-50 p-3 rounded-lg">
                      <div className="text-zinc-400"># Decrypt message</div>
                      <div className="text-amber-600">
                        decryptRSA<span className="text-zinc-800">(ciphertext, privateKey);</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-zinc-100 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
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
  )
}
