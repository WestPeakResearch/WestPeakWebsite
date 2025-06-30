import { pageCover, pageTitle } from "./PageCover.module.css"

function PageCover(props: {title: string, image: string}) {
  return (
    <>
      <div style={{ display: "grid", overflow: "hidden"}} className={pageCover}>
        <img style={{ gridArea: "1/1", height: "100%"}} loading="eager" alt="" src={props.image} />
        <div style={{
          gridArea: "1/1",
          position: "relative",
          placeItems: "center",
          display: "grid",
          height: "100%"
        }}>
          <div className={pageTitle}>{props.title}</div>
        </div>
      </div>
    </>
  )
}

export default PageCover
