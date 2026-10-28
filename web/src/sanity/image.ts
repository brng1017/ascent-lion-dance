import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

export function imageUrl(
  source: SanityImageSource,
  width: number,
  height: number,
  fit: "crop" | "max" = "crop",
) {
  return builder
    .image(source)
    .width(width)
    .height(height)
    .fit(fit)
    .auto("format")
    .url();
}
