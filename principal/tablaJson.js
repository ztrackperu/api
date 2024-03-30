//Configuración de DataTable
function pintarDatatable(dataResult, columns) {
    $("#tabla_todas").DataTable({
        data: dataResult,
        columnDefs: columns,
        aaSorting: [],
        pageLength: 25
    })
}


async function datos() {
    const data = await fetch("http://100.26.213.13/ztrack/api/reefer/ver/")
        .then(value => value.json())
        .then(value => value)

    //ESTRUCTURA JSON QUE DEVUELVE EL API.
    /*
    [
        {
          "albumId": 1,
          "id": 1,
          "title": "accusamus beatae ad facilis cum similique qui sunt",
          "url": "https://via.placeholder.com/600/92c952",
          "thumbnailUrl": "https://via.placeholder.com/150/92c952"
        },
    */

    //targets: position
    //Aquí data:"key". Ver arriba
    //En "render: callback " puedes tranformar la data.

    const columns = [
        
        {
            targets: 0,
            title: "Id",
            data: "id"
        },
        {
            targets: 1,
            title: "Contenedor",
            data: "nombre_contenedor",
            //render : (data,type,r,m) => {
              //  return (type == "display") ? `<button class="btn btn-primary">${data}</button>` : data
            //}
        },
        {
            targets: 2,
            title: "Empresa",
            data: "nombre_empresa",
            //render : (data,type,r,m) => {
              //  return (type == "display") ? `<strong>${data}</strong>` : data
            //}
        },
        {
            targets: 3,
            title: "CONEXION",
            data: "ultima_fecha"
        },
        {
            targets: 4,
            title: "HUMEDAD",
            data: "relative_humidity"
        },
        {
            targets: 5,
            title: "BASURA",
            data: "NA",
            //render : (data,type,r,m) => {
              //  return (type == "display") ? `<img src="${data}"/>` : data
            //}
        }
    ]
    pintarDatatable(data, columns)
}

datos()