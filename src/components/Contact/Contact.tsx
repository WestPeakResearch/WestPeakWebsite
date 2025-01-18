import React, { useRef } from "react"
import {
  container,
  infoContainer,
  image,
  firstName,
  lastName,
  email,
  textarea,
  buttons,
  button,
  section,
  submit,
  socials,
  socialsIcons,
} from "./Contact.module.css"
import { useFormik, Formik, Form } from "formik"
import { InputText } from "primereact/inputtext"
import { InputTextarea } from "primereact/inputtextarea"
import { Button } from "primereact/button"
import { Toast } from "primereact/toast"
import { classNames } from "primereact/utils"
import FacebookLogo from "../../images/facebook.svg"
import LinkedinLogo from "../../images/linkedin.svg"
import InstagramLogo from "../../images/instagram.svg"
import { StaticImage } from "gatsby-plugin-image"

function Contact() {
  const successToast = useRef<Toast>(null)
  const errorToast = useRef<Toast>(null)

  const showSuccessToast = () => {
    successToast.current!.show({
      severity: "success",
      summary: "Form Submitted",
      detail: "We'll get back to you as soon as possible!",
    })
  }

  const showErrorToast = () => {
    errorToast.current!.show({
      severity: "error",
      summary: "Form Not Submitted",
      detail:
        "Sorry, there was an issue submitting the form! Please contact us at contact@westpeakresearch.com",
    })
  }

  const formik = useFormik<{
    first_name: string;
    last_name: string;
    email: string;
    message: string;
  }>({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      message: "",
    },
    validate: data => {
      let errors: {
        first_name?: string;
        last_name?: string;
        email?: string;
        message?: string;
      } = {}

      if (!data.first_name) errors.first_name = "First name is required."
      if (!data.last_name) errors.last_name = "Last name is required."
      if (!data.email) errors.email = "Email is required."
      if (!data.message) errors.message = "Message is required."

      return errors
    },
    onSubmit: (data, actions) => {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...data }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(String(response.status))
          } else {
            showSuccessToast()
            clearForm()
          }
        })
        .catch(() => {
          showErrorToast()
        })
        .finally(() => actions.setSubmitting(false))
    },
  })

  const isFormFieldInvalid = (name: string) =>
    !!(formik.touched[name as keyof typeof formik.touched] && formik.errors[name as keyof typeof formik.errors])

  const onChange = (fieldName: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    formik.setFieldValue(fieldName, event.target.value)

  const clearForm = () => {
    Object.keys(formik.values).map(key => {
      formik.setFieldValue(key, "")
      formik.setFieldTouched(key, false)
    })
  }

  const getErrors = () => {
    let error = false

    Object.keys(formik.values).map(key => (error = isFormFieldInvalid(key)))

    return error ? (
      <small className="p-error">All fields are required</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    )
  }

  const encode = (data: {
    first_name: string;
    last_name: string;
    email: string;
    message: string;
    "form-name": string;
  }) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key as keyof typeof data]))
      .join("&")
  }

  return (
    <div className={container}>
      <div className={section}>
        <div>
          <h1>Chat With Us</h1>
          <p>
            If you want to chat with our team, please fill out the contact form below or email us at
            &#99;&#111;&#110;&#116;&#97;&#99;&#116;&#64;&#119;&#101;&#115;&#116;&#112;&#101;&#97;&#107;&#114;&#101;&#115;&#101;&#97;&#114;&#99;&#104;&#46;&#99;&#111;&#109;.
          </p>
          <Formik
            initialValues={formik.initialValues}
            validate={data => {
              let errors: {
                first_name?: string;
                last_name?: string;
                email?: string;
                message?: string;
              } = {}

              if (!data.first_name) errors.first_name = "First name is required."
              if (!data.last_name) errors.last_name = "Last name is required."
              if (!data.email) errors.email = "Email is required."
              if (!data.message) errors.message = "Message is required."

              return errors
            }}
            onSubmit={(data, actions) => {
              fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: encode({ "form-name": "contact", ...data }),
              })
                .then(response => {
                  if (!response.ok) {
                    throw new Error(String(response.status))
                  } else {
                    showSuccessToast()
                    clearForm()
                  }
                })
                .catch(() => {
                  showErrorToast()
                })
                .finally(() => actions.setSubmitting(false))
            }}
          >
            <Form
              name="contact"
              method="post"
              data-netlify={true}
              onSubmit={formik.handleSubmit}
            >
              <input type="hidden" name="form-name" value="contact" />
              <Toast ref={successToast} />
              <Toast ref={errorToast} />

              <div className={infoContainer}>
                <div className={firstName}>
                  <span className="p-float-label">
                    <InputText
                      id="first-name"
                      name="first_name"
                      value={formik.values.first_name}
                      onChange={e => onChange("first_name", e)}
                      className={classNames({
                        "p-invalid": isFormFieldInvalid("first_name"),
                      })}
                    />
                    <label id="first-name-label" htmlFor="first-name">
                      First Name
                    </label>
                  </span>
                </div>

                <div className={lastName}>
                  <span className="p-float-label">
                    <InputText
                      id="last-name"
                      name="last_name"
                      value={formik.values.last_name}
                      onChange={e => onChange("last_name", e)}
                      className={classNames({
                        "p-invalid": isFormFieldInvalid("last_name"),
                      })}
                    />
                    <label id="last-name-label" htmlFor="last-name">
                      Last Name
                    </label>
                  </span>
                </div>

                <div className={email}>
                  <span className="p-float-label">
                    <InputText
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={e => onChange("email", e)}
                      className={classNames({
                        "p-invalid": isFormFieldInvalid("email"),
                      })}
                    />
                    <label id="email-label" htmlFor="email">
                      Email
                    </label>
                  </span>
                </div>
              </div>

              <div className={textarea}>
                <span className="p-float-label">
                  <InputTextarea
                    id="message"
                    name="message"
                    value={formik.values.message}
                    onChange={e => onChange("message", e)}
                    className={classNames({
                      "p-invalid": isFormFieldInvalid("message"),
                    })}
                  />
                  <label id="message-label" htmlFor="message">
                    Type your message here
                  </label>
                </span>
              </div>

              <div>{getErrors()}</div>

              <div className={buttons}>
                <Button
                  className={button}
                  type="reset"
                  label="Clear"
                  onClick={clearForm}
                />
                <Button
                  className={button + " " + submit}
                  type="submit"
                  label="Submit"
                />
              </div>
            </Form>
          </Formik>
        </div>
        <StaticImage alt="contact" className={image} src="images/media_contact.jpg" />
      </div>

      <div className={socials}>
        <h3>
          Make sure to follow our socials to stay up to date!
        </h3>
        <div className={socialsIcons}>
          <a
            href="https://www.facebook.com/WestPeakResearch/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={FacebookLogo} alt="Facebook" />
          </a>
          <a
            href="https://www.instagram.com/westpeakresearch/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={InstagramLogo} alt="Instagram" />
            <a
              href="https://linkedin.com/company/westpeak-research"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={LinkedinLogo} alt="Linkedin" />
            </a>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Contact
