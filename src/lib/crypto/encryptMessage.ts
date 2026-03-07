// encryptMessage.ts
// Encrypt message content using AES-GCM

interface EncryptedMessage {
  encrypted_payload: string;
  nonce: string;
}

export async function encryptMessage(
  plaintext: string,
  key: CryptoKey
): Promise<EncryptedMessage> {
  try {
    // Generate 12-byte nonce (IV)
    const nonce = crypto.getRandomValues(new Uint8Array(12));

    // Encode plaintext
    const encoder = new TextEncoder();
    const data = encoder.encode(plaintext);

    // Encrypt
    const ciphertext = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: nonce,
      },
      key,
      data
    );

    // Convert to base64
    const encrypted_payload = btoa(
      String.fromCharCode(...new Uint8Array(ciphertext))
    );
    const nonceBase64 = btoa(String.fromCharCode(...nonce));

    return {
      encrypted_payload,
      nonce: nonceBase64,
    };
  } catch (error) {
    console.error("Encryption failed");
    throw new Error("Message encryption failed");
  }
}
