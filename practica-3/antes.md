```js
class Pedido {
  procesar(clienteId, items) {
    // 1. Validar stock
    for (const item of items) {
      const stockActual = db.query("SELECT stock FROM productos WHERE id = ?", item.id);
      if (stockActual < item.cantidad) {
        throw new Error("Sin stock para " + item.id);
      }
    }

    // 2. Calcular total con ISV (15%)
    let subtotal = 0;
    for (const item of items) {
      const precio = db.query("SELECT precio FROM productos WHERE id = ?", item.id);
      subtotal += precio * item.cantidad;
    }
    const isv = subtotal * 0.15;
    const total = subtotal + isv;

    // 3. Guardar en base de datos
    const pedidoId = db.insert("pedidos", {
      clienteId, items, subtotal, isv, total, fecha: now()
    });
    for (const item of items) {
      db.update("productos", item.id, { stock: item.stockActual - item.cantidad });
    }

    // 4. Imprimir ticket
    let ticket = "Pedido #" + pedidoId + "\n";
    for (const item of items) {
      ticket += item.nombre + " x" + item.cantidad + "\n";
    }
    ticket += "Subtotal: " + subtotal + "\nISV: " + isv + "\nTotal: " + total;
    console.log(ticket);

    // 5. Enviar WhatsApp al cliente
    const cliente = db.query("SELECT telefono FROM clientes WHERE id = ?", clienteId);
    whatsappApi.send(cliente.telefono, "Tu pedido #" + pedidoId + " fue procesado. Total: " + total);

    return pedidoId;
  }
}
```
