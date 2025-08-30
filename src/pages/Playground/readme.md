# Investigación: Hooks Básicos en React

## Objetivo

- Investigar los **hooks más usados en React**, entender para qué sirven y crear pequeños ejemplos prácticos.
- Crear una carpeta especial llamada **Playground** en el proyecto, donde se irán guardando todos los archivos de prueba de cada hook.
- Configurar las rutas necesarias para poder **navegar a cada ejercicio** y **ver el resultado en pantalla**.

---

## LOS MÁS BÁSICOS (IMPRESCINDIBLES)

### 1. useState
- Guarda valores que cambian (texto, números, banderas).
- Ejemplo: contador, texto del input.
- **Ejercicio:** Hacer un contador que suba y baje.

### 2. useEffect
- Ejecuta código cuando el componente se monta o cambian datos.
- Ejemplo: mostrar mensaje, llamar una API.
- **Ejercicio:** Mostrar mensaje en pantalla o en consola cuando cambie algo.


### 3. useRef
- Permite acceder al DOM o guardar valores sin re-renderizar.
- Ejemplo: enfocar un input, guardar un valor interno.
- **Ejercicio:** Hacer un botón que enfoque un input.

---

## HOOKS DE RENDERIZADO Y LÓGICA

### 4. useMemo
- Memoriza cálculos para que no se repitan si no cambian sus datos.
- Ejemplo: cálculos costosos.
- **Ejercicio:** Guardar el doble de un número sin recalcular siempre.


### 5. useCallback
- Memoriza funciones para no crearlas en cada render.
- Ejemplo: pasar funciones a componentes hijos.
- **Ejercicio:** Botón que imprima un mensaje en consola.

### 6. useContext
- Permite compartir datos entre componentes sin pasarlos por props.
- Ejemplo: idioma, tema oscuro/claro.
- **Ejercicio:** Guardar un color global que se pueda leer en varios componentes.

---

## HOOKS DE MANEJO DE FORMULARIOS

### 7. useId
- Genera IDs únicos para elementos.
- Ejemplo: etiquetas e inputs vinculados.
- **Ejercicio:** Crear IDs únicos para inputs.

### 8. useDeferredValue
- Para retrasar actualizaciones costosas en pantalla.
- Ejemplo: búsquedas rápidas mientras se escribe.
- **Ejercicio:** Texto que aparece con delay al escribir.

---

## HOOKS DE LISTENERS Y EFECTOS EXTERNOS

### 9. useLayoutEffect
- Como useEffect, pero antes de pintar la pantalla.
- Ejemplo: medir tamaño de elementos.
- **Ejercicio:** Mostrar ancho de un div.


### 10. useImperativeHandle
- Permite exponer funciones específicas de un componente hijo.
- Ejemplo: métodos públicos de un componente.
- **Ejercicio:** Componente input que pueda ser enfocado desde afuera.

---

## HOOKS DE RENDERIZADO Y RENDIMIENTO

### 11. useTransition
- Para tareas que pueden esperar sin bloquear la interfaz.
- Ejemplo: cambiar de pantalla mientras carga.
- **Ejercicio:** Simular carga mientras cambia texto.


### 12. useReducer
- Maneja estados complejos como un switch-case.
- Ejemplo: lógica de login, contadores múltiples.
- **Ejercicio:** Contador con acciones de +, -, reset.

---

## HOOKS DE CONTROL DE ESTADO O EVENTOS

### 13. useSyncExternalStore
- Para suscribirse a stores externos.
- Ejemplo: integración con Redux, Zustand, etc.
- **Ejercicio:** Simular un contador externo que notifica cambios.


### 14. useDebugValue
- Muestra info en las herramientas de desarrollo.
- Ejemplo: para debugging.
- **Ejercicio:** Mostrar mensaje en DevTools.


### 15. useErrorBoundary
- Para capturar errores en componentes funcionales.
- Ejemplo: proteger partes de la app que pueden fallar.
- **Ejercicio:** Mostrar mensaje de error si algo explota.

---

## Los más recomendados para empezar:

**Los más fáciles y usados:**
- useState
- useEffect
- useRef
- useContext
- useMemo
- useCallback

---

## Nota

> **“Los hooks son funciones que nos permiten usar características avanzadas de React (como estado, efectos o referencias) en componentes funcionales.”**

---

