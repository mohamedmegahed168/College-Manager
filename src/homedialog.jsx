import { useState } from 'react';
import facultiesObject from './faculties';
import { SaveOutlined } from '@mui/icons-material';
import {
  CssBaseline,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  ThemeProvider,
  createTheme,
  DialogContentText,
  FormControl,
  FormHelperText,
  Box,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from '@mui/material';

const theme = createTheme({ palette: { mode: 'light' } });
function HandleHomeDialog({ CompleteDialog }) {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [college, setCollege] = useState('');
  const [collegeError, setCollegeError] = useState(false);
  const [collegeErrorMessage, setCollegeErrorMessage] = useState('');
  const [years, setYears] = useState('');
  const [yearsError, setYearsError] = useState(false);
  const [yearsErrorMessage, setYearsErrorMessage] = useState('');
  const collegeYears = facultiesObject.years[college] || [];
  function handleInputs() {
    let hasError = false;
    if (!name.trim()) {
      setNameError(true);
      setNameErrorMessage('Name is Required');
      hasError = true;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }
    if (!college) {
      setCollegeError(true);
      setCollegeErrorMessage('Your College is Required');
      hasError = true;
    } else {
      setCollegeError(false);
      setCollegeErrorMessage('');
    }
    if (!years) {
      setYearsError(true);
      setYearsErrorMessage('College Year is Required');
      hasError = true;
    } else {
      setYearsError(false);
      setYearsErrorMessage('');
    }
    return hasError;
  }
  function validateInputs() {
    let hasError = handleInputs();
    if (hasError) {
      return;
    }
    CompleteDialog({ name, college, years });
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dialog open={true}>
        <DialogTitle
          sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem' }}
        >
          Entry Page
        </DialogTitle>
        <DialogContent sx={{ minWidth: '400px', pt: 1 }}>
          <DialogContentText sx={{ mb: 2 }}>
            To start using this website first of all you will need to provide
            some details
          </DialogContentText>
          <Box
            component="form"
            sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <FormControl>
              <TextField
                id="name"
                placeholder="Mohamed Megahed"
                variant="outlined"
                label="Name"
                onChange={(e) => setName(e.target.value)}
                error={nameError}
                helperText={nameErrorMessage}
              ></TextField>
            </FormControl>
            <FormControl>
              <InputLabel error={collegeError}> Faculty </InputLabel>
              <Select
                id="faculty"
                variant="outlined"
                label="faculty"
                value={college}
                onChange={(e) => {
                  setCollege(e.target.value);
                  setYears('');
                }}
                error={collegeError}
              >
                {facultiesObject.faculties.map((faculty) => (
                  <MenuItem value={faculty} key={faculty}>
                    {faculty}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error={collegeError}>
                {collegeErrorMessage}
              </FormHelperText>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="years" label="year" error={yearsError}>
                Year
              </InputLabel>
              <Select
                id="years"
                label="year"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                error={yearsError}
              >
                {collegeYears.map((year) => (
                  <MenuItem value={year} key={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error={yearsError}>
                {yearsErrorMessage}
              </FormHelperText>
            </FormControl>

            <DialogActions sx={{ justifyContent: 'center', px: 3, pb: 2 }}>
              <Button
                variant="contained"
                startIcon={<SaveOutlined />}
                onClick={validateInputs}
                sx={{ backgroundColor: '#764ba2' }}
              >
                Save
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
export default HandleHomeDialog;
