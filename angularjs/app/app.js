(function () {
    'use strict';

    angular
        .module('eduCaWebApp', [])
        .controller('mainController', mainController);

    function mainController() {
        var vm = this;

        vm.titulo = 'EducaWeb';
        vm.subtitulo = 'Painel Administrativo';

        vm.menuAtivo = 'dashboard';

        vm.aluno = {
            nome: 'João Silva',
            curso: 'Engenharia de Software'
        };
    }

})();