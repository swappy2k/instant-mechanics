import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden pt-20 bg-background">
      {/* Soft warm background textures and gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(224,142,88,0.15)_0%,rgba(247,243,239,0)_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(214,153,153,0.1)_0%,rgba(247,243,239,0)_50%)]" />
        
        {/* Subtle noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-multiply" 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} 
        />
      </div>

      <div className="container relative z-10 mx-auto px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-primary/20 bg-white/50 backdrop-blur-sm mb-10 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-xs font-medium uppercase tracking-widest text-foreground/80">
            Authentic Social Storytelling
          </span>
        </motion.div>

        <motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
  className="text-5xl md:text-7xl lg:text-8xl font-display font-semibold leading-[1.05] tracking-tight text-foreground mb-8"
>
  You can relax!

  <br />

  <span className="inline-flex mt-6 mb-6 rotate-[-2deg] rounded-xl bg-primary px-8 py-3 text-white text-3xl md:text-5xl lg:text-6xl shadow-xl">
    WHILE
  </span>

  <br />

  <span className="block">
    <span className="text-primary">YOUR AGENCY</span>{" "}
    handles your marketing.
  </span>
</motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
          className="max-w-2xl text-lg md:text-xl text-foreground/70 font-normal leading-relaxed mb-12"
        >
          Stop striving for perfection. Start connecting with authenticity. 
          We create cozy, heartfelt digital experiences for ambitious founders and lifestyle brands.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a href="#work" className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-primary px-10 text-primary-foreground tracking-wide font-medium transition-all hover:bg-foreground hover:text-background shadow-md">
            <span className="relative z-10 flex items-center gap-3">
              View our portfolio 
              <motion.span 
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >→</motion.span>
            </span>
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-xs tracking-widest text-foreground/40 font-medium">Discover</span>
        <div className="w-[1px] h-16 bg-border overflow-hidden relative">
          <motion.div 
            className="w-full h-1/2 bg-primary/50 absolute top-0"
            animate={{ top: ['-50%', '100%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
