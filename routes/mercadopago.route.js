const express = require("express");
const router = express.Router();
const mpcontroller = require("../controllers/mercadopago.controller");
const mercadopago = require("mercadopago");
const qrCode = require('qrcode');
const cors = require('cors');

mercadopago.configure({
  //access token de prueba de mi cuenta ajsj deberian usar de su cuenta pero fijense si funca 
  access_token: "APP_USR-6274633563174333-071021-e4419b3e7b9687f7d75f6d6200ddaf1c-1420666480"
})
router.post("/crearpago", cors(), (req, res) => {
  /* const { precio, descripcion } = req.body; */
  console.log(req.body.tipo)
  let detalle = []; //Puede ser una lista de insumos o una cuota
  if (req.body.tipo == "insumos") {
    console.log(req.body.insumos)
    for (let i of req.body.insumos) {
      detalle.push({ title: i.nombre, unit_price: i.precio, quantity: 1 });
    }
    console.log(detalle);
  }
  else if (req.body.tipo == "cuota") {
    detalle.push({ title: "Pago cuota", unit_price: req.body.cuota.importe, quantity: 1 })
  }

  let preference = {
    back_urls: {
      success: "https://test-gym-backend.onrender.com/success",
    },
    items: detalle,
    notification_url: "https://test-gym-backend.onrender.com/notificaciones",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      const initPoint = response.body.init_point;

      // Genera el código QR a partir de la URL del init_point
      qrCode.toDataURL(initPoint, function (err, qrDataURL) {
        if (err) {
          console.error('Error al generar el código QR:', err);
          res.status(500).send('Error al generar el código QR');
        } else {
          // Envia el código QR como respuesta
          res.status(200).json({ link: initPoint, qr: qrDataURL, status: '1' });
        }
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});

//no funciona, intente con ngrok pero tampoco
router.post("/notificaciones", cors(), async (req, res) => {
  console.log("######################notificarr####################################");
  const { query } = req
  const topic = query.topic || query.type;
  console.log("#############topic################", /* topic */);

  switch (topic) {
    case "payment":
      const paymentId = query.id || query["data.id"];
      /* console.log(topic, "getting payment", paymentId); */

      const payment = await mercadopago.payment.findById(paymentId);
      /* console.log(payment);
 */
      var { body } = await mercadopago.merchant_orders.findById(
        payment.body.order.id
      );
      break;
    case "merchant_order":
      const orderId = query.id;
      console.log(topic, "getting payment", orderId);
      var { body } = await mercadopago.merchant_orders.findById(orderId);
      break;
  }
  //esto seria la informacion real y nesesaria para saber el estado de la orden
  console.log('merchantOrder###################### ### ###', body.payments)
  var paidAmount = 0

  body.payments.forEach(function (payment) {
    if (payment.status === 'approved') {
      paidAmount += payment.transaction_amount;
    }
  });
  if (paidAmount >= body.total_amount) {
    console.log('PAGADOOOOO')
  } else {
    console.log('NOOO PAGADOOOOO')
  }

  res.send()
  res.status(200)
});

module.exports = router;
