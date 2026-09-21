# Practica 9 - Sesion agentica documentada

## Feature elegida

Abonos parciales que reducen el saldo antes de calcular la mora, en la calculadora de fiados de la practica 4. Se agrega la funcion calcularSaldoConAbonos(montoOriginal, abonos, diasVencidos) en practica-4/fiados.js, que reutiliza calcularMora ya existente.

## Principios de referencia (citados por numero en la critica)

1. TDD / test-first: el contrato de comportamiento se define en tests antes de escribir la implementacion.
2. DRY (Don't Repeat Yourself): no duplicar una regla de negocio (el 5% de mora) que ya existe en otra funcion probada.
3. Fail Fast: validar las entradas invalidas temprano y con un error claro, en vez de dejar que el calculo continue con datos corruptos.
4. SRP (Single Responsibility Principle): separar la validacion de una entrada de la acumulacion/calculo sobre esa entrada.
5. KISS (Keep It Simple): preferir la solucion mas simple que cumpla el contrato de los tests, sin abstracciones de mas.

## Paso 1: tests escritos primero (commit 6d29a27, RED)

Antes de tocar fiados.js se agregaron 5 tests nuevos a fiados.test.js que describen el contrato de calcularSaldoConAbonos: un abono reduce el saldo antes de calcular mora, varios abonos se suman, sin abonos el resultado es igual al monto completo, abonos que cubren el monto dejan saldo y mora en 0, y la suma de abonos no puede superar el monto original (debe lanzar error). En ese momento la funcion no existia todavia, asi que los tests estaban en rojo por definicion (fallaban con 'calcularSaldoConAbonos is not a function').

## Prompt 1 (implementacion inicial)

"Tengo esta funcion calcularMora(monto, diasVencidos) en fiados.js que cobra 5% de mora si diasVencidos > 0. Quiero agregar calcularSaldoConAbonos(montoOriginal, abonos, diasVencidos) donde abonos es un arreglo de numeros que se restan del montoOriginal antes de calcular la mora sobre el saldo. Devolveme { saldo, mora, total }. Ahi tenes los 5 tests que ya escribi en fiados.test.js, hace que pasen."

## Propuesta de la IA (version A)

    function calcularSaldoConAbonos(montoOriginal, abonos, diasVencidos) {
      let totalAbonado = 0;
      for (let i = 0; i < abonos.length; i++) {
        totalAbonado += abonos[i];
      }
      const saldo = montoOriginal - totalAbonado;
      let mora = 0;
      if (diasVencidos > 0) {
        mora = saldo * 0.05;
      }
      return { saldo, mora, total: saldo + mora };
    }

Resultado real al correrla contra los 12 tests (los 7 viejos + los 5 nuevos): 11 pasaron, 1 fallo. El test que exige error cuando los abonos superan el monto original fallo con 'se esperaba que la funcion lanzara un error y no lo hizo', porque la version A nunca valida ese caso.

## Critica de la version A

Observacion 1 (viola el principio 2, DRY): la funcion recalcula 'saldo * 0.05' en vez de llamar a calcularMora(saldo, diasVencidos), que ya existe, ya esta probada y ya centraliza la regla del 5%. Si el porcentaje de mora cambia algun dia, esta version obliga a actualizarlo en dos lugares y es facil que queden desincronizados.

Observacion 2 (viola el principio 3, Fail Fast): no valida que los abonos no superen el montoOriginal. Con montoOriginal=1000 y abonos=[600,500], la funcion devuelve un saldo de -100 en silencio en vez de avisar que los datos de entrada no tienen sentido para el negocio (no se puede abonar mas de lo que se debe). Esto se confirmo corriendo los tests: fue la unica falla real, documentada arriba.

Observacion 3 (viola el principio 3 tambien, mas alla de lo que los tests cubren): el for tampoco valida el tipo de cada abono. Si alguien pasa abonos=['400'] o abonos=[-50], la funcion los suma igual (concatenacion o resta segun el tipo) sin lanzar ningun error. Los tests que yo misma escribi no cubren este caso, lo cual es en si mismo un hallazgo: el contrato inicial de 5 tests quedo incompleto y hubo que ampliarlo con criterio propio, no solo confiar en lo que la IA hizo pasar.

Decision: version A rechazada. Se pidio una alternativa.

## Prompt 2 (forzando una alternativa y pidiendo que valide entradas)

"Esa version no valida que los abonos no superen el monto ni que cada abono sea un numero valido, y ademas duplica el calculo del 5% en vez de usar calcularMora que ya tengo. Dame una segunda version que reutilice calcularMora, valide que abonos sea un arreglo de numeros no negativos, y lance error si la suma de abonos supera montoOriginal. Preferi la solucion mas simple posible, sin crear clases ni una libreria de validaciones aparte."

## Propuesta de la IA (version B, final)

    function calcularSaldoConAbonos(montoOriginal, abonos, diasVencidos) {
      if (!Array.isArray(abonos)) {
        throw new Error('abonos debe ser un arreglo de numeros');
      }
      const totalAbonado = abonos.reduce((suma, abono) => {
        if (typeof abono !== 'number' || Number.isNaN(abono) || abono < 0) {
          throw new Error('cada abono debe ser un numero no negativo');
        }
        return suma + abono;
      }, 0);
      if (totalAbonado > montoOriginal) {
        throw new Error('los abonos no pueden superar el monto original');
      }
      const saldo = montoOriginal - totalAbonado;
      const mora = calcularMora(saldo, diasVencidos);
      return { saldo, mora, total: saldo + mora };
    }

## Comparacion critica: version A vs version B

Version B reutiliza calcularMora en vez de duplicar la formula del 5% (corrige la observacion 1, principio 2). Version B valida el tipo y el signo de cada abono dentro del mismo reduce que los suma, y corta la ejecucion con un error apenas encuentra un dato invalido, en vez de dejar que el calculo siga con numeros que no tienen sentido (corrige la observacion 2 y 3, principio 3). El precio de esto, revisado con el principio 4 (SRP), es que el reduce de version B hace dos cosas a la vez: valida cada elemento y acumula la suma. Se considero separar la validacion en un abonos.every(...) previo y despues sumar con abonos.reduce(...), lo cual deja cada bloque con una sola responsabilidad, pero implica recorrer el arreglo dos veces. Para el tamano tipico de esta lista (unos pocos abonos por fiado) esa segunda vuelta es irrelevante en performance, asi que, aplicando el principio 5 (KISS), se opto por mantener la validacion dentro del mismo reduce de version B en vez de agregar un paso extra que la practica no exige.

## Resultado de los tests

Con la version B, correr node practica-4/fiados.test.js da 12 pasaron, 0 fallaron (los 7 tests originales de calcularMora siguen en verde y los 5 nuevos de calcularSaldoConAbonos tambien).

## Que corre el pipeline y que agregaria despues

El workflow de Actions de la practica 8 ya corre fiados.test.js en cada push y pull request, asi que estos 5 tests nuevos quedan cubiertos automaticamente sin tocar el CI. Lo que agregaria despues es lint (por ejemplo eslint con una regla que prohiba numeros magicos como el 0.05, para que quede como constante nombrada) y un test end to end minimo que simule el flujo completo desde un input de usuario hasta el total final, ya que ahora mismo todo el testing es a nivel de funcion pura.
