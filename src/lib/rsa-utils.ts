export async function generateRSAKeyPair(keySize = 2048) {
  try {
    // Validate key size (must be 1024, 2048, or 4096)
    if (![1024, 2048, 4096].includes(keySize)) {
      throw new Error("Ukuran kunci harus 1024, 2048, atau 4096 bit");
    }
    
    // Generate RSA key pair using Web Crypto API
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: keySize,
        publicExponent: new Uint8Array([1, 0, 1]), // 65537
        hash: "SHA-256",
      },
      true, // extractable
      ["encrypt", "decrypt"], // key usages
    )

    // Export the keys to JWK format
    const publicKeyJwk = await window.crypto.subtle.exportKey("jwk", keyPair.publicKey)
    const privateKeyJwk = await window.crypto.subtle.exportKey("jwk", keyPair.privateKey)

    // Convert to strings for storage
    const publicKey = JSON.stringify(publicKeyJwk)
    const privateKey = JSON.stringify(privateKeyJwk)

    return {
      publicKey,
      privateKey,
      keySize,
    }
  } catch (error) {
    console.error("Error generating RSA key pair:", error)
    throw new Error("Gagal membuat pasangan kunci RSA: " + (error instanceof Error ? error.message : String(error)))
  }
}

// Encrypt message using RSA public key
export async function encryptRSA(plaintext: string, publicKeyString: string) {
  try {
    if (!plaintext || !publicKeyString) {
      throw new Error("Pesan dan kunci publik harus disediakan");
    }
    
    // Parse the public key from string
    let publicKeyJwk;
    try {
      publicKeyJwk = JSON.parse(publicKeyString)
    } catch {
      throw new Error(
        "Format kunci publik tidak valid. Pastikan Anda menyalin seluruh kunci publik dengan benar."
      );
    }

    // Import the public key
    const publicKey = await window.crypto.subtle.importKey(
      "jwk",
      publicKeyJwk,
      {
        name: "RSA-OAEP",
        hash: "SHA-256",
      },
      false, // not extractable
      ["encrypt"], // key usage
    )

    // Encode the plaintext
    const encoder = new TextEncoder()
    const data = encoder.encode(plaintext)

    // Encrypt the data
    const encryptedData = await window.crypto.subtle.encrypt(
      {
        name: "RSA-OAEP",
      },
      publicKey,
      data,
    )

    // Convert encrypted data to base64
    return arrayBufferToBase64(encryptedData)
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    // User friendly error
    if (
      msg.includes("Cannot read properties of") ||
      msg.includes("key data is not a valid JWK object")
    ) {
      throw new Error("Gagal mengenkripsi pesan: Kunci publik yang Anda masukkan tidak valid atau tidak sesuai format. Pastikan Anda menggunakan kunci publik RSA yang benar dan tidak ada karakter yang terpotong.");
    }
    throw new Error("Gagal mengenkripsi pesan: " + msg)
  }
}

// Decrypt message using RSA private key
export async function decryptRSA(ciphertext: string, privateKeyString: string) {
  try {
    if (!ciphertext || !privateKeyString) {
      throw new Error("Pesan terenkripsi dan kunci privat harus disediakan");
    }
    
    // Parse the private key from string
    let privateKeyJwk;
    try {
      privateKeyJwk = JSON.parse(privateKeyString)
    } catch {
      throw new Error(
        "Format kunci privat tidak valid. Pastikan Anda menyalin seluruh kunci privat dengan benar."
      );
    }

    // Import the private key
    let privateKey;
    try {
      privateKey = await window.crypto.subtle.importKey(
        "jwk",
        privateKeyJwk,
        {
          name: "RSA-OAEP",
          hash: "SHA-256",
        },
        false,
        ["decrypt"],
      )
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      // User friendly for JWK parsing errors
      if (
        msg.includes('JWK member "qi"') ||
        msg.includes("base64url") ||
        msg.includes("padding")
      ) {
        throw new Error(
          "Kunci privat yang Anda masukkan tidak valid atau tidak sesuai format. Pastikan Anda menggunakan kunci privat RSA yang benar dan tidak ada karakter yang terpotong."
        )
      }
      throw new Error(msg)
    }

    // Decode the base64 ciphertext
    let encryptedData: ArrayBuffer;
    try {
      encryptedData = base64ToArrayBuffer(ciphertext)
    } catch {
      throw new Error(
        "Format pesan terenkripsi tidak valid. Pastikan pesan yang Anda masukkan benar."
      );
    }

    // Decrypt the data
    let decryptedData: ArrayBuffer;
    try {
      decryptedData = await window.crypto.subtle.decrypt(
        {
          name: "RSA-OAEP",
        },
        privateKey,
        encryptedData,
      )
    } catch (error) {
      let msg = error instanceof Error ? error.message : String(error)
      if (
        msg.includes('JWK member "qi"') ||
        msg.includes("base64url") ||
        msg.includes("padding")
      ) {
        msg = "Kunci privat yang Anda masukkan tidak valid atau tidak sesuai format. Pastikan Anda menggunakan kunci privat RSA yang benar dan tidak ada karakter yang terpotong.";
      } else if (
        msg.includes("operation failed") ||
        msg.includes("decrypt") ||
        msg.includes("data")
      ) {
        msg = "Gagal mendekripsi pesan. Pastikan pesan dan kunci privat cocok dan benar.";
      }
      throw new Error(msg)
    }

    // Decode the decrypted data
    const decoder = new TextDecoder()
    return decoder.decode(decryptedData)
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    throw new Error("Gagal mendekripsi pesan: " + msg)
  }
}

// Helper function to convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Helper function to convert Base64 to ArrayBuffer
function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}