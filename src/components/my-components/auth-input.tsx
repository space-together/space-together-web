import { useId } from "react";
import { FormLabel } from "../ui/form";

interface props {
    label :string,
    type : string,
    className?: string 
}

export default function AuthInput<T>({label, type,className}: props,  data : T) {
  const id = useId();
  return (
    <div className="border-input bg-background focus-within:border-ring focus-within:ring-ring/50 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 has-aria-invalid:border-destructive relative rounded-md border shadow-xs transition-[color,box-shadow] outline-none focus-within:ring-[3px] has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-[input:is(:disabled)]:*:pointer-events-none">
      <FormLabel htmlFor={id} className="text-foreground block px-3 pt-2 text-xs font-medium">
        {label}
      </FormLabel>
      <input
        id={id}
        {...T}
        className="text-foreground placeholder:text-muted-foreground/70 flex h-10 w-full bg-transparent px-3 pb-2 text-sm focus-visible:outline-none"
        placeholder="Email"
        type="email"
        disabled
      />
    </div>
  );
}
