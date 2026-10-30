import {
  createImageUrlBuilder,
  type SanityImageSource,
} from '@sanity/image-url';
import { client } from './client';

const builder = createImageUrlBuilder(client);

// Logos must keep their entire artwork. The builder otherwise computes a crop
// from width/height before applying fit=max, even for images without a saved crop.
export function logoUrl(source: SanityImageSource) {
  return builder
    .image(source)
    .ignoreImageParams()
    .width(480)
    .height(160)
    .fit('max')
    .auto('format')
    .url();
}

export function imageUrl(
  source: SanityImageSource,
  width: number,
  height: number,
  fit: 'crop' | 'max' = 'crop',
) {
  return builder
    .image(source)
    .width(width)
    .height(height)
    .fit(fit)
    .auto('format')
    .url();
}
