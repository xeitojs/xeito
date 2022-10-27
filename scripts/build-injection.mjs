import {Parcel} from '@parcel/core';

// Build injection
export const buildInjection = async () => {
  return new Promise(async (resolve, reject) => {
    const bundler = new Parcel({
      entries: ['./packages/injection/index.ts'],
      targets: {
        main: {
          distDir: 'packages/injection/dist',
          engines: {
            browsers: ['last 2 years, > 1%, not dead'],
          },
          includeNodeModules: ['reflect-metadata', 'process'],
        },
        types: {
          distEntry: 'packages/injection/dist/index.d.ts',
          distDir: '.',
          sourceMap: false,
        }
      },
      defaultTargetOptions: {
        isLibrary: true,
        mode: 'production',
        sourceMaps: true,
        distDir: 'packages/injection/dist',
      }
    });

    console.log('Building injection...');
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
