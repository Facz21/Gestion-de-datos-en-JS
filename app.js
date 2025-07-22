/**
 * M3S2 - Sistema de Gestión de Inventario
 * Trabajo Práctico: Gestión de datos con JavaScript
 * Autor: Estudiante M3S2
 * Fecha: Enero 2025
 * 
 * OBJETIVO: Demostrar el uso de estructuras de datos avanzadas (Maps, Sets, Objects)
 * y programación modular en JavaScript para la gestión de un inventario.
 * 
 * CARACTERÍSTICAS TÉCNICAS:
 * - Uso de Map para categorías por marca
 * - Uso de Set para validación de duplicados
 * - Programación modular con separación de responsabilidades
 * - Validaciones robustas de entrada de datos
 * - Interfaz de consola interactiva
 */

// ========================================
// CONFIGURACIÓN Y ESTRUCTURAS DE DATOS
// ========================================

// INVENTARIO PRINCIPAL (Object) - Estructura base para almacenamiento
const inventario = {
    1: { id: 1, nombre: "Nike", precio: 250000, stock: 15, categoria: "Running" },
    2: { id: 2, nombre: "Puma", precio: 300000, stock: 8, categoria: "Casual" },
    3: { id: 3, nombre: "New Balance", precio: 450000, stock: 12, categoria: "Running" },
    4: { id: 4, nombre: "Adidas", precio: 280000, stock: 20, categoria: "Deportivo" }
};

// MAPEO DE CATEGORÍAS (Map) - Estructura para relaciones clave-valor eficientes
const categoriasPorMarca = new Map([
    ["Nike", "Running"],
    ["Puma", "Casual"], 
    ["New Balance", "Running"],
    ["Adidas", "Deportivo"],
    ["Converse", "Casual"],
    ["Vans", "Urbano"]
]);

// CONFIGURACIÓN DEL SISTEMA
const OPCIONES_MENU = {
    BUSCAR_CATEGORIA: "1",
    AGREGAR_PRODUCTO: "2",
    MOSTRAR_ESTADISTICAS: "3",
    SALIR: "4"
};

// CATEGORÍAS DISPONIBLES (Set) - Para validación y evitar duplicados
const categoriasDisponibles = new Set([
    "Running", "Casual", "Deportivo", "Urbano", "Formal", "Trekking"
]);

// ========================================
// MÓDULO DE UTILIDADES Y VALIDACIONES
// ========================================

