"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      className={cn("", className)}
      {...props} />
  );
}

// const tabsListVariants = cva(
//   "rounded-lg p-[3px] group-data-[orientation=horizontal]/tabs:h-9 data-[variant=line]:rounded-none group/tabs-list text-muted-foreground inline-flex w-fit items-center justify-center group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col",
//   {
//     variants: {
//       variant: {
//         default: "bg-muted",
//         line: "gap-1 bg-transparent",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//     },
//   }
// )

// function TabsList({
//   className,
//   variant = "default",
//   ...props
// }) {
//   return (
//     <TabsPrimitive.List
//       data-slot="tabs-list"
//       data-variant={variant}
//       className={cn(tabsListVariants({ variant }), className)}
//       {...props} />
//   );
// }
const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn("min-h[480px] inline-flex h-auto rounded-md p-1 text-primary", className )}
    {...props}
  />
));


function TabsTrigger({
  className,
  ...props
}) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "initial-flex items-center w-full bg-[#27272c] justify-center whitespace-nowrap text-white rounded-lg p-3 text-base font-medium ring-offset-white transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-accent data-[state=active]:text-primary data-[state=active]:font-bold data-[state=active]:shadow-sm",
        className
      )}
      {...props} />
  );
}

function TabsContent({
  className,
  ...props
}) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props} />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
