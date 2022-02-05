$(document).ready(function () {

    // Récupération des produits
    fetch("http://localhost:8000/api/product", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((response) => response.json()).then((products) => {
          console.log(products.data.data);
          displayContent(products.data.data);
      });

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

        $.each(users.data , function(index, user) { 

            $(select).append('<option value="'+user.id +'">'+ user.name + '</option>');

        })

        $(select).appendTo($('.form-group-select')).selectpicker('refresh');
      });


      function calculerPrix(prix, promotion) {
          return prix * (1 - promotion / 100);
      }

    $(document).on("click", ".portfolio-item__link", function () {
        openModal($(this));
    })

    function openModal(article) {

        var id = $(article).attr('data-id');
        $("#modalPicture").css("background-image", "URL('"+$(article).attr('data-img')+"')");
        $("#modalName").text($(article).attr('data-nom'));
        $('input[name="prix_normal"]').val($(article).attr('data-price'));
    }

    $(document).on("change", 'input[name="promotion"]', function() {
        var prix_normal = $(this).parents('#lineForm').find('input[name="prix_normal"]');
$('input[name="prix_remise"]').val(calculerPrix($(prix_normal).val(), $(this).val()))
    })

    const displayContent = (content) => {

        $.each(content , function(index, item) { 

            var html = `
            <div class="portfolio-item portfolio-effect__item portfolio-item--eff1" style="background-image:URL('${item.img}')">

                <div class="portfolio-item__info">

                    <h3 class="portfolio-item__header">${item.name}</h3>
                
                    <div class="portfolio-item__links">
                        
                        <div class="portfolio-item__link-block">
                        
                            <a class="portfolio-item__link" href="#" title="Ajouter une promotion" data-id="${item.id}" data-price="${item.price}" data-img="${item.img}" data-nom="${item.name}" data-toggle="modal" data-target="#promotionModal">
                                <i class="material-icons"><i class="fas fa-cog"></i></i>                            
                            </a>                       
                        </div>
                        
                    </div>

                </div>
            
            </div>
            `;

            $(".portfolio-effect").append(html);
        })

    }

    $("#promotionForm").submit(function (e) {
        e.preventDefault();
        /*
        $.ajax({

            url: 'http://localhost:8000/api/product/show',
            type: 'POST',
            contentType: "application/json",
            processData: false,
            dataType: 'json',
            error: function (xhr, status) {
                if(xhr.status != "201"){ // 201 means it is Created, rather than 200 which means Success
                    $("#statusEnrollmentMsg").text("Fail " + status);
                    console.log(error);
                }else{
                    $("#textbox").text("success");  
                }
            },
            success: function (result) {
                console.log("result:",result);
            }
        });*/
    })

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