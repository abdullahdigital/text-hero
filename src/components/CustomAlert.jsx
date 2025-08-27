import React from 'react'
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { cn } from "../lib/utils";

function CustomAlert(props) {
  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
      {props.alert && (
        <Alert className={cn(
            "w-full shadow-lg rounded-lg",
            props.alert.type === 'success' ? 'border-green-500 text-green-800 bg-green-50/80' : 'border-red-500 text-red-800 bg-red-50/80'
        )}>
          <AlertTitle className="text-lg font-bold">{capitalize(props.alert.type)}</AlertTitle>
          <AlertDescription className="text-sm">{props.alert.msg}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

export default CustomAlert
