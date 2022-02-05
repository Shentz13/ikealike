<h2>GESTION DES PROMOTIONS</h2>

<div class="portfolio-effect">

</div>


<!-- Modal -->
<div class="modal fade" id="promotionModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form action="" method="POST" id="promotionForm">
                <div class="modal-header bg-dark text-light">
                    <h5 class="modal-title" id="exampleModalLabel">Ajouter une promotion</h5>
                    <button type="button" class="btn btn-secondary close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="modalPicture"></div>
                    <h2 id="modalName"></h2>
                    <div id="lineForm">
                        <div class="form-group">
                            <label for="prix_normal">Prix</label>
                            <div class="input-group mb-3">
                                <input type="number" class="form-control" name="prix_normal" aria-label="">
                                <div class="input-group-append">
                                    <span class="input-group-text">€</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="promotion">Promotion</label>
                            <div class="input-group mb-3">
                                <input type="number" class="form-control" name="promotion" aria-label="">
                                <div class="input-group-append">
                                    <span class="input-group-text">%</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="prix_remise">Prix remisé</label>
                            <div class="input-group mb-3">
                                <input type="number" class="form-control" name="prix_remise" aria-label="">
                                <div class="input-group-append">
                                    <span class="input-group-text">€</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="alert alert-warning" role="alert">
                        Si vous souhaitez n'appliquer la promotion qu'à certains utillisateurs, merci de les
                        sélectionner ci-dessous.
                    </div>

                    <div class="form-group form-group-select">
                        <label for="users">Utilisateurs</label>
                        <select name="users" id="selectUsers" class="selectpicker" multiple>
                        </select>
                    </div>
                </div>
                <div class="modal-footer bg-dark text-light">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                    <button type="submit" class="btn btn-primary">Enregistrer</button>
                </div>
            </form>
        </div>
    </div>
</div>