import { formatOutput } from "./format";


export function fakeConsole(output, runner) {
    const normalLog = console.log;
    const normalError = console.error;
    console.error = function (e) {
        output?.(e);
        normalError.apply(console, arguments)
    };
    console.log = function () {
        const res = []
        for (let i = 0; i < arguments.length; i++) {
            var o = formatOutput(arguments[i]);
            res.push(o)
        }
        output?.(res.join(" "));

        normalLog.apply(console, arguments)
    }
    runner?.()
    console.log = normalLog;
    console.error = normalError;
}
