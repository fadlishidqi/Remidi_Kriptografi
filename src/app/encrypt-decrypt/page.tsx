"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Lock, Unlock, RefreshCw, AlertCircle, Key, Shield, ChevronRight, CheckCircle2 } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { generateRSAKeyPair, encryptRSA, decryptRSA } from "@/lib/rsa-utils"
import { toast, Toaster } from "sonner"
import Link from "next/link"

const ENCRYPTED_ANIMATION = [
  "7f2e3b1a8c6d4e5f9b8a7c6d5e4f3a2b",
  "a8b7c6d5e4f3a2b17f2e3b1a8c6d4e5f",
  "d4e5f3a2b7f2e3b1a8c6d5e4f3a2b9b8",
  "b1a8c6d4e5f7f2e3b1a8c6d5e4f3a2b9",
]

// Typewriter animation for encrypted output
function useTypewriterLoop(texts: string[], speed = 40, pause = 900) {
  const [text, setText] = useState("")
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (!deleting) {
      if (charIndex < texts[textIndex].length) {
        timeout = setTimeout(() => {
          setText((t) => t + texts[textIndex][charIndex])
          setCharIndex((c) => c + 1)
        }, speed)
      } else {
        timeout = setTimeout(() => setDeleting(true), pause)
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setText((t) => t.slice(0, -1))
          setCharIndex((c) => c - 1)
        }, speed / 2)
      } else {
        setDeleting(false)
        setTextIndex((i) => (i + 1) % texts.length)
      }
    }
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, texts, textIndex, speed, pause])

  useEffect(() => {
    setCharIndex(0)
    setText("")
  }, [textIndex, texts])

  return text
}

function getFriendlyErrorMessage(msg: string) {
  if (
    msg.includes('JWK member "qi"') ||
    msg.includes("base64url") ||
    msg.includes("padding")
  ) {
    return "Kunci privat yang Anda masukkan tidak valid atau tidak sesuai format. Pastikan Anda menggunakan kunci privat RSA yang benar dan tidak ada karakter yang terpotong."
  }
  if (msg.includes("Format kunci publik tidak valid") || msg.includes("key data is not a valid JWK object")) {
    return "Kunci publik yang Anda masukkan tidak valid atau tidak sesuai format. Pastikan Anda menggunakan kunci publik RSA yang benar dan tidak ada karakter yang terpotong."
  }
  if (msg.includes("Format pesan terenkripsi tidak valid")) {
    return "Format pesan terenkripsi tidak valid. Pastikan pesan yang Anda masukkan benar."
  }
  return msg
}

// Komponen animasi typewriter untuk hasil enkripsi
function TypewriterEncrypted({ value }: { value: string }) {
  const [display, setDisplay] = useState("")
  useEffect(() => {
    if (!value) return
    let i = 0
    setDisplay("")
    const interval = setInterval(() => {
      setDisplay((prev) => prev + value[i])
      i++
      if (i >= value.length) clearInterval(interval)
    }, 12)
    return () => clearInterval(interval)
  }, [value])
  return (
    <span>
      {display}
      {display.length < value.length ? <span className="animate-pulse text-emerald-600">|</span> : null}
    </span>
  )
}

