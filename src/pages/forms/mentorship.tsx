import React from "react"

import Layout from "../../components/Layout"
import ProxiedForm from "../../components/ProxiedForm/ProxiedForm"
import PageCover from "../../components/PageCover"

const IndustryMentorshipFormPage = () => (
  <Layout>
    <PageCover title="" image="bg" />
    <ProxiedForm
      formName="industrymentorship"
      formDescription={
        <>
          <h2>Industry Mentorship Form</h2>
          <p>
            To indicate interest in becoming a mentor for the 2025-2026 academic
            year, please fill out the form below.
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
        {
          type: "text",
          name: "company",
          label: "Current Company (Company Name - Position Title)",
          required: false,
        },
        {
          type: "checkbox-group",
          name: "industry",
          label: "Areas of Expertise",
          required: false,
          options: [
            { value: "private_equity", label: "Private Equity" },
            { value: "investment_banking", label: "Investment Banking" },
            { value: "public_equities", label: "Public Equities" },
            { value: "corporate_banking", label: "Corporate Banking" },
            { value: "s_n_t", label: "S&T" },
            { value: "venture_capital", label: "Venture Capital" },
            { value: "corporate_development", label: "Corporate Development" },
            { value: "other", label: "Other" },
          ],
        },
        {
          type: "text",
          name: "other_industry",
          label: `If you selected "other" in the last section, please elaborate:`,
          required: false,
        },
        {
          type: "textarea",
          name: "past_experience",
          label: "Past Work Experience",
          required: false,
        },
        {
          type: "textarea",
          name: "additional_info",
          label: "Any additional comments or preferences?",
          required: false,
        },
      ]}
    />
  </Layout>
)

export default IndustryMentorshipFormPage

export function Head() {
  return <meta name="robots" content="noindex" />
}
