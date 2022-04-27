-- CREACION TABLA REGISTRAR SOCIO

DROP TABLE IF EXISTS curso,socio,admi;


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
INSERT INTO socio(rut,nombre,apellido,email,password)VALUES('20238277-0','victor','molina','prueba@gmail.com',1212);
 
--llenar datos para prueba de curso
INSERT INTO curso(nombre,email,curso)VALUES('pedrito','prueba@gmail.com','pistola de agua');

--llenar datos para prueba de administrador
INSERT INTO admi(email,password)VALUES('prueba@gmail.com',1212);

-- llenar curso 
INSERT INTO curso(nombre,email,curso)VALUES('Tio Harold','harold@fsclub.cl','inicial');
INSERT INTO curso(nombre,email,curso)VALUES('Clint Barton','clint@fsclub.cl','aprendiz');
INSERT INTO curso(nombre,email,curso)VALUES('Lucas Botkin','lucas@fsclub.cl','maestro');
INSERT INTO curso(nombre,email,curso)VALUES('Keane Reaves','reaves@fsclub.cl','legendario');
