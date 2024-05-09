import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'DSA Tracker API',
            description: "API endpoints for a dsa sheet tracker",
            contact: {
                name: "Anurag Srivastav",
                email: "anuragsrivastav0027@gmail.com",
                url: "https://github.com/anurag-327/dsa-tracker"
            },
            version: '1.0.0',
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Server"
            }
        ]
    },
    // looks for configuration in specified directories
    apis: ['./router/v1/*.js'],
}
const swaggerSpec = swaggerJsdoc(options)
function swaggerDocs(app, port) {
    // Swagger Page
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    // Documentation in JSON format
    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })
}
export default swaggerDocs