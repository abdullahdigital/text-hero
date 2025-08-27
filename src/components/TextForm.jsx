import React,{useState} from 'react'
import { motion } from "framer-motion";
import { cn } from "../lib/utils";


import { Button } from "./ui/button.jsx"


import { Textarea } from "./ui/textarea.jsx"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip.jsx";

export default function TextForm(props) {
    
    const handleUpClick=()=>{
        let newText=text.toUpperCase();
        setText(newText)
        props.showAlert("Converted to Uppercase","success")
    }
    const handleLoClick=()=>{
        let newText=text.toLowerCase();
        setText(newText)
        props.showAlert("Converted to Lowercase","success")
    }

    const handleCopyText = () => {
        navigator.clipboard.writeText(text);
        props.showAlert("Copied to Clipboard!", "success");
    };

    const handleClearText = () => {
        setText("");
        props.showAlert("Text cleared!", "success");
    };


    const handleCapitalizeFirstLetter = () => {
      let newText = text.split('. ').map(sentence => {
        if (sentence.length === 0) return '';
        return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();
      }).join('. ');
      setText(newText);
      props.showAlert("First letter capitalized","success");
    };

    const handleReverseText = () => {
      let newText = text.split('').reverse().join('');
      setText(newText);
      props.showAlert("Text reversed","success");
    };

    const handleSpeakText = () => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
        props.showAlert("Speaking text","success");
      } else {
        props.showAlert("Speech synthesis not supported in this browser","error");
      }
    };

    const handleDownloadText = () => {
      const element = document.createElement("a");
      const file = new Blob([text], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = "myText.txt";
      document.body.appendChild(element); // Required for Firefox
      element.click();
      document.body.removeChild(element); // Clean up
      props.showAlert("Text downloaded","success");
    };

    const handleExtractEmails = () => {
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const emails = text.match(emailRegex);
        if (emails && emails.length > 0) {
            setText(emails.join('\n'));
            props.showAlert("Emails extracted successfully","success");
        } else {
            setText("No email addresses found.");
            props.showAlert("No email addresses found","info");
        }
    };

    const handleRemoveExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
    };

    const handleWordCharCount = () => {
        const words = text.split(/\s+/).filter(word => word.length > 0).length;
        const chars = text.length;
        props.showAlert(`Words: ${words}, Characters: ${chars}`, "info");
    };

    const handleTitleCase = () => {
        let newText = text.toLowerCase().split(' ').map((word) => {
            return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' ');
        setText(newText);
    };

    const handleAlternatingCase = () => {
        let newText = text.split('').map((char, index) => {
            return index % 2 === 0 ? char.toLowerCase() : char.toUpperCase();
        }).join('');
        setText(newText);
    };

    const handleSentenceCase = () => {
        let newText = text.toLowerCase().replace(/(^|\.\s+)([a-z])/g, (match, p1, p2) => p1 + p2.toUpperCase());
        setText(newText);
    };

    const handleKebabCase = () => {
        let newText = text.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
        setText(newText);
    };

    const handleSnakeCase = () => {
        let newText = text.replace(/([A-Z])/g, '_$1').toLowerCase();
        setText(newText);
    };

    const handleCamelCase = () => {
        let newText = text.replace(/(?:^|\s)([a-z])/g, (match, p1) => p1.toUpperCase());
        setText(newText);
    };

    const handlePascalCase = () => {
        let newText = text.replace(/(?:^|\s)([a-z])/g, (match, p1) => p1.toUpperCase()).replace(/\s/g, '');
        setText(newText);
    };

    const handleReverseString = () => {
        let newText = text.split('').reverse().join('');
        setText(newText);
    };

    const handleReverseWords = () => {
        let newText = text.split(' ').reverse().join(' ');
        setText(newText);
    };

    const handleRemoveNumbers = () => {
        let newText = text.replace(/\d+/g, '');
        setText(newText);
    };

    const handleRemoveSpecialChars = () => {
        let newText = text.replace(/[^a-zA-Z0-9\s]/g, '');
        setText(newText);
    };

    const handleRemoveBlankLines = () => {
        let newText = text.split('\n').filter(line => line.trim() !== '').join('\n');
        setText(newText);
    };

    const handleConvertToMarkdown = () => {
        let newText = `## Converted Text\n\n${text.split('\n').map(line => `- ${line}`).join('\n')}`;
        setText(newText);
    };

    const handleConvertToHtml = () => {
        let newText = `<p>${text.split('\n').join('</p><p>')}</p>`;
        setText(newText);
    };

    const handleOnChange=(event)=>{
        setText(event.target.value)
    }

    const[text,setText] = useState('')



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 md:p-8 lg:p-12 bg-card text-card-foreground rounded-lg shadow-lg mt-8 mb-8"
    >
      <div className="mb-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-primary">{props.heading}</h1>
        
        <Textarea
          value={text}
          onChange={handleOnChange}
          id="truck"
          rows="6"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        ></Textarea>

        <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline" disabled={text.length===0} onClick={handleUpClick}>Change to Uppercase</Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Converts the text to uppercase</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" disabled={text.length===0} onClick={handleLoClick}>Change to Lowercase</Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" disabled={text.length===0} onClick={handleClearText}>Clear Text</Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" disabled={text.length===0} onClick={handleCopyText}>Copy Text</Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" disabled={text.length===0} onClick={handleCapitalizeFirstLetter}>Capitalize First Letter</Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" disabled={text.length===0} onClick={handleReverseText}>Reverse Text</Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" disabled={text.length===0} onClick={handleSpeakText}>Speak Text</Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" disabled={text.length===0} onClick={handleDownloadText}>Download Text</Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" disabled={text.length===0} onClick={handleExtractEmails}>Extract Emails</Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" disabled={text.length===0} onClick={handleRemoveExtraSpaces}>Remove Extra Spaces</Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" disabled={text.length===0} onClick={handleWordCharCount}>Word/Char Count</Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" disabled={text.length===0} onClick={handleTitleCase}>Title Case</Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" disabled={text.length===0} onClick={handleAlternatingCase}>Alternating Case</Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" disabled={text.length===0} onClick={handleSentenceCase}>Sentence Case</Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" disabled={text.length===0} onClick={handleKebabCase}>Kebab Case</Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" disabled={text.length===0} onClick={handleSnakeCase}>Snake Case</Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" disabled={text.length===0} onClick={handleCamelCase}>Camel Case</Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" disabled={text.length===0} onClick={handlePascalCase}>Pascal Case</Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" disabled={text.length===0} onClick={handleReverseString}>Reverse String</Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" disabled={text.length===0} onClick={handleReverseWords}>Reverse Words</Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" disabled={text.length===0} onClick={handleRemoveNumbers}>Remove Numbers</Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" disabled={text.length===0} onClick={handleRemoveSpecialChars}>Remove Special Chars</Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" disabled={text.length===0} onClick={handleRemoveBlankLines}>Remove Blank Lines</Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" disabled={text.length===0} onClick={handleConvertToMarkdown}>Convert to Markdown</Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" disabled={text.length===0} onClick={handleConvertToHtml}>Convert to HTML</Button>
          </motion.div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-primary">Your Text Summary</h2>
        <p className="text-base mb-2">
          <span className="font-semibold">Words:</span> {text.split(/\s+/).filter((element) => element.length !== 0).length} | <span className="font-semibold">Characters:</span> {text.length}
        </p>
        <p className="text-base mb-4">
          <span className="font-semibold">Reading Time:</span> {0.008 * text.split(" ").filter((element) => element.length !== 0).length} Minutes
        </p>
        <h2 className="text-2xl font-bold mb-4 text-primary">Preview</h2>
        <div className="p-4 bg-muted rounded-md border border-border min-h-[100px] overflow-auto shadow-inner">
          <p className="text-muted-foreground italic text-base">
            {text.length > 0 ? text : "Enter something in the textbox above to preview it here"}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
