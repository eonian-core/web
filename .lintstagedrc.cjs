const path = require('path')

const buildEslintCommand = (filenames) =>
  `npm run format`
 
const buildFilesOptions = (filenames) =>
  `--file ${filenames
    .map((f) => `"${path.relative(process.cwd(), f)}"`)
    .join(' --file ')}`

module.exports = {
  '*.{ts,tsx}': [buildEslintCommand],
}
