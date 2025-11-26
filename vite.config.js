import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                blog: resolve(__dirname, 'blog.html'),
                books: resolve(__dirname, 'books.html'),
                learnings: resolve(__dirname, 'learnings.html'),
            },
        },
    },
    server: {
        // Middleware to handle clean URLs
        middlewareMode: false,
    },
    appType: 'mpa',
    plugins: [
        {
            name: 'rewrite-middleware',
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    // Rewrite clean URLs to .html files
                    if (req.url === '/learnings') {
                        req.url = '/learnings.html';
                    } else if (req.url === '/blog') {
                        req.url = '/blog.html';
                    } else if (req.url === '/books') {
                        req.url = '/books.html';
                    }
                    next();
                });
            },
        },
    ],
});
