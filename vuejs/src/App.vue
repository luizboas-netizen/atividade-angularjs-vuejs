```vue
<script>
import Accordion from './components/Accordion.vue'
import Pagination from './components/Pagination.vue'
import ProgressBar from './components/ProgressBar.vue'
import Tabs from './components/Tabs.vue'
import DropdownMenu from './components/DropdownMenu.vue'
import ToastNotification from './components/ToastNotification.vue'

export default {
  name: 'App',

  components: {
    Accordion,
    Pagination,
    ProgressBar,
    Tabs,
    DropdownMenu,
    ToastNotification
  },

  data() {
    return {
      titulo: 'EducaWeb',
      subtitulo: 'Painel Administrativo',
      menuAtivo: 'dashboard',

      alunos: [
        { id: 1, nome: 'João Silva', curso: 'Engenharia de Software', status: 'Ativo', progresso: 85 },
        { id: 2, nome: 'Maria Santos', curso: 'Análise de Sistemas', status: 'Ativo', progresso: 65 },
        { id: 3, nome: 'Pedro Oliveira', curso: 'Ciência da Computação', status: 'Pendente', progresso: 40 },
        { id: 4, nome: 'Ana Costa', curso: 'Engenharia de Software', status: 'Ativo', progresso: 92 },
        { id: 5, nome: 'Lucas Souza', curso: 'Análise de Sistemas', status: 'Ativo', progresso: 75 }
      ],

      paginaAtual: 1,
      itensPorPagina: 3,
      pesquisa: '',

      progressoGeral: 85,

      accordionItems: [
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
      ],

      tabsItems: [
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
      ],

      dropdownOptions: [
        'Todos os cursos',
        'Engenharia de Software',
        'Análise de Sistemas',
        'Ciência da Computação'
      ],

      opcaoSelecionada: 'Todos os cursos',

      toast: {
        visible: false,
        type: 'info',
        message: ''
      },

      toastTimer: null
    }
  },

  computed: {
    alunosFiltrados() {
      const pesquisa = this.pesquisa.toLowerCase()

      return this.alunos.filter(aluno =>
        aluno.nome.toLowerCase().includes(pesquisa) ||
        aluno.curso.toLowerCase().includes(pesquisa)
      )
    },

    totalPaginas() {
      return Math.max(1, Math.ceil(
        this.alunosFiltrados.length / this.itensPorPagina
      ))
    },

    alunosPagina() {
      const inicio = (this.paginaAtual - 1) * this.itensPorPagina

      return this.alunosFiltrados.slice(
        inicio,
        inicio + this.itensPorPagina
      )
    }
  },

  mounted() {
    console.log('Painel EducaWeb em Vue.js carregado.')
  },

  methods: {
    alterarMenu(menu) {
      this.menuAtivo = menu
    },

    mudarPagina(pagina) {
      if (pagina >= 1 && pagina <= this.totalPaginas) {
        this.paginaAtual = pagina
      }
    },

    selecionarOpcao(opcao) {
      this.opcaoSelecionada = opcao
      this.mostrarToast('success', 'Filtro selecionado: ' + opcao)
    },

    mostrarToast(tipo, mensagem) {
      clearTimeout(this.toastTimer)

      this.toast.type = tipo
      this.toast.message = mensagem
      this.toast.visible = true

      this.toastTimer = setTimeout(() => {
        this.toast.visible = false
      }, 3500)
    },

    fecharToast() {
      clearTimeout(this.toastTimer)
      this.toast.visible = false
    }
  },

  watch: {
    pesquisa() {
      this.paginaAtual = 1
    }
  },

  beforeUnmount() {
    clearTimeout(this.toastTimer)
  }
}
</script>

<template>
  <div class="app">
    <header class="topbar">
      <div class="logo">
        <span class="logo-icon">E</span>
        <span>EducaWeb</span>
      </div>
    </header>

    <div class="layout">
      <aside class="sidebar">
        <p class="sidebar-title">MENU PRINCIPAL</p>

        <button
          :class="{ active: menuAtivo === 'dashboard' }"
          @click="alterarMenu('dashboard')"
        >
          Dashboard
        </button>

        <button
          :class="{ active: menuAtivo === 'alunos' }"
          @click="alterarMenu('alunos')"
        >
          Alunos
        </button>

        <button
          :class="{ active: menuAtivo === 'cursos' }"
          @click="alterarMenu('cursos')"
        >
          Cursos
        </button>

        <button
          :class="{ active: menuAtivo === 'componentes' }"
          @click="alterarMenu('componentes')"
        >
          Componentes
        </button>
      </aside>

      <main class="main-content">
        <section v-if="menuAtivo === 'dashboard'">
          <div class="page-heading">
            <div>
              <h1>{{ titulo }}</h1>
              <p>{{ subtitulo }}</p>
            </div>

            <span class="status-badge">Sistema ativo</span>
          </div>

          <div class="stats-grid">
            <div class="stat-card">
              <span>Alunos cadastrados</span>
              <strong>{{ alunos.length }}</strong>
              <small>Total de registros</small>
            </div>

            <div class="stat-card">
              <span>Cursos disponíveis</span>
              <strong>4</strong>
              <small>Cursos cadastrados</small>
            </div>

            <div class="stat-card">
              <span>Progresso geral</span>
              <strong>{{ progressoGeral }}%</strong>
              <small>Meta de desempenho</small>
            </div>
          </div>

          <div class="content-card">
            <h2>Bem-vindo ao EducaWeb</h2>
            <p>
              Utilize o painel para acompanhar alunos, cursos e indicadores
              da plataforma.
            </p>

            <h3>Progresso geral</h3>
            <ProgressBar :value="progressoGeral" />
          </div>
        </section>

        <section v-if="menuAtivo === 'alunos'">
          <div class="page-heading">
            <div>
              <h1>Alunos</h1>
              <p>Gerenciamento dos alunos cadastrados.</p>
            </div>
          </div>

          <div class="content-card">
            <input
              v-model="pesquisa"
              class="search-input"
              type="text"
              placeholder="Pesquisar aluno ou curso..."
            />

            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Curso</th>
                    <th>Status</th>
                    <th>Progresso</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="aluno in alunosPagina" :key="aluno.id">
                    <td>{{ aluno.nome }}</td>
                    <td>{{ aluno.curso }}</td>
                    <td>{{ aluno.status }}</td>
                    <td>{{ aluno.progresso }}%</td>
                  </tr>

                  <tr v-if="alunosPagina.length === 0">
                    <td colspan="4">Nenhum aluno encontrado.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Pagination
              :total-pages="totalPaginas"
              :current-page="paginaAtual"
              @change-page="mudarPagina"
            />
          </div>
        </section>

        <section v-if="menuAtivo === 'cursos'">
          <div class="page-heading">
            <div>
              <h1>Cursos</h1>
              <p>Consulte os cursos disponíveis.</p>
            </div>
          </div>

          <div class="content-card">
            <div class="course-list">
              <div
                v-for="curso in dropdownOptions.slice(1)"
                :key="curso"
                class="course-item"
              >
                <span>{{ curso }}</span>
                <span class="status-badge">Disponível</span>
              </div>
            </div>
          </div>
        </section>

        <section v-if="menuAtivo === 'componentes'">
          <div class="page-heading">
            <div>
              <h1>Componentes Vue.js</h1>
              <p>Exemplos interativos dos seis componentes obrigatórios.</p>
            </div>
          </div>

          <div class="component-grid">
            <div class="content-card">
              <h2>1. Accordion</h2>
              <p>Seções expansíveis e recolhíveis.</p>
              <Accordion :items="accordionItems" />
            </div>

            <div class="content-card">
              <h2>2. Pagination</h2>
              <p>Navegação entre páginas.</p>
              <Pagination
                :total-pages="totalPaginas"
                :current-page="paginaAtual"
                @change-page="mudarPagina"
              />
            </div>

            <div class="content-card">
              <h2>3. Progress Bar</h2>
              <p>Indicador visual de progresso.</p>
              <ProgressBar :value="progressoGeral" />
            </div>

            <div class="content-card">
              <h2>4. Tabs</h2>
              <p>Organização de conteúdo em abas.</p>
              <Tabs :items="tabsItems" />
            </div>

            <div class="content-card">
              <h2>5. Dropdown Menu</h2>
              <p>Seleção de opções.</p>

              <DropdownMenu
                :options="dropdownOptions"
                @select="selecionarOpcao"
              />

              <p class="selected-option">
                Selecionado: {{ opcaoSelecionada }}
              </p>
            </div>

            <div class="content-card">
              <h2>6. Toast Notification</h2>
              <p>Mensagens temporárias de feedback.</p>

              <div class="toast-actions">
                <button @click="mostrarToast('success', 'Operação realizada com sucesso!')">
                  Sucesso
                </button>

                <button @click="mostrarToast('error', 'Ocorreu um erro na operação.')">
                  Erro
                </button>

                <button @click="mostrarToast('info', 'Esta é uma mensagem informativa.')">
                  Informação
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <ToastNotification
      :message="toast.message"
      :type="toast.type"
      :visible="toast.visible"
      @close="fecharToast"
    />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  background: #f4f7f5;
  color: #26352d;
}

button,
input {
  font: inherit;
}

button {
  cursor: pointer;
}

.topbar {
  height: 70px;
  background: #fff;
  border-bottom: 1px solid #e5ebe7;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 30px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
}

.logo-icon {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: #188653;
  color: white;
}

.layout {
  display: flex;
  min-height: calc(100vh - 70px);
}

.sidebar {
  width: 230px;
  flex-shrink: 0;
  background: #fff;
  border-right: 1px solid #e5ebe7;
  padding: 25px 15px;
}

.sidebar-title {
  font-size: 11px;
  color: #89958d;
  font-weight: 700;
  margin: 0 10px 15px;
}

.sidebar button {
  display: block;
  width: 100%;
  padding: 13px;
  margin-bottom: 7px;
  border: 0;
  border-radius: 8px;
  text-align: left;
  background: transparent;
  color: #59675f;
}

.sidebar button:hover,
.sidebar button.active {
  background: #e8f5ed;
  color: #188653;
  font-weight: 700;
}

.main-content {
  flex: 1;
  min-width: 0;
  padding: 30px;
}

.page-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 25px;
}

.page-heading h1 {
  font-size: 26px;
  margin-bottom: 7px;
}

.page-heading p,
.content-card > p {
  color: #7b8980;
  font-size: 14px;
}

.status-badge {
  background: #e6f5eb;
  color: #188653;
  border-radius: 20px;
  padding: 7px 12px;
  font-size: 12px;
  font-weight: 700;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-bottom: 22px;
}

.stat-card,
.content-card {
  background: #fff;
  border: 1px solid #e5ebe7;
  border-radius: 12px;
  padding: 22px;
}

.stat-card span,
.stat-card small {
  display: block;
  color: #7b8980;
  font-size: 13px;
}

.stat-card strong {
  display: block;
  font-size: 29px;
  margin: 12px 0 7px;
}

.content-card h2 {
  font-size: 18px;
  margin-bottom: 12px;
}

.content-card h3 {
  font-size: 15px;
  margin: 25px 0 12px;
}

.content-card > p {
  line-height: 1.6;
  margin-bottom: 15px;
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.search-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #dce5df;
  border-radius: 8px;
  margin-bottom: 20px;
  outline-color: #188653;
}

.table-container {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 500px;
}

th,
td {
  text-align: left;
  padding: 14px 12px;
  border-bottom: 1px solid #edf0ed;
  font-size: 13px;
}

th {
  color: #718077;
  background: #f8faf8;
}

.course-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 16px 0;
  border-bottom: 1px solid #edf0ed;
}

.course-item:last-child {
  border-bottom: 0;
}

.selected-option {
  margin-top: 12px;
  color: #718077;
  font-size: 13px;
}

.toast-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.toast-actions button {
  border: 0;
  border-radius: 7px;
  padding: 10px 13px;
  background: #188653;
  color: #fff;
}

.toast-actions button:nth-child(2) {
  background: #c74646;
}

.toast-actions button:nth-child(3) {
  background: #3979b9;
}

@media (max-width: 900px) {
  .sidebar {
    width: 190px;
  }

  .main-content {
    padding: 22px;
  }

  .component-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 650px) {
  .topbar {
    padding: 0 15px;
  }

  .layout {
    display: block;
  }

  .sidebar {
    width: 100%;
    padding: 10px;
    display: flex;
    gap: 6px;
    overflow-x: auto;
    border-right: 0;
    border-bottom: 1px solid #e5ebe7;
  }

  .sidebar-title {
    display: none;
  }

  .sidebar button {
    width: auto;
    min-width: max-content;
    margin: 0;
    text-align: center;
  }

  .main-content {
    padding: 18px 14px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .page-heading h1 {
    font-size: 22px;
  }

  .stat-card,
  .content-card {
    padding: 17px;
  }
}
</style>
```