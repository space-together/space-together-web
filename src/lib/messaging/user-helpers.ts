// user-helpers.ts
// Helper functions for working with RelatedUser data

import type { ActorRef, RelatedUser } from "@/lib/schema/common-schema";

export interface UserDisplayData {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  profilePicture?: string;
  role: string;
}

/**
 * Extract standardized user data from RelatedUser union type
 */
export function getUserFromRelatedUser(relatedUser: RelatedUser): UserDisplayData {
  switch (relatedUser.user_type) {
    case "STUDENT":
      return {
        id: relatedUser._id || "",
        firstName: relatedUser.name || "",
        lastName: "",
        fullName: relatedUser.name || "",
        profilePicture: relatedUser.image,
        role: "STUDENT",
      };
    case "TEACHER":
      return {
        id: relatedUser._id || "",
        firstName: relatedUser.name || "",
        lastName: "",
        fullName: relatedUser.name || "",
        profilePicture: relatedUser.image,
        role: "TEACHER",
      };
    case "SCHOOLSTAFF":
      return {
        id: relatedUser._id || "",
        firstName: relatedUser.name || "",
        lastName: "",
        fullName: relatedUser.name || "",
        profilePicture: relatedUser.image,
        role: "SCHOOLSTAFF",
      };
    case "USER":
      return {
        id: relatedUser._id || "",
        firstName: relatedUser.name || "",
        lastName: "",
        fullName: relatedUser.name || "",
        profilePicture: relatedUser.image,
        role: "USER",
      };
    default:
      return {
        id: "",
        firstName: "",
        lastName: "",
        fullName: "Unknown User",
        role: "UNKNOWN",
      };
  }
}

/**
 * Find participant user data from participants_users array
 */
export function findParticipantUser(
  participantRef: ActorRef,
  participantsUsers: RelatedUser[]
): RelatedUser | undefined {
  return participantsUsers.find((user) => {
    const userData = getUserFromRelatedUser(user);
    return userData.id === participantRef.id;
  });
}

/**
 * Get the other participant in a direct conversation (not the current user)
 */
export function getOtherParticipant(
  participants: ActorRef[],
  participantsUsers: RelatedUser[],
  currentUserId: string
): UserDisplayData | null {
  const otherParticipantRef = participants.find((p) => p.id !== currentUserId);
  
  if (!otherParticipantRef) {
    return null;
  }

  const otherParticipantUser = findParticipantUser(otherParticipantRef, participantsUsers);
  
  return otherParticipantUser ? getUserFromRelatedUser(otherParticipantUser) : null;
}

/**
 * Convert RelatedUser to ActorRef
 */
export function relatedUserToActorRef(user: RelatedUser): ActorRef {
  const userData = getUserFromRelatedUser(user);
  return {
    id: userData.id,
    role: user.user_type as "STUDENT" | "TEACHER" | "SCHOOLSTAFF" | "PARENT" | "ADMIN",
  };
}
