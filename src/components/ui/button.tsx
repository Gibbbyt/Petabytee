import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-brand-purple text-white hover:bg-brand-purple/90 hover:animate-pulse-glow",
        destructive: "bg-red-500 text-white hover:bg-red-500/90",
        outline: "border border-brand-purple bg-transparent text-brand-purple hover:bg-brand-purple hover:text-white",
        secondary: "bg-brand-midnight text-white hover:bg-brand-midnight/80",
        ghost: "hover:bg-brand-purple/10 hover:text-brand-purple",
        link: "text-brand-purple underline-offset-4 hover:underline",
        glow: "bg-gradient-to-r from-brand-purple to-brand-lime text-white animate-glow hover:animate-pulse-glow",
        mint: "bg-brand-mint text-brand-midnight hover:bg-brand-mint/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
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