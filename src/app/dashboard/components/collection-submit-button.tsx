"use client";

import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import type { ButtonHTMLAttributes } from "react";

type CollectionSubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function CollectionSubmitButton({
  children,
  disabled,
  pendingText,
  ...props
}: CollectionSubmitButtonProps & { pendingText?: string }) {
  const { pending } = useFormStatus();

  return (
    <button {...props} disabled={disabled || pending} aria-busy={pending}>
      <span className="inline-flex items-center justify-center gap-2">
        {pending && (
          <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
        )}
        {pending ? pendingText : children}
      </span>
    </button>
  );
}
