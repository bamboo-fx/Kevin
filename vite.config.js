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
});
