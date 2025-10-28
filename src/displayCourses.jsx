import {
  Box,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from '@mui/material';
import { Delete } from '@mui/icons-material';

function DisplayCourses({ handleDelete, handleIndex, courses }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: 3,
        pb: 10,
      }}
    >
      {courses.map((course, index) => {
        return (
          <Card
            key={index}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              },
            }}
            onClick={() => {
              handleIndex(index);
            }}
            elevation={2}
          >
            <CardContent sx={{ flexGrow: 1, pb: 1 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 'bold', color: '#764ba2', mb: 1 }}
              >
                {course.name}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, mb: 3 }}>
                {course.lectures.length} Lectures
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
              <IconButton
                size="small"
                color="error"
                sx={{
                  '&:hover': {
                    backgroundColor: 'error.light',
                    color: 'white',
                  },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(index);
                }}
              >
                <Delete />
              </IconButton>
            </CardActions>
          </Card>
        );
      })}
    </Box>
  );
}

export default DisplayCourses;
