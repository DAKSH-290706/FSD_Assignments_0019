function CourseCard({ icon, title, description, progress }) {
    return (
        <div className="card">

            <div className="icon">
                {icon}
            </div>

            <h3>{title}</h3>

            <p>
                {description}
            </p>

            <div className="progress">
                <div
                    className="progress-bar"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            <span>
                {progress}% Completed
            </span>

            <button>
                Continue
            </button>

        </div>
    );
}

export default CourseCard;