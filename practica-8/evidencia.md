# Practica 8: Pipeline verde y URL viva

## Run verde en Actions

El workflow .github/workflows/ci.yml corre en cada push y en cada pull request, ejecutando los tests de las practicas 4 y 5 sobre ubuntu-latest con Node.js.

Primer run: https://github.com/MelvaMateo/isw2-practicas/actions/runs/34774246663 (resultado: Exito, 15s).

Salida del job:
- Tests practica 4 (fiados): 7 pasaron, 0 fallaron
- Tests practica 5 (enfermo): OK, sin fallos
- Tests practica 5 (sano): OK, sin fallos

## URL publica

https://melvamateo.github.io/isw2-practicas/

Publicada con GitHub Pages (Settings, Pages, Deploy from branch), sirviendo el index.html de la raiz del repositorio con links a cada practica.

## Reflexion

1. El pipeline corre en cada push y cada pull request, sin instalar dependencias externas porque los tests de las practicas 4 y 5 son scripts de Node puro sin librerias.
2. Se usan actions/checkout y actions/setup-node para tener el codigo y el runtime disponibles antes de ejecutar los tests.
3. El primer run salio verde porque los tests ya estaban validados localmente en las practicas anteriores, no hubo que depurar un fallo real en el pipeline.
4. Lo que agregaria despues: un paso de lint (por ejemplo eslint) para detectar problemas de estilo antes de correr los tests.
5. Tambien agregaria un test end to end que simule un flujo completo de venta o fiado, y ya se configuro branch protection para que nada llegue a main sin el check verde.
