// Importamos los paquetes
const express = require('express')
const expressGraphQL = requiere('express-graphql')
const { buildSchema } = requiere('graphql')
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