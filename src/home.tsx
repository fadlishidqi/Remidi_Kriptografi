"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Lock, Unlock, Info, ChevronRight, Shield, Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const ENCRYPTED_ANIMATION = [
  "7f2e3b1a8c6d4e5f9b8a7c6d5e4f3a2b",
  "a8b7c6d5e4f3a2b17f2e3b1a8c6d4e5f",
  "d4e5f3a2b7f2e3b1a8c6d5e4f3a2b9b8",
  "b1a8c6d4e5f7f2e3b1a8c6d5e4f3a2b9",
];

function useTypewriterLoop(texts: string[], speed = 50, pause = 700) {
  const [text, setText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!deleting) {
      if (charIndex < texts[textIndex].length) {
        timeout = setTimeout(() => {
          setText((t) => t + texts[textIndex][charIndex]);
          setCharIndex((c) => c + 1);
        }, speed);
      } else {
        timeout = setTimeout(() => setDeleting(true), pause);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setText((t) => t.slice(0, -1));
          setCharIndex((c) => c - 1);
        }, speed / 2);
      } else {
        setDeleting(false);
        setTextIndex((i) => (i + 1) % texts.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, texts, textIndex, speed, pause]);

  useEffect(() => {
    setCharIndex(0);
    setText("");
  }, [textIndex, texts]);

  return text;
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const typedText = useTypewriterLoop(ENCRYPTED_ANIMATION, 40, 900);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-zinc-100 sticky top-0 z-10 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl flex items-center justify-between py-4 px-4 sm:px-6">
          <a href="/" className="text-xl font-medium tracking-tight">
            RSA<span className="text-emerald-600">Crypto</span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            <a href="/" className="text-sm font-medium text-zinc-900 hover:text-emerald-600 transition-colors">
              Beranda
            </a>
            <a
              href="/encrypt-decrypt"
              className="text-sm font-medium text-zinc-900 hover:text-emerald-600 transition-colors"
            >
              Enkripsi/Dekripsi
            </a>
            <a href="/about" className="text-sm font-medium text-zinc-900 hover:text-emerald-600 transition-colors">
              Tentang RSA
            </a>
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

      <main className="flex-1">
        {/* Hero section - New Design */}
        <div className="relative overflow-hidden bg-gradient-to-b from-white to-zinc-50">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.15]" />

          <div className="container relative mx-auto max-w-7xl pt-20 pb-16 md:pt-24 md:pb-20 lg:pt-32 lg:pb-24 px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600">
                  <Shield className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Keamanan Data Modern</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 leading-tight">
                  Amankan Pesan Anda dengan <span className="text-emerald-600">Kriptografi RSA</span>
                </h1>

                <p className="text-xl text-zinc-500 max-w-xl">
                  Enkripsi dan dekripsi pesan dengan algoritma kriptografi kunci publik yang aman dan terpercaya.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Link href="/encrypt-decrypt" className="flex items-center">
                      <Lock className="mr-2 h-4 w-4" /> Mulai Enkripsi
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-zinc-200 hover:bg-zinc-50">
                    <Link href="/about" className="flex items-center">
                      <Info className="mr-2 h-4 w-4" /> Pelajari RSA
                    </Link>
                  </Button>
                </div>

                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white bg-emerald-100 flex items-center justify-center text-xs font-medium text-emerald-600"
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                  <span>Bergabung dengan ribuan pengguna yang mengamankan data mereka dengan RSA</span>
                </div>
              </div>

              <div className="relative hidden lg:block">
                <div className="relative">
                  <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-emerald-200 to-blue-200 blur opacity-60" />
                  <div className="relative rounded-xl bg-white border border-zinc-100 p-6 overflow-hidden shadow-lg">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full -mr-16 -mt-16 blur-2xl" />
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-6">
                        <div className="bg-emerald-50 p-2 rounded-lg">
                          <Key className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div className="text-sm font-medium">RSA Encryption Demo</div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-xs text-zinc-500">Pesan</div>
                        <div className="bg-zinc-50 rounded-md p-3 font-mono text-sm">
                          Hello, RSA encryption!
                        </div>
                      </div>

                      <div className="flex gap-4 text-center">
                        <div className="flex-1">
                          <div className="text-xs text-zinc-500">Public Key (e)</div>
                          <div className="bg-zinc-50/60 rounded-md p-2 font-mono text-xs mt-1 truncate">
                            65537
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-zinc-500">Modulus (n)</div>
                          <div className="bg-zinc-50/60 rounded-md p-2 font-mono text-xs mt-1 truncate">
                            83f...23a1
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-xs text-zinc-500">Terenkripsi</div>
                        <div className="bg-emerald-50 border border-emerald-100 rounded-md p-3 font-mono text-xs overflow-hidden h-[30px]">
                          <span>{typedText}</span>
                          <span className="animate-pulse text-emerald-600">|</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features section */}
        <section className="py-16 bg-zinc-50">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {/* Enkripsi Pesan */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 flex flex-col h-full items-center text-center transition-all hover:shadow-md hover:border-emerald-100">
                <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
                  <Lock className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-medium mb-3 text-zinc-900">Enkripsi Pesan</h3>
                <p className="text-zinc-500 text-sm leading-relaxed flex-grow">
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

              {/* Dekripsi Pesan */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 flex flex-col h-full items-center text-center transition-all hover:shadow-md hover:border-blue-100">
                <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                  <Unlock className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium mb-3 text-zinc-900">Dekripsi Pesan</h3>
                <p className="text-zinc-500 text-sm leading-relaxed flex-grow">
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

              {/* Pelajari RSA */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 flex flex-col h-full items-center text-center transition-all hover:shadow-md hover:border-amber-100">
                <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center mb-6">
                  <Info className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-medium mb-3 text-zinc-900">Pelajari RSA</h3>
                <p className="text-zinc-500 text-sm leading-relaxed flex-grow">
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

        {/* Why RSA section */}
        <section className="py-16 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
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

                <div className="space-y-5 pt-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-1">
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

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-1">
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

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-1">
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

      {/* Footer */}
      <footer className="border-t border-zinc-100 py-12 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start">
              <a href="/" className="text-xl font-medium tracking-tight mb-2">
                RSA<span className="text-emerald-600">Crypto</span>
              </a>
              <p className="text-sm text-zinc-500">Keamanan data dengan kriptografi kunci publik</p>
            </div>

            <div className="flex gap-8">
              <a href="/" className="text-sm text-zinc-500 hover:text-emerald-600 transition-colors">
                Beranda
              </a>
              <a href="/encrypt-decrypt" className="text-sm text-zinc-500 hover:text-emerald-600 transition-colors">
                Enkripsi/Dekripsi
              </a>
              <a href="/about" className="text-sm text-zinc-500 hover:text-emerald-600 transition-colors">
                Tentang RSA
              </a>
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