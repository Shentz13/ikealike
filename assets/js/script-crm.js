$(document).ready(function () {
/*
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
      });*/

/*
    function loadModal(id_produit) {
        
        fetch("http://localhost:8000/api/product/"+id_produit, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }).then((x) => x.json())
          .then((product) => {
              console.log(product.data);

              $("#modalPicture").css("background-image", "URL('"+product.data.img+"')");
              $("#modalName").text(product.data.name);
              $('input[name="prix_normal"], input[name="prix_normal_global"]').val(product.data.price);
              $("#product-id").val(product.data.id);

              if(product.data.promotion != null) {
                $('input[name="promotion_global"]').val(product.data.promotion);
                $('input[name="prix_remise_global"]').val(calculerPrix(product.data.price, product.data.promotion));
                $('input[name="promotion_global"]').attr('readonly', true);

                $("#submitGlobal").addClass("hidden");
              } else {
                $("#submitGlobal").removeClass("hidden"); 
              }
          })
    }
*/
        // Remplissage modal create/update
        $(document).on("click", ".editLink", function () {
        
            loadModal($(this).attr('data-id'));
        })

    // Calcul prix remisé
    function calculerPrix(prix, promotion) {
        return prix * (1 - promotion / 100);
    }

    $(document).on("change", 'input[name="promotion"]', function() {
        var prix_normal = $(this).parents('.lineForm').find('input[name="prix_normal"]');
        $('input[name="prix_remise"]').val(calculerPrix($(prix_normal).val(), $(this).val()))
    })

    $(document).on("change", 'input[name="promotion_global"]', function() {
        var prix_normal = $(this).parents('.lineForm').find('input[name="prix_normal_global"]');
        $('input[name="prix_remise_global"]').val(calculerPrix($(prix_normal).val(), $(this).val()))
    })

    // Create - update promotion spécifique
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

    // Create - update promotion globale
    $("#promotionFormGlobal").submit(function (e) {
        e.preventDefault();
    })

    $(document).on('click', '#delete-global', function() {

    })

    var tableAdmin = null;

    function initDatatable(table) {
        // Récupération des produits
    fetch("http://localhost:8000/api/product", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
          .then((x) => x.json())
          .then((x) => {

              const dataArray = [];
              const columnsToExclude = [
                "created_at",
                "updated_at",
              ];

              Object.entries(x.data[0]).forEach(([key, value]) => {
                if (!columnsToExclude.includes(key)) {
                  var column = {};
                  column.title = key
                    .replace("ID", "Id")
                    .replace(/([A-Z])/g, " $1")
                    .toUpperCase().replace(/_/g, " ");// => pour transformer du snake case;
                  column.data = key;
                  if(key == "users") {
                      column.title = "PROMOTIONS SPÉCIFIQUES"
                  }
                  if(key == "promotion") {
                    column.title = "PROMOTION GLOBALE"
                }
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
                } else if (key == "price") {
                    column.render = function (data) {
                        if((data != 0) && (data != null)) {
                        return (
                          data + ` €`
                        );
                    } else {
                        return '';
                    }
                      };
                    } else if (key == "promotion") {
                        column.render = function (data) {
                            if((data != 0) && (data != null)) {
                            return (
                              data + ` %`
                            );
                        } else {
                            return '';
                        }
                          };
                } else if (key == "users") {
                    column.render = function (data) {
                        var count = data.length;
                        if(data.length > 1) {
                        count = count + " différentes"
                        }
                    return(
                        count
                    )
                    }
                }
                  dataArray.push(column);
                }
              });
              // Paramètres globaux
              dataArray.push({
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
              if (tableAdmin != null) {
                tableAdmin.destroy();
                $("#tableAdmin").empty();
              }
              tableAdmin = $("#tableAdmin").DataTable({
                columns: dataArray,
                data: x.data,
                scrollX: true,
                autoWidth: false,
                order: [[0, "asc"]],
              });

          });
      }

      function convertirDate(date) {
        var monthName = [
          "Janvier",
          "Février",
          "Mars",
          "Avril",
          "Mai",
          "Juin",
          "Juillet",
          "Août",
          "Septembre",
          "Octobre",
          "Novembre",
          "Décembre",
        ];
        var dayName = [
          "Dimanche",
          "Lundi",
          "Mardi",
          "Mercredi",
          "Jeudi",
          "Vendredi",
          "Samedi",
        ];
    
        var maDate = new Date(date);
        var jour = maDate.getDay(); //Jour
        var njour = maDate.getDate(); //Numéro du jour
        var mois = maDate.getMonth(); //Mois (commence à 0, donc +1)
        var annee = maDate.getFullYear(); //Année sur 2 chiffres ou getFullYear sur 4
    
        var resultDate = njour + " " + monthName[mois] + " " + annee;
        return resultDate;
      }

      initDatatable();

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




const data_send = 
[
    {
        product_id:5,
        promotion:50,
        users: [1,2,3,4] // ou null si promotion globale
    },
    {
        product_id:4,
        promotion:35,
        users: [1,2,3,4] // ou null si promotion globale
    }
];

// si promo delete totalement
[
    {
        product_id: 5,
        users: null
    }
]

// si promo delete pour X users
[
    {
        product_id: 5,
        users: [1,2]
    }
]