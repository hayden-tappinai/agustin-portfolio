import { motion } from 'framer-motion'

/**
 * A ticket tear-line — round punched notches at each end joined by a dashed
 * seam that draws itself in on scroll. Threads the boarding-pass / ticket
 * aesthetic between sections so the page reads as one continuous stub, not a
 * stack of boxes.
 */
function Notch() {
  return (
    <span
      className="h-[16px] w-[16px] shrink-0 rounded-full border border-paper-edge bg-paper"
      style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)' }}
    />
  )
}

export function PerforatedDivider({ className }: { className?: string }) {
  return (
    <div className={['mx-auto w-full max-w-[1180px] px-10 sm:px-16', className].filter(Boolean).join(' ')} aria-hidden>
      <div className="flex items-center">
        <Notch />
        <motion.span
          className="h-0 flex-1 origin-left border-t-2 border-dashed"
          style={{ borderColor: 'var(--paper-edge)' }}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
        />
        <Notch />
      </div>
    </div>
  )
}
