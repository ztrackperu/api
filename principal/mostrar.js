function ocultar(){
  $("#g1g1").css("display","none");
  $("#tami").css("display","none");
  $("#ocultar1").css("display","none");
  $("#ocultar2").css("display","none");
  $("#ocultarG").css("display","none");
  $("#ocultarM").css("display","none");
  $("#tablaprincipalM").css("display","none");
  $("#tablaprincipalG").css("display","none");
  $("#tablaprincipalR").css("display","none");
}
//CAMBIOS EN REEFER
function ocultarR(){ocultar(); $("#tablaprincipalR").css("display","block");}
function mostrarRefer(){ocultarR(); $('#example').DataTable().column(2).search("").draw();}
function mostrarReferON(){ocultarR(); $('#example').DataTable().column(2).search("ON").draw();}
function mostrarReferWAIT(){ocultarR(); $('#example').DataTable().column(2).search("WAIT").draw();}
function mostrarReferOFF(){ocultarR(); $('#example').DataTable().column(2).search("OFF").draw();}
//CAMBIOS EN MADURADOR
function ocultarM(){ocultar(); $("#tablaprincipalM").css("display","block");}
function mostrarMadurador(){ocultarM(); $('#exampleM').DataTable().column(3).search("").draw(); }
function mostrarMaduradorON(){ocultarM(); $('#exampleM').DataTable().column(3).search("ONLINE").draw(); }
function mostrarMaduradorWAIT(){ocultarM(); $('#exampleM').DataTable().column(3).search("WAIT").draw();}
function mostrarMaduradorOFF(){ocultarM(); $('#exampleM').DataTable().column(3).search("NO SIGNAL").draw(); }
//cambios en GENSET
function ocultarG1(){ocultar(); $("#tablaprincipalG").css("display","block");}
function mostrarGenset(){ocultarG1(); $('#exampleG').DataTable().column(4).search("").draw();}
function mostrarGensetON(){ocultarG1(); $('#exampleG').DataTable().column(4).search("ON").draw();}
function mostrarGensetWAIT(){ocultarG1(); $('#exampleG') .DataTable().column(4).search("WAIT" ).draw();}
function mostrarGensetOFF(){ocultarG1(); $('#exampleG').DataTable().column(4).search("OFF").draw();}
function mostarR(){
  document.getElementById('g1g1').style.display = 'block';
  document.getElementById('tami').style.display = 'block';
  document.getElementById('ocultar1').style.display = 'block';
  document.getElementById('ocultar2').style.display = 'block';
  document.getElementById('ocultarG').style.display = 'none';
}
function mostarM(){
  document.getElementById('g1g1').style.display = 'block';
  document.getElementById('tami').style.display = 'block';
  document.getElementById('ocultar2').style.display = 'block';
  document.getElementById('ocultarM').style.display = 'block';
  document.getElementById('ocultarG').style.display = 'none';
}
function mostarG(){
  document.getElementById('g1g1').style.display = 'block';
  document.getElementById('tami').style.display = 'block';
  document.getElementById('ocultarG').style.display = 'block';
  document.getElementById('ocultar2').style.display = 'block';
  document.getElementById('ocultar1').style.display = 'none';
}


