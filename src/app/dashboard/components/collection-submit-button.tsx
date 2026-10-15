"use client";

import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import type { ButtonHTMLAttributes } from "react";

type CollectionSubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function CollectionSubmitButton({
  children,
  disabled,
  ...props
}: CollectionSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button {...props} disabled={disabled || pending} aria-busy={pending}>
      {pending ? (
        <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}
