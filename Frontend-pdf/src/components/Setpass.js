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
import { setPass } from "../services/user-service";


const Setpassword = () => {
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



  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(loginDetail);
    //validation
    if (
      loginDetail.username.trim() == "" ||
      loginDetail.password.trim() == ""
    ) {
      toast.error("Enter Valid Information!!");
      return;
    }
    else{
        console.log("came here verify pass");
        setPass(loginDetail.username,loginDetail.password)
        .then((response) => {
            console.log(response);
            toast.success("Password Updated Successfully!! ");
            navigate("/login");
            }
        )
        .catch((error) => {
            console.log(error);
            toast.error("Something went wrong!! " + error.message);
        }
        );
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
                <h3>Reset Password</h3>
              </CardHeader>

              <CardBody>
                <Form onSubmit={handleFormSubmit}>
                  {/* Email field */}

                  <FormGroup>
                    <Label for="email">Enter your email</Label>
                    <Input
                      type="text"
                      id="email"
                      value={loginDetail.username}
                      onChange={(e) => handleChange(e, "username")}
                    />
                  </FormGroup>

     

                  <FormGroup>
                    <Label for="password">Enter new password</Label>
                    <Input
                      type="password"
                      id="password"
                      value={loginDetail.password}
                      onChange={(e) => handleChange(e, "password")}
                    />
                  </FormGroup>

                  <Container className="text-center">
                    <Button color="light" outline>
                      Submit
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

export default Setpassword;