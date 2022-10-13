import {Parcel} from '@parcel/core';

// Build router
export const buildRouter = async () => {
  return new Promise(async (resolve, reject) => {
    const bundler = new Parcel({
      entries: ['./packages/router/index.ts'],
      targets: {
        main: {
          distDir: 'packages/router/dist',
        },
        types: {
          distEntry: 'packages/router/dist/index.d.ts',
          distDir: '.',
          sourceMap: false,
        }
      },
      defaultTargetOptions: {
        isLibrary: true,
        mode: 'production',
        sourceMaps: true,
        distDir: 'packages/router/dist',
      }
    });

    console.log('Building router...');
    try {
      let {bundleGraph, buildTime} = await bundler.run();
      let bundles = bundleGraph.getBundles();
      console.log(`✨ Built ${bundles.length} bundles in ${buildTime}ms!`);
      console.log('------------------------------');
      resolve();
    } catch (err) {
      console.log(err.diagnostics);
      reject();
      process.exit(1);
    }

  });
}
