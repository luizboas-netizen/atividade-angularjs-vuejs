(function () {
    'use strict';

    angular
        .module('eduCaWebApp')
        .directive('toast', toast);

    function toast() {
        return {
            restrict: 'E',

            scope: {
                message: '<',
                type: '<',
                visible: '<',
                onClose: '&'
            },

            template: `
                <div class="toast-component"
                     ng-if="visible"
                     ng-class="type">

                    <div class="toast-content">
                        <strong>{{titulo}}</strong>
                        <p>{{message}}</p>
                    </div>

                    <button
                        class="toast-close"
                        ng-click="fechar()">
                        ×
                    </button>

                </div>
            `,

            link: function (scope) {

                scope.$watch('type', function (type) {

                    if (type === 'success') {
                        scope.titulo = 'Sucesso';
                    } else if (type === 'error') {
                        scope.titulo = 'Erro';
                    } else {
                        scope.titulo = 'Informação';
                    }

                });

                scope.fechar = function () {
                    scope.onClose();
                };

            }
        };
    }

})();