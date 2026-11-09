
(function () {
    'use strict';

    angular
        .module('eduCaWebApp')
        .directive('accordion', accordion);

    function accordion() {
        return {
            restrict: 'E',
            scope: {
                items: '<'
            },
            template: `
                <div class="accordion">
                    <div class="accordion-item"
                         ng-repeat="item in items track by $index">

                        <button class="accordion-header"
                                ng-click="toggle($index)"
                                ng-class="{'active': aberto === $index}">

                            <span>{{item.titulo}}</span>
                            <span class="accordion-icon">
                                {{aberto === $index ? '−' : '+'}}
                            </span>
                        </button>

                        <div class="accordion-content"
                             ng-class="{'expanded': aberto === $index}">

                            <p>{{item.conteudo}}</p>

                        </div>

                    </div>
                </div>
            `,
            link: function (scope) {
                scope.aberto = null;

                scope.toggle = function (index) {
                    scope.aberto =
                        scope.aberto === index ? null : index;
                };
            }
        };
    }

})();
