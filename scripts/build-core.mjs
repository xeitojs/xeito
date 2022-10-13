import {Parcel} from '@parcel/core';

// Build core
export const buildCore = () => {
  return new Promise(async (resolve, reject) => {
    const bundler = new Parcel({
      entries: ['./packages/core/index.ts'],
      targets: {
        main: {
          distDir: 'packages/core/dist',
        },
        types: {
          distEntry: 'packages/core/dist/index.d.ts',
          distDir: '.',
          sourceMap: false,
        }
      },
      defaultTargetOptions: {
        isLibrary: true,
        mode: 'production',
        sourceMaps: true,
        distDir: 'packages/core/dist',
      }
    });

    console.log('Building core...');
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
