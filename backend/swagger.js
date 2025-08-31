const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Task Manager API',
    description: 'API documentation for Task Manager application',
    version: '1.0.0',
  },
  host: 'localhost:4000',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Clients',
      description: 'Client management endpoints'
    }
  ],
  definitions: {
    Client: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
        contact: { type: 'string' },
        address: { type: 'string' },
        photo: { type: 'string' },
        notes: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' }
      }
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js', './routers/*.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated successfully!');
});