import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormGroup,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { checkUserAndRedirect } from "../../hooks/validationHooks";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "600px",
    margin: "auto",
    padding: theme.spacing(2),
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
    boxShadow: "0px 0px 5px rgba(0,0,0,0.5)",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(5),
  },
  formControl: {
    marginBottom: theme.spacing(2),
  },
}));

interface IViolationFormData {
  date: string;
  location: string;
  employeeId: string;
  additionalDetails: string;
}

const initialFormData: IViolationFormData = {
  date: "",
  location: "",
  employeeId: "",
  additionalDetails: "",
};

export const EthicsViolation = () => {
  checkUserAndRedirect();

  const classes = useStyles();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<IViolationFormData>(initialFormData);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    alert("Ethics violation submitted!");
    navigate("/");
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <FormGroup>
        <FormControl className={classes.formControl}>
          <TextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            label="Employee ID"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleInputChange}
            required
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            label="Additional Details"
            name="additionalDetails"
            value={formData.additionalDetails}
            onChange={handleInputChange}
            multiline
            rows={4}
            required
          />
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </FormGroup>
    </form>
  );
};
