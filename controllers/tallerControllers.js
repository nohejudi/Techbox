var conexion = require('../config/conexion');
var menu = require("../model/taller")

module.exports={

    index:function (req,res) {

        menu.obtener(con, function (err,datos) {
            console.log(datos);
            res.render('login/index', { title: 'TECHBOX' });

            const consult=`SELECT * FROM registrar WHERE EMAIL='${req.body.email}' AND CONTRASEÑA = '${req.body.contraseña}'`;
            conexion.query(consult,function (error,resultado) {
             if (error) {
                 console.log("error en la bd")
                 throw error;
             } else if(resultado.length > 0) {
                 console.log('usuario encontrado')
                 res.render('login/menu');
             }else{
    
                res.send("errror")
             }
            });
        });
    },
    registrardatos:function (req,res) {
        var registrar = req.body
        console.log(registrar)

        var email= req.body.email;
        var Nombre= req.body.Nombre;
        var Contraseña = req.body.Contraseña;

        const consulta=`INSERT INTO registrar (ID_Registro,Email,Nombre,Contraseña)VALUES ('','${email}','${Nombre}','${Contraseña}')`;
        conexion.query(consulta,function (error, resultado) {
            if (error) {
                console.log("error en la base de datos")    
                throw error;
            }else{
                console.log('datos insertados wi correctamente')
                res.render('login/menu');
            }
            
        });
    }
};