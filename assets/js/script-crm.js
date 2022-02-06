$(document).ready(function () {

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

