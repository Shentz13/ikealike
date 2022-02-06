$(document).ready(function () {

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id_produit = urlParams.get("product");

var tableAdmin = null;
var tableAdminGlobal = null

   // Calcul prix remisé
   function calculerPrix(prix, promotion) {
    result = prix * (1 - promotion / 100);
    return Math.round(result * 100) / 100
}

function initDatatable(id_produit) {

    // Récupération des utilisateurs
    fetch("http://localhost:8080/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((response) => response.json()).then((users) => {
          console.log(users.data);
          var select = $('.selectpicker');

          // Initialisation selectpicker
        $.each(users.data , function(index, user) { 
            $(select).append('<option value="'+user.id +'">'+ user.name + '</option>');
        })

        $(select).appendTo($('.form-group-select')).selectpicker('refresh');
      });

//Promotions spécifiques
fetch("http://localhost:8000/api/product", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
          }).then((x) => x.json())
          .then((product) => {
              
              const found = product.data.find(element => element.id == id_produit);
              const normalPrice = found.price;
              const promotionGlobale = found.promotion;

              $(".picture").css("background-image", "URL('"+found.img+"')");
              $("#categorySpan").text(found.category);
              $("#nameSpan").text(found.name);
              $("#priceSpan").text(found.price);

              $('input[name="prix_normal"], input[name="prix_normal_global"]').val(normalPrice);

              const dataArray = [];
              const columnsToExclude = [
                "created_at",
                "updated_at",
                "email_verified_at",
              ];

              Object.entries(found.users[0]).forEach(([key, value]) => {
                if (!columnsToExclude.includes(key)) {
                  var column = {};
                  column.title = key
                    .replace("ID", "Id")
                    .replace(/([A-Z])/g, " $1")
                    .toUpperCase().replace(/_/g, " ");// => pour transformer du snake case;
                  column.data = key;
                  if(key == "pivot") {
                      column.title = "PROMOTION %";
                  }
                  // Paramètres spécifiques
                  if ((key == "created_at") || (key == "updated_at")) {
                    column.render = function (data) {
                      return convertirDate(data);
                    };

                } else if (key == "pivot") {
                    column.render = function (data) {
                        return (
                          data.promotion + ` %`
                        );
                    
                      };
                }
                  dataArray.push(column);
                }
              });
              // Paramètres globaux
              dataArray.push({
                title: "NORMAL PRICE",
                orderable: false,
                render: function (data, type, row, meta) {
                  return (
                      normalPrice + ' €'
                  );
                },
              },
                {
                title: "PROMOTION PRICE",
                orderable: false,
                render: function (data, type, row, meta) {
                    var promo_price = calculerPrix(normalPrice, row.pivot.promotion) + ' €'
                  return (
                      promo_price
                  );
                },
              },
                {
                class: "action",
                title: "",
                orderable: false,
                render: function (data, type, row, meta) {
                    var dataAttributes = "";
                    Object.entries(row).forEach(([key, value]) => {
                        dataAttributes += "data-" + key.toLowerCase() + '="' + value + '" ';
                    })
                  return (
                      '<button type="button" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>'
                  );
                },
              });

              
              if (tableAdmin != null) {
                tableAdmin.destroy();
                $("#tableAdmin").empty();
              }
              tableAdmin = $("#tableAdmin").DataTable({
                columns: dataArray,
                data: found.users,
                scrollX: true,
                autoWidth: false,
                order: [[0, "asc"]],
              });

        // Promotions globales
        if(promotionGlobale) {

            const dataArrayGlobal = [];
            const columnsToExcludeGlobal = [
              "created_at",
              "updated_at",
              "users",
              "img",
              "category"
            ];

            console.log(found);

            Object.entries(found).forEach(([key, value]) => {
                if (!columnsToExcludeGlobal.includes(key)) {
                  var column = {};
                  column.title = key
                    .replace("ID", "Id")
                    .replace(/([A-Z])/g, " $1")
                    .toUpperCase().replace(/_/g, " ");// => pour transformer du snake case;
                  column.data = key;
                  // Paramètres spécifiques
                  if ((key == "created_at") || (key == "updated_at")) {
                    column.render = function (data) {
                      return convertirDate(data);
                    };
                  } else if (key == "img") {
                    column.render = function (data) {
                      return (
                        `<div class="picture" style="background-image:URL('` +
                        data +
                        `');"></div>`
                      );
                    };
                } else if ((key == "price")||(key == "promotion")) {
                    column.render = function (data) {
                        if((data != 0) && (data != null)) {
                        return (
                          data + ` €`
                        );
                    } else {
                        return '';
                    }
                      };
                }
                  dataArrayGlobal.push(column);
                }
              });
              // Paramètres globaux
              dataArrayGlobal.push({
                class: "action",
                title: "ACTIONS",
                orderable: false,
                render: function (data, type, row, meta) {
                    var dataAttributes = "";
                    Object.entries(row).forEach(([key, value]) => {
                        dataAttributes += "data-" + key.toLowerCase() + '="' + value + '" ';
                    })
                  return (
                      '<a href="promotion-admin.php?product='+row.id+'"><i class="far fa-edit"></i></a>'
                      /*
                    '<div class="btn btn-outline-blue editLink mr-3" data-id="' +
                    row.id +
                    '"' +
                    dataAttributes +
                    ' data-toggle="modal" data-target="#promotionModal"><i class="far fa-edit"></i></div>'*/
                  );
                },
              });
            if (tableAdminGlobal != null) {
                tableAdminGlobal.destroy();
                $("#tableAdminGlobal").empty();
              }
              tableAdminGlobal = $("#tableAdminGlobal").DataTable({
                columns: dataArrayGlobal,
                data: found,
                scrollX: true,
                autoWidth: false,
                order: [[0, "asc"]],
              });
        }

          });
      

          
        };

        initDatatable(id_produit);

        $(document).on("change", 'input[name="promotion"]', function() {
            var prix_normal = $(this).parents('.lineForm').find('input[name="prix_normal"]');
            $('input[name="prix_remise"]').val(calculerPrix($(prix_normal).val(), $(this).val()))
        })
          
           // Create promotion spécifique
    $("#promotionForm").submit(function (e) {
        e.preventDefault();

        var usersValues = Array.isArray($("#selectUsers").val()) ? $("#selectUsers").val() : [$("#selectUsers").val()];
        id = $("#product-id").val();

        var params = {
            product_id: id,
            promotion: $('input[name="promotion"]').val(),
            users: usersValues
        }

        fetch("http://localhost:8000/api/promotion", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(params)
          }).then((response) => loadModal(id)
          );
    })
        
      //Initialisation de dataTable avec des paramètres personnalisés
  if ($.fn.dataTable) {
    $.extend($.fn.dataTable.defaults, {
      language: {
        sEmptyTable: "Aucune donnée disponible dans le tableau",
        sInfo: "Affichage de l'élément _START_ à _END_ sur _TOTAL_ éléments",
        sInfoEmpty: "Affichage de l'élément 0 à 0 sur 0 élément",
        sInfoFiltered: "(filtré à partir de _MAX_ éléments au total)",
        sInfoPostFix: "",
        sInfoThousands: ",",
        sLengthMenu: "Afficher _MENU_ éléments",
        sLoadingRecords: "Chargement...",
        sProcessing: "Traitement...",
        sSearch: "Rechercher :",
        sZeroRecords: "Aucun élément correspondant trouvé",
        oPaginate: {
          sFirst: "Premier",
          sLast: "Dernier",
          sNext: "Suivant",
          sPrevious: "Précédent",
        },
        oAria: {
          sSortAscending: ": activer pour trier la colonne par ordre croissant",
          sSortDescending:
            ": activer pour trier la colonne par ordre décroissant",
        },
        select: {
          rows: {
            _: "%d lignes sélectionnées",
            0: "Aucune ligne sélectionnée",
            1: "1 ligne sélectionnée",
          },
        },
      },
    });
  }

})