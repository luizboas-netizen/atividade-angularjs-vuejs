(function () {
    'use strict';

    angular
        .module('eduCaWebApp')
        .directive('progressBar', progressBar);

    function progressBar() {
        return {
            restrict: 'E',

            scope: {
                value: '<'
            },

            template: `
                <div class="progress-component">
                    <div class="progress-info">
                        <span>Progresso</span>
                        <strong>{{percentual}}%</strong>
                    </div>

                    <div class="progress-track">
                        <div class="progress-fill"
                             ng-style="{width: percentual + '%'}">
                        </div>
                    </div>
                </div>
            `,

            link: function (scope) {

                scope.$watch('value', function (value) {
                    var numero = Number(value) || 0;

                    scope.percentual = Math.min(
                        100,
                        Math.max(0, numero)
                    );
                });

            }
        };
    }

})();