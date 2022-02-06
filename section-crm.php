<h2>GESTION DES PROMOTIONS</h2>

<div class="portfolio-effect">

</div>


<!-- Modal -->
<div class="modal fade" id="promotionModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header bg-dark text-light">
                <h5 class="modal-title" id="exampleModalLabel">Ajouter une promotion</h5>
                <button type="button" class="btn btn-secondary close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div id="modalPicture"></div>
                <h2 id="modalName"></h2>
                <form action="" method="POST" id="promotionFormGlobal">
                    <fieldset>
                        <legend>Promotion globale</legend>
                        <div class="lineForm">
                            <div class="form-group">
                                <label for="prix_normal_global">Prix</label>
                                <div class="input-group mb-3">
                                    <input type="number" class="form-control" name="prix_normal_global" aria-label=""
                                        step="0.01">
                                    <div class="input-group-append">
                                        <span class="input-group-text">€</span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="promotion_global">Promotion</label>
                                <div class="input-group mb-3">
                                    <input type="number" class="form-control" name="promotion_global" aria-label="">
                                    <div class="input-group-append">
                                        <span class="input-group-text">%</span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="prix_remise_global">Prix remisé</label>
                                <div class="input-group mb-3">
                                    <input type="number" class="form-control" name="prix_remise_global" step="0.01"
                                        readonly>
                                    <div class="input-group-append">
                                        <span class="input-group-text">€</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <div class="btn-cont">
                        <button type="button" id="delete-global" class="btn btn-danger">Supprimer</button>
                        <button type="submit" class="btn btn-primary">Enregistrer</button>
                    </div>
                </form>

                <div class="alert alert-warning" role="alert">
                    Si vous souhaitez n'appliquer la promotion qu'à certains utillisateurs, merci de les
                    sélectionner ci-dessous.
                </div>

                <form action="" method="POST" id="promotionForm">
                    <fieldset>
                        <legend>Promotion spécifique</legend>
                        <div class="lineForm">
                            <div class="form-group">
                                <label for="prix_normal">Prix</label>
                                <div class="input-group mb-3">
                                    <input type="number" class="form-control" name="prix_normal" aria-label=""
                                        step="0.01">
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
                                    <input type="number" class="form-control" name="prix_remise" step="0.01" readonly>
                                    <div class="input-group-append">
                                        <span class="input-group-text">€</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group form-group-select">
                            <label for="users">Utilisateurs</label>
                            <select name="users" id="selectUsers" class="selectpicker" multiple>
                            </select>
                        </div>
                    </fieldset>
                    <div class="btn-cont">
                        <button type="button" id="delete-specific" class="btn btn-danger">Supprimer</button>
                        <button type="submit" class="btn btn-primary">Enregistrer</button>
                    </div>

                </form>
                <input type="hidden" name="product_id" id="product-id">
            </div>
            <div class="modal-footer bg-dark text-light">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
            </div>

        </div>
    </div>
</div>

<div id="table">
    <table id="tableAdmin" class="table" style="min-width:100%;"></table>
</div>