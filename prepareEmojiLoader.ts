const fs = require('fs');
const files = fs
  .readdirSync('./assets/emojis')
  .filter(x => x.includes('gif') || x.includes('png') || x.includes('mp4'));
const ex =
  '{\n' +
  files
    .map(x =>
      x.includes('.png')
        ? `"${x.split('.png')[0] + '_PNG'}": require("./${x}"),`
        : `"${x.split('.gif')[0] + '_GIF'}": require("./${x}"),`,
    )
    .join('\n') +
  '}';
const res = 'export default ' + ex;
fs.writeFileSync('./assets/emojis/index.js', res);
