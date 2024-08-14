import { Close, Content, Description, Overlay, Portal, Root, Title, Trigger } from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/libs/utils"

const Dialog = Root

const DialogTrigger = Trigger

const DialogPortal = Portal

const DialogClose = Close

const overlayVariant = "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
const DialogOverlay = forwardRef(({ className, ...props }, ref) => (
    <Overlay ref={ref} className={cn(overlayVariant, className)}  {...props} />
))
DialogOverlay.displayName = Overlay.displayName

const contentVariants = "fixed bg-white left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg"
const closeVariants = "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
const DialogContent = forwardRef(({ className, children, ...props }, ref) => (
    <DialogPortal>
        <DialogOverlay />
        <Content ref={ref} className={cn(contentVariants, className)} {...props}>
            {children}
            <Close className={`${closeVariants} hover:rotate-90 transition-transform duration-300 ease-in-out`}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </Close>
        </Content>
    </DialogPortal>
))
DialogContent.displayName = Content.displayName

const DialogHeader = ({ className, ...props }) => (
    <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({ className, ...props }) => (
    <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}   {...props} />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = forwardRef(({ className, ...props }, ref) => (
    <Title ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
))
DialogTitle.displayName = Title.displayName

const DialogDescription = forwardRef(({ className, ...props }, ref) => (
    <Description ref={ref} className={cn("text-sm text-muted-foreground", className)}    {...props} />
))
DialogDescription.displayName = Description.displayName

export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
}
