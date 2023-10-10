import sql from './db.js'

async function getDepartmentByName(name) {
	const department = await sql`SELECT * FROM departments WHERE name = ${name}`;

	return department
}

async function createDepartment(name) {
	const department = await sql`INSERT INTO departments(name) VALUES (${name}) RETURNING *`;

	return department
}

async function createCourse(obj) {
	const { courseNo, abbrName, courseNameTh, courseNameEn, credit, departmentId } = obj
	const department = await sql`INSERT INTO courses(
		"courseNo", 
		"abbrName",
		"courseNameTh",
		"courseNameEn",
		"departmentId",
		"credit"
	) VALUES (${courseNo}, ${abbrName}, ${courseNameTh}, ${courseNameEn}, ${departmentId}, ${credit}) RETURNING *`;

	return department
}

async function getCourses() {
	const course = await sql`SELECT 
		"courseNo", 
		"abbrName",
		"courseNameEn",
		"courseNameTh",
		"credit",
		"name" department 
	FROM courses JOIN departments ON departments.id = courses."departmentId";`;

	return course
}

async function getCourseById(id) {
	const course = await sql`SELECT 
		"courseNo", 
		"abbrName",
		"courseNameEn",
		"courseNameTh",
		"credit",
		"name" department 
	FROM courses JOIN departments ON departments.id = courses."departmentId"
	WHERE "courseNo" = ${id}`;

	return course
}

async function deleteCourseById(id) {
	const course = await sql`DELETE FROM courses WHERE "courseNo" = ${id}`

	return course
}

export default {
	getDepartmentByName,
	createDepartment,
	createCourse,
	getCourses,
	getCourseById,
	deleteCourseById,
}
