# Pokeapp

Se estructura con un header y un main a nivel visual

Posibles mejoras:

- wrappear todo dentro de un poke-presentation

## Header

Tiene logo y boton para togglear el theme.

Posibles mejoras:

- Componentizar imagen y boton

### Theme toggle

Se setea el theme por default en funcion de la configuración que tenga el usuario en el navegador

Después, si el usuario quiere, puede cambiar clicando el botón.

Lo fundamental de este approach es que seteamos la clase dark en app-root. Aquellas clases que tengan en sus alguna regla que haga referencia a dark del padre con :is(.dark \*), sobreescribirá las clases del tema light porque tiene mayor especificidad.

Posibles mejoras:

- Se podría haber creado una directiva para esta funcionalidad

## Main

Es el que contiene el el enrutamiento route-outlet.

### pokeList

Tiene la lista con los pokemos, esta preseteado a 10 items por vista. Tiene un servicio para manejar toda la lógica

Posibles mejoras:

- Método update pagination puede ser modularizada; misma funcionalidad practicamente para las dos funciones.
