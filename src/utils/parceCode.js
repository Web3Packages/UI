import * as acorn from "acorn"

export default function parseCode(code) {
    try {
        // 解析代码
        const ast = acorn.parse(code, { ecmaVersion: 2020, sourceType: "module" })

        // 遍历 AST 以提取函数信息
        let functionFound = false // 确保解析出的是最外层函数

        function walk(node, callback) {
            if (functionFound) return // 如果找到函数，停止遍历
            callback(node)
            for (let key in node) {
                if (node.hasOwnProperty(key)) {
                    let child = node[key]
                    if (Array.isArray(child)) {
                        for (let i = 0; i < child.length; i++) {
                            if (functionFound) return // 如果找到函数，停止遍历
                            walk(child[i], callback)
                        }
                    } else if (child && typeof child.type === "string") {
                        walk(child, callback)
                    }
                }
            }
        }

        let fun = {}

        // 处理函数节点
        walk(ast, node => {
            if (node.type === "FunctionDeclaration") {      // function fun() 形式
                const params = node.params.map(param => param.name)
                functionFound = true
                fun.name = node.id.name
                fun.params = params
            } else if (node.type === "VariableDeclarator" && node.init) {
                if (node.init.type === "FunctionExpression") {      // const fun = function() 形式
                    const params = node.init.params.map(param => param.name)
                    functionFound = true
                    fun.name = node.id.name
                    fun.params = params
                } else if (node.init.type === "ArrowFunctionExpression") {      // const fun = () => 形式
                    const params = node.init.params.map(param => param.name)
                    functionFound = true
                    fun.name = node.id.name
                    fun.params = params
                }
            }
        })
        if (!functionFound) {
            alert("代码中没有找到方法。")
        }
        return fun
    } catch (error) {
        alert("代码不是合法的 JavaScript 代码。")
    }
}