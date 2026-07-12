import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Vite plugin to run the Vercel serverless function locally
const apiMiddleware = () => ({
  name: 'api-middleware',
  configureServer(server) {
    server.middlewares.use('/api/remove-bg', async (req, res) => {
      try {
        const env = loadEnv(server.config.mode, process.cwd(), '');
        process.env.REMOVE_BG_API_KEY = env.REMOVE_BG_API_KEY;

        // Add Express-like methods that Vercel uses
        res.status = (code) => {
          res.statusCode = code;
          return res;
        };
        res.json = (data) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        };
        res.send = (data) => {
          res.end(data);
        };

        const handler = await import('./api/remove-bg.js');
        await handler.default(req, res);
      } catch (e) {
        console.error(e);
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiMiddleware()],
})
