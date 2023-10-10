import express from 'express'
import CourseController from './course.controller'
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/health', (req, res) => {
	res.send("OK");
});

app.get('/course', CourseController.getCourse);

app.post('/course', CourseController.createCourse);

app.patch('/course', CourseController.editCourse);

app.delete('/course', CourseController.deleteCourse);

app.listen(port, () => {
	console.log(`app is running at http://127.0.0.1:${port}`);
});
