import { fileUrlToPath, URL} from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            '@': fileUrlToPath(new URL('./src', import.meta.url)),
        }
    }
})