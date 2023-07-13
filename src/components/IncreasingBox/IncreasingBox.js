import React, { useRef, useEffect } from "react"
import { m, animate, useInView } from "framer-motion"
import { container } from "./IncreasingBox.module.css"

function IncreasingBox({ from = 0, to, delay = 0.75, duration = 1, children }) {

  const numRef = useRef()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      animate(from, to, {
        delay: delay,
        duration: duration,
        onUpdate(value) {
          numRef.current.textContent = value.toFixed(0)
        }
      })
    }
  }, [from, to, delay, duration, inView]);

  return (
    <m.div ref={ ref } className={ container }>
      <span ref={ numRef } />
      <p>{ children }</p>
    </m.div>
  )
  
}

export default IncreasingBox