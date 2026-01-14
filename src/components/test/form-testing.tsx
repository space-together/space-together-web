import type { FieldError, FieldErrors } from "react-hook-form";

///Hoe to use it <AllFormErrors errors={form.formState.errors} />
export const AllFormErrors = ({ errors }: { errors: any }) => {
  const extractErrorMessages = (errors: FieldErrors): string[] => {
    const messages: string[] = [];

    const traverse = (err: any) => {
      if (!err) return;

      if ((err as FieldError).message) {
        messages.push((err as FieldError).message as string);
      }
      if (typeof err === "object") {
        Object.values(err).forEach(traverse);
      }
    };

    traverse(errors);

    return messages;
  };

  const messages = extractErrorMessages(errors);

  if (messages.length === 0) return null;

  return (
    <div className="bg-base-300 border border-error/20 text-error p-3 card space-y-1">
      {messages.map((msg, i) => (
        <p key={i} className="text-sm">
          • {msg}
        </p>
      ))}
    </div>
  );
};
