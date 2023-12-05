function seleccionarCantidad() {
    var cantidadSeleccionada = document.getElementById("cantidadProductos").value;

    var cabeceras = [];
    for (var i = 0; i < cantidadSeleccionada; i++) {
        var nombreCabecera = prompt("Ingrese el nombre del producto " + (i + 1) + ":");
        if (!nombreCabecera) {
            alert("Por favor, ingrese un nombre para el producto " + (i + 1) + ".");
            return;
        }
        cabeceras.push(nombreCabecera);
    }

    generarTabla(7, cantidadSeleccionada, cabeceras);
}

function generarTabla(filas, columnas, cabeceras) {
    var nombresFilas = ["Ingresos por ventas", "Costos fijos", "Costos variables", "Costos administrativos", "Costos comerciales", "Costos totales", "Utilidades"];

    var contenedorTabla = document.getElementById("tablaContainer");
    var tabla = document.createElement("table");

    var filaCabecera = tabla.insertRow();
    var celdaCabeceraVariables = filaCabecera.insertCell();
    celdaCabeceraVariables.textContent = "Variables";
    for (var i = 0; i < columnas; i++) {
        var celdaCabecera = filaCabecera.insertCell();
        celdaCabecera.textContent = cabeceras[i];
    }

    for (var i = 0; i < filas; i++) {
        var fila = tabla.insertRow();
        var celdaNombreFila = fila.insertCell();
        celdaNombreFila.textContent = nombresFilas[i];

        for (var j = 0; j < columnas; j++) {
            var celda = fila.insertCell();
            celda.id = "celda_" + (i + 1) + "_" + (j + 1);

            if (i !== 5 && i !== 6) {
                var input = document.createElement("input");
                input.type = "number";
                input.min = "0";
                input.placeholder = celda.id;
                input.addEventListener("input", function () {
                    actualizarSumatorias(filas, columnas);
                    actualizarSumatoriasCostos(filas, columnas);
                    actualizarRentabilidad(filas, columnas);
                    actualizarIndiceComercial(filas, columnas);
                });
                celda.appendChild(input);
            } else {
                // Fila 6 y 7 no son inputs
                celda.textContent = "N/A";
            }
        }
    }

    // Agregar una nueva fila para mostrar la rentabilidad
    var filaRentabilidad = tabla.insertRow();
    var celdaRentabilidad = filaRentabilidad.insertCell();
    celdaRentabilidad.textContent = "Rentabilidad";

    for (var j = 0; j < columnas; j++) {
        var celda = filaRentabilidad.insertCell();
        celda.id = "celda_rentabilidad_" + (j + 1);
        celda.textContent = "N/A";
    }

    // Agregar una nueva fila para mostrar el índice comercial
    var filaIndiceComercial = tabla.insertRow();
    var celdaIndiceComercial = filaIndiceComercial.insertCell();
    celdaIndiceComercial.textContent = "Índice Comercial";

    for (var j = 0; j < columnas; j++) {
        var celda = filaIndiceComercial.insertCell();
        celda.id = "celda_indice_comercial_" + (j + 1);
        celda.textContent = "N/A";
    }

    // Agregar una nueva fila para mostrar el Cont.Utilidad
    var filaContUtilidad = tabla.insertRow();
    var celdaContUtilidad = filaContUtilidad.insertCell();
    celdaContUtilidad.textContent = "Cont.Utilidad";

    for (var j = 0; j < columnas; j++) {
        var celda = filaContUtilidad.insertCell();
        celda.id = "celda_cont_utilidad_" + (j + 1);
        celda.textContent = "N/A";
    }

    contenedorTabla.innerHTML = '';
    contenedorTabla.appendChild(tabla);

    function actualizarSumatorias(numFilas, numColumnas) {
        for (var j = 0; j < numColumnas; j++) {
            var suma = 0;
            for (var i = 2; i <= numFilas - 2; i++) {
                var valor = parseFloat(document.getElementById("celda_" + i + "_" + (j + 1)).getElementsByTagName("input")[0].value) || 0;
                suma += valor;
            }
            var ingresosPorVentas = parseFloat(document.getElementById("celda_1_" + (j + 1)).getElementsByTagName("input")[0].value) || 0;
            document.getElementById("celda_7_" + (j + 1)).textContent = ingresosPorVentas - suma;
        }
    }

    function actualizarSumatoriasCostos(numFilas, numColumnas) {
        for (var j = 0; j < numColumnas; j++) {
            var suma = 0;
            for (var i = 2; i <= numFilas - 2; i++) {
                var valor = parseFloat(document.getElementById("celda_" + i + "_" + (j + 1)).getElementsByTagName("input")[0].value) || 0;
                suma += valor;
            }
            document.getElementById("celda_6_" + (j + 1)).textContent = suma;
        }
    }

    function rentabilidad(numColumnas) {
        for (var j = 0; j < numColumnas; j++) {
            var utilidadNeta = parseFloat(document.getElementById("celda_7_" + (j + 1)).textContent) || 0;
            var ingresosPorVentas = parseFloat(document.getElementById("celda_1_" + (j + 1)).getElementsByTagName("input")[0].value) || 0;

            if (ingresosPorVentas !== 0) {
                var porcentajeRentabilidad = (utilidadNeta / ingresosPorVentas) * 100; // Multiplicado por 100
                document.getElementById("celda_rentabilidad_" + (j + 1)).textContent = porcentajeRentabilidad.toFixed(2) + "%";
            } else {
                document.getElementById("celda_rentabilidad_" + (j + 1)).textContent = "N/A";
            }
        }
    }

    function calcularIndiceComercial(numFilas, numColumnas) {
        for (var j = 0; j < numColumnas; j++) {
            var indiceComercial = parseFloat(document.getElementById("celda_1_" + (j + 1)).getElementsByTagName("input")[0].value) || 0;

            var sumaIngresosPorVentas = 0;
            for (var i = 0; i < numColumnas; i++) {
                sumaIngresosPorVentas += parseFloat(document.getElementById("celda_1_" + (i + 1)).getElementsByTagName("input")[0].value) || 0;
            }

            if (sumaIngresosPorVentas !== 0) {
                var resultadoIndice = (indiceComercial / sumaIngresosPorVentas) * 100;
                document.getElementById("celda_indice_comercial_" + (j + 1)).textContent = resultadoIndice.toFixed(2) + "%";
            } else {
                document.getElementById("celda_indice_comercial_" + (j + 1)).textContent = "N/A";
            }
        }
    }

    function contUtilidad(numColumnas) {
        for (var j = 0; j < numColumnas; j++) {
            var ingresosPorVentas = parseFloat(document.getElementById("celda_1_" + (j + 1)).getElementsByTagName("input")[0].value) || 0;
            var costosVariables = parseFloat(document.getElementById("celda_3_" + (j + 1)).getElementsByTagName("input")[0].value) || 0;
    
            if (ingresosPorVentas !== 0) {
                var contUtilidad = ((ingresosPorVentas - costosVariables) / ingresosPorVentas) * 100; // Multiplicado por 100
                document.getElementById("celda_cont_utilidad_" + (j + 1)).textContent = contUtilidad.toFixed(2) + "%";
            } else {
                document.getElementById("celda_cont_utilidad_" + (j + 1)).textContent = "N/A";
            }
        }
    }

    function actualizarRentabilidad(numFilas, numColumnas) {
        actualizarSumatorias(numFilas, numColumnas);
        actualizarSumatoriasCostos(numFilas, numColumnas);
        rentabilidad(numColumnas);
        calcularIndiceComercial(numFilas, numColumnas);
        contUtilidad(numColumnas); // Agregar la llamada a la función contUtilidad
    }
}