const Utils = {
    /**
     * Muestra el menú principal del sistema con opciones numeradas
     */
    mostrarMenuPrincipal() {
        console.log("\n" + "=".repeat(50));
        console.log("🏪 M3S2 - SISTEMA DE GESTIÓN DE INVENTARIO");
        console.log("=".repeat(50));
        console.log("1️⃣  Buscar productos por categoría");
        console.log("2️⃣  Agregar nuevo producto al inventario");
        console.log("3️⃣  Mostrar estadísticas del inventario");
        console.log("4️⃣  Salir del sistema");
        console.log("=".repeat(50));
    },

    /**
     * Obtiene un Set con los nombres únicos del inventario (evita duplicados)
     * @returns {Set<string>} Set de nombres en minúsculas
     */
    obtenerNombresExistentes() {
        return new Set(
            Object.values(inventario)
                .map(producto => producto.nombre.toLowerCase())
        );
    },

    /**
     * Muestra el inventario completo con formato profesional
     */
    mostrarInventarioCompleto() {
        console.log("\n📦 INVENTARIO ACTUALIZADO:");
        console.log("-".repeat(70));
        console.log("ID".padEnd(4) + "MARCA".padEnd(15) + "CATEGORÍA".padEnd(12) + "PRECIO".padEnd(12) + "STOCK");
        console.log("-".repeat(70));
        
        Object.entries(inventario).forEach(([id, producto]) => {
            const precio = `$${producto.precio.toLocaleString()}`;
            console.log(
                id.padEnd(4) + 
                producto.nombre.padEnd(15) + 
                producto.categoria.padEnd(12) + 
                precio.padEnd(12) + 
                producto.stock
            );
        });
        console.log("-".repeat(70));
    },

    /**
     * Validador de datos de entrada con múltiples criterios
     * @param {string} tipo - Tipo de validación requerida
     * @param {any} valor - Valor a validar
     * @returns {boolean} True si el valor es válido
     */
    validarEntrada(tipo, valor) {
        switch(tipo) {
            case 'id':
                return !isNaN(valor) && parseInt(valor) > 0 && !inventario[valor];
            case 'nombre':
                return valor && valor.trim().length > 0 && valor.length <= 20;
            case 'precio':
                return !isNaN(valor) && parseFloat(valor) > 0;
            case 'stock':
                return !isNaN(valor) && parseInt(valor) >= 0;
            case 'categoria':
                return valor && categoriasDisponibles.has(valor);
            default:
                return false;
        }
    },

    /**
     * Genera estadísticas completas del inventario usando diferentes estructuras
     */
    generarEstadisticas() {
        console.log("\n📊 ESTADÍSTICAS DEL INVENTARIO");
        console.log("=".repeat(50));
        
        // Usando Object.values para cálculos
        const productos = Object.values(inventario);
        const totalProductos = productos.length;
        const valorTotal = productos.reduce((sum, p) => sum + (p.precio * p.stock), 0);
        
        // Usando Map para contar por categoría
        const contadorCategorias = new Map();
        productos.forEach(p => {
            contadorCategorias.set(
                p.categoria, 
                (contadorCategorias.get(p.categoria) || 0) + 1
            );
        });
        
        console.log(`📈 Total de productos únicos: ${totalProductos}`);
        console.log(`💰 Valor total del inventario: $${valorTotal.toLocaleString()}`);
        console.log(`📋 Categorías registradas: ${categoriasDisponibles.size}`);
        
        console.log("\n🏷️  DISTRIBUCIÓN POR CATEGORÍAS:");
        contadorCategorias.forEach((cantidad, categoria) => {
            console.log(`   ${categoria}: ${cantidad} productos`);
        });
        
        console.log("\n🗺️  MAPEO DE MARCAS DISPONIBLES:");
        categoriasPorMarca.forEach((categoria, marca) => {
            console.log(`   ${marca} → ${categoria}`);
        });
    }
};

// ========================================
// MÓDULO DE GESTIÓN DE CATEGORÍAS
// ========================================

const GestorCategorias = {
    /**
     * Busca y muestra productos por categoría usando Map y filtros avanzados
     */
    buscarPorCategoria() {
        console.log("\n🔍 BÚSQUEDA POR CATEGORÍA");
        console.log("Categorías disponibles:", Array.from(categoriasDisponibles).join(", "));
        
        const categoriaBuscada = prompt("Ingrese la categoría a buscar: ");
        
        if (!categoriaBuscada) {
            console.log("❌ Búsqueda cancelada.");
            return;
        }
        
        // Validar categoría usando Set
        if (!categoriasDisponibles.has(categoriaBuscada)) {
            console.log(`❌ Categoría "${categoriaBuscada}" no válida.`);
            console.log("📋 Categorías disponibles:");
            categoriasDisponibles.forEach(cat => console.log(`   • ${cat}`));
            return;
        }
        
        // Filtrar productos por categoría
        const productosEncontrados = Object.values(inventario)
            .filter(producto => producto.categoria === categoriaBuscada);
        
        console.log(`\n🔎 RESULTADOS PARA "${categoriaBuscada.toUpperCase()}":`);
        console.log("-".repeat(50));
        
        if (productosEncontrados.length > 0) {
            productosEncontrados.forEach(producto => {
                console.log(`✅ ${producto.nombre} - $${producto.precio.toLocaleString()} (Stock: ${producto.stock})`);
            });
            
            // Mostrar marcas disponibles para esta categoría usando Map
            const marcasCategoria = Array.from(categoriasPorMarca.entries())
                .filter(([marca, cat]) => cat === categoriaBuscada)
                .map(([marca]) => marca);
            
            if (marcasCategoria.length > 0) {
                console.log(`\n🏷️  Otras marcas disponibles en ${categoriaBuscada}:`);
                marcasCategoria.forEach(marca => console.log(`   • ${marca}`));
            }
        } else {
            console.log(`❌ No hay productos registrados en la categoría "${categoriaBuscada}"`);
        }
    }
};

// ========================================
// MÓDULO DE GESTIÓN DE PRODUCTOS
// ========================================

