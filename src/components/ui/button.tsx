import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#1a1a1a] text-white hover:bg-[#333333] focus-visible:ring-[#1a1a1a] shadow-sm",
        red:
          "bg-[#c41230] text-white hover:bg-[#9a0e25] focus-visible:ring-[#c41230] shadow-sm",
        outline:
          "border-2 border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white focus-visible:ring-[#1a1a1a]",
        "outline-red":
          "border-2 border-[#c41230] text-[#c41230] hover:bg-[#c41230] hover:text-white focus-visible:ring-[#c41230]",
        ghost:
          "text-[#1a1a1a] hover:bg-[#1a1a1a]/10 focus-visible:ring-[#1a1a1a]",
        link: "text-[#c41230] underline-offset-4 hover:underline focus-visible:ring-[#c41230]",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600",
        white:
          "bg-white text-[#1a1a1a] hover:bg-[#f9f6f2] focus-visible:ring-white shadow-sm",
        gold:
          "bg-[#c41230] text-white hover:bg-[#9a0e25] focus-visible:ring-[#c41230] shadow-sm",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
