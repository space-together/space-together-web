// keyStorage.ts
// Secure storage for conversation keys using IndexedDB

const DB_NAME = "space-together-keys";
const STORE_NAME = "conversation-keys";
const DB_VERSION = 1;

interface StoredKey {
  conversation_id: string;
  key: CryptoKey;
  key_version: number;
  stored_at: number;
}

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
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "conversation_id" });
      }
    };
  });
}

export async function storeConversationKey(
  conversationId: string,
  key: CryptoKey,
  keyVersion: number = 1
): Promise<void> {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    const data: StoredKey = {
      conversation_id: conversationId,
      key,
      key_version: keyVersion,
      stored_at: Date.now(),
    };

    await new Promise<void>((resolve, reject) => {
      const request = store.put(data);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Failed to store conversation key");
    throw new Error("Key storage failed");
  }
}

export async function getConversationKey(
  conversationId: string
): Promise<CryptoKey | null> {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.get(conversationId);
      request.onsuccess = () => {
        const result = request.result as StoredKey | undefined;
        resolve(result?.key || null);
      };
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Failed to retrieve conversation key");
    return null;
  }
}

export async function removeConversationKey(
  conversationId: string
): Promise<void> {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    await new Promise<void>((resolve, reject) => {
      const request = store.delete(conversationId);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Failed to remove conversation key");
  }
}

export async function clearAllKeys(): Promise<void> {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    await new Promise<void>((resolve, reject) => {
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Failed to clear all keys");
  }
}
