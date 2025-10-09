import React from "react"

import Layout from "../../components/Layout/Layout"
import ProxiedForm from "../../components/ProxiedForm/ProxiedForm"
import PageCover from "../../components/PageCover"
import SEO from "../../components/SEO"

const AlumniSocialFormPage = () => (
  <Layout>
    <PageCover title="" image="toronto" />
    <ProxiedForm
      formName="alumnisocial"
      formDescription={
        <>
          <h2>WestPeak Alumni Cocktail Reception RSVP</h2>
          <p>
            Please fill out the form below to RSVP for our upcoming WestPeak
            Alumni Cocktail Reception in Downtown Toronto on November 13th at
            7:00 PM ET.
          </p>
        </>
      }
      fields={[
        {
          type: "email",
          name: "email",
          label: "Email",
          required: true,
        },
        {
          type: "text",
          name: "name",
          label: "Name (First Last)",
          required: true,
        },
      ]}
    />
  </Layout>
)

export default AlumniSocialFormPage

export function Head() {
  return (<SEO
    title="Alumni Social Form"
    description="Alumni Social Form"
    meta={[{ name: "robots", content: "noindex" }]}
  />)
}
