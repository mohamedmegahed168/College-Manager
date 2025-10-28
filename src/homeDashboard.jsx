import HandleAppBar from './dashboardAppBar';
import HandleCourseDialog from './courseDialog';
import LectureDialog from './lectureDialog';
import DisplayCourses from './displayCourses';
import { Add, Delete, ArrowBack } from '@mui/icons-material';
import {
  Typography,
  CssBaseline,
  createTheme,
  ThemeProvider,
  Card,
  CardContent,
  CardActions,
  Button,
  Fab,
  Box,
  IconButton,
  Container,
} from '@mui/material';
import { useState, useEffect } from 'react';
const theme = createTheme({ palette: { mode: 'light' } });
function HandleHomeDashboard({ name, college, years }) {
  const [showDialog, setShowDialog] = useState(false);
  const [lectureDialog, showLectureDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('courses');
    return saved ? JSON.parse(saved) : [];
  });
  function completeDialog(userCourse) {
    setCourses([...courses, { name: userCourse, lectures: [] }]);
    setShowDialog(false);
  }
  function addLecture(lectureNumber, notes) {
    setCourses((prev) => {
      const updated = [...prev];
      updated[selectedCourse].lectures.push({
        number: lectureNumber,
        notes: notes,
      });
      return updated;
    });
    showLectureDialog(false);
  }
  function handleCoursesIndex(index) {
    setSelectedCourse(index);
  }
  function handleCourseDelete(index) {
    setCourses((courses) => courses.filter((_, key) => key !== index));
  }

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          height: '100vh',
          color: '#fff',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <HandleAppBar />
        <Box
          sx={{
            mt: 0,
            pt: 0,
            textAlign: 'center',
            p: 6,
            mb: 4,
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
            Welcome Back {name}!
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9 }}>
            Faculty of {college} . {years} year
          </Typography>
        </Box>

        {selectedCourse === null ? (
          <>
            {courses.length === 0 ? (
              <Container>
                <Box
                  sx={{
                    textAlign: 'center',
                    py: 10,
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderRadius: 2,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                    No courses yet!
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3, opacity: 0.7 }}>
                    Click the + button below to add your first course
                  </Typography>
                </Box>
              </Container>
            ) : (
              <DisplayCourses
                handleIndex={handleCoursesIndex}
                handleDelete={handleCourseDelete}
                courses={courses}
              />
            )}
            <Fab
              color="primary"
              sx={{
                position: 'fixed',
                bottom: 24,
                right: 24,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background:
                    'linear-gradient(135deg, #5568d3 0%, #653a8a 100%)',
                },
              }}
              onClick={() => setShowDialog(true)}
            >
              <Add />
            </Fab>
          </>
        ) : (
          <Box
            sx={{
              background:
                'linear-gradient(135deg, rgba(165, 180, 252, 0.15) 0%, rgba(196, 181, 253, 0.15) 100%)',
              p: 2,
              borderRadius: 3,
              backdropFilter: 'blur(10px)',
            }}
          >
            <Button
              variant="contained"
              startIcon={<ArrowBack />}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background:
                    'linear-gradient(135deg, #5568d3 0%, #653a8a 100%)',
                },
                mb: 2,
              }}
              onClick={() => setSelectedCourse(null)}
            >
              Back
            </Button>
            <Typography
              variant="h4"
              sx={{ color: '#fff', fontWeight: 'bold', mb: 1 }}
            >
              {courses[selectedCourse].name}
            </Typography>
            <Box sx={{ mt: 3 }}>
              {courses[selectedCourse].lectures.length === 0 ? (
                <Box
                  sx={{
                    textAlign: 'center',
                    py: 6,
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body1">
                    No lectures yet. Click the + button to add one!
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {courses[selectedCourse].lectures.map((lecture, index) => (
                    <Card
                      key={index}
                      elevation={3}
                      sx={{
                        bgcolor: 'white',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'translateX(4px)',
                        },
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h6"
                          sx={{ color: '#764ba2', fontWeight: 'bold' }}
                        >
                          Lecture {lecture.number}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          whiteSpace="pre-wrap"
                          sx={{ mt: 1 }}
                        >
                          {lecture.notes}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => {
                            setCourses((prev) => {
                              const updated = [...prev];
                              updated[selectedCourse].lectures = updated[
                                selectedCourse
                              ].lectures.filter((_, i) => i !== index);
                              return updated;
                            });
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </CardActions>
                    </Card>
                  ))}
                </Box>
              )}
            </Box>
            <Fab
              color="primary"
              onClick={() => showLectureDialog(true)}
              sx={{
                position: 'fixed',
                bottom: 24,
                right: 24,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
            >
              <Add />
            </Fab>
          </Box>
        )}
      </Box>
      <HandleCourseDialog completeDialog={completeDialog} open={showDialog} />
      <LectureDialog onComplete={addLecture} open={lectureDialog} />
    </ThemeProvider>
  );
}
export default HandleHomeDashboard;
