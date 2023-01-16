import { readdirSync } from 'fs';
import chalk from 'chalk';
import { join } from 'path';

const headPkgList = [];
// utils must build before core
// runtime must build before renderer-react
const pkgList = readdirSync(join(__dirname, 'packages')).filter(
  (pkg) => pkg.charAt(0) !== '.' && !headPkgList.includes(pkg),
);

const alias = pkgList.reduce((pre, pkg) => {
  pre[`@pansy/react-${pkg}`] = join(__dirname, 'packages', pkg, 'src');
  return {
    ...pre,
  };
}, {});

console.log(`🌼 alias list \n${chalk.blue(Object.keys(alias).join('\n'))}`);

const tailPkgList = pkgList
  .map((path) => [join('packages', path, 'docs')])
  .reduce((acc, val) => acc.concat(val), []);

const logo = 'https://cdn.jsdelivr.net/gh/wangxingkang/pictures@latest/imgs/react.svg';

export default {
  title: 'React Components',
  logo,
  favicon: logo,
  mode: 'site',
  alias,
  resolve: { includes: [...tailPkgList, 'docs'] },
  navs: [
    null,
    {
      title: 'AMap',
      path: 'https://react-amap-pansyjs.vercel.app/',
    },
    {
      title: 'GitHub',
      path: 'https://github.com/pansyjs/react-components',
    },
  ],
  hash: true,
  dynamicImport: {}
};
