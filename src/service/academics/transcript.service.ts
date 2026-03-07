"use client";

import type { Transcript } from "@/lib/schema/academics/transcript.schema";
import apiRequest from "@/service/api-client";

export const transcriptService = {
  async generateTranscript(
    studentId: string,
    token: string,
    schoolToken?: string,
  ): Promise<Transcript | null> {
    const result = await apiRequest<undefined, Transcript>(
      "post",
      `/api/transcripts/generate/${studentId}`,
      undefined,
      { token, schoolToken, revalidatePath: "/s/results" },
    );
    return result.data || null;
  },

  async getTranscript(
    id: string,
    token: string,
    schoolToken?: string,
  ): Promise<Transcript | null> {
    const result = await apiRequest<undefined, Transcript>(
      "get",
      `/api/transcripts/${id}`,
      undefined,
      { token, schoolToken },
    );
    return result.data || null;
  },

  async getStudentTranscript(
    studentId: string,
    token: string,
    schoolToken?: string,
  ): Promise<Transcript | null> {
    const result = await apiRequest<undefined, Transcript>(
      "get",
      `/api/transcripts/student/${studentId}`,
      undefined,
      { token, schoolToken },
    );
    return result.data || null;
  },
};