const GestorProductos = {
    /**
     * Agrega un nuevo producto con validaciones robustas y uso de estructuras de datos
     */
    agregarNuevoProducto() {
        console.log("\n➕ AGREGAR NUEVO PRODUCTO AL INVENTARIO");
        console.log("-".repeat(45));
        console.log("📋 Complete los siguientes datos:");
        
        const datosProducto = this._solicitarDatosProducto();
        
        if (!datosProducto) {
            console.log("❌ Operación cancelada.");
            return;
        }
        
        // Validaciones usando Set para verificar duplicados
        if (this._validarProductoExistente(datosProducto.nombre)) {
            this._manejarProductoDuplicado(datosProducto.nombre);
        } else {
            this._registrarProducto(datosProducto);
            // Actualizar Map de categorías si es necesario
            this._actualizarMapaCategorias(datosProducto.nombre, datosProducto.categoria);
        }
    },

    /**
     * Solicita datos del producto con validaciones en tiempo real
     * @returns {Object|null} Datos del producto o null si se cancela
     */
    _solicitarDatosProducto() {
        // Validar ID
        let id;
        do {
            id = prompt("🆔 ID del producto (número entero positivo):");
            if (!id) return null;
            if (!Utils.validarEntrada('id', id)) {
                alert("❌ ID inválido. Debe ser un número positivo único.");
            }
        } while (!Utils.validarEntrada('id', id));

        // Validar nombre
        let nombre;
        do {
            nombre = prompt("🏷️  Marca del zapato (máx. 20 caracteres):");
            if (!nombre) return null;
            if (!Utils.validarEntrada('nombre', nombre)) {
                alert("❌ Nombre inválido. No puede estar vacío y máximo 20 caracteres.");
            }
        } while (!Utils.validarEntrada('nombre', nombre));

        // Validar precio
        let precio;
        do {
            precio = prompt("💰 Precio del producto (número positivo):");
            if (!precio) return null;
            if (!Utils.validarEntrada('precio', precio)) {
                alert("❌ Precio inválido. Debe ser un número positivo.");
            }
        } while (!Utils.validarEntrada('precio', precio));

        // Validar stock
        let stock;
        do {
            stock = prompt("📦 Stock disponible (número entero positivo o 0):");
            if (!stock) return null;
            if (!Utils.validarEntrada('stock', stock)) {
                alert("❌ Stock inválido. Debe ser un número entero positivo o 0.");
            }
        } while (!Utils.validarEntrada('stock', stock));

        // Mostrar categorías disponibles y validar
        let categoria;
        do {
            const categoriasStr = Array.from(categoriasDisponibles).join(", ");
            categoria = prompt(`🏷️  Categoría (${categoriasStr}):`);
            if (!categoria) return null;
            if (!Utils.validarEntrada('categoria', categoria)) {
                alert(`❌ Categoría inválida. Debe ser una de: ${categoriasStr}`);
            }
        } while (!Utils.validarEntrada('categoria', categoria));
        
        return {
            id: parseInt(id),
            nombre: nombre.trim(),
            precio: parseFloat(precio),
            stock: parseInt(stock),
            categoria: categoria
        };
    },

    /**
     * Valida si un producto ya existe usando Set para eficiencia
     * @param {string} nombreProducto 
     * @returns {boolean}
     */
    _validarProductoExistente(nombreProducto) {
        const nombresExistentes = Utils.obtenerNombresExistentes();
        return nombresExistentes.has(nombreProducto.toLowerCase());
    },

    /**
     * Maneja productos duplicados mostrando información detallada
     * @param {string} nombreProducto 
     */
    _manejarProductoDuplicado(nombreProducto) {
        console.log(`\n❌ ERROR: La marca "${nombreProducto}" ya está registrada`);
        console.log("\n📦 PRODUCTOS ÚNICOS EN INVENTARIO:");
        
        const nombresExistentes = Utils.obtenerNombresExistentes();
        Array.from(nombresExistentes).forEach(nombre => {
            const producto = Object.values(inventario)
                .find(p => p.nombre.toLowerCase() === nombre);
            console.log(`   • ${producto.nombre} (${producto.categoria}) - $${producto.precio.toLocaleString()}`);
        });
    },

    /**
     * Registra un nuevo producto en el inventario
     * @param {Object} datosProducto 
     */
    _registrarProducto(datosProducto) {
        const { id, nombre, precio, stock, categoria } = datosProducto;
        
        inventario[id] = { id, nombre, precio, stock, categoria };
        
        console.log(`\n✅ ¡Producto "${nombre}" agregado exitosamente!`);
        console.log(`📊 Detalles: ${categoria} - $${precio.toLocaleString()} (Stock: ${stock})`);
        
        Utils.mostrarInventarioCompleto();
    },

    /**
     * Actualiza el Map de categorías con nueva información
     * @param {string} marca 
     * @param {string} categoria 
     */
    _actualizarMapaCategorias(marca, categoria) {
        if (!categoriasPorMarca.has(marca)) {
            categoriasPorMarca.set(marca, categoria);
            console.log(`🗺️  Map actualizado: ${marca} → ${categoria}`);
        }
    }
};

