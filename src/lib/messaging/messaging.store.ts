// messaging.store.ts
// IndexedDB storage for encryption keys

const DB_NAME = "space-together-messaging";
const DB_VERSION = 1;

const STORES = {
  CONVERSATION_KEYS: "conversation_keys",
  PRIVATE_KEY: "private_key",
  PUBLIC_KEY: "public_key",
};

let dbInstance: IDBDatabase | null = null;

async function openDB(): Promise<IDBDatabase> {
  if (dbInstance) return dbInstance;

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains(STORES.CONVERSATION_KEYS)) {
        db.createObjectStore(STORES.CONVERSATION_KEYS, {
          keyPath: "conversation_id",
        });
      }

      if (!db.objectStoreNames.contains(STORES.PRIVATE_KEY)) {
        db.createObjectStore(STORES.PRIVATE_KEY);
      }

      if (!db.objectStoreNames.contains(STORES.PUBLIC_KEY)) {
        db.createObjectStore(STORES.PUBLIC_KEY);
      }
    };
  });
}

// Conversation Keys
export async function storeConversationKey(
  conversationId: string,
  key: CryptoKey,
  keyVersion: number = 1
): Promise<void> {
  const db = await openDB();
  const transaction = db.transaction(STORES.CONVERSATION_KEYS, "readwrite");
  const store = transaction.objectStore(STORES.CONVERSATION_KEYS);

  return new Promise((resolve, reject) => {
    const request = store.put({
      conversation_id: conversationId,
      key,
      key_version: keyVersion,
      stored_at: Date.now(),
    });

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function getConversationKey(
  conversationId: string
): Promise<CryptoKey | null> {
  const db = await openDB();
  const transaction = db.transaction(STORES.CONVERSATION_KEYS, "readonly");
  const store = transaction.objectStore(STORES.CONVERSATION_KEYS);

  return new Promise((resolve, reject) => {
    const request = store.get(conversationId);

    request.onsuccess = () => {
      const result = request.result;
      resolve(result?.key || null);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function removeConversationKey(
  conversationId: string
): Promise<void> {
  const db = await openDB();
  const transaction = db.transaction(STORES.CONVERSATION_KEYS, "readwrite");
  const store = transaction.objectStore(STORES.CONVERSATION_KEYS);

  return new Promise((resolve, reject) => {
    const request = store.delete(conversationId);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// Private Key
export async function storePrivateKey(privateKeyPem: string): Promise<void> {
  const db = await openDB();
  const transaction = db.transaction(STORES.PRIVATE_KEY, "readwrite");
  const store = transaction.objectStore(STORES.PRIVATE_KEY);

  return new Promise((resolve, reject) => {
    const request = store.put(privateKeyPem, "user_private_key");
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function getPrivateKey(): Promise<string | null> {
  const db = await openDB();
  const transaction = db.transaction(STORES.PRIVATE_KEY, "readonly");
  const store = transaction.objectStore(STORES.PRIVATE_KEY);

  return new Promise((resolve, reject) => {
    const request = store.get("user_private_key");
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

// Public Key
export async function storePublicKey(publicKeyPem: string): Promise<void> {
  const db = await openDB();
  const transaction = db.transaction(STORES.PUBLIC_KEY, "readwrite");
  const store = transaction.objectStore(STORES.PUBLIC_KEY);

  return new Promise((resolve, reject) => {
    const request = store.put(publicKeyPem, "user_public_key");
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function getPublicKey(): Promise<string | null> {
  const db = await openDB();
  const transaction = db.transaction(STORES.PUBLIC_KEY, "readonly");
  const store = transaction.objectStore(STORES.PUBLIC_KEY);

  return new Promise((resolve, reject) => {
    const request = store.get("user_public_key");
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

// Clear all keys (on logout)
export async function clearAllKeys(): Promise<void> {
  const db = await openDB();

  const promises = [
    new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORES.CONVERSATION_KEYS, "readwrite");
      const request = transaction.objectStore(STORES.CONVERSATION_KEYS).clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    }),
    new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORES.PRIVATE_KEY, "readwrite");
      const request = transaction.objectStore(STORES.PRIVATE_KEY).clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    }),
  ];

  await Promise.all(promises);
}
