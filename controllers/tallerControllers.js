var conexion = require('../config/conexion');
const taller = require('../model/taller');
//var menu = require("../model/taller")
var borrar = require("fs");


module.exports={

    index:function (req, res) {
        console.log(req.body);
    


    const consult=`SELECT * FROM registrar WHERE Email='${req.body.email}' AND Contraseña = '${req.body.contraseña}'`;
    conexion.query(consult,function (error,resultado) {
        if (error) {
            console.log("error en la bd")
            throw error;
        } else if(resultado.length > 0) {
            console.log('usuario encontrado')
            res.render('login/menu');
        }else{
        res.send("error")
        }
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
                console.log('datos insertados correctamente')
                res.render('login/menu');
            }
            
        });
    
    },
    Restablecer:function name(req,res) {
        console.log(req.body.Contraseña);

        if(req.body.Contraseña){
            taller.Restablecer(conexion,req.body,function name(err) {
                });
        }
        res.redirect('/taller');
    },
    // CRUD DE HERRAMIENTAS (INVENTARIO)

    herramientas:function (req,res) {
        const consult=`SELECT * FROM herramientas`;
        conexion.query(consult,function (error,resultado) {
            if(error) {
                console.log("error en la bd")
                throw error;
            }else if(resultado.length > 0) {
                console.log('datos encontrados')
                res.render('Inventario/herramientas' ,{
                    herramienta:resultado
                });
            }else{
                res.send("error")
            }

        });
    },

    // Guardar herramientas 
    guardarherra:function (req,res) {
        console.log(req.body);
        var {Nombre, Estado}=req.body

    //esta consulta es para guardar datos
        var consult =`INSERT INTO herramientas (Nombre,Estado) VALUES ('${Nombre}','${Estado} ')`;
        ;  conexion.query(consult,function (error,resultado) {
            if(error) {
                console.log("error en la bd")
                throw error;

            }else{
                res.redirect('/taller/herramientas')
            }
        });
    },

    borrar:function (req,res) {
        console.log("recepcion de datos");
        console.log(req.params.id_herramienta);
        taller.retornarDatosID(conexion,req.params.id_herramienta,function (err,registros) {
            
            var Nombre="routes/taller/"+(registros[0].Nombre);
            var Estado="routes/taller/"+(registros[0].Estado);

            if(borrar.existsSync(Nombre)){
                borrar.unlinkSync(Nombre);

                if(borrar.existsSync(Estado)){
                    borrar.unlinkSync(Estado);
            }}
            taller.borrar(conexion,req.params.id_herramienta,function (err) {
                res.redirect('/taller/herramientas');
            });
        });

    },
        //Crud de prestamos yo
        prestamo:function (req,res) {
            const consult=`SELECT * FROM prestamo`;
            conexion.query(consult,function (error,resultado) {
                if(error) {
                    console.log("error en la bd")
                    throw error;
                }else if(resultado.length > 0) {
                    console.log('datos encontrados')
                    res.render('Prestamos/prestamos' ,{
                        prest:resultado
                    });
                }else{
                    res.send("error")
                }
    
            });
        },
        guardarpres:function (req,res) {
            console.log(req.body);
            var {Nombre,Fecha,Estudiante,Tipo}= req.body

            var consult=`INSERT INTO prestamo (Herramienta,Fecha_prestamo,estudiante,Tipo_Herramienta) VALUES ('${Nombre}','${Fecha}','${Estudiante}','${Tipo}')`;
            ; conexion.query(consult,function (error,resultado) {
                if (error) {
                    console.log("erroren la bd")
                    throw error;
                }else{
                    res.redirect('/taller/prestamo')
                }
            });
        },
    //CRUD DE DEVOLUCIONES 
    de:function (req,res) {
        const consult=`SELECT * FROM devolucion`;
        conexion.query(consult,function (error,resultado) {
            if(error) {
                console.log("error en la bd")
                throw error;
            }else if(resultado.length > 0) {
                console.log('datos encontrados')
                res.render('DEVOLUCIONES/devolu' ,{
                    dev:resultado
                });
            }else{
                console.log('datos insertados')
                res.send("error")
            }
//okis aqui veo
        });
    },
    guardardev:function (req,res) {
        console.log(req.body);
        var {nombre, fecha, observaciones, Estado}=req.body


//esta consulta es para guardar archivos 
        var consult =`INSERT INTO devolucion (Herramienta,fecha_devolucion,observaciones,estado_entrega) VALUES ('${nombre}', '${fecha}', '${observaciones}', '${Estado} ')`;
      ;  conexion.query(consult,function (error,resultado) {
            if(error) {
                console.log("error en la bd")
                throw error;

            }else{
                res.redirect('/taller/d')
            }

        });
    
        // hola ahorita te digolo que vamos aser esta buena esa consulta judith 
        // aca primero hay que aser la consulta asi mira

    },
        
    //CRUD DE ESTUDIANTES (REGISTROS)
    estudi:function (req,res) {
        const consult=`SELECT * FROM estudiantes`;
        conexion.query(consult,function (error,resultado) {
            if(error) {
                console.log("error en la bd")
                throw error;
            }else if(resultado.length > 0) {
                console.log('datos encontrados')
                res.render('Estudiante/Estudiante' ,{
                    estud:resultado
                });
            }else{
                res.send("error")
            }

        });
    },
    guardarestu:function (req,res) {
        console.log(req.body);
        var {nombre, gmail, nie}=req.body


//esta consulta es para guardar archivos 
        var consult =`INSERT INTO estudiantes (Nombre,Gmail,NIE) VALUES ('${nombre}', '${gmail}', '${nie}')`;
      ;  conexion.query(consult,function (error,resultado) {
            if(error) {
                console.log("error en la bd")
                throw error;

            }else{
                res.redirect('/taller/estudiantes')
            }

        });
    }


    //editar:function (req,res) {
        //taller.retornarDatosID(conexion,req.params.id_herramienta,function (err,registros){
           //* console.log(registros[0]);
        //*res.render('/taller/herramientas', {taller:registros[0]});
       // });
   // }

};
