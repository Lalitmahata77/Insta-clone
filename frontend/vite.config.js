// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api/": "http://localhost:5000",
//       "/uploads/": "http://localhost:5000",
//     },
//   },
// })

import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
 
export default defineConfig({
  plugins: [react()],
  server: {
        proxy: {
         "/api/": "http://localhost:5000",
           "/uploads/": "http://localhost:5000",
        },
      },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})