# Diagnostico — Practica 5: Clinica de codigo completa

> Nota: la numeracion de "principio" sigue el decalogo usado en practica-3 (SOLID = 1 a 5) mas los principios de codigo limpio 6 a 10 (6 = tests de caracterizacion antes de refactorizar, 7 = nombres significativos, 8 = funciones pequenas / un nivel de abstraccion, 9 = evitar numeros magicos, 10 = DRY / evitar duplicacion y anidamiento). Ajustar los numeros si el decalogo real del curso difiere.

## Problemas detectados en enfermo.js y su resolucion

| # | Problema en enfermo.js | Principio violado | Refactor aplicado |
|---|---|---|---|
| 1 | Nombres cripticos: `procVta`, `t`, `d`, `cli`, `inv`, `st`, `imp`, `tot`, `r`, `i`, `j`, `k` | Principio 7 (nombres significativos) | Paso 1/5: renombrar variables y funcion a nombres descriptivos (`registrarVenta`, `subtotal`, `descuento`, `cliente`, `inventario`, etc.) |
| 2 | Numeros magicos: `500`, `0.1`, `0.15` repartidos en el codigo | Principio 9 (evitar numeros magicos) | Paso 2/5: extraer constantes `UMBRAL_DESCUENTO`, `PORCENTAJE_DESCUENTO`, `TASA_IMPUESTO` |
| 3 | Validaciones anidadas con if/else profundos en vez de salir temprano | Principio 10 (DRY / evitar anidamiento) | Paso 3/5: reemplazar if/else anidado por guard clauses (`return null` temprano) y ternario para el descuento |
| 4 | Una sola funcion mezcla validacion, calculo, actualizacion de inventario y generacion de recibo | Principio 1 (responsabilidad unica) | Paso 4/5: extraer `validarDisponibilidad`, `calcularSubtotal`, `calcularDescuento`, `actualizarInventario`, `generarRecibo`; `registrarVenta` queda como orquestador |
| 5 | Mezcla de niveles de abstraccion (loops de bajo nivel junto a logica de negocio de alto nivel) | Principio 8 (funciones pequenas / un nivel de abstraccion) | Paso 4/5: cada funcion extraida opera en un solo nivel de abstraccion |
| 6 | Codigo duplicado: el total se vuelve a calcular con un loop identico para el caso "mayorista" | Principio 10 (DRY) | Paso 5/5: `generarRecibo` reutiliza `calcularSubtotal(items)` en vez de repetir el loop |

## Red de seguridad

Antes de tocar el codigo se escribieron los tests de comportamiento actual en `enfermo.test.js` (principio 6), y los mismos tests se replicaron contra `sano.js`. Los 6 tests se mantuvieron en verde en cada uno de los 5 pasos del refactor.
