"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ButtonHTMLAttributes } from "react";

type Props = {
  title: string;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "ghost"
    | "outline"
    | "secondary"
    | "link"
    | "destructive";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function BackButton({ title, className, variant, ...props }: Props) {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      className={className}
      variant={variant}
      {...props}
    >
      {title}
    </Button>
  );
}
