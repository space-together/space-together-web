// generateKey.ts
// Generate AES-GCM 256-bit symmetric key for conversation encryption

export async function generateConversationKey(): Promise<CryptoKey> {
  try {
    const key = await crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256,
      },
      true, // extractable
      ["encrypt", "decrypt"]
    );
    return key;
  } catch (error) {
    console.error("Failed to generate conversation key");
    throw new Error("Key generation failed");
  }
}

export async function exportKey(key: CryptoKey): Promise<string> {
  const exported = await crypto.subtle.exportKey("raw", key);
  return btoa(String.fromCharCode(...new Uint8Array(exported)));
}

export async function importKey(keyData: string): Promise<CryptoKey> {
  const raw = Uint8Array.from(atob(keyData), (c) => c.charCodeAt(0));
  return await crypto.subtle.importKey(
    "raw",
    raw,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
}
