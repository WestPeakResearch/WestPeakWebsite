import React from "react"
import { m, LazyMotion, domAnimation } from "framer-motion"

function FadeInBox(props) {
  const sectionVariant = {
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] },
    },
    hidden: { opacity: 0, y: 24 },
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, marign: "0px 0px 20% 0px" }}
        {...props.rest}
      >
        {props.children}
      </m.div>
    </LazyMotion>
  )
}

export default FadeInBox
