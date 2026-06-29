import { MercadoPagoConfig, Preference } from "mercadopago";
import type { CartItem } from "../src/types/Cart";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

const preference = new Preference(client);

type CreatePreferenceBody = {
  items: CartItem[];
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreatePreferenceBody;

    const { items } = body;

    const response = await preference.create({
        body: {
            items: items.map((item: any) => ({
            id: item.producto.id.toString(),
            title: item.producto.nombre,
            quantity: item.cantidad,
            currency_id: "ARS",
            unit_price: Number(item.producto.precio),
            })),

            binary_mode: true,
        },
    });

    return Response.json({
      id: response.id,
      init_point: response.init_point,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Error al crear la preferencia" },
      { status: 500 }
    );
  }
}