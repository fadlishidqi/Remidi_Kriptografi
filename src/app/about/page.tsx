import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Key, Lock, Unlock, ShieldCheck } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50 py-16">
      <div className="container max-w-5xl px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-3">Tentang Kriptografi RSA</h1>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            Pelajari cara kerja algoritma kriptografi kunci publik RSA yang aman dan terpercaya
          </p>
        </div>

        <Tabs defaultValue="overview" className="mb-10">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-zinc-100 mb-6">
            <TabsList className="grid w-full grid-cols-4 bg-zinc-100">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                Ikhtisar
              </TabsTrigger>
              <TabsTrigger
                value="how-it-works"
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                Cara Kerja
              </TabsTrigger>
              <TabsTrigger value="math" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                Matematika RSA
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                Keamanan
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="mt-0">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="bg-white rounded-xl p-8 shadow-sm border border-zinc-100">
                <h2 className="text-2xl font-bold text-zinc-900 mb-6">Apa itu RSA?</h2>
                <p className="text-zinc-600 mb-4 leading-relaxed">
                  RSA (Rivest-Shamir-Adleman) adalah algoritma kriptografi kunci publik yang digunakan secara luas untuk
                  pengiriman data yang aman. Dikembangkan pada tahun 1977 oleh Ron Rivest, Adi Shamir, dan Leonard
                  Adleman, RSA menjadi salah satu algoritma kriptografi yang paling penting dalam sejarah.
                </p>
                <p className="text-zinc-600 mb-6 leading-relaxed">
                  RSA menggunakan sepasang kunci: kunci publik untuk enkripsi dan kunci privat untuk dekripsi. Keamanan
                  RSA didasarkan pada kesulitan memfaktorkan hasil perkalian dua bilangan prima besar.
                </p>
                <h3 className="text-xl font-medium text-zinc-900 mb-4">Kegunaan RSA</h3>
                <ul className="space-y-3">
                  {[
                    "Enkripsi pesan dan data sensitif",
                    "Tanda tangan digital untuk autentikasi",
                    "Pertukaran kunci dalam protokol keamanan",
                    "Sertifikat SSL/TLS untuk keamanan website",
                    "Sistem pembayaran elektronik",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
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
                      <span className="text-zinc-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Card className="border-0 shadow-sm overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
                  <CardTitle>Komponen Utama RSA</CardTitle>
                </CardHeader>
                <CardContent className="p-6 bg-white">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-emerald-50 p-3 rounded-lg">
                        <Key className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-zinc-900 mb-1">Pasangan Kunci</h4>
                        <p className="text-sm text-zinc-500 leading-relaxed">
                          RSA menggunakan sepasang kunci matematika yang terkait: kunci publik dan kunci privat.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <Lock className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-zinc-900 mb-1">Enkripsi</h4>
                        <p className="text-sm text-zinc-500 leading-relaxed">
                          Pesan dienkripsi menggunakan kunci publik penerima, sehingga hanya penerima yang dapat
                          membacanya.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <Unlock className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-zinc-900 mb-1">Dekripsi</h4>
                        <p className="text-sm text-zinc-500 leading-relaxed">
                          Pesan terenkripsi didekripsi menggunakan kunci privat penerima untuk mendapatkan pesan asli.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-amber-50 p-3 rounded-lg">
                        <ShieldCheck className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-zinc-900 mb-1">Keamanan</h4>
                        <p className="text-sm text-zinc-500 leading-relaxed">
                          Keamanan RSA bergantung pada kesulitan memfaktorkan bilangan yang sangat besar menjadi faktor
                          primanya.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="how-it-works" className="mt-0">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-zinc-100 mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-6">Cara Kerja RSA</h2>
              <p className="text-zinc-600 mb-6 leading-relaxed max-w-3xl">
                RSA bekerja berdasarkan prinsip matematika yang kuat. Berikut adalah penjelasan tentang bagaimana
                algoritma RSA bekerja, dari pembangkitan kunci hingga proses enkripsi dan dekripsi.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <Card className="border-0 shadow-sm overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
                  <CardTitle>Pembangkitan Kunci</CardTitle>
                </CardHeader>
                <CardContent className="p-6 bg-white">
                  <div className="space-y-5">
                    {[
                      {
                        step: "1",
                        title: "Pilih dua bilangan prima berbeda",
                        desc: "Pilih dua bilangan prima besar, p dan q (biasanya berukuran ratusan digit)",
                      },
                      {
                        step: "2",
                        title: "Hitung n = p × q",
                        desc: "Nilai n adalah modulus yang digunakan untuk enkripsi dan dekripsi",
                      },
                      {
                        step: "3",
                        title: "Hitung φ(n) = (p-1) × (q-1)",
                        desc: "φ(n) adalah fungsi Euler's totient",
                      },
                      {
                        step: "4",
                        title: "Pilih bilangan e",
                        desc: "Pilih e sehingga 1 < e < φ(n) dan e relatif prima dengan φ(n)",
                      },
                      {
                        step: "5",
                        title: "Hitung d",
                        desc: "Hitung d sehingga d × e ≡ 1 (mod φ(n))",
                      },
                      {
                        step: "6",
                        title: "Kunci publik dan privat",
                        desc: "Kunci publik: (n, e)\nKunci privat: (n, d)",
                      },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="bg-emerald-50 rounded-full w-7 h-7 flex items-center justify-center text-sm font-medium text-emerald-600">
                            {item.step}
                          </div>
                          <h4 className="font-medium text-zinc-900">{item.title}</h4>
                        </div>
                        <p className="text-sm text-zinc-500 pl-10 leading-relaxed whitespace-pre-line">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-8">
                <Card className="border-0 shadow-sm overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <CardTitle>Proses Enkripsi</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 bg-white">
                    <div className="space-y-5">
                      {[
                        {
                          step: "1",
                          title: "Konversi pesan ke angka",
                          desc: "Ubah pesan menjadi representasi numerik m",
                        },
                        {
                          step: "2",
                          title: "Enkripsi menggunakan kunci publik",
                          desc: "Hitung c = m^e mod n",
                        },
                        {
                          step: "3",
                          title: "Hasil enkripsi",
                          desc: "c adalah ciphertext (pesan terenkripsi)",
                        },
                      ].map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-50 rounded-full w-7 h-7 flex items-center justify-center text-sm font-medium text-blue-600">
                              {item.step}
                            </div>
                            <h4 className="font-medium text-zinc-900">{item.title}</h4>
                          </div>
                          <p className="text-sm text-zinc-500 pl-10 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                    <CardTitle>Proses Dekripsi</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 bg-white">
                    <div className="space-y-5">
                      {[
                        {
                          step: "1",
                          title: "Terima pesan terenkripsi",
                          desc: "Pesan terenkripsi c",
                        },
                        {
                          step: "2",
                          title: "Dekripsi menggunakan kunci privat",
                          desc: "Hitung m = c^d mod n",
                        },
                        {
                          step: "3",
                          title: "Konversi angka ke pesan",
                          desc: "Ubah m kembali menjadi pesan asli",
                        },
                      ].map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="bg-purple-50 rounded-full w-7 h-7 flex items-center justify-center text-sm font-medium text-purple-600">
                              {item.step}
                            </div>
                            <h4 className="font-medium text-zinc-900">{item.title}</h4>
                          </div>
                          <p className="text-sm text-zinc-500 pl-10 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="math" className="mt-0">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-zinc-100 mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-6">Matematika di Balik RSA</h2>
              <p className="text-zinc-600 mb-6 leading-relaxed max-w-3xl">
                RSA didasarkan pada prinsip-prinsip matematika yang kuat, terutama teori bilangan. Berikut adalah
                penjelasan tentang konsep matematika yang mendasari keamanan dan operasi RSA.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-8">
                <Card className="border-0 shadow-sm">
                  <CardHeader className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
                    <CardTitle>Teorema Euler</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 bg-white">
                    <p className="text-zinc-600 mb-4 leading-relaxed">
                      RSA didasarkan pada teorema Euler yang menyatakan bahwa jika a dan n adalah bilangan bulat yang
                      relatif prima, maka:
                    </p>
                    <div className="bg-zinc-50 p-6 rounded-lg text-center font-medium text-zinc-900 mb-4">
                      a<sup>φ(n)</sup> ≡ 1 (mod n)
                    </div>
                    <p className="text-zinc-600 leading-relaxed">
                      Di mana φ(n) adalah fungsi Euler's totient, yang menghitung jumlah bilangan bulat positif kurang
                      dari atau sama dengan n yang relatif prima dengan n.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <CardTitle>Fungsi Euler's Totient</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 bg-white">
                    <div className="space-y-4 text-zinc-600 leading-relaxed">
                      <p>Untuk bilangan prima p, φ(p) = p - 1</p>
                      <p>Untuk dua bilangan prima p dan q, φ(p × q) = (p - 1) × (q - 1)</p>
                      <p>Dalam RSA, kita menggunakan φ(n) = (p - 1) × (q - 1) untuk menghitung kunci privat d.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-8">
                <Card className="border-0 shadow-sm">
                  <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                    <CardTitle>Pembuktian RSA</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 bg-white">
                    <div className="space-y-4 text-zinc-600 leading-relaxed">
                      <p>
                        Untuk membuktikan bahwa RSA bekerja, kita perlu menunjukkan bahwa (m<sup>e</sup>)<sup>d</sup> ≡
                        m (mod n) untuk semua m.
                      </p>
                      <p>
                        Karena e × d ≡ 1 (mod φ(n)), kita dapat menulis e × d = k × φ(n) + 1 untuk beberapa bilangan
                        bulat k.
                      </p>
                      <p>
                        Jadi, (m<sup>e</sup>)<sup>d</sup> = m<sup>e×d</sup> = m<sup>k×φ(n)+1</sup> = (m<sup>φ(n)</sup>)
                        <sup>k</sup> × m
                      </p>
                      <p>
                        Dari teorema Euler, kita tahu bahwa m<sup>φ(n)</sup> ≡ 1 (mod n), sehingga (m<sup>φ(n)</sup>)
                        <sup>k</sup> × m ≡ 1<sup>k</sup> × m ≡ m (mod n)
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                    <CardTitle>Algoritma Extended Euclidean</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 bg-white">
                    <div className="space-y-4 text-zinc-600 leading-relaxed">
                      <p>Untuk menghitung kunci privat d, kita perlu menemukan invers modular dari e modulo φ(n).</p>
                      <p>Algoritma Extended Euclidean digunakan untuk menghitung d sehingga:</p>
                      <div className="bg-zinc-50 p-4 rounded-lg text-center font-medium text-zinc-900 my-4">
                        e × d ≡ 1 (mod φ(n))
                      </div>
                      <p>Ini adalah langkah penting dalam pembangkitan kunci RSA.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="mt-0">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-zinc-100 mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-6">Keamanan RSA</h2>
              <p className="text-zinc-600 mb-6 leading-relaxed max-w-3xl">
                Keamanan RSA bergantung pada beberapa prinsip kriptografi dan matematika. Berikut adalah penjelasan
                tentang aspek keamanan RSA, termasuk kekuatan dan potensial kelemahannya.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-8">
                <Card className="border-0 shadow-sm">
                  <CardHeader className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
                    <CardTitle>Dasar Keamanan</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 bg-white">
                    <div className="space-y-4 text-zinc-600 leading-relaxed">
                      <p>
                        Keamanan RSA didasarkan pada masalah faktorisasi bilangan bulat: kesulitan memfaktorkan hasil
                        perkalian dua bilangan prima besar.
                      </p>
                      <p>
                        Untuk memecahkan RSA, penyerang perlu memfaktorkan n menjadi p dan q, yang sangat sulit untuk
                        bilangan yang sangat besar.
                      </p>
                      <p>
                        Dengan kunci 2048-bit atau 4096-bit, faktorisasi membutuhkan sumber daya komputasi yang sangat
                        besar dan waktu yang sangat lama, bahkan dengan komputer terkuat saat ini.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <CardTitle>Panjang Kunci</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 bg-white">
                    <p className="text-zinc-600 mb-4 leading-relaxed">
                      Panjang kunci RSA sangat penting untuk keamanan:
                    </p>
                    <ul className="space-y-3">
                      {[
                        "1024-bit: Tidak lagi dianggap aman untuk jangka panjang",
                        "2048-bit: Standar saat ini, dianggap aman hingga 2030",
                        "3072-bit: Direkomendasikan untuk keamanan jangka panjang",
                        "4096-bit: Sangat aman, tetapi lebih lambat",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-blue-600"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                          <span className="text-zinc-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-zinc-600 mt-4 leading-relaxed">
                      Semakin panjang kunci, semakin aman tetapi juga semakin lambat operasi enkripsi dan dekripsi.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-8">
                <Card className="border-0 shadow-sm">
                  <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                    <CardTitle>Potensi Serangan</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 bg-white">
                    <div className="space-y-4">
                      {[
                        {
                          title: "Serangan Faktorisasi",
                          desc: "Mencoba memfaktorkan n menjadi p dan q untuk mendapatkan kunci privat.",
                        },
                        {
                          title: "Serangan Timing",
                          desc: "Menganalisis waktu yang dibutuhkan untuk operasi dekripsi untuk mendapatkan informasi tentang kunci privat.",
                        },
                        {
                          title: "Serangan Side-Channel",
                          desc: "Menganalisis konsumsi daya, radiasi elektromagnetik, atau suara dari perangkat yang melakukan operasi RSA.",
                        },
                        {
                          title: "Serangan Implementasi",
                          desc: "Memanfaatkan kelemahan dalam implementasi RSA, bukan algoritma itu sendiri.",
                        },
                      ].map((item, index) => (
                        <div key={index}>
                          <h4 className="font-medium text-zinc-900 mb-1">{item.title}</h4>
                          <p className="text-sm text-zinc-600 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                    <CardTitle>Praktik Terbaik Keamanan</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 bg-white">
                    <ul className="space-y-3">
                      {[
                        "Gunakan kunci minimal 2048-bit",
                        "Gunakan padding yang aman seperti OAEP (Optimal Asymmetric Encryption Padding)",
                        "Jangan gunakan kunci yang sama untuk enkripsi dan tanda tangan digital",
                        "Perbarui kunci secara berkala",
                        "Lindungi kunci privat dengan sangat baik",
                        "Gunakan implementasi RSA yang telah teruji dan diaudit",
                        "Kombinasikan RSA dengan algoritma kriptografi lain untuk keamanan yang lebih baik",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-amber-600"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                          <span className="text-zinc-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
