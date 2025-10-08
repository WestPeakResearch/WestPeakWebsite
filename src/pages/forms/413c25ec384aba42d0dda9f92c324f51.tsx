import React from "react"

import Layout from "../../components/Layout/Layout"
import ProxiedForm from "../../components/ProxiedForm/ProxiedForm"
import PageCover from "../../components/PageCover"

const AlumniSocialFormPage = () => (
  <Layout>
    <PageCover title=""image="toronto" />
    <ProxiedForm
      formName="alumnisocial"
      formDescription={
        <>
          <h2>Toronto Alumni Social RSVP</h2>
          <p>
            Please fill out the form below to RSVP for our upcoming Alumni
            Social. It will take place on Thursday November 13th 7 pm ET at
            Local Public Eatery - Adelaide.
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
