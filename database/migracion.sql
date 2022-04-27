
DROP EXTENSION IF EXISTS pgcrypto;

DROP TABLE IF EXISTS curso,socio,admi;

-- habilitar pgcrypto;

CREATE EXTENSION pgcrypto;

-- CREACION TABLA REGISTRAR curso

CREATE TABLE curso (
    id SERIAL PRIMARY KEY,
    curso VARCHAR (20) UNIQUE NOT NULL,
    nombre VARCHAR (50) NOT NULL,
    email VARCHAR (30) UNIQUE NOT NULL
);

-- CREACION DE SOCIO

CREATE TABLE Socio (
    rut VARCHAR (13) UNIQUE NOT NULL PRIMARY KEY,
    nombre VARCHAR (20) NOT NULL,
    apellido VARCHAR (20) NOT NULL,
    email VARCHAR (30) UNIQUE NOT NULL,
    password VARCHAR (60) NOT NULL,
    fecha DATE,
    curso_fk INT ,
    FOREIGN KEY (curso_fk) REFERENCES curso (id)

);

-- CREACION D ADMI

CREATE TABLE admi (
    id SERIAL,
    email VARCHAR(60) UNIQUE NOT NULL ,
    password VARCHAR(60) NOT NULL
);


--llenar datos para prueba de socio
INSERT INTO socio(rut,nombre,apellido,email,password)VALUES('10.123.123-1','User','prueba','socio@test.cl', crypt('1212', gen_salt('bf')) );
 
--llenar datos para prueba de administrador
INSERT INTO admi(email,password)VALUES('admin@fsclub.cl',1313);

-- llenar curso 
INSERT INTO curso(nombre,email,curso)VALUES('Tio Harold','harold@fsclub.cl','inicial');
INSERT INTO curso(nombre,email,curso)VALUES('Clint Barton','clint@fsclub.cl','aprendiz');
INSERT INTO curso(nombre,email,curso)VALUES('Lucas Botkin','lucas@fsclub.cl','maestro');
INSERT INTO curso(nombre,email,curso)VALUES('Keane Reaves','reaves@fsclub.cl','legendario');