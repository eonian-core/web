const path = require('path')

const buildEslintCommand = (filenames) =>
  `next lint -c ./.eslintrc.cjs --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`
 
module.exports = {
  '*.{ts,tsx}': [buildEslintCommand],
}
