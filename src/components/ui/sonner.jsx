// "use client"

// import { useTheme } from "next-themes"
// import { Toaster as Sonner } from "sonner";

// const Toaster = ({
//   ...props
// }) => {
//   const { theme = "system" } = useTheme()

//   return (
//     <Sonner
//       theme={theme}
//       className="toaster group"
//       style={
//         {
//           "--normal-bg": "var(--popover)",
//           "--normal-text": "var(--popover-foreground)",
//           "--normal-border": "var(--border)"
//         }
//       }
//       {...props} />
//   );
// }
"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={{
        "--normal-bg": "pink",                   // pink background
        "--normal-text": "black",                // black text for contrast
        "--normal-border": "#ff69b4"             // hotpink border
      }}
      {...props}
    />
  );
}




export { Toaster }
