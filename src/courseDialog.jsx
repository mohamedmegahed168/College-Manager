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
function HandleCourseDialog({ completeDialog, open }) {
  const [userCourse, setUserCourse] = useState('');
  const [inValidCourse, setInValidCourse] = useState(false);
  const [courseError, setCourseError] = useState('');
  function validateCourse() {
    if (!userCourse.trim()) {
      setInValidCourse(true);
      setCourseError('Provide A valid course name');
      return;
    } else {
      completeDialog(userCourse);
      setInValidCourse(false);
      setCourseError('');
    }
  }
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogTitle
          sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem' }}
        >
          Course Details
        </DialogTitle>
        <DialogContentText sx={{ minWidth: '400px', pt: 1, mb: 1 }}>
          Please Provide A Valid Name For Your Course
        </DialogContentText>
        <Box
          component={'form'}
          sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
          <FormLabel htmlFor="course" sx={{ fontWeight: 'bold' }}>
            Course
          </FormLabel>
          <TextField
            onChange={(e) => setUserCourse(e.target.value)}
            id="course"
            label="course"
            placeholder="Biology 101"
            error={inValidCourse}
            helperText={courseError}
          ></TextField>

          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button
              startIcon={<Save />}
              variant="contained"
              onClick={validateCourse}
            >
              Save
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
export default HandleCourseDialog;
