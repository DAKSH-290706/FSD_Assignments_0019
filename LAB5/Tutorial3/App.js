<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Student Registration</title>

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: #f4f6fb;
            color: #222;
        }

        .container {
            width: 90%;
            max-width: 700px;
            margin: 50px auto;
        }

        .form-box {
            background: white;
            padding: 35px;
            border-radius: 18px;
            box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
        }

        h1 {
            margin-top: 0;
            color: #4f46e5;
        }

        .subtitle {
            color: #666;
            margin-bottom: 30px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 7px;
            font-weight: bold;
        }

        input,
        select {
            width: 100%;
            padding: 12px;
            border: 1px solid #ccc;
            border-radius: 8px;
            font-size: 15px;
        }

        input:focus,
        select:focus {
            outline: none;
            border-color: #4f46e5;
        }

        button {
            width: 100%;
            padding: 13px;
            border: none;
            border-radius: 8px;
            background: #4f46e5;
            color: white;
            font-size: 16px;
            cursor: pointer;
        }

        button:hover {
            background: #3730a3;
        }

        .error {
            color: #dc2626;
            font-size: 13px;
            margin-top: 5px;
        }

        .success {
            display: none;
            margin-top: 20px;
            padding: 15px;
            border-radius: 8px;
            background: #dcfce7;
            color: #166534;
        }

        .student-list {
            margin-top: 25px;
        }

        .student {
            padding: 15px;
            margin-top: 10px;
            background: #f8fafc;
            border-left: 4px solid #4f46e5;
            border-radius: 6px;
        }
    </style>
</head>

<body>

    <div class="container">

        <div class="form-box">

            <h1>Student Registration</h1>

            <p class="subtitle">
                Register a student using JavaScript DOM manipulation,
                events and form validation.
            </p>

            <form id="studentForm">

                <div class="form-group">
                    <label for="name">Student Name</label>

                    <input
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                    >

                    <div id="nameError" class="error"></div>
                </div>


                <div class="form-group">

                    <label for="email">Email</label>

                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                    >

                    <div id="emailError" class="error"></div>

                </div>


                <div class="form-group">

                    <label for="course">Course</label>

                    <select id="course">

                        <option value="">Select Course</option>

                        <option value="BCA">
                            BCA
                        </option>

                        <option value="BCA Honours">
                            BCA Honours
                        </option>

                        <option value="MCA">
                            MCA
                        </option>

                    </select>

                    <div id="courseError" class="error"></div>

                </div>


                <button type="submit">
                    Register Student
                </button>

            </form>


            <div id="successMessage" class="success">
                Student registered successfully!
            </div>


            <div class="student-list">

                <h2>Registered Students</h2>

                <div id="studentList"></div>

            </div>

        </div>

    </div>


    <script src="script.js"></script>

</body>

</html>
