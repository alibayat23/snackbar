import React, { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CustomizedSnackbars() {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("info");
  const [message, setMessage] = useState("");

  /* switch the URL fot the fetch, ignore eslint */
  // eslint-disable-next-line
  const workingURL = "https://jsonplaceholder.typicode.com/todos/1";
  // eslint-disable-next-line
  const nonWorkingEndpoint = "https://jsonplaceholder.typicode.com/todos__/1";
  // eslint-disable-next-line
  const badURL = "https://jsonplaceholder__.typicode.com/todos/1";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(workingURL);
        if (res.ok) {
          setMessage("Fetch worked");
          setOpen(true);
          setSeverity("success");
        } else {
          setMessage("res not OK");
          setOpen(true);
          setSeverity("warning");
        }
        res.json().then((data) => console.log(data));
      } catch (err) {
        setMessage("Error from catch");
        setOpen(true);
        setSeverity("error");
      }
    };
    fetchData();
  }, []);

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </div>
  );
}
