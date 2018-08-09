// Importamos los paquetes
const express = require('express')
const expressGraphQL = require('express-graphql')
const { buildSchema } = require('graphql')
let personas = require('./personas.json')

// Se crea esquema. Definimos que tipo de acción se puede realizar.
// Los Query son usados para traer información
// Los Mutation para modificar la misma información

// Se define tres Query (Mensaje, Persona y Personas)
const schema = buildSchema(`
    type Query {
        mensaje: String
        persona(id: Int!): Persona
        personas(edad: Int!): [Persona]
    },
    type Mutation {
        actualizarEdad(id: Int!, edad: Int!): Persona
    },
    type Persona{
        id: Int,
        nombre: String,
        apellido: String,
        edad: Int,
        hobbies: [String]
    }

`)

// Para los query

const getMensaje = () => 'Hola desde GraphQL'
const getPersona = ({ id }) => personas.filter((persona) => persona.id === id)[0] || []
const getPersonas = ({ edad }) => personas.filter((persona) => persona.edad === edad)

// Para la mutacion

const actualizarEdad = ({ id, edad }) => {
    personas.map((persona) => {
        if (persona.id === id) { persona.edad = edad }
        return persona
    })
    return getPersona({ id })
}

// Procederemos a crear un objeto llamado root y le pasamos las funciones creadas arriba
const root = {
    mensaje: getMensaje,
    persona: getPersona,
    personas: getPersonas,
    actualizarEdad: actualizarEdad
}

// Se crea el servidor express con endpoint /graphql 

const app = express()
const port = 4000

app.use('/graphql', expressGraphQL({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

app.listen(port, () => console.log('Servidor graphql: OK!'))