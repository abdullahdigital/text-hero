import React from 'react'
import { cn } from "../lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion.jsx"

export default function About(props) {
    return (
        <div className="container mx-auto p-4 md:p-8 lg:p-12 bg-card text-card-foreground rounded-lg shadow-lg mt-8 mb-8">
            <h2 className="text-center text-3xl md:text-4xl font-bold mb-8 text-primary">About Us!</h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="item-1" className="border border-border rounded-lg shadow-sm bg-background data-[state=open]:bg-accent/10 transition-colors duration-200 overflow-hidden">
                    <AccordionTrigger className="text-lg font-semibold text-primary hover:text-primary-foreground transition-colors duration-200 p-4">What is this application?</AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground p-4">
                        This is a simple React application designed to perform various text manipulations.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border border-border rounded-lg shadow-sm bg-background data-[state=open]:bg-accent/10 transition-colors duration-200 overflow-hidden">
                    <AccordionTrigger className="text-lg font-semibold text-primary hover:text-primary-foreground transition-colors duration-200 p-4">What features does it offer?</AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground p-4">
                        It provides functionalities like converting text to uppercase, lowercase, clearing text, copying text, and removing extra spaces.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border border-border rounded-lg shadow-sm bg-background data-[state=open]:bg-accent/10 transition-colors duration-200 overflow-hidden">
                    <AccordionTrigger className="text-lg font-semibold text-primary hover:text-primary-foreground transition-colors duration-200 p-4">How can I use it?</AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground p-4">
                        Simply type or paste your text into the text area and use the buttons to apply different transformations.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
