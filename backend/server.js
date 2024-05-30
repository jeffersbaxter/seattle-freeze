// Citation for the following file:
// Date: 5/24/2024
// Adapted from Activity 2
// Jeffers deleted the example waterfall queries with individual REST routes for our backend API.
// Source URL: https://canvas.oregonstate.edu/courses/1958399/assignments/9589645?module_item_id=24181790

var express = require('express');
var app     = express();

// Reused port number from Activity 2 submission, after stopping Acitivity 2 process.
const PORT = 10211;

// Citation for the following import:
// Date: 5/24/2024
// Adapted from React Starter App
// Inspired by React Starter backend server to use cors library to prevent Cross-Origin errors - making requests 
//      between localhost and classwork server.
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app/blob/main/App/backend/server.js
const cors = require("cors");


// Import access to db instance for receiving HTTP requests.
var db = require('./db-connector')

// Allow requests from any domain.
app.use(cors({ credentials: true, origin: "*" }));

// Establishes JSON header for sending/receiving data to/from client.
app.use(express.json());

/**
 * Endpoint: /api/role-categories
 * Method: GET
 * Description: Get all RoleCategories.
 */
app.get('/api/role-categories', function(req, res) {
    const getRoleCategories = 'SELECT * FROM RoleCategories';

    db.pool.query(getRoleCategories, function (err, results, fields){

        res.status(200).json(results);
    });
});

/**
 * Endpoint: /api/roles
 * Method: GET
 * Description: Get all Roles.
 * Data: Array<{
 *      roleId: int,
 *      title: string,
 *      description: string,
 *      date: date,
 *      price: float,
 *      minBirthdate: date,
 *      locationId: int
 * }>
 */
app.get('/api/roles', function(req, res) {
    const getRoles = 'SELECT Roles.roleId, Patrons.firstName, Patrons.lastName, RoleCategories.roleDescription, Experiences.title FROM Roles \
    JOIN Patrons ON Roles.patronId = Patrons.patronId JOIN Experiences ON \
    Roles.experienceId = Experiences.experienceId JOIN RoleCategories ON Roles.roleCategoryId = RoleCategories.roleCategoryId ORDER BY Roles.roleId;';

    db.pool.query(getRoles, function (err, results, fields){

        res.status(200).json(results);
    });
});

/**
 * Endpoint: /api/roles
 * Method: POST
 * Description: Create a new Role.
 * Body: {
 *      patronId: int,
 *      roleCategoryId: int,
 *      experienceId: int
 * }
 */
app.post('/api/roles', function(req, res) {
    const { patronId, roleCategoryId, experienceId } = req.body;
    if (!patronId || !Number.isSafeInteger(parseInt(patronId))) {
        res.status(400).json({Error: "Bad Request. Invalid patronId value."})
    } else if (!roleCategoryId || !Number.isSafeInteger(parseInt(roleCategoryId))) {
        res.status(400).json({Error: "Bad Request. Invalid roleCategoryId value."})
    } else if (!experienceId || !Number.isSafeInteger(parseInt(experienceId))) {
        res.status(400).json({Error: "Bad Request. Invalid experienceId value."})
    }

    const createRole = `INSERT INTO Roles (patronId, roleCategoryId, experienceId) \
    VALUES (${patronId}, ${roleCategoryId}, ${experienceId});`;
    
    db.pool.query(createRole, function (err, results, fields) {
        if (!err) {
            res.status(201).json({Success: "Role created successfully!"});
        } else if (err.code === 400) {
            res.status(400).json({Error: "Client Error"})
        } else {
            res.status(500).json({Error: "Server Error"})
        }
    });
});

/**
 * Endpoint: /api/roles/:_id
 * Method: DELETE
 * Description: Delete a Role by Id.
 * Params: {
 *      roleId: int,
 * }
 */
app.delete('/api/roles/:_id', function(req, res) {
    const roleId = req.params._id;
    if (!roleId) {
        res.status(400).json({Error: "Bad Request. Invalid rolId value."})
    }

    const deleteRole = `DELETE FROM Roles WHERE roleId = ${roleId};`;

    db.pool.query(deleteRole, function (err, results, fields) {
        if (!err) {
            res.status(204).json({Success: "Role deleted successfully!"});
        } else if (err.code === 400) {
            res.status(400).json({Error: "Client Error"})
        } else {
            res.status(500).json({Error: "Server Error"})
        }
    });
});

/**
 * Endpoint: /api/experiences
 * Method: GET
 * Description: Get all experiences.
 * Data: Array<{
 *      experienceId: int,
 *      title: string,
 *      description: string,
 *      date: date,
 *      price: float,
 *      minBirthdate: date,
 *      locationId: int
 * }>
 */
