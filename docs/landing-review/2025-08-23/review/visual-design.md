# Visual & Design

- **Above-the-fold fit**: On ≤375px, keep hero within ~1–1.5 screens. Reduce phone mockup height or hide one floating card.
- **CTA prominence**: Primary CTA is clear; keep secondary "See how it works" link.
- **Consistency**: Use consistent glass-card treatment: `backdrop-blur-md bg-white/70 border-white/60 shadow-xl` for floating labels.
- **Spacing rhythm**: Pull pricing block slightly higher (reduced top margin) for cold traffic scanning.
- **Contrast**: Validate green CTA contrast on light backgrounds, especially hero and footer.
- **Performance**: Use `next/image`, lazy-load below-the-fold, keep `<video>` `poster` and `preload="metadata"`.