export default function EncryptDecryptPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tab = searchParams.get("tab") || "encrypt"

  // State
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [publicKey, setPublicKey] = useState("")
  const [privateKey, setPrivateKey] = useState("")
  const [keySize, setKeySize] = useState<number>(2048)
  const [isGeneratingKeys, setIsGeneratingKeys] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  // Typewriter for demo encrypted output
  const typedEncrypted = useTypewriterLoop(ENCRYPTED_ANIMATION, 30, 600)

  // Handle tab change, clear output+input
  const handleTabChange = (value: string) => {
    router.push(`/encrypt-decrypt?tab=${value}`, { scroll: false })
    setInputText("")
    setOutputText("")
    setError(null)
  }

  // Generate Keys function
  const handleGenerateKeys = async () => {
    try {
      setError(null)
      setIsGeneratingKeys(true)
      setPublicKey("")
      setPrivateKey("")
      setOutputText("")
      const keys = await generateRSAKeyPair(keySize)
      setPublicKey(keys.publicKey)
      setPrivateKey(keys.privateKey)
      toast.success("Berhasil generate pasangan kunci RSA!")
    } catch (err) {
      setError(getFriendlyErrorMessage((err as Error).message))
      toast.error("Gagal generate pasangan kunci")
    } finally {
      setIsGeneratingKeys(false)
    }
  }

  // Process function
  const handleProcess = async (action: "encrypt" | "decrypt") => {
    try {
      setError(null)
      setIsProcessing(true)
      setOutputText("")
      if (action === "encrypt") {
        if (!inputText || !publicKey) throw new Error("Pesan dan kunci publik diperlukan untuk enkripsi")
        const encrypted = await encryptRSA(inputText, publicKey)
        setOutputText(encrypted)
      } else {
        if (!inputText || !privateKey) throw new Error("Pesan terenkripsi dan kunci privat diperlukan untuk dekripsi")
        const decrypted = await decryptRSA(inputText, privateKey)
        setOutputText(decrypted)
      }
      toast.success(action === "encrypt" ? "Pesan berhasil dienkripsi!" : "Pesan berhasil didekripsi!")
    } catch (err) {
      setError(getFriendlyErrorMessage((err as Error).message))
      toast.error(getFriendlyErrorMessage((err as Error).message))
    } finally {
      setIsProcessing(false)
    }
  }

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true)
        toast.success("Disalin ke clipboard!")
        setTimeout(() => setCopied(false), 1500)
      })
      .catch(() => {
        toast.error("Gagal menyalin ke clipboard")
      })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white flex flex-col">
      <Toaster richColors closeButton />

      {/* Header */}
      <header className="border-b border-zinc-100 sticky top-0 z-10 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto max-w-7xl flex items-center justify-between py-4 px-4 sm:px-6">
          <Link href="/" className="text-xl font-semibold tracking-tight flex items-center">
            <Shield className="h-6 w-6 mr-2 text-emerald-600" />
            <span>RSA<span className="text-emerald-600">Crypto</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-zinc-500 hover:text-emerald-600 transition-colors">
              Beranda
            </Link>
            <Link href="/encrypt-decrypt" className="text-sm font-medium relative text-zinc-900 hover:text-emerald-600 transition-colors">
              Enkripsi/Dekripsi
              <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-emerald-600 rounded-full"></span>
            </Link>
            <Link href="/about" className="text-sm font-medium text-zinc-500 hover:text-emerald-600 transition-colors">
              Tentang RSA
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 py-8 md:py-12 lg:py-16">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <Badge variant="outline" className="mb-4 px-3 py-1 bg-emerald-50 text-emerald-700 border-emerald-200">
              Keamanan Data
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-4">
              Enkripsi & Dekripsi RSA
            </h1>
            <p className="text-lg text-zinc-600 max-w-2xl">
              Enkripsi dan dekripsi pesan Anda dengan algoritma kriptografi RSA yang aman. Generate pasangan kunci baru atau gunakan kunci yang sudah ada.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Card: Key Pair */}
            <Card className="border-zinc-200/60 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-5 text-white">
                <div className="flex items-center">
                  <Key className="h-5 w-5 mr-2" />
                  <h2 className="text-lg font-bold">Pasangan Kunci RSA</h2>
                </div>
                <p className="text-emerald-50 text-xs mt-1">Generate pasangan kunci untuk mengenkripsi dan mendekripsi pesan Anda</p>
              </div>
              <CardContent className="p-6">
                {/* Key Size Selection */}
                <div className="mb-4">
                  <label className="block text-xs font-medium text-zinc-700 mb-2">Ukuran Kunci</label>
                  <div className="flex flex-wrap gap-2">
                    {[1024, 2048, 4096].map((size) => (
                      <label key={size} className="relative">
                        <input
                          type="radio"
                          value={size}
                          checked={keySize === size}
                          onChange={() => setKeySize(size)}
                          className="peer sr-only"
                        />
                        <div
                          className="px-3 py-2 rounded-lg border border-zinc-200 bg-white text-zinc-700 
                                      peer-checked:bg-emerald-50 peer-checked:border-emerald-200 peer-checked:text-emerald-700
                                      hover:bg-zinc-50 transition-all cursor-pointer text-xs"
                        >
                          <span>{size} bit</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-zinc-700 flex items-center">
                      <Lock className="h-3 w-3 mr-1 text-emerald-600" />
                      Kunci Publik
                    </label>
                    <div className="relative">
                      <textarea
                        className="w-full min-h-[70px] p-2 rounded border border-zinc-200 text-xs font-mono bg-zinc-50 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                        placeholder="Masukkan kunci publik RSA Anda..."
                        value={publicKey}
                        onChange={(e) => setPublicKey(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-zinc-700 flex items-center">
                      <Key className="h-3 w-3 mr-1 text-blue-600" />
                      Kunci Privat
                    </label>
                    <div className="relative">
                      <textarea
                        className="w-full min-h-[70px] p-2 rounded border border-zinc-200 text-xs font-mono bg-zinc-50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        placeholder="Masukkan kunci privat RSA Anda..."
                        value={privateKey}
                        onChange={(e) => setPrivateKey(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleGenerateKeys}
                  className="w-full mt-5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg shadow transition-all duration-200 hover:shadow"
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
                      Generate New Key Pair ({keySize} bit)
                    </>
                  )}
                </Button>
                <div className="text-xs text-zinc-400 mt-3">
                  <span>Tips: Simpan kunci privat Anda dengan aman dan jangan dibagikan.</span>
                </div>
              </CardContent>
            </Card>

            {/* Card: Encrypt/Decrypt Panel */}
            <Card className="border-zinc-200/60 shadow-lg overflow-hidden">
              <Tabs defaultValue={tab} value={tab} onValueChange={handleTabChange} className="w-full">
                <div className="border-b border-zinc-100">
                  <TabsList className="w-full grid grid-cols-2 bg-zinc-50 rounded-none p-0 h-auto">
                    <TabsTrigger
                      value="encrypt"
                      className="data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-none rounded-none py-4 border-b-2 border-transparent data-[state=active]:border-emerald-600 transition-all"
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      Enkripsi
                    </TabsTrigger>
                    <TabsTrigger
                      value="decrypt"
                      className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-none rounded-none py-4 border-b-2 border-transparent data-[state=active]:border-blue-600 transition-all"
                    >
                      <Unlock className="mr-2 h-4 w-4" />
                      Dekripsi
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="encrypt" className="p-6 space-y-6 focus:outline-none">
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">Pesan Asli</label>
                    <textarea
                      className="w-full min-h-[80px] p-3 rounded-lg border border-zinc-200 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      placeholder="Ketik atau tempel pesan yang ingin dienkripsi..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                    ></textarea>
                    <span className="text-xs text-zinc-400">Pesan ini akan dienkripsi menggunakan kunci publik RSA.</span>
                  </div>
                  <Button
                    onClick={() => handleProcess("encrypt")}
                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg py-3 shadow transition-all duration-200 hover:shadow"
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
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  {outputText && (
                    <div className="mt-8 space-y-2 animate-fadeIn">
                      <Separator className="my-6" />
                      <div className="flex justify-between items-center">
                        <label className="block text-xs font-medium text-zinc-700 flex items-center">
                          <Lock className="h-4 w-4 mr-1 text-emerald-600" />
                          Hasil Enkripsi
                        </label>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                          onClick={() => copyToClipboard(outputText)}
                        >
                          {copied ? (
                            <>
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              <span className="text-xs">Copied!</span>
                            </>
                          ) : (
                            <>
                              <span className="text-xs">Copy</span>
                            </>
                          )}
                        </Button>
                      </div>
                      <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100 break-all font-mono text-xs">
                        <TypewriterEncrypted value={outputText} />
                      </div>
                    </div>
                  )}
                  {!outputText && (
                    <div className="flex items-center mt-8 mb-2">
                      <span className="font-mono text-xs text-zinc-400">Contoh terenkripsi:</span>
                      <span className="ml-2 font-mono text-xs text-emerald-700">
                        {typedEncrypted}<span className="animate-pulse text-emerald-600">|</span>
                      </span>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="decrypt" className="p-6 space-y-6 focus:outline-none">
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">Pesan Terenkripsi</label>
                    <textarea
                      className="w-full min-h-[80px] p-3 rounded-lg border border-zinc-200 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder="Ketik atau tempel pesan terenkripsi yang ingin didekripsi..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                    ></textarea>
                    <span className="text-xs text-zinc-400">Dekripsi pesan hanya bisa dilakukan dengan kunci privat yang benar.</span>
                  </div>
                  <Button
                    onClick={() => handleProcess("decrypt")}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg py-3 shadow transition-all duration-200 hover:shadow"
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
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  {outputText && (
                    <div className="mt-8 space-y-2 animate-fadeIn">
                      <Separator className="my-6" />
                      <div className="flex justify-between items-center">
                        <label className="block text-xs font-medium text-zinc-700 flex items-center">
                          <Unlock className="h-4 w-4 mr-1 text-blue-600" />
                          Hasil Dekripsi
                        </label>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-blue-600 border-blue-200 hover:bg-blue-50"
                          onClick={() => copyToClipboard(outputText)}
                        >
                          {copied ? (
                            <>
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              <span className="text-xs">Copied!</span>
                            </>
                          ) : (
                            <>
                              <span className="text-xs">Copy</span>
                            </>
                          )}
                        </Button>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 break-all font-mono text-xs">
                        {outputText}
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </Card>
          </div>
          {/* Error message (card style, more modern) */}
          {error && (
            <div className="mt-8 flex justify-center">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-start w-full max-w-2xl shadow animate-fadeIn">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Error</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-100 py-12 bg-white mt-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start">
              <Link href="/" className="text-xl font-semibold tracking-tight flex items-center mb-2">
                <Shield className="h-5 w-5 mr-2 text-emerald-600" />
                <span>RSA<span className="text-emerald-600">Crypto</span></span>
              </Link>
              <p className="text-sm text-zinc-500">Keamanan data dengan kriptografi kunci publik</p>
            </div>
            <div className="flex gap-8">
              <Link href="/" className="text-sm text-zinc-500 hover:text-emerald-600 transition-colors">Beranda</Link>
              <Link href="/encrypt-decrypt" className="text-sm text-zinc-500 hover:text-emerald-600 transition-colors">Enkripsi/Dekripsi</Link>
              <Link href="/about" className="text-sm text-zinc-500 hover:text-emerald-600 transition-colors">Tentang RSA</Link>
            </div>
            <div className="text-base text-zinc-400">
              &copy; {new Date().getFullYear()} RSACrypto. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}