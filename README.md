# M3S2 - Sistema de Gestión de Inventario 📦

Un sistema completo de gestión de inventario desarrollado en JavaScript que demuestra el uso de estructuras de datos avanzadas y programación modular.

## 📋 Descripción del Proyecto

Este proyecto es un **trabajo práctico académico** que implementa un sistema de gestión de inventario para una zapatería, enfocado en demostrar el dominio de:

- **Estructuras de datos JavaScript**: Maps, Sets y Objects
- **Programación modular** con separación de responsabilidades
- **Validaciones robustas** de entrada de datos
- **Interfaz interactiva** a través de la consola del navegador

## 🎯 Objetivos de Aprendizaje

### Técnicos
- Implementar y manipular estructuras de datos avanzadas en JavaScript
- Aplicar principios de programación modular
- Desarrollar sistemas de validación de datos eficientes
- Crear interfaces de usuario interactivas

### Funcionales
- Gestionar un inventario de productos de manera eficiente
- Permitir búsquedas por categoría
- Validar y prevenir datos duplicados
- Generar estadísticas del inventario

## 🛠️ Tecnologías Utilizadas

- **JavaScript ES6+**: Lógica principal y estructuras de datos
- **HTML5**: Estructura semántica de la página
- **CSS3**: Diseño moderno y responsivo
- **Console API**: Interfaz de usuario interactiva

## 📁 Estructura del Proyecto

```
M3S2/
├── 📄 index.html     # Página principal con documentación
├── 🎨 styles.css     # Estilos modernos y responsivos
├── ⚙️ app.js         # Sistema completo de gestión
└── 📖 README.md      # Este archivo
```

## 🔧 Características Técnicas

### Estructuras de Datos Implementadas

#### 1. **Map** - Categorías por Marca
```javascript
const categoriasPorMarca = new Map([
    ["Nike", "Running"],
    ["Puma", "Casual"], 
    ["New Balance", "Running"],
    ["Adidas", "Deportivo"]
]);
```
- **Propósito**: Mapeo eficiente de marcas a categorías
- **Ventaja**: Búsquedas O(1) y iteración ordenada

#### 2. **Set** - Categorías Disponibles
```javascript
const categoriasDisponibles = new Set([
    "Running", "Casual", "Deportivo", "Urbano", "Formal", "Trekking"
]);
```
- **Propósito**: Validación de categorías y prevención de duplicados
- **Ventaja**: Verificación de existencia en O(1)

#### 3. **Object** - Inventario Principal
```javascript
const inventario = {
    1: { id: 1, nombre: "Nike", precio: 250000, stock: 15, categoria: "Running" }
};
```
- **Propósito**: Almacenamiento estructurado de productos
- **Ventaja**: Acceso directo por clave y flexibilidad de propiedades

## 🚀 Funcionalidades

### 1. **Búsqueda por Categoría** 🔍
- Valida categorías usando Set
- Filtra productos por categoría específica
- Muestra marcas disponibles para cada categoría
- Manejo de casos cuando no hay resultados

### 2. **Gestión de Productos** ➕
- Formulario interactivo con validaciones en tiempo real
- Prevención de productos duplicados usando Set
- Validación de tipos de datos (ID, nombre, precio, stock)
- Actualización automática del Map de categorías

### 3. **Estadísticas del Inventario** 📊
- Cálculo de métricas usando diferentes estructuras
- Conteo por categorías con Map
- Valor total del inventario
- Distribución de productos y marcas

### 4. **Sistema de Validaciones** ✅
- Validador universal para diferentes tipos de datos
- Mensajes de error descriptivos
- Verificación en tiempo real
- Prevención de datos inconsistentes

## 🎮 Cómo Usar

### 1. **Abrir el Sistema**
```bash
# Simplemente abre index.html en tu navegador favorito
# No requiere servidor local ni instalaciones adicionales
```

### 2. **Acceder a la Consola**
- Presiona **F12** (o Ctrl+Shift+I)
- Ve a la pestaña **"Console"**
- El sistema se cargará automáticamente

