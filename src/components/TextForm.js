
import React, { useState } from 'react';
export default function TextForm(props) {
    const handleUpClick = () => {
        console.log("Uppercase button clicked")
        setText(text.toUpperCase())
        props.showAlert("Converted to uppercase", "success")
    }
    const handleLoClick = () => {
        console.log("Uppercase button clicked")
        setText(text.toLowerCase())
        props.showAlert("Converted to lowercase", "success")
    }
    const handleOnChange = (event) => {
        console.log("On Change Handle")
        setText(event.target.value)
    }
    const handleClearClick = (event) => {
        let newText = "";
        setText(newText);
        props.showAlert("Text box has been cleared", "success")
    }

    const handleCopy = (event) => {
        var text = document.getElementById("textBox");
        text.select();
        navigator.clipboard.writeText(text.value)
        props.showAlert("Text has been copied", "success")

    }

    const handleExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra spaces removed", "success")
    }


    const [text, setText] = useState("");
    return (
        <>


            <div className='container' style={{ color: props.mode === "dark" ? "white" : "black" }}>
                <h1>{props.heading}</h1>
                <div className="mb-3">

                    <textarea class="form-control" value={text} onChange={handleOnChange} style={{ color: props.mode === "dark" ? "white" : "black", backgroundColor: props.mode === "dark" ? "black" : "white" }} id="textBox" rows="8"></textarea>
                </div>
                <button className="btn btn-primary mx-2" onClick={handleClearClick}>Clear Text Box</button>
                <button className="btn btn-primary mx-2" onClick={handleUpClick}>Convert to Uppercase</button>
                <button className="btn btn-primary mx-2" onClick={handleLoClick}>Convert to Lowercase</button>
                <button className="btn btn-primary mx-2" onClick={handleCopy}>Copy Text</button>
                <button className="btn btn-primary mx-2" onClick={handleExtraSpaces}>Remove Extra Space </button>

            </div>
            <div className="container my-2" style={{ color: props.mode === "dark" ? "white" : "black" }}>
                <h1>Your Text Summary</h1>
                <p>{text.split(" ").length} Words, {text.length} Characters</p>
                <p>{0.008 * text.split(" ").length} Minutes read</p>
                <h3>Preview</h3>
                <p>{text.length > 0 ? "Enter something inthe textbox above to preview it here" : text}</p>
            </div>
        </>
    );
}
