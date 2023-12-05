/// costos totales, utilidad y rentabilidad OK

var cabeceras = [];
var sumas = [];

function solicitarCabeceras() {
    cabeceras = [];

    for (var i = 1; i <= parseInt(document.getElementById("cantidadColumnas").value); i++) {
        var nombreCabecera = prompt("Ingrese el nombre de la cabecera " + i);
        cabeceras.push(nombreCabecera || "Cabecera" + i);
    }
}

function generarTabla() {
    sumas = [];

    var cantidadColumnas = parseInt(document.getElementById("cantidadColumnas").value);
    sumas = Array(cantidadColumnas).fill(0);

    var filas = 6;
    var nombresNuevasColumnas = ["Variables", "Ingreso por Ventas", "Costos Fijos", "Costos Variables", "Costos Administrativos", "Costos Comerciales"];

    var tabla = '<table><thead><tr>';
    tabla += '<th>' + nombresNuevasColumnas[0] + '</th>';

    for (var i = 0; i < cantidadColumnas; i++) {
        tabla += '<th>' + cabeceras[i] + '</th>';
    }

    tabla += '</tr></thead><tbody>';

    for (var i = 1; i < filas; i++) {
        tabla += '<tr>';
        tabla += '<td>' + nombresNuevasColumnas[i] + '</td>';

        for (var j = 0; j < cantidadColumnas; j++) {
            tabla += '<td><input type="number" id="' + i + '_' + j + '" placeholder="Ingrese dato" oninput="calcularSumas(' + i + ',' + j + ', this.value); calcularUtilidades(); calcularRentabilidad(' + j + ');"></td>';
        }
        tabla += '</tr>';
    }

    tabla += '</tbody></table>';

    document.getElementById("tablaContainer").innerHTML = tabla;
    totalPrimerosIngresosVentas = 0;
    for (var i = 0; i < cantidadColumnas; i++) {
        var primerInputCabecera = parseFloat(document.querySelector('#tablaContainer tbody tr:nth-child(1) td:nth-child(' + (i + 2) + ') input').value) || 0;
        totalPrimerosIngresosVentas += primerInputCabecera;
    }
    
    var sumatoriaIngresosVentasHTML = '<div id="sumatoriaIngresosVentas">Sumatoria de Ingresos por Ventas: ' + totalPrimerosIngresosVentas + '</div>';
    document.getElementById("tablaContainer").innerHTML += sumatoriaIngresosVentasHTML;

    var resultadoHTML = '<div id="resultadoContainer"><h3>Resultados</h3><table>';
    resultadoHTML += '<tr><td>Costos Totales</td>';
    for (var i = 0; i < cantidadColumnas; i++) {
        resultadoHTML += '<td id="costoTotalColumna' + i + '">0</td>';
    }
    resultadoHTML += '</tr>';

    resultadoHTML += '<tr><td>Utilidades</td>';
    for (var i = 0; i < cantidadColumnas; i++) {
        resultadoHTML += '<td id="utilidadColumna' + i + '">0</td>';
    }
    resultadoHTML += '</tr>';

    var resultadoHTML = '<div id="resultadoContainer"><h3>Resultados</h3><table>';
    resultadoHTML += '<tr><td>Costos Totales</td>';

    for (var i = 0; i < cantidadColumnas; i++) {
        resultadoHTML += '<td id="costoTotalColumna' + i + '">0</td>';
    }

    resultadoHTML += '</tr>';
    resultadoHTML += '<tr><td>Utilidades</td>';

    for (var i = 0; i < cantidadColumnas; i++) {
        resultadoHTML += '<td id="utilidadColumna' + i + '">0</td>';
    }

    resultadoHTML += '</tr></table>';

    // Agregar sección para mostrar rentabilidad debajo de utilidades
    resultadoHTML += '<h3>Rentabilidad</h3><table>';
    resultadoHTML += '<tr><td>Rentabilidad</td>';

    for (var i = 0; i < cantidadColumnas; i++) {
        resultadoHTML += '<td id="rentabilidadColumna' + i + '">0</td>';
    }

    resultadoHTML += '</tr></table></div>';

    document.getElementById("tablaContainer").innerHTML += resultadoHTML;
}

function calcularSumas(fila, columna, valor) {
    if (fila > 1) {
        sumas[columna] += parseFloat(valor) || 0;
    }

    document.getElementById("costoTotalColumna" + columna).innerText = sumas[columna];

    calcularUtilidades();
}

function calcularUtilidades() {
    var cantidadColumnas = parseInt(document.getElementById("cantidadColumnas").value);

    if (!Number.isNaN(cantidadColumnas)) {
        for (var i = 0; i < cantidadColumnas; i++) {
            var ingresoVentasElement = document.getElementById("1_" + i);
            
            if (ingresoVentasElement) {
                var ingresoVentas = parseFloat(ingresoVentasElement.value) || 0;
                var costosTotales = sumas[i];
                var utilidad = costosTotales - ingresoVentas;

                var utilidadElement = document.getElementById("utilidadColumna" + i);
                if (utilidadElement) {
                    utilidadElement.innerText = utilidad;
                }
            }
        }
    }
}

function calcularRentabilidad(cabeceraIndex) {
    var ingresoVentasElement = document.getElementById("1_" + cabeceraIndex);
    var utilidadElement = document.getElementById("utilidadColumna" + cabeceraIndex);
    var rentabilidadElement = document.getElementById("rentabilidadColumna" + cabeceraIndex);

    if (ingresoVentasElement && utilidadElement && rentabilidadElement) {
        var ingresoVentas = parseFloat(ingresoVentasElement.value) || 0;
        var utilidad = parseFloat(utilidadElement.innerText) || 0;

        // Calcular rentabilidad como un porcentaje
        var rentabilidad = (utilidad / ingresoVentas * 100) || 0;

        rentabilidadElement.innerText = rentabilidad.toFixed(2) + '%'; // Mostrar dos decimales
    }
}