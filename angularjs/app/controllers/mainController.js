
(function () {
    'use strict';

    angular
        .module('eduCaWebApp')
        .controller('MainController', MainController);

    MainController.$inject = ['dataService', '$timeout'];

    function MainController(dataService, $timeout) {
        var vm = this;

        vm.titulo = 'EducaWeb';
        vm.subtitulo = 'Painel Administrativo';

        vm.menuAtivo = 'dashboard';

        vm.aluno = dataService.getAluno();
        vm.alunos = dataService.getAlunos();
        vm.cursos = dataService.getCursos();

        vm.pesquisa = '';

        vm.paginaAtual = 1;
        vm.itensPorPagina = 3;
        vm.totalPaginas = Math.ceil(
            vm.alunos.length / vm.itensPorPagina
        );

        vm.alunosPagina = function () {
            var inicio = (vm.paginaAtual - 1) * vm.itensPorPagina;

            return vm.alunos.slice(
                inicio,
                inicio + vm.itensPorPagina
            );
        };

        vm.mudarPagina = function (pagina) {
            if (pagina >= 1 && pagina <= vm.totalPaginas) {
                vm.paginaAtual = pagina;
            }
        };

        vm.progressoGeral = 85;

        vm.accordionItems = [
            {
                titulo: 'Como cadastrar um aluno?',
                conteudo: 'Acesse a área de alunos e utilize a opção de cadastro para adicionar um novo estudante.'
            },
            {
                titulo: 'Como acompanhar o progresso?',
                conteudo: 'O progresso pode ser acompanhado pelo painel administrativo, utilizando os indicadores disponíveis.'
            },
            {
                titulo: 'Como consultar os cursos?',
                conteudo: 'Acesse a seção de cursos para visualizar os cursos disponíveis na plataforma.'
            }
        ];

        vm.tabsItems = [
            {
                titulo: 'Visão geral',
                conteudo: 'Acompanhe os principais indicadores e informações do ambiente administrativo.'
            },
            {
                titulo: 'Alunos',
                conteudo: 'Consulte os alunos cadastrados e acompanhe suas informações.'
            },
            {
                titulo: 'Cursos',
                conteudo: 'Visualize os cursos disponíveis e suas respectivas informações.'
            }
        ];

        vm.dropdownOptions = [
            'Todos os cursos',
            'Engenharia de Software',
            'Análise de Sistemas',
            'Ciência da Computação'
        ];

        vm.opcaoSelecionada = 'Todos os cursos';

        vm.selecionarOpcao = function (opcao) {
            vm.opcaoSelecionada = opcao;

            vm.mostrarToast(
                'success',
                'Filtro selecionado: ' + opcao
            );
        };

        vm.toast = {
            visible: false,
            type: 'info',
            message: ''
        };

        var toastTimer;

        vm.mostrarToast = function (tipo, mensagem) {
            if (toastTimer) {
                $timeout.cancel(toastTimer);
            }

            vm.toast.type = tipo;
            vm.toast.message = mensagem;
            vm.toast.visible = true;

            toastTimer = $timeout(function () {
                vm.toast.visible = false;
            }, 3500);
        };

        vm.fecharToast = function () {
            if (toastTimer) {
                $timeout.cancel(toastTimer);
            }

            vm.toast.visible = false;
        };

        vm.alterarMenu = function (menu) {
            vm.menuAtivo = menu;
        };
    }

})();