### 3. **Interactuar con el Sistema**
1. **Haz clic en "Iniciar Sistema de Gestión"**
2. **Usa el menú numerado:**
   - `1` - Buscar productos por categoría
   - `2` - Agregar nuevo producto
   - `3` - Ver estadísticas completas
   - `4` - Salir del sistema

### 4. **Explorar Estructuras de Datos**
- Usa el botón **"Ver Estructuras de Datos"**
- Inspecciona en la consola los Maps, Sets y Objects
- Observa cómo interactúan entre sí

## 💡 Ejemplos de Uso

### Agregar un Producto
```javascript
// El sistema te guiará paso a paso:
// 🆔 ID del producto: 5
// 🏷️ Marca del zapato: Converse
// 💰 Precio del producto: 180000
// 📦 Stock disponible: 25
// 🏷️ Categoría: Casual
```

### Buscar por Categoría
```javascript
// Categorías disponibles: Running, Casual, Deportivo, Urbano, Formal, Trekking
// Ingrese la categoría: Running
// Resultado: Nike, New Balance (con precios y stock)
```

## 📈 Casos de Prueba Recomendados

### Pruebas Básicas
1. **Buscar categoría existente** (ej: "Running")
2. **Buscar categoría inexistente** (ej: "Basketball")
3. **Agregar producto nuevo válido**
4. **Intentar agregar producto duplicado**
5. **Ver estadísticas completas**

### Pruebas de Validación
1. **ID duplicado o inválido**
2. **Nombre vacío o muy largo**
3. **Precio negativo o no numérico**
4. **Stock negativo**
5. **Categoría no válida**

## 🎓 Aspectos Académicos Destacados

### Programación Modular
- **Módulo Utils**: Utilidades y validaciones comunes
- **Módulo GestorCategorias**: Lógica específica de búsquedas
- **Módulo GestorProductos**: Gestión completa de productos
- **Clase SistemaGestion**: Controlador principal del flujo

### Buenas Prácticas
- **Nomenclatura descriptiva** en variables y funciones
- **Comentarios JSDoc** para documentación
- **Separación de responsabilidades** por módulos
- **Validación de datos** en múltiples niveles
- **Manejo de errores** amigable al usuario

### Estructuras de Datos Avanzadas
- **Uso apropiado** de cada estructura según el contexto
- **Operaciones eficientes** aprovechando las características de cada tipo
- **Combinación inteligente** de diferentes estructuras
- **Demostración práctica** de ventajas y casos de uso

## 🔍 Análisis de Complejidad

### Operaciones Principales
- **Búsqueda en Map**: O(1) - Acceso directo por clave
- **Validación en Set**: O(1) - Verificación de existencia
- **Filtros en Arrays**: O(n) - Recorrido lineal necesario
- **Inserción en Object**: O(1) - Asignación directa

### Optimizaciones Implementadas
- Uso de Set para validaciones rápidas
- Map para relaciones clave-valor eficientes
- Validaciones tempranas para evitar procesamiento innecesario
- Reutilización de funciones auxiliares

## 📝 Notas del Desarrollador

Este proyecto demuestra un **dominio sólido** de JavaScript moderno y estructuras de datos. Cada decisión técnica está **justificada por el contexto** y optimizada para el rendimiento y la mantenibilidad.

La **arquitectura modular** permite fácil extensión y mantenimiento, mientras que las **validaciones robustas** garantizan la integridad de los datos en todo momento.

## 🤝 Contribuciones y Mejoras

### Extensiones Posibles
- Persistencia de datos con localStorage
- Interfaz gráfica completa con React/Vue
- API RESTful para operaciones CRUD
- Base de datos real (MongoDB/PostgreSQL)
- Sistema de autenticación y roles

### Funcionalidades Adicionales
- Búsqueda por precio o stock
- Sistema de alertas de stock bajo
- Reportes avanzados y gráficos
- Importación/exportación de datos
- Historial de cambios

---

*Este proyecto es parte del trabajo práctico M3S2 y representa la aplicación práctica de conceptos avanzados de programación web.*
