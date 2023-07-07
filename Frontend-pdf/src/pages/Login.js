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

import { loginUser } from "../services/user-service";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";
import { useContext } from "react";
import { Link } from 'react-router-dom';
// import { tokens } from "@mui/system";

const Login = () => {
  //const theme = useTheme();
  const userContxtData = useContext(userContext);

  const navigate = useNavigate();

  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setLoginDetail({
      ...loginDetail,
      [field]: actualValue,
    });
  };


  const handleforgotRegsiter = () => {
    navigate("/signup");
  };


  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(loginDetail);
    //validation
    if (
      loginDetail.username.trim() == "" ||
      loginDetail.password.trim() == ""
    ) {
      toast.error("Username or Password  is required !!");
      return;
    }

    //submit the data to server to generate token
    loginUser(loginDetail)
      .then((data) => {
        console.log(data);

        //save the data to localstorage
        doLogin(data, () => {
          console.log("login detail is saved to localstorage");


          //redirect to user dashboard page
          userContxtData.setUser({
            data: data.user,
            login: true,
          });

          {console.log("from login " + userContxtData)}
          navigate("/user/dashboard");
          navigate(0);
        });

        toast.success("Login Success");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 400 || error.response.status == 404) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong  on sever !!");
        }
      });
  };

  return (
    <Base>

      <Container>
        {/* // style={{ */}
        {/* //             margin: "10px 0 20px 0",
        //             color: colors.grey[100],
        //           }}> */}
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
                    <Label for="email">Enter Email</Label>
                    <Input
                      type="text"
                      id="email"
                      value={loginDetail.username}
                      onChange={(e) => handleChange(e, "username")}
                      required = "true"
                    />
                  </FormGroup>

                  {/* password field */}

                  <FormGroup>
                    <Label for="password">Enter password</Label>
                    <Input
                      type="password"
                      id="password"
                      value={loginDetail.password}
                      onChange={(e) => handleChange(e, "password")}
                      required = "true"
                    />
                  </FormGroup>

                  <Container className="text-center">
                    <Button color="light" outline>
                      Login
                    </Button>
                    <Button color="light" outline
                      onClick={handleforgotRegsiter}
                      className="ms-2"
                    >
                      Register
                    </Button>

                    <Container className="text-center ms-7 mt-4">
                    Forgot Password? <Link to="/forgotpass" > Click Here </Link> 
                    </Container>

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

export default Login;