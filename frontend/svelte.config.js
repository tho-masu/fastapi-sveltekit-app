import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter({
            // ポートとホストを指定
            host: '0.0.0.0',
            port: 3000
        })
    }
};

export default config;
