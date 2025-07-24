/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
export function shouldUpdateScroll({
  routerProps,
  prevRouterProps,
}) {
  if (routerProps && prevRouterProps) {
    if (routerProps.location.pathname.includes("team") && prevRouterProps.location.pathname.includes("Team")) {
      return true
    }
  }
  window.scrollTo(0, 0)
  return false
}
