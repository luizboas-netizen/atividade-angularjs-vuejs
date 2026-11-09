(function () {
    'use strict';

    angular
        .module('eduCaWebApp')
        .factory('dataService', dataService);

    function dataService() {

        var alunos = [
            {
                id: 1,
                nome: 'João Silva',
                curso: 'Engenharia de Software',
                status: 'Ativo',
                progresso: 85
            },
            {
                id: 2,
                nome: 'Maria Santos',
                curso: 'Análise de Sistemas',
                status: 'Ativo',
                progresso: 65
            },
            {
                id: 3,
                nome: 'Pedro Oliveira',
                curso: 'Ciência da Computação',
                status: 'Pendente',
                progresso: 40
            },
            {
                id: 4,
                nome: 'Ana Costa',
                curso: 'Engenharia de Software',
                status: 'Ativo',
                progresso: 92
            },
            {
                id: 5,
                nome: 'Lucas Souza',
                curso: 'Análise de Sistemas',
                status: 'Ativo',
                progresso: 75
            }
        ];

        var cursos = [
            'Engenharia de Software',
            'Análise de Sistemas',
            'Ciência da Computação',
            'Banco de Dados'
        ];

        return {
            getAlunos: function () {
                return alunos;
            },

            getAluno: function () {
                return alunos[0];
            },

            getCursos: function () {
                return cursos;
            }
        };
    }

})();