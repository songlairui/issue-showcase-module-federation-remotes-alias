# module-federation remotes + alias 问题演示

1. host 中已配置 remotes: remote/remote-app. 
   monorepo 已经配置  module-federation-vite-react-remote: workspace:*
2. 在 host 中通过两种方式使用 - 均正常. 
    import 'module-federation-vite-react-remote/src/App'. 
    import 'remote/remote-app'. 
3. vite.config 配置 resolve.alias 后, 本地开发正常，但构建失败.
``` javascript
    {
        find: "module-federation-vite-react-remote/src/App",  
        replacement: "remote/remote-app",  
    }
``` 

报错如下: 

``` bash
vite v5.2.10 building for production...
✓ 8 modules transformed.
x Build failed in 38ms
error during build:
Error: [vite:load-fallback] Could not load remote/remote-app (imported by src/App.tsx): ENOENT: no such file or directory, open 'remote/remote-app'
    at async open (node:internal/fs/promises:639:25)

```

期望：构建成功