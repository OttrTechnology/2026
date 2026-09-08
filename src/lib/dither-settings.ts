export const DEFAULT_DITHER_SETTINGS = {
  gridSize: 280,
  scale: 0.72,
  dotScale: 1.1,
  invert: false,
  cornerRadius: 0.2,
  threshold: 70,
  contrast: 40,
  gamma: 1.1,
  blur: 1,
  diffusionStrength: 1,
  serpentine: true,
}

export type DitherSettings = typeof DEFAULT_DITHER_SETTINGS
