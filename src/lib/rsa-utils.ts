// Simplified RSA implementation using Web Crypto API for browser environments
export async function generateRSAKeyPair() {
  try {
    // Generate RSA key pair using Web Crypto API
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 2048,
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
    }
  } catch (error) {
    console.error("Error generating RSA key pair:", error)
    throw new Error("Gagal membuat pasangan kunci RSA")
  }
}

// Encrypt message using RSA public key
export async function encryptRSA(plaintext: string, publicKeyString: string) {
  try {
    // Parse the public key from string
    const publicKeyJwk = JSON.parse(publicKeyString)

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
    const encryptedArray = new Uint8Array(encryptedData)
    let base64 = ""
    for (let i = 0; i < encryptedArray.length; i++) {
      base64 += String.fromCharCode(encryptedArray[i])
    }

    return btoa(base64)
  } catch (error) {
    console.error("Error encrypting with RSA:", error)
    throw new Error("Gagal mengenkripsi pesan")
  }
}

// Decrypt message using RSA private key
export async function decryptRSA(ciphertext: string, privateKeyString: string) {
  try {
    // Parse the private key from string
    const privateKeyJwk = JSON.parse(privateKeyString)

    // Import the private key
    const privateKey = await window.crypto.subtle.importKey(
      "jwk",
      privateKeyJwk,
      {
        name: "RSA-OAEP",
        hash: "SHA-256",
      },
      false, // not extractable
      ["decrypt"], // key usage
    )

    // Decode the base64 ciphertext
    const binaryString = atob(ciphertext)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    // Decrypt the data
    const decryptedData = await window.crypto.subtle.decrypt(
      {
        name: "RSA-OAEP",
      },
      privateKey,
      bytes,
    )

    // Decode the decrypted data
    const decoder = new TextDecoder()
    return decoder.decode(decryptedData)
  } catch (error) {
    console.error("Error decrypting with RSA:", error)
    throw new Error("Gagal mendekripsi pesan")
  }
}
