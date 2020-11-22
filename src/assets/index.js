const requireContext = require.context('.', true, /^(.+)\.png$/);
const flags = requireContext.keys().reduce((accumulator, imageName) => {
  const [/* fullMatch */, path] = imageName.match(/^\.\/(.+)\.png$/);
  const key = path.replaceAll('/', '\\');
  accumulator[key] = requireContext(imageName);
  return accumulator;
}, {});

export default flags;
