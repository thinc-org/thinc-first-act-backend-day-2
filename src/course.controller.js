const fakeDb = []

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
function getCourses(req, res) {
	return res.json(fakeDb)
}

// Get course
function getCourse(req, res) {
	const course = fakeDb.find((v) => v.courseNo === req.params.id)
	if (!course) {
		return res.status(404).end()
	}
	return res.json(course)
}

// Create course
function createCourse(req, res) {
	const validBody = validateBody(req.body)
	if(!validBody) {
		return res.status(400).end()
	}
	const course = fakeDb.find((v) => v.courseNo === req.body.courseNo)
	if (course) {
		return res.status(409).send("Course already exist")
	}

	fakeDb.push(req.body)
	
	return res.json(req.body)
}

// Delete course
function deleteCourse(req, res) {
	const courseIdx = fakeDb.findIndex((v) => v.courseNo === req.params.id)
	if (courseIdx == -1) {
		return res.status(404).end()
	}
	const ret = fakeDb.splice(courseIdx, 1)[0]

	return res.json(ret);
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
