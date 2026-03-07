// decryptConversationKey.ts
// Decrypt symmetric conversation key with user's private RSA key

export async function decryptConversationKey(
  encryptedKey: string,
  privateKeyPem: string
): Promise<CryptoKey> {
  try {
    // Decode encrypted key from base64
    const encryptedData = Uint8Array.from(atob(encryptedKey), (c) =>
      c.charCodeAt(0)
    );

    // Import private key
    const privateKey = await importPrivateKey(privateKeyPem);

    // Decrypt to get raw symmetric key bytes
    const decryptedKeyData = await crypto.subtle.decrypt(
      {
        name: "RSA-OAEP",
      },
      privateKey,
      encryptedData
    );

    // Import as AES-GCM key
    const symmetricKey = await crypto.subtle.importKey(
      "raw",
      decryptedKeyData,
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"]
    );

    return symmetricKey;
  } catch (error) {
    console.error("Failed to decrypt conversation key");
    throw new Error("Conversation key decryption failed");
  }
}

async function importPrivateKey(pem: string): Promise<CryptoKey> {
  // Remove PEM header/footer and decode
  const pemContents = pem
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\s/g, "");

  const binaryDer = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));

  return await crypto.subtle.importKey(
    "pkcs8",
    binaryDer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["decrypt"]
  );
}
