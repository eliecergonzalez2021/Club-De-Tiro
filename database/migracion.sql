-- CREACION TABLA REGISTRAR SOCIO

DROP TABLE IF EXISTS Socio,Instructor,horaReservada,fechaRegistrada;

CREATE TABLE Socio (
    rut VARCHAR (13) UNIQUE NOT NULL PRIMARY KEY,
    nombre VARCHAR (20) NOT NULL,
    apellidos VARCHAR (20) NOT NULL,
    email VARCHAR (30) UNIQUE NOT NULL,
    password VARCHAR (60) NOT NULL
);

-- CREACION TABLA REGISTRAR instructor

CREATE TABLE Instructor (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR (20) NOT NULL,
    apellidos VARCHAR (20) NOT NULL,
    email VARCHAR (30) UNIQUE NOT NULL,
    curso VARCHAR (20) UNIQUE NOT NULL
);

-- CREACION TABLA REGISTRAR horaReservada

CREATE TABLE horaReservada (
    id SERIAL PRIMARY KEY,
    rut_fk VARCHAR (13) NOT NULL,
    id_instructor int ,
    fechaReservada DATE NOT NULL,
    FOREIGN KEY (rut_fk) REFERENCES socio (rut),
    FOREIGN KEY (id_instructor) REFERENCES Instructor (id)
);

-- CREACION TABLA REGISTRAR fechaRegistrada

CREATE TABLE fechaRegistrada (
    id SERIAL PRIMARY KEY,
    idHoraResrvada_fk INT ,
    FOREIGN KEY (idHoraResrvada_fk) REFERENCES horaReservada (id)
);

--llenar datos para prueba de socio
INSERT INTO socio(rut,nombre,apellidos,email,password)VALUES('20238277-0','victor','molina','prueba@gmail.com',1212);
 
--llenar datos para prueba de Instructor
INSERT INTO Instructor(nombre,apellidos,email,curso)VALUES('pedrito','luan','prueba@gmail.com','pistola de agua');

