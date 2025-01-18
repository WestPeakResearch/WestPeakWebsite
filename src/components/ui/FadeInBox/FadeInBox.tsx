import React from "react"
import { m, LazyMotion, domAnimation, easeInOut } from "framer-motion"

function FadeInBox(props: { className?: string; children?: React.ReactElement; rest?: any }) {
  const sectionVariant = {
    visible: {
      opacity: 1,
      transition: {
        ease: easeInOut,
        delay: 0.3,
        duration: 1.25,
      },
    },
    hidden: { opacity: 0 },
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={props.className}
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        {...props.rest}
      >
        {props.children}
      </m.div>
    </LazyMotion>
  )
}

export default FadeInBox
