const {response, request } = require('express');

const usuariosGet = (req=request, res = response) => {
    const {q, nombre='no name', apikey, page = 1, limit} = req.query;
    res.json({
        msg: 'get Api - controlador',
        q, 
        nombre, 
        apikey,
        page, 
        limit
    });

}

const usuariosPost = (req, res= response) => {
    const {nombre, edad} = req.body;
    res.status(201).json({
        msg: 'post Api - controlador',
        nombre, edad
    });
}
const usuariosPut = (req, res= response) => {
    const {id} = req.params.id;
    res.json({
        msg: 'put Api - controlador',
        id
    });
}
const usuariosDelete = (req, res= response) => {
    res.json({
        msg: 'delete Api - controlador'
    });
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

