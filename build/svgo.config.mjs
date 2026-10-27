// SVGO conservador: só enxuga números e espaços. Nada de mesclar paths,
// renomear ids ou mexer em <style>, que quebraria as animações.
export default {
  multipass: false,
  plugins: [
    'removeComments',
    'removeMetadata',
    'removeEditorsNSData',
    'cleanupNumericValues',
    { name: 'convertPathData', params: { floatPrecision: 1 } },
    'removeEmptyContainers',
  ],
};
