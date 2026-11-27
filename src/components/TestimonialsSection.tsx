import { ExternalLink, Quote, Star } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { BUSINESS_INFO, CUSTOMER_REVIEWS } from '../data/ispData';

export default function TestimonialsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [featuredReview, ...otherReviews] = CUSTOMER_REVIEWS;

  return (
    <section
      id="reviews"
      className="border-b border-[#DCE5DF] dark:border-[#1F352B] bg-[#F4F7F5] dark:bg-[#0A110E] py-16 sm:py-20 transition-colors"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header & Google Reviews Link */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-wide text-[#007B3E] dark:text-[#78BE20]">
              Verified Peshawar Customer Feedback
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#0F1F17] dark:text-white sm:text-4xl [text-wrap:balance]">
              Trusted by Engineers, Creators & Businesses Across Peshawar
            </h2>
          </div>

          <a
            href={BUSINESS_INFO.googleProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-2 self-start rounded-xl border border-[#DCE5DF] dark:border-[#1F352B] bg-white dark:bg-[#13201A] px-4 py-2 text-xs font-semibold text-[#0F1F17] dark:text-[#F1F6F3] transition-colors hover:border-[#007B3E] dark:hover:border-[#78BE20] whitespace-nowrap"
          >
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
            <span>Read & Leave a Google Review</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        {/* Featured Testimonial: Subhan */}
        <motion.article
          whileHover={prefersReducedMotion ? undefined : { y: -3 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 rounded-2xl border border-[#007B3E]/35 dark:border-[#78BE20]/35 bg-white dark:bg-[#13201A] p-6 sm:p-8"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#4B5B53] dark:text-[#9EB3A7]">
                <span className="font-bold text-[#007B3E] dark:text-[#78BE20]">
                  Featured Customer Story
                </span>
                <span aria-hidden="true">·</span>
                <span>{featuredReview.area}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-[#0F1F17] dark:text-[#F1F6F3]">
                  {featuredReview.packageUsed}
                </span>
              </div>

              <div className="mt-4 flex items-start gap-3">
                <Quote
                  className="mt-1 h-6 w-6 shrink-0 text-[#007B3E] dark:text-[#78BE20]"
                  aria-hidden="true"
                />
                <blockquote className="text-base leading-relaxed text-[#1E2E26] dark:text-[#D5E1DA] sm:text-lg">
                  &ldquo;{featuredReview.quote}&rdquo;
                </blockquote>
              </div>
            </div>

            <div className="shrink-0 border-t border-[#DCE5DF] dark:border-[#1F352B] pt-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
              <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
                {Array.from({ length: featuredReview.rating }).map((_, idx) => (
                  <Star
                    key={idx}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="mt-2 font-display text-lg font-bold text-[#0F1F17] dark:text-white">
                {featuredReview.name}
              </p>
              <p className="text-sm text-[#4B5B53] dark:text-[#9EB3A7]">{featuredReview.role}</p>
              <p className="mt-1 text-xs font-semibold text-[#007B3E] dark:text-[#78BE20]">
                {featuredReview.highlight}
              </p>
            </div>
          </div>
        </motion.article>

        {/* Supporting Customer Reviews: Arsalan, Zubair, Kashif, Aliyan */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {otherReviews.map((review) => (
            <motion.article
              key={review.id}
              whileHover={prefersReducedMotion ? undefined : { y: -4 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-between rounded-2xl border border-[#DCE5DF] dark:border-[#1F352B] bg-white dark:bg-[#13201A] p-6"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div
                    className="flex items-center gap-1"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {Array.from({ length: review.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#007B3E] dark:text-[#78BE20]">
                    {review.highlight}
                  </span>
                </div>

                <blockquote className="mt-4 text-sm leading-relaxed text-[#2A3A32] dark:text-[#D5E1DA]">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-[#DCE5DF] dark:border-[#1F352B] pt-4">
                <div>
                  <p className="font-display text-sm font-bold text-[#0F1F17] dark:text-white">
                    {review.name}
                  </p>
                  <p className="text-xs text-[#4B5B53] dark:text-[#9EB3A7]">{review.role}</p>
                </div>
                <div className="text-right text-xs text-[#4B5B53] dark:text-[#9EB3A7]">
                  <p className="font-medium text-[#0F1F17] dark:text-[#F1F6F3]">{review.area}</p>
                  <p className="font-mono">{review.packageUsed}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
