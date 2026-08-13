import CourseCard from "./CourseCard";

function CourseList() {

    const courses = [
        {
            icon: "",
            title: "Web Development",
            description: "Learn HTML, CSS and JavaScript.",
            progress: 75
        },

        {
            icon: "",
            title: "React Development",
            description: "Build modern interfaces using React.",
            progress: 55
        },

        {
            icon: "",
            title: "Database Systems",
            description: "Learn SQL and database management.",
            progress: 40
        }
    ];

    return (
        <section>

            <h2 className="section-title">
                My Courses
            </h2>

            <div className="courses">

                {courses.map((course, index) => (
                    <CourseCard
                        key={index}
                        icon={course.icon}
                        title={course.title}
                        description={course.description}
                        progress={course.progress}
                    />
                ))}

            </div>

        </section>
    );
}

export default CourseList;