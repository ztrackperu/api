<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>

<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js">

$(document).ready(function() {
    $('.js-example-basic-single').select2();
});
</script>
<script></script>

</head>
<body >
	<!-- Inicio Modal -->
	<div id="alertone" class="modal fade" role="dialog">
		<div class="modal-dialog">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h5 class="modal-title">Mensaje del Sistema</h5>
				</div>
				<div class="alert alert-warning">
					<input name="mensaje" id="mensaje" type="text" 
					style="background-color: #FAF3D1; border: 0px solid #A8A8A8;width:500px;" readonly />
					<span id="mensaje" class="label label-default"></span>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
	<!--fin modal alertas info-->
	<div class="container-fluid">
		<div class="panel panel-primary">
			<!-- Default panel contents -->
			<div class="panel-heading"><h1>Generar Reporte </h1> </div>
			<form class="form-horizontal" id="frm_inicioasig" name="frm_inicioasig" method="post" action="">
				<table class="table">
					<tr>
						
						<td width="117">Tipo de Dispositivo</td>
						<td width="176">
							<!--<input autocomplete="off" id="cotizacion" class="form-control" type="text" placeholder="Busqueda de Cotizacion Aprobada"  />-->
							<select id="cotizacion" name="cotizacion" class="form-control' onChange="cambiarcoti()">
									<option value="">SELECCIONE</option>
                                    <option value="">REEFER</option>
                                    <option value="">RIPENER</option>
                                    <option value="">GENSET</option>

							</select>
				
							<input id="ncoti" name="ncoti" type="hidden" />
							<input id="c_nomcli" name="c_nomcli" type="hidden" />
							<input id="c_codcli" name="c_codcli" type="hidden" />
							<input id="c_ruccli" name="c_ruccli" type="hidden" />
							<input id="valorcambio" name="valorcambio" type="hidden" />
						</td>
						<td width="169"></td>
					</tr>
					<tr>
						
						<td>CODIGO</td>
						<td>
                        <select id="cotizacion" name="cotizacion" class="select2 form-control input-sm" onChange="cambiarcoti()">
									<option value="">SELECCIONE</option>
                                    <option value="">REEFER</option>
                                    <option value="">RIPENER</option>
                                    <option value="">GENSET</option>

							</select>
							<input id="eir" name="eir" type="hidden" />
						</td>
					</tr>
					<tr>
						<td width="117">Graficar</td>
						<td width="176">
                        <select id="cotizacion" name="cotizacion" class="select2 form-control input-sm" onChange="cambiarcoti()">
									<option value="">SELECCIONE</option>
                                    <option value="">REEFER</option>
                                    <option value="">RIPENER</option>
                                    <option value="">GENSET</option>

							</select>
						</td>
						<td width="169">&nbsp;</td>
					</tr>
					<tr>
						<td colspan="4" align="center">
							<a class="btn btn-success" onClick="validar()">Generar Reporte</a>
						</td>
					</tr>
					<tr>
						<td colspan="4">
							<font color="#FF0000">Notas:</font><br>
							<strong>1.Si la cotizacion se encuentra facturada no se podra asignar.<br>
         2.Recuerde no tener EIR Salida Pendientes no podrá Asignar y te redireccionará a Registrar EIR Salida Pendientes.</strong>
						</td>
					</tr>
				</table>

			</form>
		</div>
	</div>

    <script>
$(document).ready(function() {
    $('.js-example-basic-single').select2();
});

    </script>

</body>
</html>

