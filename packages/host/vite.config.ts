import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { dependencies } from "./package.json";

export default defineConfig(() => ({
	server: { fs: { allow: [".", "../shared"] } },
	build: {
		target: "chrome89",
	},
	resolve: {
		alias: [
			// 开启此 alias 后, 构建失败; （本地开发正常， 效果符合期望）
			{
				find: "module-federation-vite-react-remote/src/App",
				replacement: "remote/remote-app",
			},
		],
	},
	plugins: [
		federation({
			name: "host",
			remotes: {
				remote: {
					type: "module",
					name: "remote",
					entry: "http://localhost:4174/remoteEntry.js",
					entryGlobalName: "remote",
					shareScope: "default",
				},
			},
			exposes: {},
			filename: "remoteEntry.js",
			shared: {
				react: {
					requiredVersion: dependencies.react,
					singleton: true,
				},
			},
		}),
		react(),
	],
}));
