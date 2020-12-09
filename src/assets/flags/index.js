const requireContext = require.context('.', true, /^.+\.png$/);
const flags = requireContext.keys().reduce((accumulator, image) => {
  const [/* fullMatch */, /* collection */, dirname, filename] = image.match(/^\.\/(.+)\/(.+)\/(.+)\.png$/);
  const key = `ui\\flags\\${dirname}\\${filename}`

  accumulator[key] = requireContext(image);
  return accumulator;
}, {});

export default flags;
