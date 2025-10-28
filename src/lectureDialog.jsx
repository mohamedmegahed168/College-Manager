import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
  FormLabel,
  Button,
  Box,
} from '@mui/material';
import { Save } from '@mui/icons-material';
import { useState } from 'react';

function LectureDialog({ onComplete, open }) {
  const [lectureNumber, setLectureNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [numberError, setNumberError] = useState(false);
  const [numberErrorMessage, setNumberErrorMessage] = useState('');
  const [notesError, setNotesError] = useState(false);
  const [notesErrorMessage, setNotesErrorMessage] = useState('');

  function validateInputs() {
    let hasError = false;

    if (!lectureNumber) {
      setNumberError(true);
      setNumberErrorMessage('Please enter a valid lecture number');
      hasError = true;
    } else {
      setNumberError(false);
      setNumberErrorMessage('');
    }

    if (!notes.trim()) {
      setNotesError(true);
      setNotesErrorMessage('Please add some notes');
      hasError = true;
    } else {
      setNotesError(false);
      setNotesErrorMessage('');
    }

    if (hasError) {
      return;
    }

    onComplete(lectureNumber, notes);
    setLectureNumber('');
    setNotes('');
  }

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogContent>
        <DialogTitle
          sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem' }}
        >
          Add Lecture
        </DialogTitle>
        <DialogContentText sx={{ minWidth: '400px', pt: 1, mb: 1 }}>
          Enter the lecture number and your notes
        </DialogContentText>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          <Box>
            <FormLabel htmlFor="lectureNumber" sx={{ fontWeight: 'bold' }}>
              Lecture Number
            </FormLabel>
            <TextField
              onChange={(e) => setLectureNumber(e.target.value)}
              id="lectureNumber"
              label="Lecture Number"
              placeholder="Lecture 1"
              fullWidth
              error={numberError}
              helperText={numberErrorMessage}
            />
          </Box>

          <Box>
            <FormLabel htmlFor="notes" sx={{ fontWeight: 'bold' }}>
              Notes
            </FormLabel>
            <TextField
              onChange={(e) => setNotes(e.target.value)}
              id="notes"
              label="Notes"
              placeholder="Enter your lecture notes here..."
              multiline
              rows={6}
              fullWidth
              error={notesError}
              helperText={notesErrorMessage}
            />
          </Box>

          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button
              startIcon={<Save />}
              variant="contained"
              onClick={validateInputs}
              sx={{ backgroundColor: '#764ba2' }}
            >
              Save
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default LectureDialog;
