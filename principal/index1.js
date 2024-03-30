const grande1 = document.querySelector('#frmDatosReefer');
var zgroup = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'ZGROUP &copy; lupamape contributors'
});

var map = L.map('map',{zoom:5, center: new L.latLng([-9.04,-70]),zoomControl:false,layers:[zgroup]});
//var sidebar = L.control.sidebar('sidebar').addTo(map);


$(document).ready(function () {
    
    var table =  $('#example').DataTable({
        ajax: function (d, cb) {
            fetch('http://100.26.213.13/ztrack/api/reefer/ver/')
                .then(response => response.json())
                .then(data => cb(data));
        },
        scrollY: 200,
        scrollX: true,
        pageLength: 50,
        processing: true,

         
        columnDefs: [
            {
                searchable: false,
                orderable: false,
                targets: 0,
            },
            { data: 'NA' ,targets: 1,},
            { data: 'NA' ,targets: 2,},
            { data: 'NA' ,targets: 3,},
            { data: 'NA' ,targets: 4,},
            //array utilizado para ocultar 
            //ocultar : [1,2,3],
            //  2 COLUMNAS OCULTAS EN :State Indicators
            {
                target: 5,
                visible: false,
               
            },
            {
                target: 6,
                visible: false,
            },
            //  1 COLUMNAS OCULTAS EN :Identification
            {
                target: 9,
                visible: false,
            },
            //  2 COLUMNAS OCULTAS EN :Booking
            {
                target: 11,
                visible: false,
            },
            {
                target: 12,
                visible: false,
            },
            //5 COLUMNAS OCULTAS EN :Report Date/Time and Location
            {
                target: 17,
                visible: false,
            },
            {
                target: 18,
                visible: false,
            },
            {
                target: 19,
                visible: false,
            },
            {
                target: 20,
                visible: false,
            },
            {
                target: 24,
                visible: false,
            },
            //32 COLUMNAS OCULTAS EN :Reefer Status and Sensor Reporting
            {
                target: 27,
                visible: false,
            },
            {
                target: 30,
                visible: false,
            },
            {
                target: 32,
                visible: false,
            },
            {
                target: 40,
                visible: false,
            },
            {
                target: 41,
                visible: false,
            },
            {
                target: 42,
                visible: false,
            },
            {
                target: 43,
                visible: false,
            },
            {
                target: 44,
                visible: false,
            },
            {
                target: 45,
                visible: false,
            },
            {
                target: 46,
                visible: false,
            },
            {
                target: 47,
                visible: false,
            },
            {
                target: 48,
                visible: false,
            },
            {
                target: 49,
                visible: false,
            },
            {
                target: 50,
                visible: false,
            },
            {
                target: 51,
                visible: false,
            },
            {
                target: 52,
                visible: false,
            },
            {
                target: 53,
                visible: false,
            },
            {
                target: 54,
                visible: false,
            },
            {
                target: 55,
                visible: false,
            },
            {
                target: 60,
                visible: false,
            },
            {
                target: 62,
                visible: false,
            },
            {
                target: 63,
                visible: false,
            },
            {
                target: 64,
                visible: false,
            },
            {
                target: 65,
                visible: false,
            },
            {
                target: 66,
                visible: false,
            },
            {
                target: 67,
                visible: false,
            },
            {
                target: 73,
                visible: false,
            },
            {
                target: 74,
                visible: false,
            },
            {
                target: 75,
                visible: false,
            },
            {
                target: 76,
                visible: false,
            },
            {
                target: 77,
                visible: false,
            },
            {
                target: 78,
                visible: false,
            },
            ////15 COLUMNAS OCULTAS EN :Device Satus 
            {
                target: 80,
                visible: false,
            },
            {
                target: 81,
                visible: false,
            },
            {
                target: 82,
                visible: false,
            },
            {
                target: 83,
                visible: false,
            },
            {
                target: 84,
                visible: false,
            },
            {
                target: 88,
                visible: false,
            },
            {
                target: 89,
                visible: false,
            },
            {
                target: 90,
                visible: false,
            },
            {
                target: 91,
                visible: false,
            },
            {
                target: 92,
                visible: false,
            },
            {
                target: 93,
                visible: false,
            },
            {
                target: 94,
                visible: false,
            },
            {
                target: 95,
                visible: false,
            },
            {
                target: 98,
                visible: false,
            },
            {
                target: 99,
                visible: false,
            },
            //1 OCULTO Misc.
            {
                target: 100,
                visible: false,
            },

        ],
        order: [[1, 'asc']],


     });
     
     // para resaltar filas y columnas
     //$('#example tbody').on('mouseenter', 'td', function () {
       // var colIdx = table.cell(this).index().column;
 
        //$(table.cells().nodes()).removeClass('highlight');
        //$(table.column(colIdx).nodes()).addClass('highlight');
    //});
    // funcion que se invoca para ordenar 
    table.on('order.dt search.dt', function () {
        let i = 1;
 
        table.cells(null, 0, { search: 'applied', order: 'applied' }).every(function (cell) {
            this.data(i++);
        });
    }).draw();
    // funcion click para ocultar columnas

    $('a.toggle-vis').on('click', function (e) {
        e.preventDefault();
        // Get the column API object

        var col = table.column(5);
        var col1 = table.column(6);
        col.visible(!col.visible());
        col1.visible(!col1.visible());
    });
    $('a.toggle-vis1').on('click', function (e) {
        e.preventDefault();
 
        var col = table.column($(this).attr('data-column'));
        
        col.visible(!col.visible());
     
    });
    $('a.toggle-vis2').on('click', function (e) {
        e.preventDefault();
        const colOcultars = [11,12];
        colOcultars.forEach(function(colOcultar, index) {
            //console.log(`${index} : ${colOcultar}`);
            var col = table.column(colOcultar);
            col.visible(!col.visible());
        });
    });
    $('a.toggle-vis3').on('click', function (e) {
        e.preventDefault();
        const colOcultars = [17,18,19,20,24];
        colOcultars.forEach(function(colOcultar, index) {
            var col = table.column(colOcultar);
            col.visible(!col.visible());
        });
    });
    $('a.toggle-vis4').on('click', function (e) {
        e.preventDefault();
        const colOcultars = [27,30,32,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,60,62,63,64,65,66,67,73,74,75,76,77,78];
        colOcultars.forEach(function(colOcultar, index) {
            var col = table.column(colOcultar);
            col.visible(!col.visible());
        });
    });
    $('a.toggle-vis5').on('click', function (e) {
        e.preventDefault();
        const colOcultars = [80,81,82,83,84,88,89,90,91,92,93,94,95,98,99];
        colOcultars.forEach(function(colOcultar, index) {
            var col = table.column(colOcultar);
            col.visible(!col.visible());
        });
    });
    $('a.toggle-vis6').on('click', function (e) {
        e.preventDefault();
        const colOcultars = [100];
        colOcultars.forEach(function(colOcultar, index) {
            var col = table.column(colOcultar);
            col.visible(!col.visible());
        });
    });
   
    
});

