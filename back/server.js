import express from "express";
import cors from "cors";
import "dotenv/config";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import * as dbconnection from "./config/connectDB.js";
import AuthRouter from "./routes/v1/auth.routes.js";
import SheetRouter from "./routes/v1/sheet.routes.js";
import QuestionRouter from "./routes/v1/question.routes.js";
import StarredRouter from "./routes/v1/starred.routes.js";
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// swagger setup
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'DSA Tracker API',
            version: '1.0.0',
            description: 'DSA Tracker',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ['./routes/v1/*.js'], // Path to the API routes
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Routes
app.get("/", (req, res) => {
    res.send("Server running successfully!");
});
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/sheets", SheetRouter);
app.use("/api/v1/questions", QuestionRouter);
app.use("/api/v1/starred", StarredRouter);
// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// 404 Route
app.use("*", (req, res) => {
    res.status(404).send("404! Page not found");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


