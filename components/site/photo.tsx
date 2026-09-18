/* Optimised picture element: AVIF → WebP fallback, responsive srcset, no layout shift. */

export type PhotoName =
  | 'field-guide-hero'
  | 'industrial-wayfinding'
  | 'field-notebook-flatlay'
  | 'guide-atlas'
  | 'atlas-map';

export const PHOTO_META: Record<PhotoName, { w: number; h: number; widths: number[] }> = {
  'field-guide-hero': { w: 1408, h: 768, widths: [800, 1200, 1600] },
  'industrial-wayfinding': { w: 1408, h: 768, widths: [800, 1200] },
  'field-notebook-flatlay': { w: 1408, h: 768, widths: [800, 1200] },
  'guide-atlas': { w: 1376, h: 768, widths: [700, 1000, 1400] },
  'atlas-map': { w: 1408, h: 768, widths: [700, 1000, 1400] },
};

export function srcSetFor(name: PhotoName, ext: 'avif' | 'webp') {
  return PHOTO_META[name].widths.map((w) => `/img/${name}-${w}.${ext} ${w}w`).join(', ');
}

export function photoSrc(name: PhotoName, width?: number) {
  const meta = PHOTO_META[name];
  const chosen = width && meta.widths.includes(width) ? width : meta.widths[Math.floor(meta.widths.length / 2)];
  return `/img/${name}-${chosen}.webp`;
}

export function Photo({
  name,
  alt,
  sizes,
  className = '',
  imgClassName = '',
  eager = false,
  cover = false,
  style,
}: {
  name: PhotoName;
  alt: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  /** true → the image fills its (absolutely positioned) parent */
  cover?: boolean;
  style?: React.CSSProperties;
}) {
  const meta = PHOTO_META[name];
  const ratio = meta.w / meta.h;
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={srcSetFor(name, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSetFor(name, 'webp')} sizes={sizes} />
      <img
        src={photoSrc(name)}
        alt={alt}
        width={meta.w}
        height={meta.h}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={cover ? `h-full w-full object-cover ${imgClassName}` : `w-full ${imgClassName}`}
        style={cover ? style : { aspectRatio: `${ratio}`, objectFit: 'cover', ...style }}
      />
    </picture>
  );
}
