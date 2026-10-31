# IO

Browser-based multiplayer ship game prototype ("stateczky"). An Express + Socket.IO server tracks connected players' ships, and a Babylon.js client renders them on water with a skybox and Oimo physics.

## Features
- Each connecting player gets a ship; the server sends it the existing ships and broadcasts newcomers and disconnects (`createMyShip`, `otherExistingShips`, `newlyConnectedShip`, `shipDisconnected`)
- 3D scene: water material reflecting a skybox, lighting, camera, STL ship models in `src/public/scenes/`
- Own ship steered with W/A/S/D; movement applied in the render loop

## Requirements
Node.js. TypeScript sources are compiled with `tsc` and the client is bundled with webpack.

## Setup
```bash
npm install
npx tsc                 # root tsconfig.json: compiles .ts to .js (webpack entry is Client/src/App.js)
cd Client && npm install
npm run build           # bundles to ../src/public/javascripts/game.js
cd ..
node bin/www            # http://localhost:3000 (or PORT env var)
```
`node src/index.js` starts the same app on port 80 instead. The `npm start` script points to a non-existent path.

## Structure
```
bin/www, src/index.js       server entry points
src/app.js, src/services/   Express setup, Socket.IO wiring
src/GameLogic/              server-side ship/player entities, ship socket handler
src/public/                 static files: bundled game.js, STL models, textures
src/views/                  EJS pages (canvas host)
Client/src/                 Babylon.js client: Game, scene/engine/camera, water, skybox, ships
```
