// encryptConversationKey.ts
// Encrypt symmetric conversation key with user's public RSA key

export async function encryptConversationKey(
  symmetricKey: CryptoKey,
  publicKeyPem: string
): Promise<string> {
  try {
    // Export symmetric key as raw bytes
    const keyData = await crypto.subtle.exportKey("raw", symmetricKey);

    // Import public key
    const publicKey = await importPublicKey(publicKeyPem);

    // Encrypt symmetric key with RSA-OAEP
    const encrypted = await crypto.subtle.encrypt(
      {
        name: "RSA-OAEP",
      },
      publicKey,
      keyData
    );

    // Return as base64
    return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
  } catch (error) {
    console.error("Failed to encrypt conversation key");
    throw new Error("Conversation key encryption failed");
  }
}

async function importPublicKey(pem: string): Promise<CryptoKey> {
  // Remove PEM header/footer and decode
  const pemContents = pem
    .replace("-----BEGIN PUBLIC KEY-----", "")
    .replace("-----END PUBLIC KEY-----", "")
    .replace(/\s/g, "");

  const binaryDer = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));

  return await crypto.subtle.importKey(
    "spki",
    binaryDer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["encrypt"]
  );
}
