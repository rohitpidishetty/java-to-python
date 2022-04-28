import React from 'react';
import './index.css';
/*
** Welcome to CIRL's new release, this is a software created by Rohit Acharya.
** This software converts your java code into python.
** All you need to do is write your java code and click on convert button, then your code will be converted into python source code and will be pasted on right side of the page, in python text area.
*/
async function ConvertToPy() {
    /*
    ** After clicking on the convert button, the code will be processed.
    ** 1. Getting the raw text from the user and storing into the variable -> code.
    ** 2. Parsing the code using L0 - Parser( ) methodology. i.e checking if all the brackets and paranthesis are balanced or not.
    */
    var code = document.getElementById("code").value.trim();
    var status = "";
    // Parsing the code, if parsed successfully then only the code will be converted into python
    var Stack = [];
    var stackPointer = 0;
    // push method adds all the { [ ( into the stack
    const push = (element) => {
        Stack[stackPointer] = element;
        stackPointer++;
    }
    // while popping all the { [ ( elements will be removed from Stack by receving ) ] } elements
    const pop = () => {
        try {
            Stack[stackPointer - 1] = ``;
            stackPointer--;
            if (Stack[0] === ``) {
                // Checking whether the Stack is empty or not ?
                // if the stack is empty -> that means the code it perfectly balanced and allowed to be converted to python code.
                status = "true"
                // Setting the status as true, to confirm that code is balanced precisely.
            }
        } catch (e) {
            alert("Error : Parse UNSUCCESSFUL");
        }
    }
    // Checking the code by converting the String into chunks of size 1
    for (var ptr = 0; ptr <= code.length; ptr++) {
        if (code[ptr] === '{' || code[ptr] === '(' || code[ptr] === '[') {
            var sym = code[ptr];
            push(sym);
        } else if (code[ptr] === '}' || code[ptr] === ')' || code[ptr] === ']') {
            pop();
        }
    }
    // if the code is parsed then, its allowed to be converted into python
    if (status === "true") {
        var code = document.getElementById("code").value.trim();
        var codeFragmentation = [];
        var j = 0;
        // First the code is coverted into chunks of space 1 and is being added to the local storage.
        // Two consecutives spaces arent allowed, if two consecutive spaces are encountered then an exception is raised. 
        for (var data = 0; data < code.length; data++) {
            if (code[data] !== null) {
                if ((code[data] === " " && code[data + 1] === " ")) {
                    alert("Extra spaces arent allowed");
                    localStorage.clear();
                    break;
                }
                else {
                    // Adding code to localStorage by chunks of space one or by bits.
                    codeFragmentation[j] = code[data];
                    j++;
                }
            }
        }
        localStorage.setItem('code', JSON.stringify(codeFragmentation));
        // Parsing
        var print = "";
        var id_ = 0;
        var functionName = "";
        var _function_ = [];
        var className = "";
        var _name_ = [];
        // Getting class name
        for (var cN = 0; cN < localStorage.getItem("code").length; cN++) {
            if ((JSON.parse(localStorage.getItem("code"))[cN] === "c" && JSON.parse(localStorage.getItem("code"))[cN + 1] === "l" && JSON.parse(localStorage.getItem("code"))[cN + 2] === "a" && JSON.parse(localStorage.getItem("code"))[cN + 3] === "s" && JSON.parse(localStorage.getItem("code"))[cN + 4] === "s" && JSON.parse(localStorage.getItem("code"))[cN + 5] === " ")) {
                // The key word "class" is been recognized by the program.
                for (var cName = cN + 5; cName < localStorage.getItem("code").length; cName++) {
                    if (JSON.parse(localStorage.getItem("code"))[cName] !== "{") {
                        className += JSON.parse(localStorage.getItem("code"))[cName].trim();
                    }
                    if (JSON.parse(localStorage.getItem("code"))[cName] === "{") {
                        break;
                    }
                }
            }
        }
        _name_ = className.split(" ");
        className = _name_[0].trim();
        for (var data = 0; data < localStorage.getItem("code").length; data++) {
            // Processing syntax -> public void Method( );
            if ((JSON.parse(localStorage.getItem("code"))[data] === `(` && JSON.parse(localStorage.getItem("code"))[data + 1] === `)` && JSON.parse(localStorage.getItem("code"))[data + 2] !== `;`) || (JSON.parse(localStorage.getItem("code"))[data] === `(` && JSON.parse(localStorage.getItem("code"))[data + 2] === `)` && JSON.parse(localStorage.getItem("code"))[data + 3] !== `;`)) { // No argument funtion
                for (var ptr = data; ptr >= 0; ptr--) {
                    functionName += JSON.parse(localStorage.getItem("code"))[ptr];
                }
                _function_ = functionName.split(" ");
                functionName = _function_[0];
                var function_id = "";
                for (var rev = functionName.length - 1; rev > 0; rev--) {
                    function_id += functionName[rev];
                }
                localStorage.setItem(id_, `def ${function_id} () :`)
                /*
                After setting the item to local storage, the local storage id is update by one and all the variable values are flushed.
                */
                id_++;
                _name_ = "";
                function_id = "";
                functionName = "";
                _function_ = [];
            }
            //Processing print out method with out double quotes
            else if ((JSON.parse(localStorage.getItem("code"))[data] === `p` && JSON.parse(localStorage.getItem("code"))[data - 1] === `.` && JSON.parse(localStorage.getItem("code"))[data + 1] === `r` && JSON.parse(localStorage.getItem("code"))[data + 2] === `i` && JSON.parse(localStorage.getItem("code"))[data + 3] === `n` && JSON.parse(localStorage.getItem("code"))[data + 4] === `t` && JSON.parse(localStorage.getItem("code"))[data + 5] !== `l`)) {
                var print = "";
                for (var ptr = [data + 5]; ptr < localStorage.getItem("code").length; ptr++) {
                    if (JSON.parse(localStorage.getItem("code"))[ptr] !== ";") {
                        print += JSON.parse(localStorage.getItem("code"))[ptr];
                    }
                    if (JSON.parse(localStorage.getItem("code"))[ptr] === ";") {
                        localStorage.setItem(id_, `\tprint${print}`);
                        id_++;
                        print = "";
                        break;
                    }
                }
            }
            // Processing syntax tocken -> public static void main(String[] args) = main method
            else if (JSON.parse(localStorage.getItem("code"))[data] === `p` && JSON.parse(localStorage.getItem("code"))[data + 7] === `s` && JSON.parse(localStorage.getItem("code"))[data + 14] === 'v' && JSON.parse(localStorage.getItem("code"))[data + 19] === 'm') {
                var mainMethod = "";
                for (var ptr = data; ptr < localStorage.getItem("code").length; ptr++) {
                    if (JSON.parse(localStorage.getItem("code"))[ptr] !== `{`) {
                        mainMethod += JSON.parse(localStorage.getItem("code"))[ptr];
                    }
                    if (JSON.parse(localStorage.getItem("code"))[ptr] === `{`) {
                        if (mainMethod.includes("static") && mainMethod.includes("main")) {
                            localStorage.setItem(id_, `if __name__ == "__main__" :`);
                        }
                        mainMethod = "";
                        id_++;
                        break;
                    }
                }
                var functionCalls = "";
                for (var pt = data + 19; pt < localStorage.getItem("code").length; pt++) {
                    // Getting the object reference
                    if ((JSON.parse(localStorage.getItem("code"))[pt] === className[0]) && (JSON.parse(localStorage.getItem("code"))[pt + (className.length - 1)] === className[className.length - 1])) {
                        var syntax = "";
                        for (var Pt = pt; Pt < localStorage.getItem("code").length; Pt++) {
                            // ClassName objRef = new ClassName();
                            // Consider the symbol "=" here and drive the code.
                            // Until the pointer reaches "=", concat all the chunks.
                            if (JSON.parse(localStorage.getItem("code"))[Pt] !== `=`) {
                                syntax += JSON.parse(localStorage.getItem("code"))[Pt];
                            }
                            if (JSON.parse(localStorage.getItem("code"))[Pt] === `=`) {
                                var object = "";
                                syntax = syntax.trim();
                                object = syntax.split(" ")[1].trim();
                                syntax = "";
                                break;
                            }
                        }
                        if (object !== "" && object !== null) {
                            for (var pointer = Pt; pointer < localStorage.getItem("code").length; pointer++) {
                                if (JSON.parse(localStorage.getItem("code"))[pointer] === object[0] && JSON.parse(localStorage.getItem("code"))[pointer + (object.length - 1)] === object[object.length - 1] && JSON.parse(localStorage.getItem("code"))[pointer + (object.length)] === `.`) {
                                    for (var pointAt = [pointer + (object.length + 1)]; pointAt < localStorage.getItem("code").length; pointAt++) {
                                        if (JSON.parse(localStorage.getItem("code"))[pointAt] !== ';') {
                                            functionCalls += JSON.parse(localStorage.getItem("code"))[pointAt];
                                        }
                                        if (JSON.parse(localStorage.getItem("code"))[pointAt] === ';') {
                                            localStorage.setItem(id_, `\t${(functionCalls)}`);
                                            functionCalls = "";
                                            object = "";
                                            id_++;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            // Processing Data types and values
            else if (JSON.parse(localStorage.getItem("code"))[data] === `=` && JSON.parse(localStorage.getItem("code"))[data-2] !== `]` && JSON.parse(localStorage.getItem("code"))[data + 1] !== `=` && JSON.parse(localStorage.getItem("code"))[data + 2] !== `n` && JSON.parse(localStorage.getItem("code"))[data + 3] !== `e` && JSON.parse(localStorage.getItem("code"))[data + 4] !== `w`) {
                //Hence its not a obj declairation, proved
                //Getting object name
                var objectName = "";
                for (var objName = [data - 2]; objName >= 0; objName--) {
                    if (JSON.parse(localStorage.getItem("code"))[objName] !== " ") {
                        objectName += JSON.parse(localStorage.getItem("code"))[objName].replace("[", "").replace("]", "");
                    }
                    if (JSON.parse(localStorage.getItem("code"))[objName] === " " || JSON.parse(localStorage.getItem("code"))[objName] === "\n") {
                        var variableName = "";
                        for (var rev = objectName.length - 1; rev >= 0; rev--) {
                            variableName += objectName.charAt(rev);
                        }
                        break;
                    }
                }
                // Getting value
                var objectValue = "";
                for (var objData = [data + 2]; objData <= localStorage.getItem("code").length; objData++) {
                    if (JSON.parse(localStorage.getItem("code"))[objData] !== `;`) {
                        objectValue += JSON.parse(localStorage.getItem("code"))[objData].replace("{", "[").replace("}", "]");
                    }
                    if (JSON.parse(localStorage.getItem("code"))[objData] === `;`) {
                        break;
                    }
                }
                if (objectName !== "" && objectValue !== "") {
                    if (objectValue.trim().includes(".nextLine") || objectValue.trim().includes(".nextInt")) {
                        // Dynamic input
                        objectValue = objectValue.replace("nextLine", "input").replace("nextInt", "input");
                        localStorage.setItem(id_, `\t${variableName.replace("(", "").trim()} = ${objectValue.split(".")[1].trim()}`)
                        variableName = objectValue = "";
                        id_++;
                    }
                    else {
                        // Static input
                        localStorage.setItem(id_, `\t${variableName.replace("(", "").trim()} = ${objectValue.trim()}`)
                        variableName = objectValue = "";
                        id_++;
                    }
                }
            }
            // Processing condition -> if( ) { }
            else if ((JSON.parse(localStorage.getItem("code"))[data] === `i` && JSON.parse(localStorage.getItem("code"))[data + 1] === `f` && JSON.parse(localStorage.getItem("code"))[data - 1] === "\n") && (JSON.parse(localStorage.getItem("code"))[data + 2] === `(` || JSON.parse(localStorage.getItem("code"))[data + 3] === `(`)) { //if condition proved
                var conditionStatement = "";
                for (var ptr = data; ptr < localStorage.getItem("code").length; ptr++) {
                    if (JSON.parse(localStorage.getItem("code"))[ptr] !== `{`) {
                        conditionStatement += JSON.parse(localStorage.getItem("code"))[ptr];
                    }
                    if (JSON.parse(localStorage.getItem("code"))[ptr] === `{`) {
                        conditionStatement = conditionStatement.trim();
                        localStorage.setItem(id_, `${conditionStatement} :`);
                        conditionStatement = "";
                        id_++;
                        break;
                    }
                }
            }
            // Processing condition -> else { }
            else if (JSON.parse(localStorage.getItem("code"))[data] === `e` && JSON.parse(localStorage.getItem("code"))[data + 1] === `l` && JSON.parse(localStorage.getItem("code"))[data + 2] === `s` && JSON.parse(localStorage.getItem("code"))[data + 3] === `e` && JSON.parse(localStorage.getItem("code"))[data + 5] !== `i`) {
                var conditionStatement = "";
                for (var ptr = [data]; ptr < localStorage.getItem("code").length; ptr++) {
                    if (JSON.parse(localStorage.getItem("code"))[ptr] !== `{`) {
                        conditionStatement += JSON.parse(localStorage.getItem("code"))[ptr];
                    }
                    if (JSON.parse(localStorage.getItem("code"))[ptr] === `{`) {
                        conditionStatement = conditionStatement.trim();
                        localStorage.setItem(id_, `${conditionStatement} :`);
                        conditionStatement = "";
                        id_++;
                        break;
                    }
                }
            }
            //  Processing condition -> else if( ) { }
            else if ((JSON.parse(localStorage.getItem("code"))[data] === `e` && JSON.parse(localStorage.getItem("code"))[data + 1] === `l` && JSON.parse(localStorage.getItem("code"))[data + 2] === `s` && JSON.parse(localStorage.getItem("code"))[data + 3] === `e` && JSON.parse(localStorage.getItem("code"))[data + 4] === ` ` && JSON.parse(localStorage.getItem("code"))[data + 5] === `i`)) {
                var conditionStatement = "";
                for (var ptr = [data + 7]; ptr < localStorage.getItem("code").length; ptr++) {
                    if (JSON.parse(localStorage.getItem("code"))[ptr] !== `{`) {
                        conditionStatement += JSON.parse(localStorage.getItem("code"))[ptr];
                    }
                    if (JSON.parse(localStorage.getItem("code"))[ptr] === `{`) {
                        conditionStatement = conditionStatement.replace("else", "").trim();
                        localStorage.setItem(id_, `elif ${conditionStatement} :`);
                        conditionStatement = "";
                        id_++;
                        break;
                    }
                }
            }
            // Processing empty array, with initialized array size
            else if (JSON.parse(localStorage.getItem("code"))[data] === `=` && JSON.parse(localStorage.getItem("code"))[data + 1] !== `=` && JSON.parse(localStorage.getItem("code"))[data + 2] === `n` && JSON.parse(localStorage.getItem("code"))[data + 3] === `e` && JSON.parse(localStorage.getItem("code"))[data + 4] === `w` && (JSON.parse(localStorage.getItem("code"))[data + 6] === `S` || JSON.parse(localStorage.getItem("code"))[data + 6] === `i` || JSON.parse(localStorage.getItem("code"))[data + 6] === `I`)) {
                var leftHand = "";
                for (var ptr = [data - 2]; ptr >= 0; ptr--) {
                    if (JSON.parse(localStorage.getItem("code"))[ptr] !== ` `) {
                        leftHand += JSON.parse(localStorage.getItem("code"))[ptr];
                    }
                    if (JSON.parse(localStorage.getItem("code"))[ptr] === ` `) {
                        var setName = "";
                        for (var name = leftHand.length; name >= 0; name--) {
                            setName += leftHand.charAt(name);
                        }
                        leftHand = setName.trim();
                        localStorage.setItem(id_, `\t${leftHand.replace("[", "").replace("]", "")} = []`);
                        id_++;
                        leftHand = "";
                        setName = "";
                        break;
                    }
                }
            }
            // Processing forLoop -> for(int iterator = 0; iterator < Range; iterator++)
            else if (JSON.parse(localStorage.getItem("code"))[data] === `f` && JSON.parse(localStorage.getItem("code"))[data + 1] === `o` && JSON.parse(localStorage.getItem("code"))[data + 2] === `r` && (JSON.parse(localStorage.getItem("code"))[data + 3] === `(` || JSON.parse(localStorage.getItem("code"))[data + 4] === `(`)) {
                // for interator in range (Range) :
                var iteratorName = "";
                for (var ptr = [data + 3]; ptr < JSON.parse(localStorage.getItem("code")).length; ptr++) {
                    if (JSON.parse(localStorage.getItem("code"))[ptr] !== `{`) {
                        iteratorName += JSON.parse(localStorage.getItem("code"))[ptr];
                    }
                    if (JSON.parse(localStorage.getItem("code"))[ptr] === `{`) {
                        iteratorName = iteratorName.trim();
                        var rangeFunction = [];
                        rangeFunction = iteratorName.split(";");
                        rangeFunction = rangeFunction[1].trim()
                        var rangeName = "";
                        var Range = "";
                        var _function_ = [];
                        _function_ = rangeFunction.split(" ");
                        rangeName = _function_[0];
                        Range = _function_[2];
                        if (Range.includes("length")) {
                            var upto = "";
                            var range = Range.replace(".length", "");
                            upto = `len(${range})`
                            localStorage.setItem(id_, `for ${rangeName} in range (${upto}) :`);
                            id_++;
                            _function_ = [];
                            Range = "";
                            rangeName = "";
                            rangeFunction = [];
                            iteratorName = "";
                            break;
                        }
                        else {
                            localStorage.setItem(id_, `for ${rangeName} in range (${Range}) :`);
                            id_++;
                            _function_ = [];
                            Range = "";
                            rangeName = "";
                            rangeFunction = [];
                            iteratorName = "";
                            break;
                        }

                    }
                }
            }
            // Processing push() method
            else if (JSON.parse(localStorage.getItem("code"))[data] === `p` && JSON.parse(localStorage.getItem("code"))[data + 1] === `u` && JSON.parse(localStorage.getItem("code"))[data + 2] === `s` && JSON.parse(localStorage.getItem("code"))[data + 3] === `h` && JSON.parse(localStorage.getItem("code"))[data + 4] === `(`) {
                var method = "";
                for (var ptr = data; ptr < localStorage.getItem("code").length; ptr++) {
                    if (JSON.parse(localStorage.getItem("code"))[ptr] !== `;`) {
                        method += JSON.parse(localStorage.getItem("code"))[ptr];
                    }
                    if (JSON.parse(localStorage.getItem("code"))[ptr] === `;`) {
                        method = method.replace("push", "append").trim();
                        break;
                    }
                }
                var toObject = "";
                for (var ptr = [data - 1]; ptr >= 0; ptr--) {
                    if (JSON.parse(localStorage.getItem("code"))[ptr] !== " " && JSON.parse(localStorage.getItem("code"))[ptr] !== null && JSON.parse(localStorage.getItem("code"))[ptr] !== undefined && JSON.parse(localStorage.getItem("code"))[ptr] !== "\n") {
                        toObject += JSON.parse(localStorage.getItem("code"))[ptr];
                    }
                    if (JSON.parse(localStorage.getItem("code"))[ptr] === " " || JSON.parse(localStorage.getItem("code"))[ptr] === null || JSON.parse(localStorage.getItem("code"))[ptr] === undefined || JSON.parse(localStorage.getItem("code"))[ptr] === "\n") {
                        var setName = "";
                        for (var name = toObject.length; name >= 0; name--) {
                            setName += toObject.charAt(name);
                        }
                        toObject = setName.trim();
                        localStorage.setItem(id_, `\t${toObject + method}`);
                        id_++;
                        method = "";
                        leftHand = "";
                        setName = "";
                        break;
                    }
                }


            }
            // Processing pop method
            else if (JSON.parse(localStorage.getItem("code"))[data] === `p` && JSON.parse(localStorage.getItem("code"))[data + 1] === `o` && JSON.parse(localStorage.getItem("code"))[data + 2] === `p` && JSON.parse(localStorage.getItem("code"))[data + 3] === `(`) {
                var method = "";
                for (var ptr = data; ptr < localStorage.getItem("code").length; ptr++) {
                    if (JSON.parse(localStorage.getItem("code"))[ptr] !== `;`) {
                        method += JSON.parse(localStorage.getItem("code"))[ptr];
                    }
                    if (JSON.parse(localStorage.getItem("code"))[ptr] === `;`) {
                        method = method.trim();
                        break;
                    }
                }
                var toObject = "";
                for (var ptr = [data - 1]; ptr >= 0; ptr--) {
                    if (JSON.parse(localStorage.getItem("code"))[ptr] !== " " && JSON.parse(localStorage.getItem("code"))[ptr] !== null && JSON.parse(localStorage.getItem("code"))[ptr] !== undefined && JSON.parse(localStorage.getItem("code"))[ptr] !== "\n") {
                        toObject += JSON.parse(localStorage.getItem("code"))[ptr];
                    }
                    if (JSON.parse(localStorage.getItem("code"))[ptr] === " " || JSON.parse(localStorage.getItem("code"))[ptr] === null || JSON.parse(localStorage.getItem("code"))[ptr] === undefined || JSON.parse(localStorage.getItem("code"))[ptr] === "\n") {
                        var setName = "";
                        for (var name = toObject.length; name >= 0; name--) {
                            setName += toObject.charAt(name);
                        }
                        toObject = setName.trim();
                        localStorage.setItem(id_, `\t${toObject + method}`);
                        id_++;
                        method = "";
                        leftHand = "";
                        setName = "";
                        break;
                    }
                }
            }
            // Processing comment line //
            else if (JSON.parse(localStorage.getItem("code"))[data] === `/` && JSON.parse(localStorage.getItem("code"))[data + 1] === `/`) {
                var comment = "";
                for (var ptr = data + 2; ptr < JSON.parse(localStorage.getItem("code").length); ptr++) {
                    if (JSON.parse(localStorage.getItem("code"))[ptr] !== `\n`) {
                        comment += JSON.parse(localStorage.getItem("code"))[ptr];
                    }
                    if (JSON.parse(localStorage.getItem("code"))[ptr] === `\n`) {
                        localStorage.setItem(id_, `\t#${comment}`);
                        id_++;
                        comment = "";
                        break;
                    }

                }
            }
            // Processing ++ -> incrementer
            else if (JSON.parse(localStorage.getItem("code"))[data] === `+` && JSON.parse(localStorage.getItem("code"))[data + 1] === `+` && JSON.parse(localStorage.getItem("code"))[data + 2] === `;`) {
                var leftHand = "";
                for (var Ptr = data; Ptr >= 0; Ptr--) {
                    if (JSON.parse(localStorage.getItem("code"))[Ptr] !== ` `) {
                        leftHand += JSON.parse(localStorage.getItem("code"))[Ptr];
                    }
                    if (JSON.parse(localStorage.getItem("code"))[Ptr] === " " || JSON.parse(localStorage.getItem("code"))[Ptr] === "\n") {
                        var counterName = "";
                        for (var ptr = leftHand.length; ptr >= 0; ptr--) {
                            counterName += leftHand.charAt(ptr);
                        }
                        counterName = counterName.replaceAll("+", "").trim();
                        localStorage.setItem(id_, `\t${counterName} = ${counterName} + 1`);
                        id_++;
                        counterName = "";
                        leftHand = "";
                        break;
                    }
                }
            }
            // Processing [] inserting into array : Array[number] = "Value{Integer/String}"
            else if (JSON.parse(localStorage.getItem("code"))[data] === `]` && JSON.parse(localStorage.getItem("code"))[data - 1] !== `[` && JSON.parse(localStorage.getItem("code"))[data - 1] !== ` ` && JSON.parse(localStorage.getItem("code"))[data + 1] === ` ` && JSON.parse(localStorage.getItem("code"))[data + 2] === `=`) {
                var leftHand = "";
                for (var ptr = data; ptr >= 0; ptr--) {
                    if (JSON.parse(localStorage.getItem("code"))[ptr] !== '\n' && JSON.parse(localStorage.getItem("code"))[ptr] !== '') {
                        leftHand += JSON.parse(localStorage.getItem("code"))[ptr];
                    }
                    if (JSON.parse(localStorage.getItem("code"))[ptr] === '\n' || JSON.parse(localStorage.getItem("code"))[ptr] === '') {
                        var leftSide = "";
                        for(var i = leftHand.length; i >= 0; i--) {
                            leftSide += leftHand.charAt(i);
                        }
                        leftSide = leftSide.replace("]","");
                        break;
                    }
                }
                var rightHand = "";
                for (var Ptr = data; Ptr < JSON.parse(localStorage.getItem("code")).length; Ptr++) {
                    if (JSON.parse(localStorage.getItem("code"))[Ptr] !== ';') {
                        rightHand += JSON.parse(localStorage.getItem("code"))[Ptr];
                    }
                    if (JSON.parse(localStorage.getItem("code"))[Ptr] === ';') {
                        break;
                    }
                }
                localStorage.setItem(id_,`\t${leftSide+""+rightHand}`)
                id_++;
                leftSide = "";
                leftHand = "";
                rightHand = "";
            }
        }
    }
    else {
        alert("Error: reached end of file while parsing")
    }
}

const JavaToPy = () => {
    return (
        <>
            <nav>
                <div id="Left-Nav">
                    <img id="logoImg" src="logo.png" alt="image"></img>
                </div>
                <p id="title">Java to Python converter tool</p>
                <div id="Right-Nav">
                    <table>
                        <tr>
                            {/* information button */}
                            <td>
                                <img onClick={() => {
                                    window.open("https://www.instagram.com/rohit_pidishetty/?hl=en", "_slef")
                                }
                                } id="logo" src="info.png" alt="image"></img>
                            </td>
                            {/* Code button */}
                            <td>
                                <img onClick={() => {
                                    /* Writing proprietor code.
                                    ** Just to ease the user with this already written code, so that they will know what all could be coverted into python. This is kind of a documentation.
                                    */
                                    var code = document.getElementById("code");
                                    code.value = "";
                                    code.innerHTML = "";
                                    code.value = `// This is an example program by the proprietor\n`
                                    code.value += `public class java_To_py {\n`
                                    code.value += `public void Wish() {\n`
                                    code.value += `System.out.print("Hello everyone");\n`
                                    code.value += `System.out.print("Im here to introduce my new software that converts you java code to python code");\n`
                                    code.value += `}\n`
                                    code.value += `public static void main(String[] args) {\n`
                                    code.value += `java_To_python jtp = new java_To_python();\n`
                                    code.value += `jtp.Wish();\n`
                                    code.value += `//We can declare data values\n`
                                    code.value += `int phoneNumber = 7661081442;\n`
                                    code.value += `//We can input dynamically\n`
                                    code.value += `Scanner sr = new Scanner(System.in);\n`
                                    code.value += `System.out.print("Enter your name");\n`
                                    code.value += `String Name = sr.nextLine();\n`
                                    code.value += `String[] emptyArray = new String[10];\n`
                                    code.value += `//We can create arrays\n`
                                    code.value += `String[] details = {"Rohit","Software Engineer","Free Lancer"};\n`
                                    code.value += `details[1] = "Software Scientist";\n`
                                    code.value += `System.out.print("I am a "+details[2]);\n`
                                    code.value += `System.out.print();\n`
                                    code.value += `//We can even perform operations on array\n`
                                    code.value += `//pushing elements to array\n`
                                    code.value += `details.push("Follow me on instagram");\n`
                                    code.value += `details.push("Follow me on facebook");\n`
                                    code.value += `System.out.print(details);\n`
                                    code.value += `//popping elements from array\n`
                                    code.value += `details.pop();\n`
                                    code.value += `System.out.print(details);\n`
                                    code.value += `System.out.print();\n`
                                    code.value += `//We can even iterate through array\n`
                                    code.value += `for(int iterator = 0; iterator < details.length; iterator++) {\n`
                                    code.value += `System.out.print(details[iterator]);\n`
                                    code.value += `}\n`
                                    code.value += `System.out.print();\n`
                                    code.value += `//We can print elements upto n times\n`
                                    code.value += `for(int incrementer = 0; incrementer < 4; incrementer++) {\n`
                                    code.value += `System.out.print(details[incrementer]);\n`
                                    code.value += `incrementer++;\n`
                                    code.value += `}\n`
                                    code.value += `//We can validate\n`
                                    code.value += `//Validating dynamic input\n`
                                    code.value += `if(Name == "Rohit") {\n`
                                    code.value += `System.out.print("Hello Rohit");\n`
                                    code.value += `}\n`
                                    code.value += `else if(Name == "Alien") {\n`
                                    code.value += `System.out.print("Hello Alien");\n`
                                    code.value += `}\n`
                                    code.value += `else {\n`
                                    code.value += `System.out.print("Hello World");\n`
                                    code.value += `}\n`
                                    code.value += `}\n`
                                    code.value += `}\n`
                                }} id="logo" src="code.png" alt="image"></img>
                            </td>
                            {/* Convert into python button */}
                            <td>
                                <img id="py_code_" onClick={() => {
                                    document.getElementById("load").style.visibility = "visible"
                                    document.getElementById("final_code").innerHTML = "Your code is being converted into python.";
                                    setTimeout(() => {
                                        { ConvertToPy() }
                                        document.getElementById("final_code").innerHTML = "";
                                        for (var id_ = 0; id_ <= 10000; id_++) {
                                            if (localStorage.getItem(id_) != null && localStorage.getItem(id_) != undefined) {
                                                document.getElementById("final_code").innerHTML += localStorage.getItem(id_) + "\n";
                                            }
                                        }
                                    }, 20)
                                }} id="logo" src="convert.png" alt="image"></img>
                            </td>
                            {/* Delete button */}
                            <td>
                                <img
                                    onClick={() => {
                                        document.getElementById("final_code").innerHTML = "";
                                        window.location.reload();
                                        localStorage.clear();
                                        alert("Cleared")
                                    }} id="logo" src="erase.png" alt="image"></img>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Developer
                            </td>
                            <td>
                                Code
                            </td>
                            <td>
                                Convert
                            </td>
                            <td>
                                Clear
                            </td>
                        </tr>
                    </table>
                </div>
            </nav><br /><br />
            <center>
                <div className="IDE">
                    <img id="load" src="Loader.gif" alt="loader"></img>
                    {/* Text area to enter your java code */}
                    <textarea spellCheck="false" placeholder="Enter java source code, that is to be converted into python source code." id="code"
                        onKeyDown={(event) => {
                            var keyPressed = event.key;
                            if (keyPressed == 'Backspace') {
                                localStorage.clear();
                            }
                        }}>
                    </textarea>
                    {/* Text area to show python code, which is converted from java. */}
                    <textarea spellCheck="false" placeholder="Python code."
                        onChange={() => {
                            if (document.getElementById("final_code").value === "clear") {
                                alert("Cleared")
                                localStorage.clear();
                                window.location.reload();
                            }
                            if (document.getElementById("final_code").value === " " || document.getElementById("final_code").value === "") {
                                alert("Cleared")
                                localStorage.clear();
                                window.location.reload();
                            }
                        }} id="final_code">
                    </textarea>
                </div>
                <div id="info">
                    <p> By Rohit Pidishetty, All Copyrights &copy; reserved by Code infinity research laboratory..</p>
                </div>
            </center>
        </>
    )
}
export default JavaToPy;