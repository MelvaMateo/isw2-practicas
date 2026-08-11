# Notas de refactor -- Practica 3

Nota: ajuste "principio N" al numero real que use el decalogo del curso; deje el numero de SOLID como referencia (S=1, D=5) por si no hay otro listado.

## Principio 1 -- Responsabilidad Unica (S)

Pedido.procesar mezclaba 5 responsabilidades en un solo metodo de 40 lineas.

Separe en ValidadorStock, CalculadoraTotal, GeneradorTicket, RepositorioPedidosSQL y NotificadorWhatsApp.

Cada clase tiene un solo motivo para cambiar: reglas de stock, calculo de ISV, formato de ticket, persistencia y notificacion.

Esto permite probar cada regla de negocio (ej. calculo de ISV) sin tocar base de datos ni WhatsApp.

Si manana cambia el proveedor de notificaciones, solo se toca NotificadorWhatsApp, no PedidoService.

## Principio 5 -- Inversion de Dependencias (D)

Antes, Pedido llamaba directo a db.insert y whatsappApi.send: dependia de detalles concretos.

Ahora PedidoService depende de las abstracciones RepositorioPedidos y NotificadorCliente, inyectadas por constructor.

Las implementaciones concretas (RepositorioPedidosSQL, NotificadorWhatsApp) dependen de la abstraccion, no al reves.

Esto permite inyectar un RepositorioPedidosFake o NotificadorMock en tests sin tocar la logica de negocio.

Tambien facilita cambiar de WhatsApp a otro canal (SMS, email) sin modificar PedidoService.
