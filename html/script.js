var documentosRef = firebase.database().ref('documentos');

    function initFirebase(){

        function carregaDocumentos(){

            documentosRef.on('value', function(data){

                headertb = isAdmin ? "<th>T?tulo</th><th>Data de Inclus?o</th><th>Categoria</th><th>Editar</th><th>Excluir</th>" : "<th>T?tulo</th><th>Data de Inclus?o</th><th>Categoria</th><th>Visualizar</th>";

                $('#tableCustom thead tr').html(headertb);


                $("#tableCustom").dataTable().fnDestroy();
                $('#tableCustom tbody').html('');

                for(var key in data.val()){

                    documento = data.val()[key]

                    if(isAdmin){
                        linha = "<tr>"+
                                    "<td>"+documento.titulo+"</td>"+
                                    "<td>"+documento.data_inicio+"</td>"+
                                    "<td>"+documento.categoria+"</td>"+
                                    "<td class='edit'><a href='documentos/"+key+"/edit'><i class='fa fa-edit'></i></a></td>"+
                                "</tr>";
                        $('#tableCustom tbody').append(linha);
                    }
                    else{

                        linha = "<tr>"+
                                    "<td>"+documento.titulo+"</td>"+
                                    "<td>"+documento.data_inicio+"</td>"+
                                    "<td>"+documento.categoria+"</td>"+
                                    "<td class='view'><a data-toggle='modal' data-target='#myModal'><i class='fa fa-eye'></i></a></td>"+
                                "</tr>";
                        $('#tableCustom tbody').append(linha);  
                        PDFObject.embed(documento.arquivo, ".modal-content");
                    }
                }

                closeLoader();

                 var table = $('#tableCustom').DataTable({
                    "aaSorting": [[ 0, "asc" ]],
                     "oLanguage": {
                        "sUrl": "/datatable_pt.txt"
                    },
                    "aoColumnDefs": [
                        { "bSortable": true, "aTargets": [ 0 ] },
                        { "bSearchable": true, "aTargets": [ 0, 1, 2 ] }
                    ]
                 });

                $("#select-categories").each( function ( i ) {
                    var select = $('<select><option value=""></option></select>')
                        .appendTo( $(this).empty() )
                        .on( 'change', function () {
                            table.column( [2] )
                                .search( $(this).val() )
                                .draw();
                        } );

                    table.column([2]).data().unique().sort().each( function ( d, j ) {
                        select.append( '<option value="'+d+'">'+d+'</option>' )
                    } );
                } );

            });

        }

        carregaDocumentos();
    }


    //home page
    