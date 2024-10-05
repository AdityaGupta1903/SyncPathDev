
import { defineConfig,type Options } from 'tsup'

export default defineConfig((options:Options)=>({
    entry: ['./src/worker.ts'],
    format:["cjs"],
    ...options,
}))