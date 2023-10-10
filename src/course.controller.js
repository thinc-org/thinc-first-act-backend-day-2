import Repository from './repository.js'

// Example object
//{
//   "courseNo": "0123105", # this is unique, so this should be primary key
//   "abbrName": "THAI WRIT WORK",
//   "courseNameTh": "การเขียนภาษาไทยในที่ทำงาน",
//   "courseNameEn": "THAI WRITING IN WORKPLACE",
//   "department": "สถาบันภาษาไทยสิรินธร",
//   "credit": 3
//}


// Get courses
async function getCourses(req, res) {
	const courses = await Repository.getCourses()

	res.json(courses)
}

// Get course
async function getCourse(req, res) {
	const course = await Repository.getCourseById(req.params.id);
	if (course.length == 0) {
		return res.status(404).end()
	}
	res.json(course[0])
}

// Create course
async function createCourse(req, res) {
	const validBody = validateBody(req.body)
	if(!validBody) {
		return res.status(400).end()
	}
	
	const departmentName = req.body.department
	var department = await Repository.getDepartmentByName(departmentName)
	if (!department.length) {
		department = await Repository.createDepartment(departmentName)
	}

	req.body['departmentId'] = department[0].id
	try {
		const course = (await Repository.createCourse(req.body))[0]

		course.department = departmentName

		return res.json(course)
	} catch {
		return res.status(409).send("Course already exist")
	}
}

// Delete course
async function deleteCourse(req, res) {
	const course = await Repository.getCourseById(req.params.id);
	if (course.length == 0) {
		return res.status(404).end()
	}
	await Repository.deleteCourseById(req.params.id)
	
	res.json(course[0])
}

function validateBody(obj) {
	const schema = {
		courseNo: 'string',
		abbrName: 'string',
		courseNameTh: 'string',
		courseNameEn: 'string',
		department: 'string',
		credit: 'number',
	}
	for (const key in obj) {
		if (!(key in schema)) {
			return false;
		}
		if (typeof obj[key] !== schema[key]) {
			return false;
		}
	}
	for(const key in schema) {
		if (!(key in obj)) {
			return false;
		}
	}
	return true
}

export default {
	getCourse,
	getCourses,
	createCourse,
	deleteCourse,
}
