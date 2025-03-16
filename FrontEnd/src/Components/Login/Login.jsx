import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [errors, setErrors] = useState({});

  const handleMobileNumberChange = (e) => setMobileNumber(e.target.value);
  const handleOtpChange = (e) => setOtp(e.target.value);

  const validateMobileNumber = () => {
    const newErrors = {};
    if (!mobileNumber || mobileNumber.length !== 10) {
      newErrors.mobileNumber = "Valid 10-digit mobile number is required";
    }
    return newErrors;
  };

  const sendOtp = () => {
    const validationErrors = validateMobileNumber();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("Sending OTP to", mobileNumber);
      setIsOtpSent(true);
      setErrors({});
    }
  };

  const verifyOtp = () => {
    if (!otp || otp.length !== 6) {
      setErrors({ otp: "Please enter a valid 6-digit OTP" });
    } else {
      console.log("Verifying OTP:", otp);
      setErrors({});
      // Add OTP verification logic here
    }
  };

  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{ padding: "40px", width: "400px", textAlign: "center" }}
      >
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        {!isOtpSent ? (
          <Box component="form" sx={{ mt: 3 }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Mobile Number"
              value={mobileNumber}
              onChange={handleMobileNumberChange}
              sx={{ mb: 3 }}
              error={!!errors.mobileNumber}
              helperText={errors.mobileNumber}
            />
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={sendOtp}
              sx={{ py: 1.5 }}
            >
              Send OTP
            </Button>
          </Box>
        ) : (
          <Box component="form" sx={{ mt: 3 }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Enter OTP"
              value={otp}
              onChange={handleOtpChange}
              sx={{ mb: 3 }}
              error={!!errors.otp}
              helperText={errors.otp}
            />
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={verifyOtp}
              sx={{ py: 1.5 }}
            >
              Verify OTP
            </Button>
          </Box>
        )}

        <Typography variant="body2" sx={{ mt: 2 }}>
          New user?{" "}
          <Link
            to="/signup"
            style={{ color: "#1976d2", textDecoration: "none" }}
          >
            SignUp
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
