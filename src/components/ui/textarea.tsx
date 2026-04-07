import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[100px] w-full rounded-lg border border-[#e0d8ce] bg-white px-3 py-2 text-sm text-[#1a1a1a] placeholder:text-[#9e9590] focus:outline-none focus:ring-2 focus:ring-[#1a5c38] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 resize-vertical transition-colors",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
