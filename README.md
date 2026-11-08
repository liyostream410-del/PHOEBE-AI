# PHOEBE AI — Starter

Android-first web prototype for the Phoebe 3D character.

## Included
- Mobile-friendly 3D viewer built with Three.js
- GLB model at `assets/models/phoebe.glb`
- Touch drag to rotate and pinch to zoom
- Reset view and optional auto-rotate controls

## Run it
This project uses Three.js ES modules from jsDelivr, so the first preview needs an internet connection.

### GitHub Pages
1. Upload the contents of this folder to the root of your GitHub repository.
2. Open **Settings → Pages**.
3. Under Build and deployment, choose **Deploy from a branch**.
4. Select branch `main` and folder `/ (root)`, then Save.
5. Open the Pages URL GitHub provides.

Do not open `index.html` as a `file://` URL; browsers block module/model loading in that mode. Use GitHub Pages or a local development server.

## Important current limitation
The supplied GLB is being used as a static model preview. This starter does not add a skeleton, facial blendshapes, lip-sync, or body animations. Those require a rigged/animated character asset or a separate rigging/animation workflow.

## Planned next modules
- `src/animation.js`: animation state controller (after a rigged model is available)
- `src/ai.js`: AI conversation adapter
- `src/voice.js`: speech input and text-to-speech adapter
- Offline model/runtime integration for Android

## Asset credit
The Phoebe model asset was supplied by the project owner. Preserve the original creator's attribution and license terms that accompany the downloaded asset. Check the source archive's license before redistributing the model publicly.
