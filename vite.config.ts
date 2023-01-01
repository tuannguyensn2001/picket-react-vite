import {defineConfig, loadEnv} from 'vite';
import * as path from 'path';
import react from '@vitejs/plugin-react';

export default ({mode}: any) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};
    return defineConfig({
        plugins: [react()],
        resolve: {
            alias: {
                '~': path.resolve(__dirname, 'src'),
            },
        },
        server: {
            port: Number(process.env.VITE_PORT),
        },
    });
};
