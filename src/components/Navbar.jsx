import React from "react";
import { motion } from "framer-motion";
import logo from '../img/logo.png'; // Assuming logo.png is in src/img
import PropTypes from 'prop-types';

import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";

import { Moon, Sun } from "lucide-react";
import { cn } from "../lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../components/ui/navigation-menu";

export default function Navbar({ Home = "Home", mode = "light", toggleMode = () => {}, ...props }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        props.mode === "dark" ? "dark" : "light"
      )}
    >
      <div className="container flex h-14 items-center">
        <a className="text-xl font-bold flex items-center space-x-2" href="/">
          <img src={logo} alt="Logo" className="mr-2 h-6 w-auto" />
        </a>
        <NavigationMenu className="hidden md:flex flex-1 justify-center">
          <NavigationMenuList className="flex flex-1 items-center justify-center space-x-1">
            <NavigationMenuItem>
              <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
                {Home}
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/About" className={navigationMenuTriggerStyle()}>
                About
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 relative md:hidden"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
          <div className="flex items-center space-x-2 ml-auto">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Switch
              id="dark-mode-switch"
              checked={props.mode === 'dark'}
              onCheckedChange={() => toggleMode(mode === 'light' ? 'dark' : 'light')}
              aria-label="Toggle dark mode"
            />
            <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <Label htmlFor="dark-mode-switch" className="sr-only">Toggle Theme</Label>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden absolute top-[calc(100%-1px)] inset-x-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 shadow-sm"
        >
          <NavigationMenu className="flex flex-col items-center w-full">
            <NavigationMenuList className="flex flex-col items-start w-full p-4">
              <NavigationMenuItem className="w-full">
                <NavigationMenuLink
                  href="/"
                  className={cn(navigationMenuTriggerStyle(), "w-full justify-start")}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {Home}
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <NavigationMenuLink
                  href="/About"
                  className={cn(navigationMenuTriggerStyle(), "w-full justify-start")}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </motion.div>
      )}
    </motion.nav>
  );
}

Navbar.propTypes = {

  Home: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  toggleMode: PropTypes.func.isRequired,
}
