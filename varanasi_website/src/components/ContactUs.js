import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Grid, Paper, Snackbar } from '@mui/material';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { useNavigate } from 'react-router-dom';

function ContactUs() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        query: '',
        email: '',
        phoneNumber: '',
    });
    const [formErrors, setFormErrors] = useState({
        query: false,
        email: false,
        phoneNumber: false,
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [result, setResult] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        let valid = true;
        let errors = {
            query: false,
            email: false,
            phoneNumber: false,
        };

        if (formData.query.trim() === '') {
            errors.query = true;
            valid = false;
        }
        if (formData.email.trim() === '' || !/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = true;
            valid = false;
        }
        if (formData.phoneNumber.trim() === '' || !/^\d{10}$/.test(formData.phoneNumber)) {
            errors.phoneNumber = true;
            valid = false;
        }

        setFormErrors(errors);
        return valid;
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            setResult("Sending...");
            const formDataToSubmit = new FormData();

            formDataToSubmit.append("access_key", "7f6137c6-fef5-406a-aa04-43f67b98fb86");
            formDataToSubmit.append("query", formData.query);
            formDataToSubmit.append("email", formData.email);
            formDataToSubmit.append("phoneNumber", formData.phoneNumber);

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formDataToSubmit,
            });

            const data = await response.json();

            if (data.success) {
                setResult("Form Submitted Successfully");
                setOpenSnackbar(true);
                setFormData({
                    query: '',
                    email: '',
                    phoneNumber: '',
                });
            } else {
                setResult(data.message);
                console.error("Error", data);
            }
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <>
            <KeyboardBackspaceOutlinedIcon
                variant="contained"
                sx={{ fontWeight: 'bold', fontSize: '2rem', cursor: 'pointer' }}
                onClick={() => navigate('/')}
            />
            <Box
                sx={{
                    backgroundColor: '#F5F5F5',
                    minHeight: '65vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: { xs: 2, md: 4 },
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        maxWidth: '600px',
                        padding: { xs: 3, md: 5 },
                        borderRadius: 3,
                        backgroundColor: '#FFF',
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            color: '#7c0a02',
                            fontSize: { xs: '1.8rem', md: '2.2rem' },
                        }}
                    >
                        Contact Us
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: '#555',
                            marginBottom: 4,
                            fontSize: '1.1rem',
                            fontStyle: 'italic',
                        }}
                    >
                        We’d love to hear from you! Fill out the form below to get in touch.
                    </Typography>

                    <form onSubmit={handleFormSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    name="query"
                                    label="Your Query"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    variant="outlined"
                                    value={formData.query}
                                    onChange={handleInputChange}
                                    error={formErrors.query}
                                    helperText={formErrors.query ? "This field is required" : ""}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#7c0a02',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#7c0a02',
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: '#7c0a02',
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    name="email"
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    variant="outlined"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    error={formErrors.email}
                                    helperText={formErrors.email ? "Enter a valid email address" : ""}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#7c0a02',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#7c0a02',
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: '#7c0a02',
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    name="phoneNumber"
                                    label="Phone Number"
                                    type="tel"
                                    fullWidth
                                    variant="outlined"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    error={formErrors.phoneNumber}
                                    helperText={formErrors.phoneNumber ? "Enter a valid 10-digit phone number" : ""}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#7c0a02',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#7c0a02',
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: '#7c0a02',
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        backgroundColor: '#7c0a02',
                                        '&:hover': {
                                            backgroundColor: '#7c0a02',
                                        },
                                        fontSize: '1rem',
                                        padding: '10px',
                                        borderRadius: '10px',
                                    }}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    <Typography variant="body1" color="primary" mt={2}>
                        {result}
                    </Typography>
                </Paper>

                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    message="Your query has been sent to the team. They will reach out to you soon."
                />
            </Box>

            <Box position='relative'
                sx={{
                    mt: 2,
                    textAlign: 'center',
                    backgroundColor: '#FFF',
                }}
            >
                <Typography
                    variant="h5"
                    sx={{ color: '#7c0a02', fontWeight: 'bold' }}
                >
                    Still Not Solved? Feel Free to Contact Us
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1, mt: 1 }}>
                    <strong>Email:</strong> suhasharish9090@gmail.com
                </Typography>
                <Typography variant="body1">
                    <strong>Phone Number:</strong> +9480506235
                </Typography>
            </Box>
        </>
    );
}

export default ContactUs;
