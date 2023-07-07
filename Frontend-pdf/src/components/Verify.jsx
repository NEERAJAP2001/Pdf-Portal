import { useState } from "react";
import { toast } from "react-toastify";
import {
  Label,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
  Button,
} from "reactstrap";

import Base from "../components/Base";


import { useNavigate } from "react-router-dom";
import { sendOTP, verifyOTP } from "../services/user-service";


const Forgotpass = () => {
    const navigate = useNavigate();
  

    const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",});


  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setLoginDetail({
      ...loginDetail,
      [field]: actualValue,
    });
  };



  // WRITE LOGIC HERE
  const handleOTP = () => {


    if (loginDetail.username.trim() == "") {
        toast.error("Please enter a valid email !!");
        return;
    }

    console.log(loginDetail.username);
    console.log("handle otp called");
    // Send OTP to email
    sendOTP(loginDetail.username)
    .then((data) => {console.log(data); toast.success("OTP Sent !!");})   
    .catch((error) => {toast.error("Something went wrong  on server !!" + error.message);});
  };



  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(loginDetail);
    //validation
    if (
      loginDetail.username.trim() == "" ||
      loginDetail.password.trim() == ""
    ) {
      toast.error("OTP is required !!");
      return;
    }
    else{
        console.log("came here verify pass");
        verifyOTP(loginDetail.username,loginDetail.password)
        
        .then( (data) => { 
            
            if(data == "Incorrect password or time has expired") {
            toast.error("Incorrect password or time has expired")
     } 
     else{
        toast.success("Verified Successfully !!"); 
        navigate("/login");}

    }) 
       .catch((error) => {toast.error("Something went wrong  on server !!" + error.code)
       navigate("/signup");
        
    });
    }

};
  return (
    <Base>
      <Container>
        <Row className="mt-4">
          <Col
            sm={{
              size: 6,
              offset: 3,
            }}
          >
            <Card color="dark" inverse>
              <CardHeader>
                <h3>Login Here</h3>
              </CardHeader>

              <CardBody>
                <Form onSubmit={handleFormSubmit}>
                  {/* Email field */}

                  <FormGroup>
                    <Label for="email">Enter Email for OTP Verification</Label>
                    <Input
                      type="text"
                      id="email"
                      value={loginDetail.username}
                      onChange={(e) => handleChange(e, "username")}
                    />
                  </FormGroup>

                  <Container className="text-center">
                    <Button onClick={handleOTP} color="light" outline>
                      Send OTP
                    </Button>
                  </Container>

     

                  <FormGroup>
                    <Label for="password">Enter OTP</Label>
                    <Input
                      type="number"
                      id="password"
                      value={loginDetail.password}
                      onChange={(e) => handleChange(e, "password")}
                    />
                  </FormGroup>

                  <Container className="text-center">
                    <Button color="light" outline>
                      Verify
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      </Base>
  );
};

export default Forgotpass;