app.get('/api/experiences', function(req, res) {
    const getExperiences = 'SELECT Experiences.experienceId, Experiences.title, Experiences.description, Experiences.date, Experiences.price, \
    Experiences.minBirthdate, \
    CONCAT(Locations.addressNumber," ", Locations.streetName," ", COALESCE(Locations.unitNumber, "")," ", Locations.city) AS address \
    FROM Experiences \
    JOIN Locations ON Experiences.locationId = Locations.locationId';

    db.pool.query(getExperiences, function (err, results, fields){

        res.status(200).json(results);
    });
});

/**
 * Endpoint: /api/patrons
 * Method: GET
 * Description: Get all Patrons.
 * Data: Array<{
 *      patronId: int,
 *      firstName: string,
 *      lastName: string,
 *      birthdate: Date,
 *      email: string
 * }>
 */
app.get('/api/patrons', function(req, res) {
    const getPatrons = 'SELECT * FROM Patrons;';

    db.pool.query(getPatrons, function (err, results, fields){

        res.status(200).json(results);
    });
});

/**
 * Endpoint: /api/patrons
 * Method: POST
 * Description: Create a Patron.
 * Body: {
 *      firstName: string,
 *      lastName: int,
 *      email: string,
 *      birthdate: date
 * }
 */
app.post('/api/patrons', function(req, res) {
    const { firstName, lastName, email, birthdate } = req.body;

    if (!firstName) {
        res.status(400).json({Error: "Client Error: Invalid firstName"})
    } else if (!lastName) {
        res.status(400).json({Error: "Client Error: Invalid lastName"})
    } else if (!email) {
        res.status(400).json({Error: "Client Error: Invalid email"})
    } else if (!birthdate) {
        res.status(400).json({Error: "Client Error:Invalid birthdate "})
    } else {
        const createPatron = `INSERT INTO Patrons (firstName, lastName, email, birthdate) 
        VALUES ("${firstName}", "${lastName}", "${email}", "${birthdate}");`;

        db.pool.query(createPatron, function (err, results, fields) {
            if (!err) {
                res.status(201).json(results)
            } else {
                res.status(err.code).json({Error: "Failed to make a Patron"});
            }
        });
    }
});

/**
 * Endpoint: /api/patrons/:_id
 * Method: PUT
 * Description: Update a Patron.
 * Params: {
 *      patronId: int,
 * }
 * Body: {
 *      firstName: string,
 *      lastName: int,
 *      email: string,
 *      birthdate: date
 * }
 */
app.put('/api/patrons/:_id', function (req, res) {
    const { firstName, lastName, email, birthdate } = req.body;
    const patronId = req.params._id;

    if (!patronId) {
        res.status(400).json({Error: "Client Error: Invalid patronId"})
    } else if (!firstName) {
        res.status(400).json({Error: "Client Error: Invalid firstName"})
    } else if (!lastName) {
        res.status(400).json({Error: "Client Error: Invalid lastName"})
    } else if (!email) {
        res.status(400).json({Error: "Client Error: Invalid email"})
    } else if (!birthdate) {
        res.status(400).json({Error: "Client Error:Invalid birthdate "})
    } else {
        const URL = `UPDATE Patrons SET firstName = "${firstName}", lastName = "${lastName}", email = "${email}", birthdate= "${birthdate}" WHERE patronId= ${patronId};`

        db.pool.query(URL, function (err, results, fields) {
            if (!err) {
                res.status(201).json(results)
            } else {
                res.status(err.code).json({Error: "Failed to update a Patron"});
            }
        });
    }
});

/**
 * Endpoint: /api/locations
 * Method: GET
 * Description: Get all Locations.
 * Data: Array<{
 *      locationId: int,
 *      addressNumber: string,
 *      streetName: string,
 *      unitNumber: string,
 *      city: string,
 *      state: string,
 *      zipCode: string
 * }>
 */
app.get('/api/locations', function (req, res) {
    const getLocations = 'SELECT * FROM Locations;';

    db.pool.query(getLocations, function (err, results, fields){

        res.status(200).json(results);
    });
});

/**
 * Endpoint: /api/reviews
 * Method: GET
 * Description: Get all Reviews.
 * Data: Array<{
 *      reviewId: int,
 *      message: string,
 *      rating: int,
 *      patronId: int,
 *      experienceId: int
 * }>
 */
app.get('/api/reviews', function (req, res) {
    const getReviews = 'SELECT Reviews.reviewId, Reviews.rating, Reviews.message, Patrons.patronId, Patrons.firstName, Patrons.lastName, Experiences.experienceId, Experiences.title FROM Reviews \
    JOIN Patrons ON Reviews.patronId = Patrons.patronId JOIN Experiences ON Reviews.experienceId = Experiences.experienceId;';

    db.pool.query(getReviews, function (err, results, fields){

        res.status(200).json(results);
    });
});

