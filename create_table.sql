CREATE TABLE courses (
	courseNo VARCHAR(10) PRIMARY KEY,
	abbrName VARCHAR(50) NOT NULL,
	courseNameEn VARCHAR(50) NOT NULL,
	courseNameTh VARCHAR(50) NOT NULL,
	departmentId INT NOT NULL,
	credit INT NOT NULL
);

CREATE TABLE departments (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL
);

ALTER TABLE courses ADD CONSTRAINT fk_department FOREIGN KEY(departmentId) REFERENCES departments(id);

