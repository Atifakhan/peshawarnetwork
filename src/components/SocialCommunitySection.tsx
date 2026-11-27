import { useState } from 'react';
import { ExternalLink, Facebook, Globe, Radio } from 'lucide-react';
import { BUSINESS_INFO, COMMUNITY_POSTS } from '../data/ispData';

function ResilientPostImage({ src, alt, title }: { src: string; alt: string; title: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#007B3E] to-[#0A110E] p-4 text-center text-white">
        <Radio className="h-7 w-7 text-[#78BE20]" aria-hidden="true" />
        <p className="mt-2 text-xs font-medium">{title}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
    />
  );
}

export default function SocialCommunitySection() {
  return (
    <section
      id="community"
      className="border-b border-[#DCE5DF] dark:border-[#1F352B] bg-white dark:bg-[#0F1914] py-16 sm:py-20 transition-colors"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-wide text-[#007B3E] dark:text-[#78BE20]">
              Facebook Channel & Google Business Updates
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#0F1F17] dark:text-white sm:text-4xl [text-wrap:balance]">
              Live Peshawar Installations & Exchange Rollouts
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#3C4E45] dark:text-[#B4C5BC]">
              Follow our official Facebook page and Google Business profile for fiber expansion photos, router setup guides, and area turnup announcements across Peshawar.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={BUSINESS_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#1877F2] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#166FE5] whitespace-nowrap"
            >
              <Facebook className="h-4 w-4" aria-hidden="true" />
              <span>Follow Facebook Page</span>
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>

            <a
              href={BUSINESS_INFO.googleProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#DCE5DF] dark:border-[#1F352B] bg-[#F4F7F5] dark:bg-[#13201A] px-4 py-2.5 text-xs font-semibold text-[#0F1F17] dark:text-[#F1F6F3] transition-colors hover:border-[#007B3E] dark:hover:border-[#78BE20] whitespace-nowrap"
            >
              <Globe className="h-4 w-4 text-[#007B3E] dark:text-[#78BE20]" aria-hidden="true" />
              <span>Google Business Profile</span>
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* 3-Card Field Updates Feed */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {COMMUNITY_POSTS.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#DCE5DF] dark:border-[#1F352B] bg-[#F9FBFA] dark:bg-[#13201A]"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#EAF2ED] dark:bg-[#0B1510]">
                <ResilientPostImage
                  src={post.imagePath}
                  alt={post.imageAlt}
                  title={post.title}
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#4B5B53] dark:text-[#9EB3A7]">
                    <span className="font-semibold text-[#007B3E] dark:text-[#78BE20]">
                      {post.platform}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{post.areaTag}</span>
                  </div>

                  <h3 className="mt-2 font-display text-lg font-bold tracking-tight text-[#0F1F17] dark:text-white">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#3C4E45] dark:text-[#B4C5BC]">
                    {post.summary}
                  </p>
                </div>

                <div className="mt-5 border-t border-[#DCE5DF] dark:border-[#1F352B] pt-4">
                  <a
                    href={post.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#007B3E] dark:text-[#78BE20] hover:underline"
                  >
                    <span>{post.ctaLabel}</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
