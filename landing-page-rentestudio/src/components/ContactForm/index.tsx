import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
//import { Slide, Zoom } from "react-awesome-reveal";
import { ContactProps, ValidationTypeProps } from "./types";
import { useForm } from "../../common/utils/useForm";
import validate from "../../common/utils/validationRules";
import { Button } from "../../common/Button";
import Block from "../Block";
import Input from "../../common/Input";
import TextArea from "../../common/TextArea";
import { ContactContainer, FormGroup, Span, ButtonContainer } from "./styles";
import { useState } from "react";
import { writeUserData } from "../../firebase";

const Contact = ({ title, content, id, t }: ContactProps) => {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const ValidationType = ({ type }: ValidationTypeProps) => {
    const ErrorMessage = errors[type as keyof typeof errors]; // Properly type the 'type'
    return (
      //<Zoom direction="left">
        <Span errors={ErrorMessage}>{ErrorMessage}</Span>
      //</Zoom>
    );
  };

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(values); // Perform form validation
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set errors if any
    } else {
      // If the form is valid, write the data to Firebase
      writeUserData(values.name, values.email, values.message);
      setValues({ name: "", email: "", message: "" }); // Clear the form after submission
      setErrors({}); // Clear errors
    }
  };
  
  return (
    <ContactContainer id={id}>
      <Row justify="space-between" align="middle">
        <Col lg={12} md={11} sm={24} xs={24}>
          {/* <Slide direction="left"> */}
            <Block title={title} content={content} />
          {/* </Slide> */}
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          {/* <Slide direction="right"> */}
            <FormGroup autoComplete="off" onSubmit={handleSubmit}>
              <Col span={24}>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={values.name || ""}
                  onChange={handleChange}
                />
                <ValidationType type="name" />
              </Col>
              <Col span={24}>
                <Input
                  type="text"
                  name="email"
                  placeholder="Your Email"
                  value={values.email || ""}
                  onChange={handleChange}
                />
                <ValidationType type="email" />
              </Col>
              <Col span={24}>
                <TextArea
                  placeholder="Your Message"
                  value={values.message || ""}
                  name="message"
                  onChange={handleChange}
                />
                <ValidationType type="message" />
              </Col>
              <ButtonContainer>
                <Button name="submit">{t("Submit")}</Button>
              </ButtonContainer>
            </FormGroup>
          {/* </Slide> */}
        </Col>
      </Row>
    </ContactContainer>
  );
};

export default withTranslation()(Contact);
