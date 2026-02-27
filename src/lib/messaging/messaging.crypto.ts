// messaging.crypto.ts
// End-to-end encryption using Web Crypto API

export async function generateSymmetricKey(): Promise<CryptoKey> {
  return await crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
}

export async function encryptMessage(
  plainText: string,
  key: CryptoKey
): Promise<{ encrypted_payload: string; nonce: string }> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText);

  // Generate 12-byte nonce
  const nonce = crypto.getRandomValues(new Uint8Array(12));

  const ciphertext = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: nonce,
    },
    key,
    data
  );

  return {
    encrypted_payload: btoa(String.fromCharCode(...new Uint8Array(ciphertext))),
    nonce: btoa(String.fromCharCode(...nonce)),
  };
}

export async function decryptMessage(
  encrypted_payload: string,
  nonce: string,
  key: CryptoKey
): Promise<string> {
  const ciphertext = Uint8Array.from(atob(encrypted_payload), (c) =>
    c.charCodeAt(0)
  );
  const iv = Uint8Array.from(atob(nonce), (c) => c.charCodeAt(0));

  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    ciphertext
  );

  const decoder = new TextDecoder();
  return decoder.decode(decrypted);
}

export async function encryptConversationKeyForUser(
  userPublicKeyPem: string,
  symmetricKey: CryptoKey
): Promise<string> {
  // Export symmetric key
  const keyData = await crypto.subtle.exportKey("raw", symmetricKey);

  // Import public key
  const publicKey = await importPublicKey(userPublicKeyPem);

  // Encrypt
  const encrypted = await crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    publicKey,
    keyData
  );

  return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
}

export async function decryptConversationKey(
  encryptedKey: string,
  privateKeyPem: string
): Promise<CryptoKey> {
  const encryptedData = Uint8Array.from(atob(encryptedKey), (c) =>
    c.charCodeAt(0)
  );

  const privateKey = await importPrivateKey(privateKeyPem);

  const decryptedKeyData = await crypto.subtle.decrypt(
    {
      name: "RSA-OAEP",
    },
    privateKey,
    encryptedData
  );

  return await crypto.subtle.importKey(
    "raw",
    decryptedKeyData,
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
}

async function importPublicKey(pem: string): Promise<CryptoKey> {
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

async function importPrivateKey(pem: string): Promise<CryptoKey> {
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

export async function exportSymmetricKey(key: CryptoKey): Promise<string> {
  const exported = await crypto.subtle.exportKey("raw", key);
  return btoa(String.fromCharCode(...new Uint8Array(exported)));
}

export async function importSymmetricKey(keyData: string): Promise<CryptoKey> {
  const raw = Uint8Array.from(atob(keyData), (c) => c.charCodeAt(0));
  return await crypto.subtle.importKey(
    "raw",
    raw,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
}
