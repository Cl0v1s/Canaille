/* eslint-disable @typescript-eslint/no-var-requires */
const { exec } = require('child_process');
const path = require('path');

module.exports = {
  entry: {
    bundle: {
      import: './src/js/index.ts',
      filename: 'index.js',
    },
    index: {
      import: './src/scss/index.scss',
      filename: 'ignore_index.js',
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    clean: true,
    library: 'Canaille',
    libraryTarget: 'umd',
    globalObject: 'this',
    publicPath: 'auto',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].css',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                charset: false,
                indentWidth: 4,
                includePaths: [path.resolve(__dirname, 'node_modules')],
              },
            },
          },
        ],
      },
    ],
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    'react-router-dom': 'react-router-dom',
  },
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap('.d.ts Generation', () => {
          exec('npx tsc', (err, stdout, stderr) => {
            if (stdout) process.stdout.write(`Typescript: ${stdout}`);

            if (stderr) process.stderr.write(`Typescript: ${stderr}`);
          });
        });
      },
    },
  ],
};