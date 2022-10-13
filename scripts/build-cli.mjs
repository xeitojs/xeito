import {Parcel} from '@parcel/core';

// Build CLI
export const buildCLI = () => {
  return new Promise(async (resolve, reject) => {
    const bundler = new Parcel({
      entries: ['./packages/cli/index.ts'],
      targets: {
        main: {
          distDir: 'packages/cli/dist',
        },
        types: {
          distEntry: 'packages/cli/dist/index.d.ts',
          distDir: '.',
          sourceMap: false,
        }
      },
      defaultTargetOptions: {
        isLibrary: true,
        mode: 'production',
        sourceMaps: true,
        distDir: 'packages/cli/dist',
      }
    });

    console.log('Building cli...');
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
