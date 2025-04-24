const { Product } = require('../models');
const createResponse = require('../utils/response');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({ where: { status: 'active' } });
        res.json(createResponse(true, 'Productos obtenidos exitosamente', products));
    } catch (err) {
        res.status(500).json(createResponse(false, err.message));
    }
}

module.exports = { getAllProducts };