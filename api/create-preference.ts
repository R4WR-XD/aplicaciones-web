export async function GET() {
  return Response.json({
    mensaje: "La función funciona",
  });
}

/* import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

const preference = new Preference(client);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { items } = req.body;

    const response = await preference.create({
      body: {
        items: items.map((item: any) => ({
          id: item.producto.id.toString(),
          title: item.producto.nombre,
          quantity: item.cantidad,
          currency_id: "ARS",
          unit_price: Number(item.producto.precio),
        })),
      },
    });

    return res.status(200).json({
      id: response.id,
      init_point: response.init_point,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error al crear la preferencia",
    });
  }
} */