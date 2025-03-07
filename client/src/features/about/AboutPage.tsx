import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import {
  useLazyGet400ErrorQuery,
  useLazyGet401ErrorQuery,
  useLazyGet404ErrorQuery,
  useLazyGet500ErrorQuery,
  useLazyGetValidationErrorQuery,
} from "./ErrorApi";

const AboutPage: React.FC = () => {
  const [validationErrors, setValidationErrors] = React.useState<string[]>([]);

  const [trigger400Error] = useLazyGet400ErrorQuery();
  const [trigger401Error] = useLazyGet401ErrorQuery();
  const [trigger404Error] = useLazyGet404ErrorQuery();
  const [trigger500Error] = useLazyGet500ErrorQuery();
  const [triggerValidationError] = useLazyGetValidationErrorQuery();

  const getValidationError = async () => {
    try {
      await triggerValidationError().unwrap();
    } catch (err: any) {
      const errorArray = err.message.split(",");
      setValidationErrors(errorArray);
    }
  };

  return (
    <Fragment>
      <Container maxWidth="lg">
        <Typography gutterBottom variant="h3">
          Errors For Testing
        </Typography>
        <ButtonGroup>
          <Button
            variant="contained"
            onClick={() => trigger400Error().catch((err) => console.error(err))}
          >
            Test 400 Error
          </Button>{" "}
          <Button
            variant="contained"
            onClick={() => trigger401Error().catch((err) => console.error(err))}
          >
            Test 401 Error
          </Button>{" "}
          <Button
            variant="contained"
            onClick={() => trigger404Error().catch((err) => console.error(err))}
          >
            Test 404 Error
          </Button>{" "}
          <Button
            variant="contained"
            onClick={() => trigger500Error().catch((err) => console.error(err))}
          >
            Test 500 Error
          </Button>{" "}
          <Button variant="contained" onClick={getValidationError}>
            Test Validation Error
          </Button>
        </ButtonGroup>
        {validationErrors.length > 0 && (
          <Alert severity="error">
            <AlertTitle>Validation Errors</AlertTitle>
            <List>
              {validationErrors.map((err) => (
                <ListItem key={err}>{err}</ListItem>
              ))}
            </List>
          </Alert>
        )}
      </Container>
    </Fragment>
  );
};

export default AboutPage;
