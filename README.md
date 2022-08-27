# GLB Animation Combiner

> :warning: bun is experimental.  
> and this branch is not working.  
> 
> I was send bug report to bun  
> https://github.com/oven-sh/bun/issues/1161

## How to use it?

```sh
$ git clone https://github.com/juunini/glb-animation-combiner.git
$ cd glb-animation-combiner
$ pnpm i
$ pnpm dev
```

enter http://localhost:5173

## How to customize it?

See the `src/App.tsx` line 7 ~ 20,  
you can change animation name and file names and glb root name.  

Files path is `public/models` and `public/animations`  

## If you want combine ready player me avatar

1. make avatar from [ready player me](https://readyplayer.me) and download glb
2. change your glb to fbx by blender
3. go to [mixamo](https://www.mixamo.com) and upload fbx
4. choose animations and download fbx **without skin**
5. change animation fbx to glb by blender
6. use https://github.com/juunini/glb-animation-combiner
