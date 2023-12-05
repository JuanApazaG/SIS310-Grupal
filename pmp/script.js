function generarTablas() {
    // Obtener el valor seleccionado en el dropdown
    var cantidadMaquinarias = parseInt(document.getElementById("maquinarias").value);
    var cantidadMeses = parseInt(document.getElementById("meses").value);

    // Crear la tabla de maquinarias
    var maquinariasTable = "<table border='1'>";
    // Agregar la cabecera
    maquinariasTable += "<tr><th>Capacidad</th>";
    for (var j = 1; j <= cantidadMaquinarias; j++) {
        maquinariasTable += "<th>Maquinaria " + j + "</th>";
    }
    maquinariasTable += "</tr>";

    // Agregar las filas
    for (var i = 1; i <= 2; i++) {
        maquinariasTable += "<tr>";
        if(i==1){
            // Agregar la capacidad en la primera columna
            maquinariasTable += "<td>Unidades/día</td>";
        }
        else{
            // Agregar la capacidad en la primera columna
            maquinariasTable += "<td>Costo/Unidad</td>";
        }

        // Agregar las celdas para las maquinarias
        for (var j = 1; j <= cantidadMaquinarias; j++) {
            if (i === 1) {
                // Agregar input para Unidades maquinaria con placeholder
                maquinariasTable += "<td><input type='number' id='unidadesMaquinaria" + j + "' placeholder='Unidades'></td>";
            } else {
                // Agregar input para Costo maquinaria con placeholder
                maquinariasTable += "<td><input type='number' id='costoMaquinaria" + j + "' placeholder='Costo'></td>";
            }
        }

        maquinariasTable += "</tr>";
    }
    maquinariasTable += "</table>";

    // Crear la tabla de meses
    var mesesTable = "<table border='1'>";
    // Agregar la cabecera
    mesesTable += "<tr><th>Mes</th><th>Días Laborales</th><th>Demanda</th></tr>";

    // Nombres de los meses
    var nombresMeses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];

    // Agregar las filas para los meses
    for (var i = 1; i <= cantidadMeses; i++) {
        mesesTable += "<tr>";
        mesesTable += "<td>" + nombresMeses[i - 1] + "</td>";
        mesesTable += "<td><input type='number' id='diasLaboralesMes" + i + "' placeholder='Días Laborales'></td>"; // Cambiado a "Días Laborales"
        mesesTable += "<td><input type='number' id='demandaMes" + i + "' placeholder='Demanda'></td>"; // Cambiado a "Demanda"
        mesesTable += "</tr>";
    }
    mesesTable += "</table>";

    // Mostrar las tablas generadas
    document.getElementById("generatedMaquinariasTable").innerHTML = maquinariasTable;
    document.getElementById("generatedMesesTable").innerHTML = mesesTable;

    var stockMedioButton = "<button onclick='generarTablaMultiplicada()'>Calcular Stock Medio</button>";
    document.getElementById("stockMedioButtonContainer").innerHTML = stockMedioButton;

    // Bloquear los inputs de meses y maquinarias
    document.getElementById("meses").disabled = true;
    document.getElementById("maquinarias").disabled = true;
}



function generarTablaMultiplicada() {
    // Obtener la cantidad de maquinarias y meses
    var cantidadMaquinarias = parseInt(document.getElementById("maquinarias").value);
    var cantidadMeses = parseInt(document.getElementById("meses").value);

    // Nombres de los meses
    var nombresMeses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];

    // Crear la tabla multiplicada
    var tablaMultiplicada = "<table border='1'>";

    // Agregar la cabecera con "Capacidad Mensual" sobre todas las maquinarias
    tablaMultiplicada += "<tr><th></th><th colspan='" + cantidadMaquinarias + "'>Capacidad Mensual</th><th>Capacidad Total</th><th>Media * Días Laborales</th></tr>";
    // Agregar la cabecera con "Mes" y "Maquinaria 1", "Maquinaria 2", etc.
    tablaMultiplicada += "<tr><th>Mes</th>";
    for (var j = 1; j <= cantidadMaquinarias; j++) {
        tablaMultiplicada += "<th>Maquinaria " + j + "</th>";
    }
    tablaMultiplicada += "<th>Capacidad Total</th><th>Media * Días Laborales</th></tr>";

    // Calcular y agregar los datos multiplicados
    // Obtener la cantidad de maquinarias y meses
    var cantidadMeses = parseInt(document.getElementById("meses").value);

    // Inicializar variables para la sumatoria de días laborales y demanda
    var sumatoriaDiasLaborales = 0;
    var sumatoriaDemanda = 0;

    // Calcular la sumatoria de días laborales y demanda
    for (var i = 1; i <= cantidadMeses; i++) {
        // Obtener los valores de Días Laborales y Demanda
        var diasLaboralesMesElement = document.getElementById("diasLaboralesMes" + i);
        var demandaMesElement = document.getElementById("demandaMes" + i);

        var diasLaboralesMes = diasLaboralesMesElement ? parseFloat(diasLaboralesMesElement.value) || 0 : 0;
        var demandaMes = demandaMesElement ? parseFloat(demandaMesElement.value) || 0 : 0;

        // Sumar a las sumatorias
        sumatoriaDiasLaborales += diasLaboralesMes;
        sumatoriaDemanda += demandaMes;
    }

    // Calcular la media
    var media = Math.round(sumatoriaDemanda / sumatoriaDiasLaborales);

    // Mostrar la media en un alert
    alert("La media es: " + media);

    for (var i = 1; i <= cantidadMeses; i++) {
        tablaMultiplicada += "<tr>";
        tablaMultiplicada += "<td>" + nombresMeses[i - 1] + "</td>";

        // Inicializar la capacidad total para el mes actual
        var capacidadTotalMes = 0;

        for (var j = 1; j <= cantidadMaquinarias; j++) {
            // Obtener los valores de Unidades/día y Días Laborales
            var unidadesMaquinariaElement = document.getElementById("unidadesMaquinaria" + j);
            var diasLaboralesMesElement = document.getElementById("diasLaboralesMes" + i);

            var unidadesMaquinaria = unidadesMaquinariaElement ? parseFloat(unidadesMaquinariaElement.value) || 0 : 0;
            var diasLaboralesMes = diasLaboralesMesElement ? parseFloat(diasLaboralesMesElement.value) || 0 : 0;

            // Calcular la multiplicación y agregar la celda a la tabla
            var resultadoMultiplicacion = unidadesMaquinaria * diasLaboralesMes;
            tablaMultiplicada += "<td>" + resultadoMultiplicacion + "</td>";

            // Acumular la capacidad total para el mes actual
            capacidadTotalMes += resultadoMultiplicacion;
        }

        // Agregar la celda con la capacidad total para el mes actual
        tablaMultiplicada += "<td>" + capacidadTotalMes + "</td>";

        // Calcular la multiplicación por la media y agregar la celda a la tabla
        var diasLaboralesMesElement = document.getElementById("diasLaboralesMes" + i);
        var diasLaboralesMes = diasLaboralesMesElement ? parseFloat(diasLaboralesMesElement.value) || 0 : 0;
        var resultadoMultiplicacionMedia = media * diasLaboralesMes;
        tablaMultiplicada += "<td>" + resultadoMultiplicacionMedia + "</td>";

        tablaMultiplicada += "</tr>";
    }
    tablaMultiplicada += "</table>";

    // Mostrar la tabla en algún contenedor HTML, por ejemplo, con el id "resultadoTabla"
    document.getElementById("generatedTablaMultiplicada").innerHTML = tablaMultiplicada;
}
