import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Grid,
  FormControl,
  Button,
} from "@mui/material";
import axios from "axios";

const Details = () => {
  const [values, setValues] = useState({
    ports: "",
    nets: "",
    cells: "",
    seq_cells: "",
    ref: "",
    power: "",
  });
  const [result, setResult] = useState("");

  useEffect(() => {
    console.log("Details page loaded");
  });

  const handleOnChange = (e) => {
    const { id, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        values
      );
      console.log(response);
      setResult(response.data.result);
    } catch (error) {
      setResult("Error: Please enter valid numerical values.");
    }
  };

  return (
    <div className="mt-10 flex gap-10 flex-col justify-center items-center w-full shadow-sm">
      <Typography variant="h5" gutterBottom>
        Details
      </Typography>
      <FormControl>
        <Grid className="max-w-[500px]" container spacing={4}>
          <Grid item xs={12}>
            <TextField
              label="No of ports"
              type="number"
              value={values.ports}
              id="ports"
              onChange={handleOnChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="No of nets"
              type="number"
              value={values.nets}
              id="nets"
              onChange={handleOnChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="No of cells"
              type="number"
              value={values.cells}
              id="cells"
              onChange={handleOnChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Sequential Cells"
              type="number"
              value={values.seq_cells}
              id="seq_cells"
              onChange={handleOnChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="No of ref"
              type="number"
              value={values.ref}
              id="ref"
              onChange={handleOnChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="No of Powers"
              type="number"
              value={values.power}
              id="power"
              onChange={handleOnChange}
              fullWidth
            />
          </Grid>
          <Grid item className="text-center" xs={12}>
            <Button
              className="flex"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </FormControl>
      {result && (
        <Typography variant="h6" color="textSecondary">
          {result}
        </Typography>
      )}
    </div>
  );
};

export default Details;
