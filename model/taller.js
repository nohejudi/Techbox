const con = require("../config/conexion");
const { guardarherra } = require("../controllers/tallerControllers");

module.exports={
    obtener:function (conexion,funcion) {
        conexion.query("SELECT * FROM registrar",funcion);
    },
    //REGISTRAR USUARIO
    obtener:function(conexion, funcion) {
        conexion.query("SELECT*FROM registrar", funcion);
    },

    //VALIDAR CONTRASEÑA-------------------------------------------------//
    buscar:function(conexion, usaurio, contraseña, funcion) {
       conexion.query(`SELECT * FROM usuario WHERE EMAIL=${usaurio} AND CONTRASEÑA =${contraseña}`, funcion);
    },
    //DATOS PARA CRUD DE HERRAMIENTA(INVENTARIO)-------------------------//
    obtener:function (conexion,funcion) {
    conexion.query("SELECT * FROM herramientas",funcion);
    },
    
    obterner:function (conexion,funcion) {
    conexion.query("SELECT * FROM devolucion",funcion)

    }, 

    retornarDatosID: function (conexion,id_herramienta,funcion) {
        conexion.query("SELECT * FROM herramientas WHERE id=? ", [id_herramienta],funcion);
    },

    borrar:function (conexion,id_herramienta,funcion) {
        conexion.query("DELETE FROM herramientas WHERE id=?",[id_herramienta], funcion);
    },

    //DATOS PARA CRUD DE PRESTAMOS--------------------------------//
    obtener:function (conexion,funcion) {
        conexion.query("SELECT * FROM presamo",funcion);
    },

    insertar:function (conexion,datos,funcion) {
        conexion.query("INSERT INTO prestamo (Herramienta,Fecha_prestamo,estudiante,Tipo_Herramienta) VALUES (?,?,?,?)",[datos.Herramienta,datos.Fecha_prestamo,datos.Estudiante,datos.Tipo_herramienta],funcion);
    },
    //DATOS PARA CRUD DE DEVOLUCION--------------------------------//
    obterner:function (conexion,funcion) {
    conexion.query("SELECT * FROM devolucion",funcion)
    },
    
    insertar:function (conexion,datos,funcion) {
        conexion.query("INSERT INTO devolucion (Herramienta,fecha_devolucion,observaciones,estado_entrega,Archivo) VALUES (?,?,?,?,?)",[datos.Herramienta,datos.fecha_devolucion,datos.odservaciones,datos.estado_entrega,datos.Archivo],funcion);
    },

    // DATOS CRUD PARA ESTUDIANTES----------------------------------//
    obterner:function (conexion,funcion) {
        conexion.query("SELECT * FROM estudiantes",funcion)
    },
    insertar:function (conexion,datos,funcion) {
        conexion.query("INSERT INTO estudiantes (Nombre,Gmail,NIE) VALUES (?,?,?)",[datos.Nombre,datos.Gmail,datos.NIE],funcion);
    },

    // restablecer contraseña

    Restablecer:function (conexion,datos,funcion) {
        conexion.query("UPDATE registar SET Contraseña=? WHERE id=?", [datos.Contraseña, datos.ID_Registro], funcion);
    }

}
