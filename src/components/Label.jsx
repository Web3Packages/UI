import { Root } from "@radix-ui/react-label"
import { cva } from "class-variance-authority"

import { cn } from "@/libs/utils.js"

const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70")

const Label = forwardRef(({ className, ...props }, ref) => (
    <Root ref={ref} className={cn(labelVariants(), className)} {...props} />
))
Label.displayName = Root.displayName

export { Label }
