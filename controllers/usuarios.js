const {response, request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { esRolvalido, emailExiste } = require('../helpers/db-validators');





const usuariosGet = async(req=request, res = response) => {

    const {limite = 5, desde=0} = req.query;
    const query = {estado: true};
    
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        usuarios
    });

}

const usuariosPost = async (req, res= response) => {
 
    const {nombre,correo, password, rol} = req.body;
    const usuario = new Usuario({nombre,correo, password, rol});
    //verificar si el correo existe
    // Aqui se usa el middleware emailExiste
    //encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //guarda en BD
    await usuario.save();
    res.json({
        usuario
    });
}
const usuariosPut = async(req, res= response) => {
    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    //TODO validar contra base de datos
    
    if (password) {
        //encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json({
        msg: 'put Api - controlador',
        usuario
    });
}
const usuariosDelete = async(req, res= response) => {
    const {id} = req.params;

    //Forma correcta de borrar un usuario
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
   
    res.json(usuario);
}
const usuariosPatch = (req, res= response) => {
    res.json({
        msg: 'patch Api - controlador'
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}

