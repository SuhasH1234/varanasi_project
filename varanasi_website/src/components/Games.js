import React, { useState } from 'react';
import { Button, MenuItem, Select, Snackbar, Box, Grid, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import ArticleIcon from '@mui/icons-material/Article';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';

function Games() {
    const navigate = useNavigate();
    const [selectedGame, setSelectedGame] = useState('');
    const [result, setResult] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState('info');

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const speakResult = (message) => {
        // Stop any ongoing speech
        window.speechSynthesis.cancel();
        
        const speech = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(speech);
    };

    const closePreviousAndPlay = (playFunction, userChoice) => {
        // Close snackbar if it's already open
        setOpenSnackbar(false);

        // Call the game logic after a short delay to allow snackbar to close
        setTimeout(() => {
            playFunction(userChoice);
        }, 200);
    };

    const playRockPaperScissors = (userChoice) => {
        const choices = ['Rock', 'Paper', 'Scissors'];
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        let outcome;
        if (userChoice === computerChoice) {
            outcome = 'It\'s a Tie!';
            setAlertSeverity('info');
        } else if (
            (userChoice === 'Rock' && computerChoice === 'Scissors') ||
            (userChoice === 'Paper' && computerChoice === 'Rock') ||
            (userChoice === 'Scissors' && computerChoice === 'Paper')
        ) {
            outcome = 'You Win!';
            setAlertSeverity('success');
        } else {
            outcome = 'You Lose!';
            setAlertSeverity('error');
        }
        setResult(outcome);
        speakResult(outcome);
        setOpenSnackbar(true);
    };

    const playCoinToss = (userChoice) => {
        const outcome = Math.random() < 0.5 ? 'Heads' : 'Tails';
        const result = outcome === userChoice ? 'You Win!' : 'You Lose!';
        setAlertSeverity(result === 'You Win!' ? 'success' : 'error');
        setResult(result);
        speakResult(result);
        setOpenSnackbar(true);
    };

    const playDiceRoll = (userChoice) => {
        const outcome = Math.floor(Math.random() * 6) + 1;
        let result;
        if (userChoice === 'Smaller Number' && outcome <= 3) {
            result = `You rolled a ${outcome}. You Win!`;
            setAlertSeverity('success');
        } else if (userChoice === 'Greater Number' && outcome >= 4) {
            result = `You rolled a ${outcome}. You Win!`;
            setAlertSeverity('success');
        } else {
            result = `You rolled a ${outcome}. You Lose!`;
            setAlertSeverity('error');
        }
        setResult(result);
        speakResult(result);
        setOpenSnackbar(true);
    };

    const handleGameSelection = (event) => {
        setSelectedGame(event.target.value);
        setResult('');
    };

    const handlePlay = (userChoice) => {
        if (selectedGame === 'Coin Toss') {
            closePreviousAndPlay(playCoinToss, userChoice);
        } else if (selectedGame === 'Dice Roll') {
            closePreviousAndPlay(playDiceRoll, userChoice);
        } else if (selectedGame === 'Rock Paper Scissors') {
            closePreviousAndPlay(playRockPaperScissors, userChoice);
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
                onClick={() => navigate('/customer')}
            />
            <Box 
                sx={{ 
                    textAlign: 'center', 
                    marginTop: '50px', 
                    padding: '20px', 
                    border: '1px solid #ccc', 
                    borderRadius: '8px', 
                    boxShadow: 3, // Add shadow for depth
                    backgroundColor: '#F5F5F5' // Light background color
                }}
            >
                <Typography
                        variant="h4"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            mt: '1%',
                            mb: '3%',
                            color: '#7c0a02',
                            fontSize: { xs: '1.8rem', md: '2.2rem' },
                        }}
                    >
                        Choose a Game to Play
                    </Typography>

                <Select
                    value={selectedGame}
                    onChange={handleGameSelection}
                    displayEmpty
                    sx={{ width: '200px', marginBottom: '20px' }}
                >
                    <MenuItem value="" disabled>Select Game</MenuItem>
                    <MenuItem value="Rock Paper Scissors">Rock Paper Scissors</MenuItem>
                    <MenuItem value="Coin Toss">Coin Toss</MenuItem>
                    <MenuItem value="Dice Roll">Dice Roll</MenuItem>
                </Select>

                <br />

                {selectedGame === 'Rock Paper Scissors' && (
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item>
                            <Button
                                variant="contained"
                                onClick={() => handlePlay('Rock')}
                                sx={{
                                    backgroundColor: '#ff7961',
                                    padding: '10px 20px',
                                    margin: '5px',
                                    '&:hover': {
                                        backgroundColor: '#ba000d',
                                        transform: 'scale(1.1)',
                                        transition: 'all 0.3s ease',
                                    },
                                }}
                            >
                                <Brightness1Icon fontSize="large" />
                                Rock
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                onClick={() => handlePlay('Paper')}
                                sx={{
                                    backgroundColor: '#64b5f6',
                                    padding: '10px 20px',
                                    margin: '5px',
                                    '&:hover': {
                                        backgroundColor: '#2286c3',
                                        transform: 'scale(1.1)',
                                        transition: 'all 0.3s ease',
                                    },
                                }}
                            >
                                <ArticleIcon fontSize="large" />
                                Paper
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                onClick={() => handlePlay('Scissors')}
                                sx={{
                                    backgroundColor: '#81c784',
                                    padding: '10px 20px',
                                    margin: '5px',
                                    '&:hover': {
                                        backgroundColor: '#519657',
                                        transform: 'scale(1.1)',
                                        transition: 'all 0.3s ease',
                                    },
                                }}
                            >
                                <ContentCutIcon fontSize="large" />
                                Scissors
                            </Button>
                        </Grid>
                    </Grid>
                )}

                {selectedGame === 'Coin Toss' && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handlePlay('Heads')}
                            sx={{
                                padding: '10px 30px',
                                '&:hover': {
                                    backgroundColor: '#0057d8',
                                    transform: 'scale(1.1)',
                                    transition: 'all 0.3s ease',
                                },
                            }}
                        >
                            Heads
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handlePlay('Tails')}
                            sx={{
                                padding: '10px 30px',
                                '&:hover': {
                                    backgroundColor: '#d32f2f',
                                    transform: 'scale(1.1)',
                                    transition: 'all 0.3s ease',
                                },
                            }}
                        >
                            Tails
                        </Button>
                    </Box>
                )}

                {selectedGame === 'Dice Roll' && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px' }}>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => handlePlay('Smaller Number')}
                            sx={{
                                padding: '10px 30px',
                                '&:hover': {
                                    backgroundColor: '#4caf50',
                                    transform: 'scale(1.1)',
                                    transition: 'all 0.3s ease',
                                },
                            }}
                        >
                            Smaller Number (1-3)
                        </Button>
                        <Button
                            variant="contained"
                            color="warning"
                            onClick={() => handlePlay('Greater Number')}
                            sx={{
                                padding: '10px 30px',
                                '&:hover': {
                                    backgroundColor: '#ff9800',
                                    transform: 'scale(1.1)',
                                    transition: 'all 0.3s ease',
                                },
                            }}
                        >
                            Greater Number (4-6)
                        </Button>
                    </Box>
                )}

                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}
                    sx={{ mb: "4%"}}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert onClose={handleCloseSnackbar} severity={alertSeverity}>
                        {result}
                    </Alert>
                </Snackbar>
            </Box>
        </>
    );
}

export default Games;
