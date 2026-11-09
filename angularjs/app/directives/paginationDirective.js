
(function () {
    'use strict';

    angular
        .module('eduCaWebApp')
        .directive('pagination', pagination);

    function pagination() {
        return {
            restrict: 'E',
            scope: {
                totalPages: '<',
                currentPage: '<',
                onPageChange: '&'
            },
            template: `
                <div class="pagination">
                    <button
                        ng-click="changePage(currentPage - 1)"
                        ng-disabled="currentPage <= 1">
                        Anterior
                    </button>

                    <button
                        ng-repeat="page in pages track by $index"
                        ng-click="changePage(page)"
                        ng-class="{'active': currentPage === page}">
                        {{page}}
                    </button>

                    <button
                        ng-click="changePage(currentPage + 1)"
                        ng-disabled="currentPage >= totalPages">
                        Próxima
                    </button>
                </div>
            `,
            link: function (scope) {

                function updatePages() {
                    scope.pages = [];

                    for (var i = 1; i <= scope.totalPages; i++) {
                        scope.pages.push(i);
                    }
                }

                scope.changePage = function (page) {
                    if (page >= 1 && page <= scope.totalPages) {
                        scope.onPageChange({ page: page });
                    }
                };

                scope.$watch('totalPages', updatePages);
            }
        };
    }

})();
