import { Adapter, AdapterUser, AdapterSession, AdapterAccount } from "@auth/core/adapters";
import axios, { AxiosInstance } from "axios";

export const MyCustomAdapter = (apiClient: AxiosInstance): Adapter => ({
  async createUser(user: Partial<AdapterUser>): Promise<AdapterUser> {
    const { data } = await apiClient.post("/users", user);
    return data;
  },

  async getUser(id: string): Promise<AdapterUser | null> {
    try {
      const { data } = await apiClient.get(`/users/${id}`);
      return data || null;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 404) return null;
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to get user: ${error.message}`);
      }
      throw error;
    }
  },

  async getUserByEmail(email: string): Promise<AdapterUser | null> {
    try {
      const { data } = await apiClient.get(`/users/email/${email}`);
      return data || null;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 404) return null;
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to get user by email: ${error.message}`);
      }
      throw error;
    }
  },

  async getUserByAccount({ provider, providerAccountId }: { provider: string; providerAccountId: string }): Promise<AdapterUser | null> {
    try {
      const { data: account } = await apiClient.get<AdapterAccount | null>(
        `/accounts?provider=${provider}&providerAccountId=${providerAccountId}`
      );
      if (!account) return null;

      if (this.getUser) {
        const getUser = this.getUser.bind(this);
        return await getUser(account.userId);
      }
      throw new Error("getUser method is undefined");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error instanceof Error) {
          if (error instanceof Error) {
            throw new Error(`Failed to get user by account: ${error.message}`);
          }
          throw error;
        }
        throw error;
      }
      throw error;
    }
  },

  async updateUser(user: Partial<AdapterUser>): Promise<AdapterUser> {
    const { data } = await apiClient.put(`/users/${user.id}`, user);
    return data;
  },

  async linkAccount(account: AdapterAccount): Promise<void> {
    await apiClient.post("/accounts", account);
  },

  async unlinkAccount({ provider, providerAccountId }: { provider: string; providerAccountId: string }): Promise<void> {
    await apiClient.delete(`/accounts?provider=${provider}&providerAccountId=${providerAccountId}`);
  },

  async createSession(session: Partial<AdapterSession>): Promise<AdapterSession> {
    const { data } = await apiClient.post("/sessions", session);
    return data;
  },

  async getSessionAndUser(sessionToken: string): Promise<{ session: AdapterSession; user: AdapterUser } | null> {
    const { data: session } = await apiClient.get<AdapterSession | null>(`/sessions?token=${sessionToken}`);
    if (!session) return null;

    if (!this.getUser) throw new Error("getUser method is undefined");
    const user = await this.getUser(session.userId);
    if (!user) return null;

    return { session, user };
  },

  async updateSession(session: Partial<AdapterSession>): Promise<AdapterSession> {
    const { data } = await apiClient.put(`/sessions/${session.sessionToken}`, session);
    return data;
  },

  async deleteSession(sessionToken: string): Promise<void> {
    await apiClient.delete(`/sessions/${sessionToken}`);
  },
});
