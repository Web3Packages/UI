import { Coding, Header, Main, Result } from "@/layout"
import { useContractionStore, useEditStore } from "@/stores"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/Dialog.jsx"
import { Input } from "@/components/Input.jsx"
import { Button } from "@/components/Button.jsx"
import { Label } from "@/components/Label.jsx"
import useCoding from "@/hooks/useCoding.js"

function Edit() {
    const { fileRaw, setFileRaw } = useEditStore()
    const { code: [code, setCode], results: [results], handleExecute } = useCoding(fileRaw)
    const { contract } = useContractionStore()
    const packageNameRef = useRef(null)
    const packageVersionRef = useRef(null)

    async function handlePushCode() {
        if (!contract || !fileRaw) {
            return
        }
        const filename = packageNameRef.current.value
        const fileVersion = packageVersionRef.current.value
        const pack = filename + "@" + fileVersion
        await writeFile(pack, fileRaw, contract)
    }

    return (
        <Main>
            <Header />
            <div className="flex flex-1 w-full h-[calc(100%-80px)]">

                <Coding value={fileRaw} onChange={value => setFileRaw(value)} />
                <ul className="grid grid-cols-1 h-fit *:cursor-pointer *:p-3">
                    <li onClick={handleExecute}><img src="/assets/icons/Action.svg" alt="run code" /></li>
                    <Dialog>
                        <DialogTrigger asChild>
                            <li><img src="/assets/icons/Upload.svg" alt="push code" /></li>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit package information</DialogTitle>
                                <DialogDescription>
                                    Make changes to your package here. Click push when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="packagename" className="text-right"> Name </Label>
                                    <Input id="packagename" ref={packageNameRef} className="col-span-3"
                                           placeholder="test-foo" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="package-version" className="text-right"> Version </Label>
                                    <Input id="package-version" ref={packageVersionRef} placeholder="0.0.1"
                                           className="col-span-3" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" onClick={handlePushCode}>Push</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </ul>
                <div className="flex flex-col gap-4 mr-2 w-1/4">
                    <Coding value={code} onChange={value => setCode(value)} className="flex-6" />
                    <Result results={results} />
                </div>
            </div>
        </Main>
    )
}

export default Edit
