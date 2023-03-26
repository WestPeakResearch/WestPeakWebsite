import React from "react"
import styles from "./Contact.module.css"
import {Form, Container, Col, Row, Button} from "react-bootstrap"


function Contact(){

  return(
    <>
      <h2 className = {styles.header}>Please fill out the contact form below or email us at contact@westpeakresearch.com</h2>
      <Container>
          <Form
          name="contact"
          method="post"
          data-netlify="true"
          onSubmit="submit"
          >
            <input type="hidden" name="form-name" value="contact" />
            <Form.Row>
              <Col lg = {6}>
                <Form.Group className = {styles.name} controlId = "formBasicFirstName">
                  <Form.Label>First Name </Form.Label>
                  <Form.Control required size="sm" type = "text" name="first-name" />
                </Form.Group>
              </Col>
              <Col lg = {6}>
                <Form.Group className = {styles.name} controlId = "formBasicLastName">
                  <Form.Label>Last Name </Form.Label>
                  <Form.Control required size="sm" type = "text" name="last-name" />
                </Form.Group>
              </Col>
            </Form.Row>

            <Row>
              <Col lg = {6}>
                <Form.Group className = {styles.email} controlId = "formBasicEmail">
                  <Form.Label>Email Address </Form.Label>
                  <Form.Control required size="sm" type = "email" placeholder="name@example.com" name = "email"/>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg = {6}>
                <Form.Group className = {styles.textArea} controlId = "formBasicText">
                  <h2>Type your message here</h2>
                  <Form.Control required size="lg" as="textarea" type = "text" rows = "5" name="info"/>
                </Form.Group>
              </Col>
            </Row>
            
            <div className= {styles.submit}>
              <Button className = {styles.button} type="submit">Submit</Button>
            </div>
        </Form>
      </Container>
    </>             
  )
}


export default Contact