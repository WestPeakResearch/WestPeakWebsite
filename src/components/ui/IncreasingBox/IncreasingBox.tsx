import React, { useRef, useEffect } from "react"
import { m, animate, useInView } from "framer-motion"
import { container } from "./IncreasingBox.module.css"

function IncreasingBox({
  from = 0,
  to,
  add,
  delay = 0.75,
  duration = 1,
  children,
}: {
  from?: number
  to: number
  add?: boolean
  delay?: number
  duration?: number
  children: React.ReactNode
}) {
  const numRef = useRef<HTMLElement | null>(null)
  const ref = useRef<HTMLElement | null>(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true })

  useEffect(() => {
    if (inView) {
      animate(from, to, {
        delay: delay,
        duration: duration,
        onUpdate(value) {
          add
            ? (numRef.current!.textContent = value.toFixed(0) + "+")
            : (numRef.current!.textContent = value.toFixed(0))
        },
      })
    }
  }, [from, to, delay, duration, inView, add])

  return (
    <m.div ref={ref}>
      <div className={container}>
        <span ref={numRef} />
        <p>{children}</p>
      </div>
    </m.div>
  )
}

export default IncreasingBox
