"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";

type KpiCardProps = {
  /** Label displayed above the value */
  title: string;
  /** Hugeicons icon displayed inline with the title */
  icon?: React.ComponentProps<typeof HugeiconsIcon>["icon"];
  /** Custom element to render as icon (e.g. colored dots for status indicators) */
  iconElement?: React.ReactNode;
  /** Main value displayed prominently */
  value: React.ReactNode;
  /** Additional classes for the value (e.g. text color) */
  valueClassName?: string;
  /** Footer content below the value (trend info, progress bars, etc.) */
  footer?: React.ReactNode;
  /** Border color class (e.g. "border-l-blue-500") */
  borderColor?: string;
};

export function KpiCard({
  title,
  icon,
  iconElement,
  value,
  valueClassName,
  footer,
  borderColor = "border-l-primary/40",
}: KpiCardProps) {
  return (
    <Card className={cn("h-full border-l-4", borderColor)}>
      <CardHeader className="pb-2">
        <CardDescription className="flex items-center gap-2 leading-none xl:text-sm 2xl:text-base">
          {iconElement ??
            (icon ? (
              <HugeiconsIcon
                icon={icon}
                strokeWidth={2}
                className="size-4 xl:size-5"
              />
            ) : null)}
          {title}
        </CardDescription>
        <CardTitle
          className={cn(
            "text-2xl leading-none xl:text-3xl 2xl:text-4xl",
            valueClassName,
          )}
        >
          {value}
        </CardTitle>
      </CardHeader>
      {footer != null && (
        <CardContent className="space-y-2 xl:text-sm">{footer}</CardContent>
      )}
    </Card>
  );
}
