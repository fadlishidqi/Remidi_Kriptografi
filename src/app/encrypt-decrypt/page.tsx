"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Lock, Unlock, Copy, RefreshCw } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function EncryptDecryptPage() {
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab") || "encrypt"

  // State
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [publicKey, setPublicKey] = useState("")
  const [privateKey, setPrivateKey] = useState("")
  const [isGeneratingKeys, setIsGeneratingKeys] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Generate Keys function (mock)
  const handleGenerateKeys = () => {
    setIsGeneratingKeys(true)
    setTimeout(() => {
      setPublicKey("Generated Public Key would appear here...")
      setPrivateKey("Generated Private Key would appear here...")
      setIsGeneratingKeys(false)
    }, 1000)
  }

  // Process function (mock)
  const handleProcess = (action: "encrypt" | "decrypt") => {
    setIsProcessing(true)
    setTimeout(() => {
      if (action === "encrypt") {
        setOutputText(`Encrypted version of: ${inputText}`)
      } else {
        setOutputText(`Decrypted version of: ${inputText}`)
      }
      setIsProcessing(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-zinc-100 sticky top-0 z-10 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl flex items-center justify-between py-4 px-4 sm:px-6">
          <a href="/" className="text-xl font-medium tracking-tight">
            RSA<span className="text-emerald-600">Crypto</span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            <a href="/" className="text-sm font-medium text-zinc-500 hover:text-emerald-600 transition-colors">
              Beranda
            </a>
            <a
              href="/encrypt-decrypt"
              className="text-sm font-medium text-zinc-900 hover:text-emerald-600 transition-colors"
            >
              Enkripsi/Dekripsi
            </a>
            <a href="/about" className="text-sm font-medium text-zinc-500 hover:text-emerald-600 transition-colors">
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

      <main className="py-12 md:py-16 lg:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-6">
              Enkripsi & Dekripsi RSA
            </h1>
            <p className="text-lg text-zinc-600 mb-10">
              Enkripsi dan dekripsi pesan Anda dengan algoritma kriptografi RSA yang aman. Generate pasangan kunci baru
              atau gunakan kunci yang sudah ada.
            </p>

            <div className="mb-12">
              <h2 className="text-xl font-bold text-zinc-900 mb-4">Pasangan Kunci RSA</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-zinc-700">Kunci Publik</label>
                  <textarea
                    className="w-full min-h-[100px] p-3 rounded-lg border border-zinc-200 text-sm font-mono"
                    placeholder="Masukkan kunci publik RSA Anda..."
                    value={publicKey}
                    onChange={(e) => setPublicKey(e.target.value)}
                  ></textarea>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-zinc-700">Kunci Privat</label>
                  <textarea
                    className="w-full min-h-[100px] p-3 rounded-lg border border-zinc-200 text-sm font-mono"
                    placeholder="Masukkan kunci privat RSA Anda..."
                    value={privateKey}
                    onChange={(e) => setPrivateKey(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <Button
                onClick={handleGenerateKeys}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                disabled={isGeneratingKeys}
              >
                {isGeneratingKeys ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Generate New Key Pair
                  </>
                )}
              </Button>
            </div>

            <Tabs defaultValue={tab} className="space-y-6">
              <TabsList className="w-full grid grid-cols-2 bg-zinc-100 p-1 rounded-lg">
                <TabsTrigger
                  value="encrypt"
                  className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-md py-2"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Enkripsi
                </TabsTrigger>
                <TabsTrigger
                  value="decrypt"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md py-2"
                >
                  <Unlock className="mr-2 h-4 w-4" />
                  Dekripsi
                </TabsTrigger>
              </TabsList>

              <TabsContent value="encrypt" className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-zinc-700">Pesan Asli</label>
                  <textarea
                    className="w-full min-h-[150px] p-4 rounded-lg border border-zinc-200"
                    placeholder="Ketik atau tempel pesan yang ingin dienkripsi..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  ></textarea>
                </div>

                <Button
                  onClick={() => handleProcess("encrypt")}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg py-3"
                  disabled={isProcessing || !inputText || !publicKey}
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Enkripsi...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-5 w-5" />
                      Enkripsi Pesan
                    </>
                  )}
                </Button>

                {outputText && (
                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="block text-sm font-medium text-zinc-700">Hasil Enkripsi</label>
                      <Button variant="ghost" size="sm" className="h-8 text-emerald-600">
                        <Copy className="mr-1 h-3 w-3" />
                        <span className="text-xs">Copy</span>
                      </Button>
                    </div>
                    <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-100 break-all font-mono text-sm">
                      {outputText}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="decrypt" className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-zinc-700">Pesan Terenkripsi</label>
                  <textarea
                    className="w-full min-h-[150px] p-4 rounded-lg border border-zinc-200"
                    placeholder="Ketik atau tempel pesan terenkripsi yang ingin didekripsi..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  ></textarea>
                </div>

                <Button
                  onClick={() => handleProcess("decrypt")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3"
                  disabled={isProcessing || !inputText || !privateKey}
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Dekripsi...
                    </>
                  ) : (
                    <>
                      <Unlock className="mr-2 h-5 w-5" />
                      Dekripsi Pesan
                    </>
                  )}
                </Button>

                {outputText && (
                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="block text-sm font-medium text-zinc-700">Hasil Dekripsi</label>
                      <Button variant="ghost" size="sm" className="h-8 text-blue-600">
                        <Copy className="mr-1 h-3 w-3" />
                        <span className="text-xs">Copy</span>
                      </Button>
                    </div>
                    <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-100 break-all font-mono text-sm">
                      {outputText}
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
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
