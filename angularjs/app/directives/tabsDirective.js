(function () {
    'use strict';

    angular
        .module('eduCaWebApp')
        .directive('tabs', tabs);

    function tabs() {
        return {
            restrict: 'E',

            scope: {
                items: '<'
            },

            template: `
                <div class="tabs-component">

                    <div class="tabs-header">
                        <button
                            ng-repeat="item in items track by $index"
                            ng-click="selecionarAba($index)"
                            ng-class="{'active': abaAtiva === $index}">
                            {{item.titulo}}
                        </button>
                    </div>

                    <div class="tabs-content" ng-if="items[abaAtiva]">
                        <h3>{{items[abaAtiva].titulo}}</h3>
                        <p>{{items[abaAtiva].conteudo}}</p>
                    </div>

                </div>
            `,

            link: function (scope) {

                scope.abaAtiva = 0;

                scope.selecionarAba = function (index) {
                    scope.abaAtiva = index;
                };

            }
        };
    }

})();