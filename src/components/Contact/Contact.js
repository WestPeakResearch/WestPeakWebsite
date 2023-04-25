import React, { useRef } from "react"
import styles from "./Contact.module.css"
import { useFormik } from 'formik';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from 'primereact/inputtextarea';    
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import FacebookLogo from '../../images/facebook.svg';
import LinkedinLogo from '../../images/linkedin.svg';


function Contact(){
  const successToast = useRef(null);
  const errorToast = useRef(null);

  const showSuccessToast = () => {
    successToast.current.show({ severity: "success", summary: "Form Submitted", detail: "We'll get back to you as soon as possible!" });
  };

  const showErrorToast = () => {
    errorToast.current.show({ severity: "error", summary: "Form Not Submitted", detail: "Sorry, there was an issue submitting the form! Please contact us at contact@westpeakresearch.com" });
  };

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      message: '',
    },
    validate: (data) => {
      let errors = {};

      if (!data.first_name) errors.first_name = 'First name is required.';
      if (!data.last_name) errors.last_name = 'Last name is required.';
      if (!data.email) errors.email = 'Email is required.';
      if (!data.message) errors.message = 'Message is required.';

      return errors;
    },
    onSubmit: (data, actions) => {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...data })
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status)
        } else {
          showSuccessToast();
          clearForm();
        }
      })
      .catch(() => {
        showErrorToast();
      })
      .finally(() => actions.setSubmitting(false))
    }
  });

  const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

  const onChange = (fieldName, event) => formik.setFieldValue(fieldName, event.target.value);

  const clearForm = () => {
    Object.keys(formik.values).map(key => {
      formik.setFieldValue(key, '');
      formik.setFieldTouched(key, false);
    })
  };

  const getErrors = () => {
    let error = false;

    Object.keys(formik.values).map(key => error = isFormFieldInvalid(key));

    return error ? <small className="p-error">All fields are required</small> : <small className="p-error">&nbsp;</small>;
  }

  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  return (
    <div>
      <h2 className={styles.header}>Please fill out the contact form below or email us at contact@westpeakresearch.com</h2>
      <form 
        className={styles.container}
        name="contact" 
        method="post"
        data-netlify={true}
        onSubmit={formik.handleSubmit} 
      >
        <input type="hidden" name="form-name" value="contact" />
        <Toast ref={successToast} />
        <Toast ref={errorToast} />

        <div className={styles.infoContainer}>
          <div className={styles.firstName}>
            <span className="p-float-label">
              <InputText
                id="first-name"
                name="first_name"
                value={formik.values.first_name}
                onChange={(e) => onChange('first_name', e)}
                className={classNames({ 'p-invalid': isFormFieldInvalid('first_name') })}
              />
              <label id="first-name-label" htmlFor="first-name">First Name</label>
            </span>
          </div>

          <div className={styles.lastName}>
            <span className="p-float-label">
              <InputText
                id="last-name"
                name="last_name"
                value={formik.values.last_name}
                onChange={(e) => onChange('last_name', e)}
                className={classNames({ 'p-invalid': isFormFieldInvalid('last_name') })}
              />
              <label id="last-name-label" htmlFor="last-name">Last Name</label>
            </span>
          </div>

          <div className={styles.email}>
            <span className="p-float-label">
              <InputText
                id="email"
                name="email"
                value={formik.values.email}
                onChange={(e) => onChange('email', e)}
                className={classNames({ 'p-invalid': isFormFieldInvalid('email') })}
              />
              <label id="email-label" htmlFor="email">Email</label>
            </span>
          </div>
        </div>

        <div className={styles.textarea}>
          <span className="p-float-label">
            <InputTextarea
              id="message"
              name="message"
              value={formik.values.message}
              onChange={(e) => onChange('message', e)}
              className={classNames({ 'p-invalid': isFormFieldInvalid('message') })}
            />
            <label id="message-label" htmlFor="message">Type your message here</label>
          </span>
        </div>

        <div className={styles.error}>
          {getErrors()}
        </div>

        <div className={styles.buttons}>
          <Button className={styles.button} type="reset" label="Clear" onClick={clearForm} />
          <Button className={styles.button + ' ' + styles.submit} type="submit" label="Submit" />
        </div>

        <div className={styles.socials}>
          <h3>Make sure to follow our socials to stay up to date on events and hiring!</h3>
          <div className={styles.socialsIcons}>
            <a href="https://www.facebook.com/WestPeakResearch/" target="_blank" rel="noopener noreferrer">
              <img src={FacebookLogo} alt="Facebook" />
            </a>
            <a href="https://linkedin.com/company/westpeak-research" target="_blank" rel="noopener noreferrer">
              <img src={LinkedinLogo} alt="Linkedin" />
            </a>
          </div>
        </div>
      </form>
    </div>
    
  )
}


export default Contact