const Order = require('../models/Order');
const OrderProduct = require('../models/OrderProduct');
const Product = require('../models/Product');
const createResponse = require('../utils/response');

const createOrder = async (req, res) => {
    const { message, recipient, products, user_id } = req.body;

    console.log('Datos del pedido:', req.body);
    if (!user_id || !recipient || !products || products.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Datos incompletos del pedido.',
        });
    }

    const t = await Order.sequelize.transaction();

    try {
        const newOrder = await Order.create({
            user_id,
            message,
            recipient_name: recipient.name,
            recipient_phone: recipient.phone,
            recipient_address: recipient.address,
            delivery_date: recipient.date,
            latlng: recipient.latlng,
        }, { transaction: t });

        for (const prod of products) {
            await OrderProduct.create({
                order_id: newOrder.order_id,
                product_id: prod.product_id,
                quantity: prod.quantity
            }, { transaction: t });
        }

        await t.commit();

        return res.status(201).json({
            success: true,
            message: 'Pedido registrado exitosamente.',
            data: { order_id: newOrder.order_id }
        });

    } catch (error) {
        await t.rollback();
        console.error('❌ Error al guardar pedido:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno al registrar el pedido.'
        });
    }
};

const getOrdersByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await Order.findAll({
            where: { user_id: userId },
            include: {
                model: Product,
                through: { attributes: ['quantity'] }
            }
        });

        return res.status(200).json(createResponse(true, 'Pedidos obtenidos exitosamente XSADASDSA', orders));

    } catch (error) {
        console.error('❌ Error al obtener pedidos del usuario:', error);
        res.status(500).json(createResponse(false, err.message));
    }
};

module.exports = {
    createOrder,
    getOrdersByUserId
}