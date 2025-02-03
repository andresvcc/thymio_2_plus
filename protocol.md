# Protocolo ASEBA

# Tabla de Materias - Protocolo ASEBA

- [4. Protocolo de Comunicación](#4-protocolo-de-comunicación)
  - [4.1. Especificaciones del Protocolo](#41-especificaciones-del-protocolo)
    - [4.1.1. Información general sobre el protocolo](#411-información-general-sobre-el-protocolo)
    - [4.1.2. Base del Protocolo](#412-base-del-protocolo)
      - [4.1.2.1. Cabecera Fija (6 bytes)](#4121-cabecera-fija-6-bytes)
      - [4.1.2.2. Payload Variable](#4122-payload-variable)
    - [4.1.3. Eventos relacionados con el inicio de la comunicación](#413-eventos-relacionados-con-el-inicio-de-la-comunicación)
      - [4.1.3.1. Descubrimiento de Nodos](#4131-descubrimiento-de-nodos)
      - [4.1.3.2. Mensaje ID_NODE_PRESENT](#4132-mensaje-id_node_present)
      - [4.1.3.3. Importancia del Descubrimiento de Nodos](#4133-importancia-del-descubrimiento-de-nodos)
    - [4.1.4. Actualización del estado del robot](#414-actualización-del-estado-del-robot)
      - [4.1.4.1. Estructura del Mensaje ID_VARIABLES (0x9005)](#4141-estructura-del-mensaje-id_variables-0x9005)
      - [4.1.4.2. Ejemplo de Mensaje ID_VARIABLES](#4142-ejemplo-de-mensaje-id_variables)
    - [4.1.5. Manejo de Fragmentación](#415-manejo-de-fragmentación)
      - [4.1.5.1. Proceso de Manejo de Fragmentación](#4151-proceso-de-manejo-de-fragmentación)
      - [4.1.5.2. Ejemplo de Manejo de Fragmentación](#4152-ejemplo-de-manejo-de-fragmentación)
  - [4.2. Identificadores](#42-identificadores)
    - [4.2.1. Mensajes de Descripción y Configuración](#421-mensajes-de-descripción-y-configuración)
    - [4.2.2. Mensajes de Estado y Variables](#422-mensajes-de-estado-y-variables)
    - [4.2.3. Mensajes de Comandos y Control](#423-mensajes-de-comandos-y-control)
    - [4.2.4. Eventos Locales](#424-eventos-locales)
  - [4.3. Codificación y Decodificación de Mensajes](#43-codificación-y-decodificación-de-mensajes)
    - [4.3.1. Construcción del Payload](#431-construcción-del-payload)
    - [4.3.2. Cálculo de la Longitud del Payload](#432-cálculo-de-la-longitud-del-payload)
    - [4.3.3. Formación de la Cabecera](#433-formación-de-la-cabecera)
    - [4.3.4. Concatenación de Cabecera y Payload](#434-concatenación-de-cabecera-y-payload)
    - [4.3.5. Proceso de Decodificación](#435-proceso-de-decodificación)
    - [4.3.6. Ejemplo de Decodificación](#436-ejemplo-de-decodificación)
  - [4.4. Variables del Robot](#44-variables-del-robot)
    - [4.4.1. Variables de Interés en el Estado del Robot](#441-variables-de-interés-en-el-estado-del-robot)
    - [4.4.2. Tabla de Variables de Interés](#442-tabla-de-variables-de-interés)
    - [4.4.3. Cómo se Utilizan las Variables](#443-cómo-se-utilizan-las-variables)
    - [4.4.4. Ejemplo de Monitoreo de Variables](#444-ejemplo-de-monitoreo-de-variables)
  - [4.5. Comandos del Protocolo](#45-comandos-del-protocolo)
    - [4.5.1. Lista de Comandos](#451-lista-de-comandos)
    - [4.5.2. Construcción del Payload para Comandos](#452-construcción-del-payload-para-comandos)
    - [4.5.3. Ejemplo de Envío de Comandos](#453-ejemplo-de-envío-de-comandos)
  - [4.6. Payloads en Diferentes Tipos de Mensajes](#46-payloads-en-diferentes-tipos-de-mensajes)
    - [4.6.1. Payloads en Mensajes de Descripción](#461-payloads-en-mensajes-de-descripción)
    - [4.6.2. Payloads en Mensajes de Estado y Variables](#462-payloads-en-mensajes-de-estado-y-variables)
    - [4.6.3. Payloads en Mensajes de Comandos](#463-payloads-en-mensajes-de-comandos)
    - [4.6.4. Payloads en Eventos Locales](#464-payloads-en-eventos-locales)


## 4 Protocolo de Comunicación

Este protocolo permite la comunicación directa entre la aplicación (host) y el robot Thymio a través de un puerto serie. Está diseñado para ser sencillo, robusto y extensible, facilitando tanto la configuración inicial del robot como la monitorización en tiempo real de su estado y la ejecución de comandos de control.

### 4.1. Especificaciones del Protocolo

#### 4.1.1 Información general sobre el protocolo
- **Objetivo:**  
  Permitir el intercambio bidireccional de información entre la aplicación y el robot. Esto incluye la transmisión de comandos de control, solicitudes de información, actualizaciones de estado (como sensores y variables internas) y la emisión de eventos locales.
  
- **Alcance:**  
  El protocolo se utiliza para comunicar información de bajo nivel (por ejemplo, estados de botones, valores de sensores) y de alto nivel (por ejemplo, descripción completa del robot, configuraciones RF) sin depender de software intermedio como un gestor de dispositivos. Su diseño favorece aplicaciones interactivas y sistemas de control en tiempo real.

- **Medio de transmisión:**  
  La comunicación se efectúa a través de un puerto serie, utilizando una tasa de baudios predefinida (por ejemplo, 115200), en la que los datos se envían y reciben en forma de bloques binarios.

A continuación se presenta una explicación detallada y ampliada de la base del protocolo, con tablas y ejemplos concretos para que incluso un estudiante que se inicia en la programación pueda entender cómo se compone cada mensaje. Se describen tanto la estructura fija (cabecera) como la parte variable (payload), junto con ejemplos prácticos y la forma de codificar cada valor.

---

#### 4.1.2 Base del Protocolo

El protocolo se basa en la construcción de mensajes que tienen dos partes principales: una **cabecera fija de 6 bytes** y un **payload variable**. Esta estructura permite identificar el mensaje, conocer su tamaño y procesar los datos que transporta. A continuación se explica cada parte.

---

##### 1. Cabecera Fija (6 bytes)

La cabecera siempre consta de tres campos, cada uno de 2 bytes (16 bits), y se codifica en **formato little-endian** (esto significa que el byte menos significativo se escribe primero). La siguiente tabla describe cada campo:


| Campo                       | Tamaño (bytes) | Formato    | Descripción                                                                                   | Ejemplo en Hex                                     |
|-----------------------------|----------------|------------|-----------------------------------------------------------------------------------------------|----------------------------------------------------|
| **Longitud del Payload**    | 2              | uint16 (LE)| Indica el número de bytes que conforman el payload.                                           | `0x15 0x00` *(21 bytes en total)*                  |
| **Nodo de Origen**          | 2              | uint16 (LE)| Identificador del robot (nodo) que envía el mensaje.                                          | `0x01 0x00` *(Nodo 1)*                             |
| **Identificador del Mensaje** | 2            | uint16 (LE)| Código que define el tipo de mensaje (por ejemplo, descripción, comando, etc.).               | `0x00 0x90` *(ID_DESCRIPTION, 0x9000)*             |



> **Nota sobre little-endian:**  
> Si tenemos un número, por ejemplo, 21 (en hexadecimal 0x15), en formato little-endian se escribe como `0x15 0x00` (el byte menos significativo primero).

---

##### 2. Payload Variable

El **payload** es la parte del mensaje que contiene los datos específicos y su estructura depende del tipo de mensaje. Puede incluir números y cadenas, y se codifica de la siguiente forma:

- **Números:**  
  Se codifican en 16 bits (2 bytes) o en 8 bits (1 byte), dependiendo de la necesidad. Siempre se usan valores en formato little-endian.  
  - *Ejemplo:* El número 5 (uint16) se codifica como `0x05 0x00`.

- **Cadenas:**  
  Cada cadena se codifica en UTF-8 y se precede de un byte (uint8) que indica la longitud de la cadena.  
  - *Ejemplo:* La cadena `"Thymio"` tiene 6 caracteres, así que se codifica como:  
    - Longitud: `0x06`  
    - Contenido (UTF-8): `0x54 0x68 0x79 0x6D 0x69 0x6F`  
      (donde `0x54` representa la letra T, `0x68` la h, y así sucesivamente).

---

### Ejemplo Concreto 1: Mensaje de Descripción (ID_DESCRIPTION, 0x9000)

**Propósito:**  
Este mensaje se utiliza para enviar una descripción completa del robot, que incluye el nombre del nodo y varios parámetros numéricos (como la versión del protocolo, tamaños de bytecode y pila, etc.).

**Contenido del Payload para este mensaje:**



| Campo                           | Tamaño       | Descripción                                                                                              | Valor Ejemplo      | Ejemplo en Hex                                         |
|---------------------------------|--------------|----------------------------------------------------------------------------------------------------------|--------------------|--------------------------------------------------------|
| Longitud de la cadena           | 1 byte       | Indica cuántos caracteres tiene el nombre del nodo.                                                    | 6                  | `0x06`                                               |
| Nombre del Nodo                 | 6 bytes      | Nombre del robot en UTF-8.                                                                               | "Thymio"           | `0x54 0x68 0x79 0x6D 0x69 0x6F`                        |
| Protocol Version                | 2 bytes      | Versión del protocolo (uint16).                                                                          | 5                  | `0x05 0x00`                                          |
| Bytecode Size                   | 2 bytes      | Tamaño del bytecode (por ejemplo, 512 en decimal).                                                       | 512                | `0x00 0x02` *(512 = 0x0200 → LE: 0x00, 0x02)*          |
| Stack Size                      | 2 bytes      | Tamaño de la pila (por ejemplo, 64 en decimal).                                                          | 64                 | `0x40 0x00` *(64 = 0x0040)*                           |
| Max Var Size                    | 2 bytes      | Tamaño máximo del bloque de variables.                                                                   | 128                | `0x80 0x00` *(128 = 0x0080)*                          |
| Número de Variables Nombradas   | 2 bytes      | Cantidad de variables nombradas.                                                                         | 10                 | `0x0A 0x00`                                          |
| Número de Eventos Locales       | 2 bytes      | Cantidad de eventos locales disponibles.                                                                 | 5                  | `0x05 0x00`                                          |
| Número de Funciones Nativas     | 2 bytes      | Cantidad de funciones nativas que tiene el robot.                                                        | 3                  | `0x03 0x00`                                          |



**Cálculo de la Longitud del Payload:**  
Suma de todos los bytes del payload:  
- Cadena del nombre: 1 + 6 = 7 bytes  
- Siete valores numéricos: 7 × 2 = 14 bytes  
- **Total:** 7 + 14 = 21 bytes → Se codifica como `0x15 0x00` (21 en decimal).

**Construcción del Mensaje Completo:**

1. **Cabecera (6 bytes):**



   | Campo                       | Ejemplo en Hex                                     |
   |-----------------------------|----------------------------------------------------|
   | Longitud del Payload (2B)   | `0x15 0x00`                                        |
   | Nodo de Origen (2B)         | `0x01 0x00` *(supongamos que el mensaje proviene del nodo 1)* |
   | Identificador del Mensaje (2B)| `0x00 0x90` *(ID_DESCRIPTION, 0x9000)*            |



2. **Payload (21 bytes):**



   | Orden                           | Campo                           | Ejemplo en Hex                                         |
   |---------------------------------|---------------------------------|--------------------------------------------------------|
   | 1                               | Longitud de la cadena           | `0x06`                                               |
   | 2 a 7                           | Nombre del Nodo ("Thymio")      | `0x54 0x68 0x79 0x6D 0x69 0x6F`                        |
   | 8 a 9                           | Protocol Version (5)            | `0x05 0x00`                                          |
   | 10 a 11                         | Bytecode Size (512)             | `0x00 0x02`                                          |
   | 12 a 13                         | Stack Size (64)                 | `0x40 0x00`                                          |
   | 14 a 15                         | Max Var Size (128)              | `0x80 0x00`                                          |
   | 16 a 17                         | Número de Variables Nombradas (10)| `0x0A 0x00`                                         |
   | 18 a 19                         | Número de Eventos Locales (5)   | `0x05 0x00`                                          |
   | 20 a 21                         | Número de Funciones Nativas (3) | `0x03 0x00`                                          |



**Mensaje Completo (Secuencia en Hexadecimal):**

```
Cabecera:
  0x15 0x00 | 0x01 0x00 | 0x00 0x90

Payload:
  0x06 | 0x54 0x68 0x79 0x6D 0x69 0x6F | 0x05 0x00 | 0x00 0x02 | 0x40 0x00 | 0x80 0x00 | 0x0A 0x00 | 0x05 0x00 | 0x03 0x00
```

Cuando este mensaje se envía, la aplicación receptora puede leer la cabecera para saber que debe esperar 21 bytes en el payload, y luego decodificar cada campo según la tabla.

---

### Ejemplo Concreto 2: Mensaje de Comando RESET

**Propósito:**  
El comando RESET se utiliza para reiniciar el robot. En este ejemplo, el comando se envía a un nodo específico (por ejemplo, el nodo 1).

**Contenido del Payload para RESET:**



| Campo             | Tamaño  | Descripción                                | Valor Ejemplo   | Ejemplo en Hex        |
|-------------------|---------|--------------------------------------------|-----------------|-----------------------|
| Nodo Objetivo     | 2 bytes | Identificador del nodo a reiniciar.        | 1               | `0x01 0x00`           |



**Cálculo de la Longitud del Payload:**  
El payload solo contiene 2 bytes (para el nodo objetivo).  
- **Total Payload:** 2 bytes → Se codifica como `0x02 0x00`.

**Construcción del Mensaje Completo:**

1. **Cabecera (6 bytes):**



   | Campo                       | Ejemplo en Hex                                     |
   |-----------------------------|----------------------------------------------------|
   | Longitud del Payload        | `0x02 0x00`                                        |
   | Nodo de Origen              | `0x01 0x00` *(el nodo de origen, por ejemplo, 1)*   |
   | Identificador del Mensaje   | Para RESET, supongamos ID_RESET = 0xA002 → `0x02 0xA0` (en LE) |



2. **Payload (2 bytes):**



   | Campo             | Ejemplo en Hex        |
   |-------------------|-----------------------|
   | Nodo Objetivo     | `0x01 0x00`           |



**Mensaje Completo (Secuencia en Hexadecimal):**

```
Cabecera:
  0x02 0x00 | 0x01 0x00 | 0x02 0xA0

Payload:
  0x01 0x00
```

Este mensaje se interpreta como: "El nodo 1 (nodo de origen) envía un comando RESET (ID 0xA002) para reiniciar el nodo objetivo 1."


- **Manejo de fragmentación:**  
Debido a la naturaleza de la comunicación por puerto serie, es muy común que los datos no se reciban en un solo bloque completo, sino en fragmentos. Esto significa que, en lugar de recibir un mensaje entero de una vez, los datos pueden llegar en varias lecturas separadas. Para asegurar la correcta reconstrucción del mensaje, el protocolo incorpora mecanismos de **acumulación** y **extracción** de datos en función de la longitud especificada en la cabecera.

#### Proceso de Manejo de Fragmentación

1. **Buffer de Acumulación:**  
   Se utiliza un buffer (por ejemplo, un objeto `Buffer` en Node.js o un arreglo de bytes en otros lenguajes) para almacenar todos los datos recibidos, sin importar si vienen en fragmentos o completos.

2. **Verificación Inicial del Buffer:**  
   Cada vez que se reciben nuevos datos, se añaden al buffer. Se comprueba si el buffer contiene al menos 6 bytes, ya que esos 6 bytes constituyen la cabecera fija del mensaje.

3. **Lectura de la Cabecera y Cálculo del Tamaño Total del Mensaje:**  
   - **Extracción de la Longitud del Payload:**  
     A partir de los primeros 2 bytes de la cabecera (formato uint16, little-endian), se determina cuántos bytes corresponden al payload.  
     Por ejemplo, si los dos primeros bytes son `0x15 0x00`, se interpreta que el payload tiene 21 bytes.
   - **Cálculo del Tamaño Total:**  
     El mensaje completo tendrá 6 bytes (cabecera) + 21 bytes (payload) = 27 bytes.

4. **Extracción del Mensaje Completo:**  
   Se compara la cantidad total de bytes acumulados en el buffer con el tamaño total del mensaje (calculado en el paso anterior).  
   - Si el buffer contiene **menos** de los bytes necesarios, se espera la llegada de más datos.
   - Si el buffer contiene **la cantidad exacta o más** de bytes, se extrae el mensaje completo y se elimina del buffer, dejando cualquier dato sobrante para la próxima iteración.

---

#### Ejemplo Concreto de Fragmentación

Supongamos que se envía un mensaje completo de 27 bytes, pero los datos llegan en 3 fragmentos. El mensaje completo se representa como:

```
Mensaje Completo (27 bytes): [B1, B2, B3, ..., B27]
```

Los fragmentos que se reciben pueden ser los siguientes:

- **Fragmento 1:** 10 bytes → `[B1, B2, ..., B10]`
- **Fragmento 2:** 8 bytes  → `[B11, B12, ..., B18]`
- **Fragmento 3:** 9 bytes  → `[B19, B20, ..., B27]`

La tabla a continuación ilustra el proceso:



| Fragmento Recibido | Bytes Recibidos       | Estado del Buffer                | Acción Realizada                                                                                                                                                          |
|--------------------|-----------------------|----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Fragmento 1**    | 10 bytes: B1 a B10    | B1 a B10                         | - Se verifica que el buffer contiene al menos 6 bytes (sí). <br> - Se lee la cabecera: se extrae la longitud del payload (por ejemplo, 21 bytes). <br> - Como 10 < 27, se espera más datos. |
| **Fragmento 2**    | 8 bytes: B11 a B18    | B1 a B18 (10 + 8 = 18 bytes)       | - Se verifica que 18 bytes < 27 bytes (mensaje incompleto). <br> - El buffer sigue acumulando datos y se espera la llegada del siguiente fragmento.                     |
| **Fragmento 3**    | 9 bytes: B19 a B27    | B1 a B27 (18 + 9 = 27 bytes)       | - Se detecta que el buffer contiene 27 bytes, que es el tamaño total del mensaje. <br> - Se extrae el mensaje completo (B1 a B27) y se elimina del buffer para procesarlo.         |



En este ejemplo, aunque los datos llegan en fragmentos, el sistema usa la longitud especificada en la cabecera para esperar hasta tener 27 bytes completos. Una vez acumulados, el mensaje se extrae y se procesa de forma segura.

---

#### Consideraciones Adicionales

- **Robustez:**  
  Este mecanismo asegura que incluso si los datos se fragmentan durante la transmisión, ningún mensaje se procesa de forma incompleta.  
- **Persistencia de Datos Sobrantes:**  
  Si, tras extraer un mensaje completo, quedan bytes en el buffer (por ejemplo, si se han recibido dos mensajes en una sola lectura), esos bytes se mantienen para formar parte del siguiente mensaje.
- **Implementación Genérica:**  
  Aunque el ejemplo se basa en la codificación en Node.js, el mismo concepto se aplica en cualquier lenguaje:  
  1. Acumular datos en un buffer.  
  2. Comprobar si hay suficientes datos para leer la cabecera.  
  3. Usar la información de la cabecera para determinar el tamaño total del mensaje.  
  4. Extraer el mensaje completo cuando sea posible y procesarlo.

#### 4.1.3 Eventos relacionados con el inicio de la comunicación
- **Descubrimiento de nodos:**  
A continuación se presenta una descripción detallada y práctica sobre los eventos relacionados con el inicio de la comunicación, centrándonos en el proceso de descubrimiento de nodos mediante el mensaje **ID_NODE_PRESENT**. Se incluye una explicación teórica, una tabla descriptiva y ejemplos concretos para facilitar la comprensión, incluso para quienes están comenzando en el mundo de la programación.

---

#### Eventos relacionados con el inicio de la comunicación

Cuando se establece la comunicación entre el host (por ejemplo, una aplicación en una computadora) y el robot, es fundamental conocer qué dispositivos (nodos) están activos y disponibles. Para ello, el protocolo incorpora un mecanismo de **descubrimiento de nodos** mediante el envío de mensajes específicos al inicio de la comunicación.

---

##### Descubrimiento de Nodos

- **Propósito del Descubrimiento:**  
  Al iniciarse la comunicación, cada robot que está activo en la red envía un mensaje cuyo identificador es **ID_NODE_PRESENT**. Este mensaje cumple dos funciones esenciales:
  
  1. **Notificación de Presencia:** Indica al host que existe un robot activo en la red.
  2. **Información de Estado:** Proporciona datos básicos, como la versión del firmware del robot, lo que permite al host identificar y catalogar cada nodo, y tomar decisiones basadas en la versión (por ejemplo, para compatibilidad o actualización).

- **Proceso:**  
  En el momento en que se inicia la conexión, el host envía un comando (por ejemplo, un comando de listado de nodos) o simplemente comienza a escuchar en el canal serie. Los robots que están "despiertos" y configurados para responder a este tipo de consultas emitirán automáticamente un mensaje **ID_NODE_PRESENT**. Este mensaje viaja a través de la misma vía de comunicación y llega al host, que lo procesa para actualizar su lista de nodos activos.

---

##### Estructura del Mensaje **ID_NODE_PRESENT**

El mensaje **ID_NODE_PRESENT** tiene la misma estructura base que cualquier otro mensaje del protocolo, es decir, cuenta con una cabecera fija de 6 bytes y un payload variable. Sin embargo, en el caso de este mensaje, el payload es generalmente muy sencillo.

A continuación se muestra una tabla que detalla la composición del mensaje **ID_NODE_PRESENT**:



| Campo                      | Tamaño (bytes) | Formato        | Descripción                                                        | Ejemplo en Hex                    |
|----------------------------|----------------|----------------|--------------------------------------------------------------------|-----------------------------------|
| **Longitud del Payload**   | 2              | uint16 (LE)    | Número de bytes que forman el payload.                             | `0x02 0x00` (suponiendo 2 bytes)   |
| **Nodo de Origen**         | 2              | uint16 (LE)    | Identificador del robot que envía el mensaje.                      | `0x01 0x00` (Nodo 1)              |
| **Identificador del Mensaje** | 2           | uint16 (LE)    | Código que identifica el mensaje como **ID_NODE_PRESENT**.           | `0x0C 0x90` (corresponde a 0x900C)  |
| **Payload – Firmware Version** | 2         | uint16 (LE)    | Versión del firmware del robot, que ayuda a determinar compatibilidad. | `0x01 0x00` (versión 1, por ejemplo)|



> **Nota:**  
> La longitud del payload en este ejemplo es 2 bytes, ya que el único dato que se transmite es la versión del firmware. En otros casos, si se necesitara enviar información adicional, este tamaño podría incrementarse.

---

##### Ejemplo Concreto de un Mensaje **ID_NODE_PRESENT**

Supongamos que un robot (nodo 1) desea anunciar su presencia con la versión de firmware 1. El mensaje se construye de la siguiente forma:

1. **Cabecera (6 bytes):**



   | Campo                         | Valor                     | Explicación                                           | Representación Hexadecimal      |
   |-------------------------------|---------------------------|-------------------------------------------------------|---------------------------------|
   | Longitud del Payload          | 2 bytes                   | El payload tendrá 2 bytes (solo la versión del firmware). | `0x02 0x00`                     |
   | Nodo de Origen                | Nodo 1                    | El robot que envía el mensaje.                        | `0x01 0x00`                     |
   | Identificador del Mensaje     | ID_NODE_PRESENT (0x900C)   | Identifica el mensaje de descubrimiento de nodo.      | `0x0C 0x90` (LE de 0x900C)        |



2. **Payload (2 bytes):**



   | Campo                         | Valor       | Descripción                                  | Representación Hexadecimal |
   |-------------------------------|-------------|----------------------------------------------|----------------------------|
   | Firmware Version              | 1           | Versión del firmware (en este ejemplo, 1).   | `0x01 0x00`                |



**Mensaje Completo (Secuencia Hexadecimal):**

```
Cabecera:
  0x02 0x00 | 0x01 0x00 | 0x0C 0x90

Payload:
  0x01 0x00
```

Este mensaje, una vez recibido, permite al host saber que:
- El mensaje proviene del nodo 1.
- El robot está activo.
- El robot tiene la versión 1 de su firmware, lo que puede ser utilizado para determinar si es compatible con ciertas funciones o actualizaciones.

---

##### Importancia del Descubrimiento de Nodos

- **Inventario Automático:**  
  Al recibir mensajes **ID_NODE_PRESENT** de varios nodos, el host puede construir automáticamente un inventario de todos los robots disponibles en la red. Esto es fundamental para sistemas que interactúan con múltiples dispositivos.

- **Sincronización y Configuración:**  
  La información de la versión de firmware y otros posibles parámetros (si se ampliara el payload) permiten al host ajustar sus comandos y comportamientos según las capacidades de cada robot.

- **Detección de Errores:**  
  Si un robot no envía el mensaje de presencia o si la versión del firmware no es la esperada, el sistema puede marcarlo como inactivo o inadecuado para ciertas operaciones, facilitando la depuración y el mantenimiento.

- **Obtención de información básica:**  
  A continuación, se transmiten mensajes **ID_DEVICE_INFO**, en los que se envían datos fundamentales del dispositivo, como:
  - **Nombre del dispositivo:** Identificado con un código específico.
  - **UUID:** Identificador único del dispositivo.
  - **Configuración RF:** Parámetros relacionados con la comunicación inalámbrica (por ejemplo, network ID, node ID, canal).

Estos eventos iniciales aseguran que la aplicación disponga de la información necesaria para interactuar correctamente con el robot.

#### 4.1.4 Actualización del estado del robot

El robot envía periódicamente mensajes que contienen los valores actuales de sus sensores y otros parámetros internos (como estados de botones, lecturas de proximidad, acelerómetro, etc.). Estos mensajes permiten al host (la aplicación controladora) monitorear en tiempo real el estado del robot y reaccionar a los cambios de forma inmediata.

El mensaje encargado de esta actualización se identifica generalmente con el **ID_VARIABLES** (por ejemplo, 0x9005). Su payload representa un **bloque de variables** que, de forma secuencial, contiene los valores actuales de diferentes sensores y estados internos.

---

##### 1. Estructura del Mensaje de Actualización de Variables

Como todos los mensajes en este protocolo, el mensaje de actualización de variables se compone de dos partes:

1. **Cabecera Fija (6 bytes):**  
   La cabecera contiene:
   


   | Campo                         | Tamaño (bytes) | Formato           | Descripción                                                                                      |
   |-------------------------------|----------------|-------------------|--------------------------------------------------------------------------------------------------|
   | Longitud del Payload          | 2              | uint16 (LE)       | Número total de bytes que forman la parte variable del mensaje.                                  |
   | Nodo de Origen                | 2              | uint16 (LE)       | Identificador del robot (nodo) que envía el mensaje.                                             |
   | Identificador del Mensaje     | 2              | uint16 (LE)       | Código que indica que se trata de un mensaje de actualización de variables (ID_VARIABLES, 0x9005).  |



2. **Payload Variable:**  
   El payload tiene una estructura definida para reflejar la actualización del bloque de variables:
   


   | Campo      | Tamaño (bytes) | Descripción                                                                 |
   |------------|----------------|-----------------------------------------------------------------------------|
   | **Offset** | 2              | Dirección o índice de inicio en el bloque de variables a actualizar.        |
   | **Valores**| n × 2          | Serie de valores (cada uno de 2 bytes, en formato uint16 little-endian) que representan el estado de cada variable a partir del offset indicado. |



> **Nota:**  
> El "offset" indica la posición dentro del bloque completo de variables que se está actualizando. Por ejemplo, si el offset es 50, los siguientes valores corresponden a la variable ubicada en la posición 50, 51, 52, etc.

---

##### 2. Ejemplo Concreto

**Supongamos** que el robot desea actualizar 4 variables internas a partir del offset 50. Estas variables pueden representar, por ejemplo, el estado de sensores o botones específicos. Para este ejemplo, se utilizan los siguientes valores:

- **Offset:** 50 (en decimal) → en formato uint16 little-endian se codifica como:  
  50 decimal = 0x32; se escribe como: `0x32 0x00`.
  
- **Valores de las Variables:**  
  Se actualizarán 4 valores. Por ejemplo:
  - **Valor 1:** 100 (decimal) → 100 = 0x64; en little-endian: `0x64 0x00`.
  - **Valor 2:** 200 (decimal) → 200 = 0xC8; en little-endian: `0xC8 0x00`.
  - **Valor 3:** 0 (decimal) → `0x00 0x00`.
  - **Valor 4:** 50 (decimal) → `0x32 0x00`.

**Cálculo del Tamaño del Payload:**

- Offset: 2 bytes  
- 4 valores de 2 bytes cada uno: 4 × 2 = 8 bytes  
- **Total del Payload:** 2 + 8 = 10 bytes → Se codifica como `0x0A 0x00` en la cabecera.

---

##### 3. Construcción del Mensaje Completo

**a) Cabecera (6 bytes):**



| Campo                      | Valor Ejemplo                | Explicación                                                  | Representación Hexadecimal  |
|----------------------------|------------------------------|--------------------------------------------------------------|-----------------------------|
| Longitud del Payload       | 10                           | El payload contiene 10 bytes.                                | `0x0A 0x00`                |
| Nodo de Origen             | 1                            | Supongamos que el mensaje proviene del nodo 1.               | `0x01 0x00`                |
| Identificador del Mensaje  | ID_VARIABLES (0x9005)        | Indica que se trata de un mensaje de actualización de variables. | `0x05 0x90` *(LE de 0x9005)* |



**b) Payload (10 bytes):**



| Orden      | Campo             | Valor Ejemplo (Decimal) | Descripción                                                  | Representación Hexadecimal  |
|------------|-------------------|-------------------------|--------------------------------------------------------------|-----------------------------|
| 1-2        | Offset            | 50                      | Indica la posición inicial del bloque a actualizar.          | `0x32 0x00`                |
| 3-4        | Valor 1           | 100                     | Primer valor actualizado en la posición offset.              | `0x64 0x00`                |
| 5-6        | Valor 2           | 200                     | Segundo valor actualizado (posición offset + 1).             | `0xC8 0x00`                |
| 7-8        | Valor 3           | 0                       | Tercer valor actualizado (posición offset + 2).              | `0x00 0x00`                |
| 9-10       | Valor 4           | 50                      | Cuarto valor actualizado (posición offset + 3).              | `0x32 0x00`                |



**c) Mensaje Completo (Secuencia en Hexadecimal):**

```
Cabecera:
  0x0A 0x00 | 0x01 0x00 | 0x05 0x90

Payload:
  0x32 0x00 | 0x64 0x00 | 0xC8 0x00 | 0x00 0x00 | 0x32 0x00
```

Este mensaje se envía por el puerto serie y, al recibirlo, el host procede de la siguiente manera:
1. **Lee la cabecera:** Determina que el payload tiene 10 bytes, que el mensaje proviene del nodo 1 y que es un mensaje de actualización de variables (ID_VARIABLES).
2. **Extrae el payload:** Lee los primeros 2 bytes para obtener el offset (50) y, a partir de ahí, interpreta cada par de bytes como los valores de las variables actualizadas.
3. **Actualiza el estado:** El host utiliza estos valores para actualizar internamente el estado del robot y, en caso de ser necesario, desencadenar acciones o notificaciones basadas en los cambios detectados.


- **Eventos locales:**  
  Además de los mensajes de actualización de variables, el robot emite eventos locales (por ejemplo, cambios en el estado de un botón o detección de un tap) que informan sobre cambios momentáneos o de alta prioridad.  
  Ejemplos de eventos locales incluyen:
  - `button.backward`, `button.left`, `button.center`, `button.forward`, `button.right`
  - `prox`, `prox.comm`
  - `tap`, `acc`
  - `mic`, `sound.finished`
  - `temperature`, `rc5`
  - `motor`, `timer0`, `timer1`

- **Comandos de control:**  
  Se definen comandos para controlar la ejecución del robot, tales como **RESET**, **RUN**, **PAUSE**, **STEP** y **STOP**. Estos comandos permiten cambiar el estado operativo del robot y gestionar la ejecución de su bytecode.

- **Extensibilidad y versiones:**  
  El protocolo ha sido diseñado para soportar múltiples versiones. Por ejemplo, se reconocen mensajes adicionales en versiones superiores (v6, v7, v8), lo que permite agregar nuevas funcionalidades sin romper la compatibilidad con implementaciones anteriores.

### 4.2. Identificadores
A continuación se presenta una explicación concisa y precisa de los identificadores del protocolo, incluyendo sus categorías, conceptos clave, tablas y ejemplos para facilitar su comprensión.

---

### 4.2. Identificadores

Cada mensaje del protocolo lleva un identificador único (ID) en formato hexadecimal. Este ID indica la función del mensaje y guía al receptor en la interpretación del payload. Se agrupan en las siguientes categorías:

---

#### 1. Descripción y Configuración

Estos mensajes proveen información detallada sobre el robot, como su nombre, versión, tamaños de memoria y configuración interna.



| Identificador                      | Valor Hexadecimal | Función                                                         | Ejemplo de Payload                              |
|------------------------------------|-------------------|-----------------------------------------------------------------|-------------------------------------------------|
| **ID_DESCRIPTION**                 | 0x9000            | Provee la descripción completa del robot.                       | Cadena (nombre) + varios números (version, etc.)  |
| **ID_NAMED_VARIABLE_DESCRIPTION**  | 0x9001            | Describe cada variable nombrada (nombre y tamaño).                | Número (tamaño) + cadena (nombre)                |
| **ID_LOCAL_EVENT_DESCRIPTION**     | 0x9002            | Describe un evento local (nombre y breve descripción).            | Dos cadenas: nombre y descripción               |
| **ID_NATIVE_FUNCTION_DESCRIPTION** | 0x9003            | Detalla una función nativa, incluyendo parámetros.                | Cadena (nombre) + cadena (descripción) + parámetros |



*Ejemplo:* Un mensaje con ID_DESCRIPTION puede incluir el nombre `"Thymio"`, seguido de números que indican la versión del protocolo, tamaño de bytecode, etc.

---

#### 2. Estado y Variables

Estos mensajes actualizan o informan sobre el estado interno del robot, como los valores de sensores y botones.



| Identificador              | Valor Hexadecimal | Función                                                          | Ejemplo de Payload                              |
|----------------------------|-------------------|------------------------------------------------------------------|-------------------------------------------------|
| **ID_VARIABLES**           | 0x9005            | Envía el bloque de variables (sensores, botones, etc.).           | 2 bytes de offset + N valores de 2 bytes cada    |
| **ID_EXECUTION_STATE_CHANGED** | 0x900a      | Indica cambios en la ejecución (por ejemplo, paso a paso).          | Números que representan contador y flags         |
| **ID_NODE_PRESENT**        | 0x900c            | Anuncia la presencia del robot y la versión del firmware.         | 2 bytes: versión del firmware                    |
| **ID_DEVICE_INFO**         | 0x900d            | Envía información del dispositivo (nombre, UUID, RF).             | 1 byte tipo + datos (cadena o números)           |



*Ejemplo:* Un mensaje ID_VARIABLES puede comenzar con un offset (por ejemplo, `0x32 0x00` para la posición 50) y continuar con los valores actuales de los sensores.

---

#### 3. Comandos y Control

Estos mensajes permiten al host controlar el robot, solicitar información o modificar parámetros.



| Identificador           | Valor Hexadecimal | Función                                                    | Ejemplo de Payload                                      |
|-------------------------|-------------------|------------------------------------------------------------|---------------------------------------------------------|
| **ID_RESET**            | 0xA002            | Reinicia el robot.                                         | Nodo objetivo (2 bytes)                                 |
| **ID_RUN**              | 0xA003            | Inicia la ejecución.                                       | Nodo objetivo (2 bytes)                                 |
| **ID_PAUSE**            | 0xA004            | Pausa la ejecución.                                        | Nodo objetivo (2 bytes)                                 |
| **ID_STEP**             | 0xA005            | Ejecuta un paso (modo paso a paso).                        | Nodo objetivo (2 bytes)                                 |
| **ID_STOP**             | 0xA006            | Detiene la ejecución.                                      | Nodo objetivo (2 bytes)                                 |
| **ID_GET_VARIABLES**     | 0xA00B            | Solicita el bloque de variables.                           | Nodo + offset + cantidad (cada uno 2 bytes)             |
| **ID_SET_VARIABLES**     | 0xA00C            | Envía nuevos valores para las variables.                   | Nodo + offset + nuevos valores                          |
| **ID_GET_NODE_DESCRIPTION** | 0xA010        | Solicita la descripción completa de un nodo.               | Nodo + versión (2 bytes)                                |
| **ID_LIST_NODES**       | 0xA011            | Lista todos los nodos conectados.                          | Generalmente sin payload extenso                       |



*Ejemplo:* Un comando RESET se enviaría con un payload que contiene el nodo objetivo, por ejemplo, `0x01 0x00` para el nodo 1.

---

#### 4. Eventos Locales

Estos mensajes notifican acciones o cambios puntuales en el robot, como la pulsación de un botón o la detección de un tap. Por convención, estos IDs son menores que un valor definido (por ejemplo, menor que `ID_FIRST_ASEBA_ID`).



| Rango de IDs              | Función                                                           | Ejemplo de Uso                                       |
|---------------------------|-------------------------------------------------------------------|------------------------------------------------------|
| **< 0x8000**              | Eventos de botones, sensores y otros eventos puntuales.           | `button.backward` indica cambio en el botón trasero. |
|                           |                                                                   | `tap` notifica que se detectó un tap.                |



*Ejemplo:* Al presionar el botón izquierdo, el robot puede enviar un evento local con un ID específico (por ejemplo, 0x0001) y un payload que indique el nuevo estado del botón.

A continuación se detalla, de forma concisa pero completa, cómo se debe realizar la codificación (para enviar) y la decodificación (para recibir) de mensajes en el protocolo, explicando el uso de conversiones y tipos de datos (uint16, uint8, string, etc.) de manera que cualquier desarrollador pueda entender el proceso y reimplementar el protocolo en cualquier lenguaje.

---

### Codificación de Mensajes

El proceso de codificación convierte datos estructurados en una secuencia de bytes para enviarlos a través del puerto serie. Se compone de dos partes: la **cabecera fija** y el **payload variable**.

#### 1. Construcción del Payload

Cada campo del payload se convierte según su tipo:

- **uint16 (16 bits, 2 bytes):**  
  Un número entero sin signo se representa en 2 bytes en formato little-endian (el byte menos significativo primero).  
  **Ejemplo:**  
  Valor: 300  
  - En hexadecimal: 300 = 0x012C  
  - En little-endian: se escribe como `0x2C 0x01`.

- **uint8 (8 bits, 1 byte):**  
  Se utiliza para números pequeños o para representar la longitud de una cadena.  
  **Ejemplo:**  
  Valor: 6  
  - En hexadecimal: 6 = `0x06`.

- **String (cadena de texto):**  
  Se codifica en UTF-8. La cadena se precede de 1 byte que indica su longitud en bytes.  
  **Ejemplo:**  
  Cadena: `"Ok"`  
  - Longitud: 2 → `0x02`  
  - Contenido:  
    - ‘O’ → 0x4F  
    - ‘k’ → 0x6B  
  - La representación completa será: `0x02 0x4F 0x6B`.

**Pasos para construir el payload:**



| Paso                         | Descripción                                                                                           | Ejemplo                                                                 |
|------------------------------|-------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| Convertir cada campo         | Para cada dato, convertir según su tipo: uint16 → 2 bytes, uint8 → 1 byte, string → [longitud + bytes] | 300 se convierte a `0x2C 0x01`; `"Ok"` se convierte a `0x02 0x4F 0x6B`  |
| Concatenar los campos        | Unir todos los campos convertidos en la secuencia exacta que se desea enviar                           | Payload = `0x2C 0x01 0x02 0x4F 0x6B`                                    |



En este ejemplo, el payload resultante tiene 5 bytes.

#### 2. Calcular la Longitud del Payload

Se determina la longitud total (en bytes) sumando la cantidad de bytes de cada campo.  
**Ejemplo:**  
- Si el payload es `0x2C 0x01 0x02 0x4F 0x6B`, la longitud es 5 bytes.

#### 3. Formación de la Cabecera

La cabecera siempre tiene 6 bytes y se compone de tres campos, todos convertidos a formato little-endian:



| Campo                         | Tamaño (bytes) | Descripción                                                            | Ejemplo (para payload de 5 bytes, nodo 1, ID = 0xA003)  |
|-------------------------------|----------------|------------------------------------------------------------------------|---------------------------------------------------------|
| **Longitud del Payload**      | 2              | Número total de bytes del payload                                      | 5 → Se codifica como: `0x05 0x00`                       |
| **Nodo de Origen**            | 2              | Identificador del robot que envía el mensaje                           | Nodo 1 → `0x01 0x00`                                    |
| **Identificador del Mensaje** | 2              | Código que define el tipo de mensaje (por ejemplo, un comando RUN)      | Por ejemplo, ID_RUN (0xA003) → se codifica como: `0x03 0xA0` |



#### 4. Concatenación de Cabecera y Payload

El mensaje completo se forma al unir la cabecera de 6 bytes con el payload.  
**Ejemplo Completo:**

- **Cabecera:**  
  `0x05 0x00 | 0x01 0x00 | 0x03 0xA0`  
- **Payload:**  
  `0x2C 0x01 | 0x02 0x4F 0x6B`  
- **Mensaje Completo:**  
  ```
  0x05 0x00  0x01 0x00  0x03 0xA0  0x2C 0x01  0x02 0x4F 0x6B
  ```

Este mensaje consta de 11 bytes en total y está listo para ser enviado por el puerto serie.

---

### Decodificación de Mensajes

El proceso de decodificación invierte la codificación, transformando la secuencia de bytes recibida de vuelta en datos estructurados.

#### 1. Acumulación de Datos

Debido a la fragmentación en la comunicación serie, los bytes se reciben en partes. Se usa un buffer para acumularlos hasta tener al menos 6 bytes (la cabecera).

#### 2. Extracción de la Cabecera

- **Leer los primeros 2 bytes:**  
  Se interpretan como un número uint16 en little-endian que indica la longitud del payload.  
  **Ejemplo:**  
  Si se reciben `0x05 0x00`, se obtiene 5 bytes de payload.
  
- **Leer los siguientes 2 bytes:**  
  Se interpretan como el nodo de origen (uint16 en little-endian).  
  **Ejemplo:**  
  `0x01 0x00` significa nodo 1.
  
- **Leer los últimos 2 bytes de la cabecera:**  
  Se interpretan como el identificador del mensaje (uint16 en little-endian).  
  **Ejemplo:**  
  `0x03 0xA0` se traduce al identificador 0xA003.

#### 3. Determinar el Tamaño Total del Mensaje

Sumar 6 (cabecera) + longitud del payload (por ejemplo, 5 bytes) para saber cuántos bytes en total se esperan para el mensaje completo.  
**Ejemplo:**  
Si la longitud del payload es 5, el mensaje completo debe tener 11 bytes.

#### 4. Extracción y Decodificación del Payload

Una vez que se tiene el mensaje completo, se procede a interpretar cada campo del payload según su tipo:

- **Para un uint16:**  
  Leer 2 bytes y convertirlos de little-endian a un número entero.  
  **Ejemplo:**  
  `0x2C 0x01` se convierte a 300.

- **Para un uint8:**  
  Leer 1 byte.  
  **Ejemplo:**  
  Un byte `0x02` indica el número 2 (usado para la longitud de una cadena).

- **Para una cadena:**  
  Leer primero 1 byte para obtener la longitud, luego leer esa cantidad de bytes y decodificarlos en UTF-8.  
  **Ejemplo:**  
  Si se lee `0x02` seguido de `0x4F 0x6B`, se obtiene la cadena `"Ok"`.

#### 5. Interpretación del Mensaje Completo

Utilizando el ejemplo del mensaje completo:
  
```
0x05 0x00  0x01 0x00  0x03 0xA0  0x2C 0x01  0x02 0x4F 0x6B
```

- **Cabecera:**  
  - Longitud del payload: `0x05 0x00` → 5 bytes.  
  - Nodo de Origen: `0x01 0x00` → Nodo 1.  
  - ID del Mensaje: `0x03 0xA0` → Identificador 0xA003 (por ejemplo, un comando RUN).

- **Payload:**  
  - Primer campo (uint16): `0x2C 0x01` → Se convierte a 300.  
  - Segundo campo (string):  
    - Primer byte: `0x02` → La cadena tiene 2 bytes.  
    - Siguientes 2 bytes: `0x4F 0x6B` → Se decodifican a `"Ok"`.

El mensaje reconstruido contiene, por tanto, los parámetros 300 y `"Ok"`.

---

### Tabla Resumen de Conversión y Procesamiento



| Tipo de Dato | Tamaño en Bytes | Conversión (Encoding)                         | Conversión (Decoding)                       | Ejemplo                              |
|--------------|-----------------|-----------------------------------------------|---------------------------------------------|--------------------------------------|
| **uint16**   | 2               | Convertir el número a 2 bytes en little-endian  | Leer 2 bytes y convertir de little-endian   | 300 → `0x2C 0x01`                    |
| **uint8**    | 1               | Representar el número en 1 byte                | Leer 1 byte directamente                     | 6 → `0x06`                           |
| **String**   | Variable      | Preceder la cadena con 1 byte de longitud, luego codificar en UTF-8 | Leer 1 byte para la longitud y decodificar esa cantidad de bytes en UTF-8 | "Ok" → `0x02 0x4F 0x6B`              |



---

### Conclusión del Proceso

**Codificación:**  
1. Convertir cada dato a su representación binaria (uint16, uint8, string).  
2. Calcular la longitud total del payload.  
3. Construir la cabecera utilizando la longitud, el nodo de origen y el ID, todos en little-endian.  
4. Concatenar la cabecera y el payload para formar el mensaje completo.

**Decodificación:**  
1. Acumular bytes hasta tener al menos 6 para leer la cabecera.  
2. Extraer la longitud del payload, el nodo de origen y el identificador del mensaje.  
3. Verificar que el buffer contenga el mensaje completo (cabecera + payload).  
4. Leer el payload campo por campo, usando el conocimiento de los tipos de datos (uint16, uint8, string).  
5. Reconstruir el mensaje original en su forma estructurada.

Esta metodología asegura que los mensajes se envíen y reciban de manera consistente y robusta, permitiendo a cualquier desarrollador implementar o adaptar este proceso en cualquier lenguaje de programación, respetando siempre la estructura definida y la conversión correcta de tipos de datos.

### 4.5. Variables, Comandos y Payloads

#### Variables:

Existen dos tipos de variables en el protocolo: **variables de interés** y **variables nombradas**. Las primeras representan el estado actual del robot (sensores, botones, motores, etc.), mientras que las segundas son variables internas que se pueden leer o escribir, pero que no tienen un significado específico para el protocolo, sino que son necesarias para el buen funcionamiento del robot.

### Variables de Interés en el Estado del Robot

Cada entrada en el objeto de variables de interés contiene tres valores clave:

- **offset:**  
  La posición (índice) en el bloque de variables del robot donde se encuentra el dato.  
- **size:**  
  El número de bytes que ocupa la variable. Esto determina si se trata, por ejemplo, de un valor de 8 bits (1 byte) o de datos más complejos que ocupan varios bytes.  
- **interestOfVariation:**  
  El umbral mínimo de cambio en el valor de la variable que se considera significativo. Si la diferencia entre el valor antiguo y el nuevo es igual o superior a este umbral, se considera que ha ocurrido un cambio relevante.

Estos parámetros permiten fusionar actualizaciones parciales del bloque de variables y detectar eventos de cambio de estado. A continuación se muestra la tabla con las variables definidas y su significado.

---



| Variable                | Offset | Size (bytes) | Umbral de Variación | Descripción                                                                                 |
|-------------------------|--------|--------------|---------------------|---------------------------------------------------------------------------------------------|
| **button.backward**     | 42     | 1            | 1                   | Estado del botón de retroceso (0 = no presionado, 1 = presionado).                           |
| **button.left**         | 43     | 1            | 1                   | Estado del botón izquierdo.                                                                 |
| **button.center**       | 44     | 1            | 1                   | Estado del botón central.                                                                   |
| **button.forward**      | 45     | 1            | 1                   | Estado del botón de avance.                                                                 |
| **button.right**        | 46     | 1            | 1                   | Estado del botón derecho.                                                                   |
| **mic.intensity**       | 121    | 1            | 20                  | Intensidad del micrófono. Se considera un cambio relevante solo si varía en 20 o más unidades.  |
| **prox.horizontal**     | 57     | 7            | 100                 | Valores de sensores horizontales de proximidad (7 valores consecutivos).                      |
| **prox.ground.delta**   | 84     | 2            | 100                 | Diferencia en la lectura de sensores del suelo.                                             |
| **prox.ground.reflected** | 82   | 2            | 100                 | Valor reflejado de los sensores del suelo.                                                  |
| **motor.left.target**   | 86     | 1            | 1                   | Valor objetivo para el motor izquierdo.                                                     |
| **motor.right.target**  | 87     | 1            | 1                   | Valor objetivo para el motor derecho.                                                       |
| **motor.left.speed**    | 92     | 1            | 20                  | Velocidad actual del motor izquierdo; se detecta cambio si varía en 20 o más.                 |
| **motor.right.speed**   | 93     | 1            | 20                  | Velocidad actual del motor derecho; se detecta cambio si varía en 20 o más.                   |
| **motor.left.pwm**      | 94     | 1            | 1                   | Valor PWM aplicado al motor izquierdo.                                                      |
| **motor.right.pwm**     | 95     | 1            | 1                   | Valor PWM aplicado al motor derecho.                                                        |
| **leds.circle**         | 110    | 8            | 1                   | Estado de los LED circulares; se transmiten 8 valores consecutivos.                           |
| **leds.top**            | 101    | 3            | 1                   | Estado de los LED superiores.                                                               |
| **leds.bottom.left**    | 104    | 3            | 1                   | Estado de los LED inferiores izquierdos.                                                    |
| **leds.bottom.right**   | 107    | 3            | 1                   | Estado de los LED inferiores derechos.                                                      |



---

### Cómo se Utilizan Estas Variables

1. **Actualización Parcial del Bloque de Variables:**  
   El robot envía mensajes que actualizan solo una parte del bloque completo de variables.  
   - El **offset** indica dónde comienzan los nuevos datos en el bloque.  
   - El **size** de cada variable permite interpretar correctamente cuántos bytes se deben leer para cada valor.

2. **Fusión de Datos:**  
   La aplicación mantiene una copia del bloque completo de variables. Cuando llega una actualización, se reemplazan los valores a partir del offset indicado por los nuevos datos, manteniendo el resto sin cambios.

3. **Detección de Cambios Significativos:**  
   Para cada variable de interés, se compara el valor anterior con el nuevo:
   - Si la diferencia es igual o superior al **interestOfVariation**, se considera que ha ocurrido un cambio relevante.  
   - Esto es especialmente útil para los botones (donde cualquier cambio es relevante) y para sensores como el micrófono o la proximidad (donde se pueden ignorar pequeñas fluctuaciones).

4. **Emisión de Eventos:**  
   Cuando se detecta un cambio significativo en una variable, se puede emitir un evento.  
   - Por ejemplo, si el valor de `button.left` cambia de 0 a 1, se notifica que el botón izquierdo ha sido presionado.  
   - Para el sensor de proximidad (`prox.horizontal`), si alguno de los 7 valores cambia significativamente, se puede activar una respuesta para evitar colisiones.

---

### Ejemplo Práctico

**Supongamos el siguiente escenario:**

- El valor actual de `mic.intensity` es 30.
- Se recibe una actualización que cambia `mic.intensity` a 45.
- La diferencia es 15, lo cual es menor que el umbral de 20 definido.
  
**Resultado:**  
No se considera un cambio significativo y no se emite un evento.

**Otro escenario:**

- El valor actual de `button.center` es 0.
- Se recibe una actualización que cambia `button.center` a 1.
- La diferencia es 1, lo que coincide con el umbral (1).
  
**Resultado:**  
Se considera un cambio y se notifica que el botón central ha sido activado.

#### Comandos:
- **Definición y mapeo:**  
  El protocolo define un conjunto de comandos que el host puede enviar para controlar el robot. Cada comando tiene:
  - **Un identificador único:** Por ejemplo, **ID_RESET**, **ID_RUN**, **ID_PAUSE**, etc.
  - **Un formato de payload específico:** Cada comando requiere determinados parámetros (por ejemplo, el nodo objetivo, offsets, valores a establecer).
- **Construcción del payload:**  
  Cada comando dispone de una función que, dada cierta entrada (parámetros), construye un array de números que representa el payload. Este array se convierte a binario durante el proceso de codificación.
- **Ejemplos de comandos:**  
  - **LIST_NODES:** Escanea y lista los robots conectados.
  - **GET_DEVICE_INFO:** Solicita información sobre el dispositivo (nombre, UUID, configuraciones RF).
  - **GET_NODE_DESCRIPTION:** Pide la descripción completa del robot.
  - **GET_VARIABLES / SET_VARIABLES:** Permiten obtener o modificar el bloque de variables.
  - **RESET, RUN, PAUSE, STEP, STOP:** Controlan el estado de ejecución del robot.

#### Payloads:
- **Formato variable:**  
  El contenido del payload varía según el tipo de mensaje:
  - **Para mensajes de descripción:**  
    El payload contiene cadenas y números que describen las capacidades y configuraciones del robot.
  - **Para mensajes de estado y variables:**  
    El payload es un bloque de datos numéricos que reflejan el estado interno del robot.
  - **Para comandos:**  
    El payload incluye los parámetros necesarios para ejecutar la acción deseada (por ejemplo, el ID del nodo, offsets y valores para actualizar variables).
  - **Para eventos locales:**  
    El payload contiene los datos específicos que acompañan a un evento (por ejemplo, el nuevo estado de un botón o el valor actualizado de un sensor).
