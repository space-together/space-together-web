import { Adapter, AdapterUser, AdapterSession, AdapterAccount } from "next-auth/adapters";
import { AxiosInstance } from "axios";

export const MyCustomAdapter = (apiClient: AxiosInstance): Adapter => {
  return {
    async createUser(user) {
      const response = await apiClient.post("/users", user);
      return response.data as AdapterUser;
    },

    async getUser(id) {
      const response = await apiClient.get(`/users/${id}`);
      return response.data as AdapterUser | null;
    },

    async getUserByEmail(email) {
      const response = await apiClient.get(`/users/email/${email}`);
      return (response.data || null) as AdapterUser | null;
    },

    async getUserByAccount({ provider, providerAccountId }) {
      if (!this.getUser) {
        throw new Error("getUser method is not implemented.");
      }

      const response = await apiClient.get(
        `/adapter/accounts?provider=${provider}&providerAccountId=${providerAccountId}`
      );
      const account = response.data[0] as AdapterAccount | undefined;
      if (!account) return null;

      return await this.getUser(account.userId);
    },

    async updateUser(user) {
      const response = await apiClient.put(`/users/${user.id}`, user);
      return response.data as AdapterUser;
    },

    async linkAccount(account) {
      await apiClient.post("/adapter/accounts", account);
      return account as AdapterAccount;
    },

    async unlinkAccount({ provider, providerAccountId }) {
      await apiClient.delete(
        `/adapter/accounts?provider=${provider}&providerAccountId=${providerAccountId}`
      );
    },

    async createSession(session) {
      const response = await apiClient.post("/adapter/sessions", session);
      return response.data as AdapterSession;
    },

    async getSessionAndUser(sessionToken) {
      const response = await apiClient.get(`/adapter/sessions?token=${sessionToken}`);
      const session = response.data[0] as AdapterSession | undefined;

      if (!session) return null;

      if (!this.getUser) {
        throw new Error("getUser method is not implemented.");
      }

      const user = await this.getUser(session.userId);
      if (!user) return null;

      return { session, user };
    },

    async updateSession(session) {
      const response = await apiClient.put(`/adapter/sessions/${session.userId}`, session);
      return response.data as AdapterSession;
    },

    async deleteSession(sessionToken) {
      await apiClient.delete(`/adapter/sessions/${sessionToken}`);
    },
  };
};
