const express = require("express");
const mongoose = require("mongoose");

const User = require("./models/User");
const Child = require("./models/Child");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// ==========================================
// EJS SETUP
// ==========================================

app.set("view engine", "ejs");


// ==========================================
// HOME PAGE
// GET /
// ==========================================

app.get("/", (req, res) => {

    res.render("home");

});


// ==========================================
// ADD USER PAGE
// GET /users/new
// ==========================================

app.get("/users/new", (req, res) => {

    res.render("add-user");

});


// ==========================================
// CREATE USER
// POST /users
// ==========================================

app.post("/users", async (req, res) => {

    try {

        const {
            firstName,
            lastName,
            email,
            phone
        } = req.body;


        // Check required fields

        if (!firstName || !lastName || !email || !phone) {

            return res.status(400).send(
                "All fields are required."
            );

        }


        // Create user in MongoDB

        const user = await User.create({

            firstName,
            lastName,
            email,
            phone

        });


        // Success page

        res.send(`

            <h1>User Created Successfully</h1>

            <p>
                <strong>First Name:</strong>
                ${user.firstName}
            </p>

            <p>
                <strong>Last Name:</strong>
                ${user.lastName}
            </p>

            <p>
                <strong>Email:</strong>
                ${user.email}
            </p>

            <p>
                <strong>Phone:</strong>
                ${user.phone}
            </p>

            <p>
                <strong>User ID:</strong>
                ${user._id}
            </p>

            <br>

            <a href="/users/${user._id}">
                View User Profile
            </a>

            <br><br>

            <a href="/users/${user._id}/children/new">
                Add Child
            </a>

            <br><br>

            <a href="/users/new">
                Create Another User
            </a>

            <br><br>

            <a href="/">
                Go Home
            </a>

        `);

    }

    catch (error) {

        console.log(error);

        res.status(500).send(
            "Failed to create user."
        );

    }

});


// ==========================================
// VIEW USER PROFILE
// GET /users/:id
// ==========================================

app.get("/users/:id", async (req, res) => {

    try {

        const userId = req.params.id;


        // Find parent user

        const user = await User.findById(userId);


        // Check if user exists

        if (!user) {

            return res.status(404).send(
                "User Not Found"
            );

        }


        // Find all children belonging to this user

        const children = await Child.find({

            parentId: user._id

        });


        // Send user and children to profile.ejs

        res.render("profile", {

            user: user,
            children: children

        });

    }

    catch (error) {

        console.log(error);

        res.status(404).send(
            "Invalid User ID"
        );

    }

});


// ==========================================
// ADD CHILD PAGE
// GET /users/:id/children/new
// ==========================================

app.get("/users/:id/children/new", async (req, res) => {

    try {

        const userId = req.params.id;


        // Find parent user

        const user = await User.findById(userId);


        // Check if parent exists

        if (!user) {

            return res.status(404).send(
                "User Not Found"
            );

        }


        // Show Add Child page

        res.render("add-child", {

            user: user

        });

    }

    catch (error) {

        console.log(error);

        res.status(404).send(
            "Invalid User ID"
        );

    }

});


// ==========================================
// CREATE CHILD
// POST /users/:id/children
// ==========================================

app.post("/users/:id/children", async (req, res) => {

    try {

        const parentId = req.params.id;


        // Find parent user

        const user = await User.findById(parentId);


        // Check if parent exists

        if (!user) {

            return res.status(404).send(
                "User Not Found"
            );

        }


        // Get child information

        const {
            firstName,
            lastName,
            age,
            email
        } = req.body;


        // Check required fields

        if (!firstName || !lastName || !age) {

            return res.status(400).send(
                "First Name, Last Name and Age are required."
            );

        }


        // Create child

        const child = await Child.create({

            firstName,
            lastName,
            age,
            email,

            // Connect child to parent

            parentId: user._id

        });


        // Success page

        res.send(`

            <h1>Child Added Successfully</h1>

            <p>
                <strong>First Name:</strong>
                ${child.firstName}
            </p>

            <p>
                <strong>Last Name:</strong>
                ${child.lastName}
            </p>

            <p>
                <strong>Age:</strong>
                ${child.age}
            </p>

            <p>
                <strong>Email:</strong>
                ${child.email || "Not provided"}
            </p>

            <p>
                <strong>Parent:</strong>
                ${user.firstName} ${user.lastName}
            </p>

            <p>
                <strong>Parent ID:</strong>
                ${child.parentId}
            </p>

            <p>
                <strong>Child ID:</strong>
                ${child._id}
            </p>

            <br>

            <a href="/users/${user._id}">
                Back to User Profile
            </a>

            <br><br>

            <a href="/users/${user._id}/children/new">
                Add Another Child
            </a>

            <br><br>

            <a href="/">
                Go Home
            </a>

        `);

    }

    catch (error) {

        console.log(error);

        res.status(500).send(
            "Failed to create child."
        );

    }

});


// ==========================================
// DELETE CHILD
// POST /users/:userId/children/:childId/delete
// ==========================================

app.post(
    "/users/:userId/children/:childId/delete",
    async (req, res) => {

        try {

            const userId = req.params.userId;
            const childId = req.params.childId;


            // Find child

            const child = await Child.findById(childId);


            // Check if child exists

            if (!child) {

                return res.status(404).send(
                    "Child Not Found"
                );

            }


            // Delete child

            await Child.findByIdAndDelete(childId);


            // Return to parent profile

            res.redirect(`/users/${userId}`);

        }

        catch (error) {

            console.log(error);

            res.status(500).send(
                "Failed to delete child."
            );

        }

    }
);


// ==========================================
// CONNECT TO MONGODB
// ==========================================

mongoose.connect(process.env.MONGODB_URL)

    .then(() => {

        console.log(
            "MongoDB connected successfully"
        );


        app.listen(PORT, () => {

            console.log(
                `Server running on http://localhost:${PORT}`
            );

        });

    })

    .catch((error) => {

        console.log(
            "MongoDB connection failed"
        );

        console.log(
            error.message
        );

    });