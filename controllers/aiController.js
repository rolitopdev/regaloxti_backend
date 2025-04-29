const axios = require("axios");
const createResponse = require('../utils/response');
const { Product } = require("../models");
const { Op } = require("sequelize");

const suggestion = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ success: false, message: "Prompt inválido" });
  }

  try {
    // 1. Obtener productos activos (solo nombre para el prompt)
    const allProducts = await Product.findAll({
      where: { status: "active" },
      attributes: ["name"]
    });

    const productNames = allProducts.map((p) => p.name).join(", ");
    if (productNames.length === 0) {
      return res.status(400).json(createResponse(false, 'No se encontraron productos activos para sugerir regalos 🤖'));
    }

    // 2. Enviar prompt a la IA
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            // content: `Eres un asistente que ayuda a armar regalos personalizados solo con los siguientes productos disponibles: ${productNames}. Devuélve un JSON, dentro: un array llamado data con el string del nombre del producto y un string llamado message haciendo una recomendación creativa al usuario.`,
            content: `Eres un asistente que ayuda a armar regalos personalizados solo con los siguientes productos disponibles: ${productNames}. Siempre debes responder con un objeto JSON con la estructura: { "data": [ { "name": "nombre_del_producto", "recomendation": "recomendación generada por la IA" } ], "message": "mensaje general de recomendación generado por la IA" }`
          },
          {
            role: "user",
            content: `${prompt}. Trata de ser muy creativo y no uses todos los productos, simplemente los que creas necesarios para el regalo.`,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "RegaloXti",
          "Content-Type": "application/json",
        },
      }
    );

    const content = response.data?.choices?.[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(content);
    const aiItems = parsed.data || [];

    // 3. Obtener los productos completos desde la BD según los nombres devueltos
    const names = aiItems.map((item) => item.name);
    const matchedProducts = await Product.findAll({
      where: { name: { [Op.in]: names } },
    });

    // 4. Combinar cantidad sugerida con la data real del producto
    const result = matchedProducts.map((product) => {
      const match = names.find((item) => item.name === product.name);
      return {
        ...product.toJSON(),
        quantity: match?.quantity || 1,
      };
    });

    return res.json({
      success: true,
      data: result,
      message: parsed.message || null
    });

  } catch (error) {
    console.error("❌ OpenRouter Error:", error?.response?.data || error.message);
    return res.status(500).json({ success: false, message: "Error al obtener sugerencias de IA" });
  }
};

module.exports = { suggestion };
