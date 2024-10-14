import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    open: true,
    https: {
      key: fs.readFileSync('./key.pem'),
      cert: fs.readFileSync('./cert.pem'),
    },
  },
  sourcemap: true,
  alias: {
    '@mui/material': path.resolve(__dirname, '../../../node_modules/@mui/material'),
    '@mui/icons-material': path.resolve(__dirname, '../../../node_modules/@mui/icons-material'),
  }
})