/**
 * Endpoint: /api/reviews/:_id
 * Method: GET
 * Description: Get Review by Id.
 * Params: {
 *      reviewId: int,
 * }
 * Data: {
 *      reviewId: int,
 *      message: string,
 *      rating: int,
 *      patronId: int,
 *      experienceId: int
 * }
 */
app.get('/api/reviews/:_id', function (req, res) {
    const getReview = `SELECT * FROM Reviews WHERE Reviews.reviewId = ${req.params._id}`;

    db.pool.query(getReview, function (err, results, fields){

        res.status(200).json(results);
    });
});

/**
 * Endpoint: /api/reviews
 * Method: POST
 * Description: Create a Review.
 * Body: {
 *      message: string,
 *      rating: int,
 *      patronId: int,
 *      experienceId: int
 * }
 */
app.post('/api/reviews', function (req, res) {
    const { rating, message, patronId, experienceId } = req.body;

    if (!rating) {
        res.status(400).json({Error: "Client Error: Invalid rating"})
    } else if (!message) {
        res.status(400).json({Error: "Client Error: Invalid message"})
    } else if (!patronId) {
        res.status(400).json({Error: "Client Error: Invalid patronId"})
    } else if (!experienceId) {
        res.status(400).json({Error: "Client Error:Invalid experienceId "})
    } else {
        const createReviews = `INSERT INTO Reviews (rating, message, patronId, experienceId) \
        VALUES (${rating}, "${message}", ${parseInt(patronId)}, ${parseInt(experienceId)});`;
    
        db.pool.query(createReviews, function (err, results, fields){
    
            if (!err) {
                res.status(200).json(results);
            } else {
                res.status(400).json({Error: err})
            }
        });
    }
});

/**
 * Endpoint: /api/reviews/:_id
 * Method: PUT
 * Description: Edit a Review by Id.
 * Params: {
 *      reviewId: int,
 * }
 * Body: {
 *      message: string,
 *      rating: int,
 *      patronId: int,
 *      experienceId: int
 * }
 */
app.put('/api/reviews/:_id', function (req, res) {
    const reviewId = req.params._id;
    const { rating, message, patronId, experienceId } = req.body;

    if (!reviewId) {
        res.status(400).json({ Error: "Client Error: invalid Review Id"});
    } else if (!rating) {
        res.status(400).json({Error: "Client Error: Invalid rating"})
    } else if (!message) {
        res.status(400).json({Error: "Client Error: Invalid message"})
    } else if (!patronId) {
        res.status(400).json({Error: "Client Error: Invalid patronId"})
    } else if (!experienceId) {
        res.status(400).json({Error: "Client Error:Invalid experienceId "})
    } else {
        const editReviews = `UPDATE Reviews SET rating = ${rating}, message = "${message}", patronId = ${patronId}, experienceId = ${experienceId} WHERE reviewId = ${reviewId};`;
    
        db.pool.query(editReviews, function (err, results, fields){

            if (!err) {
                res.status(200).json(results);
            } else {
                res.status(400).json(results);
            }
        });
    }
});

/**
 * Endpoint: /api/reviews/:_id
 * Method: DELETE
 * Description: DELETE Review by Id.
 * Params: {
 *      reviewId: int,
 * }
 */
app.delete('/api/reviews/:_id', function (req, res) {
    if (!req.params._id) {
        res.status(400).json({Error: "Client Error: Invalid Review Id"});
    } else {
        const deleteReview = `DELETE FROM Reviews WHERE reviewId = ${req.params._id}`;

        db.pool.query(deleteReview, function (err, results, fields){
    
            if (!err) {
                res.status(204).json({Success: `Successfully deleted the Review with id: ${req.params._id}`});
            } else {
                res.status(500).json({Error: err})
            }
        });
    }
});

/**
 * Endpoint: /api/paid-experiences
 * Method: GET
 * Description: Get all PaidExperiences.
 * Data: Array<{
 *      paidExperienceId: int,
 *      cost: float,
 *      patronId: int,
 *      experienceId: int
 * }>
 */
app.get('/api/paid-experiences', function (req, res) {
    const getPaidExperiences = 'SELECT PaidExperiences.paidExperienceId, PaidExperiences.cost, Patrons.firstName, Patrons.lastName, Experiences.title FROM PaidExperiences \
    JOIN Experiences ON PaidExperiences.experienceId = Experiences.experienceId \
    JOIN Patrons ON PaidExperiences.patronId = Patrons.patronId;';

    db.pool.query(getPaidExperiences, function (err, results, fields){

        res.status(200).json(results);
    });
});

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});