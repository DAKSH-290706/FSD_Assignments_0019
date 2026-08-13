<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Dashboard</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <header class="header">
        <div>
            <h1>StudentHub</h1>
            <p>Learning Dashboard</p>
        </div>

        <div class="profile">
            <span></span>
            <strong>Student</strong>
        </div>
    </header>

    <nav class="navbar">
        <a href="#" class="active">Dashboard</a>
        <a href="#">Courses</a>
        <a href="#">Assignments</a>
        <a href="#">Progress</a>
        <a href="#">Profile</a>
    </nav>

    <main>

        <section class="welcome">
            <div>
                <p class="small-title">WELCOME BACK!</p>
                <h2>Continue Your Learning </h2>
                <p>Explore your courses and keep improving your skills.</p>
            </div>

            <button>View Progress</button>
        </section>

        <h2 class="section-title">My Courses</h2>

        <section class="courses">

            <div class="card">
                <div class="icon"></div>
                <h3>Web Development</h3>
                <p>Learn HTML, CSS and JavaScript.</p>
                <div class="progress">
                    <div class="progress-bar web"></div>
                </div>
                <span>75% Completed</span>
                <button>Continue</button>
            </div>

            <div class="card">
                <div class="icon"></div>
                <h3>React Development</h3>
                <p>Build modern interfaces using React.</p>
                <div class="progress">
                    <div class="progress-bar react"></div>
                </div>
                <span>55% Completed</span>
                <button>Continue</button>
            </div>

            <div class="card">
                <div class="icon"></div>
                <h3>Database Systems</h3>
                <p>Learn SQL and database management.</p>
                <div class="progress">
                    <div class="progress-bar database"></div>
                </div>
                <span>40% Completed</span>
                <button>Continue</button>
            </div>

        </section>

    </main>

    <footer>
        <p>© 2026 StudentHub | Student Learning Dashboard</p>
    </footer>

</body>
</html>
