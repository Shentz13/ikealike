<h2>Gestion des promotions</h2>

<div id="productCadre" class="cardS">
    <div class="picture"></div>
    <div id="statsCont">
        <ul id="statsList">
            <li>Category: <span id="categorySpan"></span></li>
            <li>Name: <span id="nameSpan"></span></li>
            <li>Price: <span id="priceSpan"></span> €</li>
        </ul>
    </div>
</div>

<h3>Promotion globale</h3>
<div id="tableGlob" class="cardS">
    <table id="tableAdminGlobal" class="table" style="min-width:100%;"></table>
    <button type="button" id="globalModal" class="btn btn-primary" data-toggle="modal"
        data-target="#promotionModalGlobal">Ajouter une
        promotion</button>
</div>

<h3>Promotions spécifiques à certains utilisateurs</h3>
<div id="table" class="cardS">
    <table id="tableAdmin" class="table" style="min-width:100%;"></table>
    <button type="button" id="specificModal" class="btn btn-primary" data-toggle="modal"
        data-target="#promotionModal">Ajouter une
        promotion</button>
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

                    <fieldset>
                        <legend>Promotion spécifique</legend>
                        <div class="lineForm">
                            <div class="form-group">
                                <label for="prix_normal">Prix</label>
                                <div class="input-group mb-3">
                                    <input type="number" class="form-control" name="prix_normal" aria-label=""
                                        step="0.01" readonly>
                                    <div class="input-group-append">
                                        <span class="input-group-text">€</span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="promotion">Promotion</label>
                                <div class="input-group mb-3">
                                    <input type="number" class="form-control" name="promotion" aria-label="" required>
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
                            <select name="users" id="selectUsers" class="selectpicker" multiple required>
                            </select>
                        </div>
                    </fieldset>

                    <input type="hidden" name="product_id" id="product-id">

                </div>
                <div class="modal-footer bg-dark text-light">
                    <button type="submit" id="submitSpecific" class="btn btn-primary">Enregistrer</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="promotionModalGlobal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">

            <form action="" method="POST" id="promotionFormGlobal">

                <div class="modal-header bg-dark text-light">
                    <h5 class="modal-title" id="exampleModalLabel">Ajouter une promotion</h5>
                    <button type="button" class="btn btn-secondary close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">

                    <fieldset>
                        <legend>Promotion globale</legend>
                        <div class="lineForm">
                            <div class="form-group">
                                <label for="prix_normal_global">Prix</label>
                                <div class="input-group mb-3">
                                    <input type="number" class="form-control" name="prix_normal_global" aria-label=""
                                        step="0.01" readonly>
                                    <div class="input-group-append">
                                        <span class="input-group-text">€</span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="promotion_global">Promotion</label>
                                <div class="input-group mb-3">
                                    <input type="number" class="form-control" name="promotion_global" aria-label=""
                                        required>
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

                    <input type="hidden" name="product_id" id="product-id-global">

                </div>
                <div class="modal-footer bg-dark text-light">
                    <button type="submit" id="submitGlobal" class="btn btn-primary">Enregistrer</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                </div>
            </form>
        </div>
    </div>
</div>