import React,{useState} from 'react'
import { motion } from "framer-motion";
import { cn } from "../lib/utils";


import { Button } from "./ui/button.tsx"


import { Textarea } from "./ui/textarea.tsx"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

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
    const clearr=()=>{
        let newText="";
        setText(newText)
        props.showAlert("Text cleared","success")
    }
    const handleCopy=()=>{
        navigator.clipboard.writeText(text);
        props.showAlert("Copied to clipboard","success")
    }
    const handleExtraSpaces=()=>{
       let newText=text.split(/[ ]+/)
       setText(newText.join(' '))
       props.showAlert("Extra spaces removed","success")
    }

    const handleOnChange=(event)=>{
        setText(event.target.value)
    }

    const[text,setText] = useState('')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <div className={cn("mb-4", props.mode === 'dark' ? 'text-white' : 'text-[#042743]')}>
        <h1 className="text-3xl font-extrabold mb-6 text-center">{props.heading}</h1>
        
        <Textarea
          value={text}
          onChange={handleOnChange}
          id="truck"
          rows="6"
          className={cn("w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary", props.mode === 'dark' ? 'bg-[#1e293b] text-white' : 'bg-white text-[#042743]')}
        ></Textarea>
        <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button disabled={text.length===0} onClick={handleUpClick}>Change to Uppercase</Button>
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
            <Button disabled={text.length===0} onClick={handleLoClick}>Change to Lowercase</Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button disabled={text.length===0} onClick={clearr}>Clear Text</Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button disabled={text.length===0} onClick={handleCopy}>Copy Text</Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button disabled={text.length===0} onClick={handleExtraSpaces}>Remove Extra Spaces</Button>
          </motion.div>
        </div>
      </div>
      <div className={cn("", props.mode === 'dark' ? 'text-white' : 'text-[#042743]')}>
        <h2 className="text-xl font-semibold mb-2">Your Text Summary</h2>
        <p className="text-lg mb-2">
          <span className="font-semibold">Words:</span> {text.split(/\s+/).filter((element) => element.length !== 0).length}
          <span className="ml-4 font-semibold">Characters:</span> {text.length}
        </p>
        <p className="text-lg mb-4">
          <span className="font-semibold">Reading Time:</span> {0.008 * text.split(" ").filter((element) => element.length !== 0).length} Minutes
        </p>
        <h2 className="text-2xl font-bold mb-4 text-primary-foreground">Preview</h2>
        <div className="p-4 bg-muted rounded-md border border-border min-h-[100px] overflow-auto">
          <p className="text-muted-foreground italic">
            {text.length > 0 ? text : "Enter something in the textbox above to preview it here"}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
