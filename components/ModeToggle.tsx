// components/ModeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function ModeToggle() {
  const { resolvedTheme, theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Avoid hydration mismatch by only rendering after component is mounted
  useEffect(() => {
    setMounted(true);
    console.log("ModeToggle mounted");
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Log theme changes
  useEffect(() => {
    console.log("Theme changed:", {
      theme,
      resolvedTheme,
      systemTheme,
    });
  }, [theme, resolvedTheme, systemTheme]);

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="relative inline-block">
        <div className="p-2 rounded-md bg-transparent w-9 h-9" />
      </div>
    );
  }

  const currentTheme = resolvedTheme || theme;

  const handleThemeChange = (newTheme: string) => {
    console.log("Attempting to change theme to:", newTheme);
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => {
          console.log("Toggle button clicked, isOpen was:", isOpen);
          setIsOpen(!isOpen);
        }}
        className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
        aria-label="Toggle theme"
      >
        {currentTheme === "light" && (
          <Sun className="h-5 w-5 text-yellow-500" />
        )}
        {currentTheme === "dark" && <Moon className="h-5 w-5 text-blue-500" />}
        {!currentTheme ||
          (currentTheme === "system" && (
            <Monitor className="h-5 w-5 text-gray-500" />
          ))}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-1 w-36 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <button
            className="flex items-center px-4 py-2 w-full text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              handleThemeChange("light");
            }}
          >
            <Sun className="h-4 w-4 mr-2 text-yellow-500" />
            Light
          </button>
          <button
            className="flex items-center px-4 py-2 w-full text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              handleThemeChange("dark");
            }}
          >
            <Moon className="h-4 w-4 mr-2 text-blue-500" />
            Dark
          </button>
          <button
            className="flex items-center px-4 py-2 w-full text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              handleThemeChange("system");
            }}
          >
            <Monitor className="h-4 w-4 mr-2 text-gray-500" />
            System
          </button>
        </div>
      )}
    </div>
  );
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // components/ModeToggle.tsx
// "use client";

// import { useTheme } from "next-themes";
// import { Moon, Sun, Monitor } from "lucide-react";
// import { useState, useEffect } from "react";

// export function ModeToggle() {
//   const { resolvedTheme, theme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);

//   // Avoid hydration mismatch by only rendering after component is mounted
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (isOpen) setIsOpen(false);
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isOpen]);

//   // Don't render anything until mounted to prevent hydration mismatch
//   if (!mounted) {
//     // Return a placeholder with the same dimensions to prevent layout shift
//     return (
//       <div className="relative inline-block">
//         <div className="p-2 rounded-md bg-transparent w-9 h-9" />
//       </div>
//     );
//   }

//   // Now it's safe to use the theme
//   const currentTheme = resolvedTheme || theme;

//   return (
//     <div className="relative inline-block">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
//         aria-label="Toggle theme"
//       >
//         {currentTheme === "light" && (
//           <Sun className="h-5 w-5 text-yellow-500" />
//         )}
//         {currentTheme === "dark" && <Moon className="h-5 w-5 text-blue-500" />}
//         {currentTheme === "system" && (
//           <Monitor className="h-5 w-5 text-gray-500" />
//         )}
//       </button>

//       {isOpen && (
//         <div className="absolute right-0 mt-2 py-1 w-36 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50">
//           <button
//             className="flex items-center px-4 py-2 w-full text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
//             onClick={() => {
//               setTheme("light");
//               setIsOpen(false);
//             }}
//           >
//             <Sun className="h-4 w-4 mr-2 text-yellow-500" />
//             Light
//           </button>
//           <button
//             className="flex items-center px-4 py-2 w-full text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
//             onClick={() => {
//               setTheme("dark");
//               setIsOpen(false);
//             }}
//           >
//             <Moon className="h-4 w-4 mr-2 text-blue-500" />
//             Dark
//           </button>
//           <button
//             className="flex items-center px-4 py-2 w-full text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
//             onClick={() => {
//               setTheme("system");
//               setIsOpen(false);
//             }}
//           >
//             <Monitor className="h-4 w-4 mr-2 text-gray-500" />
//             System
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
