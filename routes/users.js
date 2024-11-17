const express = require('express');
const router = express.Router();
const {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/UserController');

// Listar usuários
router.get('/', getUsers);

// Criar usuário
router.post('/', createUser);

// Atualizar usuário
router.put('/:id', updateUser);

// Deletar usuário
router.delete('/:id', deleteUser);

module.exports = router;