// ========================================
// CONTROLADOR PRINCIPAL
// ========================================

class SistemaGestionZapateria {
    constructor() {
        this.activo = false; // No se inicia automáticamente
    }

    /**
     * Inicia el sistema de gestión con mensaje informativo
     */
    iniciar() {
        console.log("🚀 Iniciando M3S2 - Sistema de Gestión de Inventario...");
        console.log("📚 Demostrando uso de Maps, Sets y programación modular\n");
        this.activo = true;
        
        this._ejecutarBucleMenu();
    }

    /**
     * Ejecuta el bucle principal del menú
     */
    _ejecutarBucleMenu() {
        setTimeout(() => {
            if (this.activo) {
                Utils.mostrarMenuPrincipal();
                const opcionSeleccionada = prompt("Seleccione una opción (1, 2, 3 o 4):");
                
                if (opcionSeleccionada) {
                    this._procesarOpcion(opcionSeleccionada);
                    
                    if (this.activo) {
                        this._ejecutarBucleMenu(); // Continúa el bucle
                    }
                } else {
                    console.log("Operacion cancelada.");
                    this._salirDelSistema();
                }
            }
        }, 100);
    }

    /**
     * Procesa la opción seleccionada por el usuario con validaciones
     */
    _procesarOpcion(opcion) {
        switch (opcion) {
            case OPCIONES_MENU.BUSCAR_CATEGORIA:
                GestorCategorias.buscarPorCategoria();
                break;
                
            case OPCIONES_MENU.AGREGAR_PRODUCTO:
                GestorProductos.agregarNuevoProducto();
                break;

            case OPCIONES_MENU.MOSTRAR_ESTADISTICAS:
                Utils.generarEstadisticas();
                break;
                
            case OPCIONES_MENU.SALIR:
                this._salirDelSistema();
                break;
                
            default:
                console.log("\n⚠️  Opción no válida. Seleccione 1, 2, 3 o 4.");
        }
    }

    /**
     * Maneja la salida del sistema con resumen final
     */
    _salirDelSistema() {
        console.log("\n🔄 Cerrando sistema...");
        console.log("📊 Resumen de sesión:");
        console.log(`   • Productos en inventario: ${Object.keys(inventario).length}`);
        console.log(`   • Categorías disponibles: ${categoriasDisponibles.size}`);
        console.log(`   • Marcas mapeadas: ${categoriasPorMarca.size}`);
        console.log("\n👨‍💻 ¡Gracias por usar M3S2 - Sistema de Gestión!");
        console.log("🎓 Trabajo práctico completado exitosamente.");
        this.activo = false;
    }

    /**
     * Detiene el sistema
     */
    detener() {
        this.activo = false;
    }
}

// ========================================
// INICIALIZACIÓN DEL SISTEMA
// ========================================

// Crear instancia del sistema (no se inicia automáticamente)
let sistema = null;

// Función para iniciar desde el HTML
function iniciarSistemaZapateria() {
    if (sistema && sistema.activo) {
        console.log("El sistema ya está en funcionamiento.");
        return;
    }
    
    sistema = new SistemaGestionZapateria();
    sistema.iniciar();
}

// Función para detener el sistema
function detenerSistemaZapateria() {
    if (sistema) {
        sistema.detener();
        console.log("Sistema detenido manualmente.");
    }
}
