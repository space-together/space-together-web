"use client";

import type { Transcript } from "@/lib/schema/academics/transcript.schema";
import { transcriptService } from "@/service/academics/transcript.service";
import useSWR from "swr";

export function useTranscript(
  id?: string,
  token?: string,
  schoolToken?: string,
) {
  const key = id && token ? ["/api/transcripts", id, token, schoolToken] : null;

  const { data, error, isLoading, mutate } = useSWR<Transcript | null>(
    key,
    () => transcriptService.getTranscript(id!, token!, schoolToken),
    {
      revalidateOnFocus: false,
    },
  );

  return {
    transcript: data,
    isLoading,
    error,
    mutate,
  };
}

export function useStudentTranscript(
  studentId?: string,
  token?: string,
  schoolToken?: string,
) {
  const key =
    studentId && token
      ? ["/api/transcripts/student", studentId, token, schoolToken]
      : null;

  const { data, error, isLoading, mutate } = useSWR<Transcript | null>(
    key,
    () => transcriptService.getStudentTranscript(studentId!, token!, schoolToken),
    {
      revalidateOnFocus: false,
    },
  );

  return {
    transcript: data,
    isLoading,
    error,
    mutate,
  };
}
