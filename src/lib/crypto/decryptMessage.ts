// decryptMessage.ts
// Decrypt message content using AES-GCM

export async function decryptMessage(
  encrypted_payload: string,
  nonce: string,
  key: CryptoKey
): Promise<string> {
  try {
    // Decode from base64
    const ciphertext = Uint8Array.from(atob(encrypted_payload), (c) =>
      c.charCodeAt(0)
    );
    const iv = Uint8Array.from(atob(nonce), (c) => c.charCodeAt(0));

    // Decrypt
    const decrypted = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv,
      },
      key,
      ciphertext
    );

    // Decode to string
    const decoder = new TextDecoder();
    const plaintext = decoder.decode(decrypted);

    return plaintext;
  } catch (error) {
    console.error("Decryption failed");
    throw new Error("Message decryption failed");
  }
}
