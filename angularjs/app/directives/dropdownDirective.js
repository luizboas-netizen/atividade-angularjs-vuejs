(function () {
    'use strict';

    angular
        .module('eduCaWebApp')
        .directive('dropdown', dropdown);

    function dropdown() {
        return {
            restrict: 'E',

            scope: {
                options: '<',
                onSelect: '&'
            },

            template: `
                <div class="dropdown-component">

                    <button
                        class="dropdown-toggle"
                        ng-click="alternarMenu()">
                        {{opcaoSelecionada || 'Selecionar opção'}}
                        <span>⌄</span>
                    </button>

                    <div class="dropdown-menu"
                         ng-if="menuAberto">

                        <button
                            ng-repeat="opcao in options track by $index"
                            ng-click="selecionarOpcao(opcao)">
                            {{opcao}}
                        </button>

                    </div>

                </div>
            `,

            link: function (scope) {

                scope.menuAberto = false;
                scope.opcaoSelecionada = '';

                scope.alternarMenu = function () {
                    scope.menuAberto = !scope.menuAberto;
                };

                scope.selecionarOpcao = function (opcao) {
                    scope.opcaoSelecionada = opcao;
                    scope.menuAberto = false;

                    scope.onSelect({
                        opcao: opcao
                    });
                };

            }
        };
    }

})();