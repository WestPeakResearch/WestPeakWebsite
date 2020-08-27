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
                    <input type="hidden" name="form1" value="contact v1" />
                <Form.Row>
                    <Col lg = {6}>
                        <Form.Group className = {styles.name} controlId = "formBasicFirstName">
                            <Form.Label>First Name </Form.Label>
                            <Form.Control size="sm" type = "text" />
                        </Form.Group>
                    </Col>

                    <Col lg = {6}>
                        <Form.Group className = {styles.name} controlId = "formBasicLastName">
                            <Form.Label>Last Name </Form.Label>
                            <Form.Control size="sm" type = "text" />
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Row>
                <Col lg = {6}>
                        <Form.Group className = {styles.email} controlId = "formBasicEmail">
                            <Form.Label>Email Address </Form.Label>
                            <Form.Control size="sm" type = "email" placeholder="name@example.com"/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                <Col lg = {6}>
                        <Form.Group className = {styles.textArea} controlId = "formBasicText">
                    <h2>Type your message here</h2>
                            <Form.Control size="lg" as="textarea" type = "text" rows = "5"/>
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