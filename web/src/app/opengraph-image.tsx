import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { siteConfig } from '@/config/site';

export const alt = 'Ascent Dragon & Lion Dance — Denver, Colorado';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const logo = await readFile(
    join(process.cwd(), 'public/images/ascent-logo.png'),
  );

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: '60px 72px',
        background: '#080808',
        color: '#ffffff',
        borderBottom: '16px solid #f00035',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {/* ImageResponse embeds the local logo directly into the generated preview. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${logo.toString('base64')}`}
          width={110}
          height={81}
          alt=''
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 38, fontWeight: 700 }}>ASCENT</span>
          <span style={{ fontSize: 18, letterSpacing: 4 }}>
            DRAGON &amp; LION DANCE
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={{ fontSize: 74, fontWeight: 700 }}>
          Lion &amp; Dragon Dance
        </span>
        <span style={{ fontSize: 64, fontWeight: 700, color: '#ffc400' }}>
          Denver, Colorado
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 23,
          color: '#ffffffb3',
        }}
      >
        <span>Tradition. Community. Celebration.</span>
        <span>{new URL(siteConfig.url).hostname}</span>
      </div>
    </div>,
    size,
  );
}
