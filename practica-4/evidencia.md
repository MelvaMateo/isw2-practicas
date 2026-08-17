# Evidencia — Practica 4

Salida de `node fiados.test.js` con la suite completa en verde (7 tests, 0 fallos). Historial real: los tests de "monto negativo" y "dias no numericos" se escribieron primero y fallaron (rojo) antes de implementar la validacion en fiados.js; luego se implemento la validacion (verde) y se agregaron los casos borde restantes.

```
$ node fiados.test.js
OK   calcula 5% de mora cuando el fiado esta vencido
OK   no genera mora cuando diasVencidos es 0
OK   no genera mora cuando el monto es 0, aunque este vencido
OK   lanza error si el monto es negativo
OK   lanza error si diasVencidos no es un numero
OK   lanza error si diasVencidos es NaN
OK   lanza error si diasVencidos es undefined

7 pasaron, 0 fallaron
```

Codigo de salida del proceso: 0.
