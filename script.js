// Criando a classe classe calculadora que conterá as principais funções da mesna
class Calculadora {
    // Passando os arguementos para o construtor
    constructor(operacaoAnterior, operacaoAtual) {
      this.operacaoAnterior = operacaoAnterior
      this.operacaoAtual = operacaoAtual
      this.limpar()
    }
//   Criando a função limpar tudo, limpa o display
     limpar() {
      this.atualOperacao = ''
      this.anteriorOperacao = ''
      this.operacao = undefined
    }
  //   Criando a função delete, deleta números
    delete() {
      this.atualOperacao = this.atualOperacao.toString().slice(0, -1)
    }
//   Criando a função acrescerNumero que le o numero e não permite mais de um "."
    acrescentarNumero(numero) {
      if (numero === '.' && this.atualOperacao.includes('.')) return
      this.atualOperacao = this.atualOperacao.toString() + numero.toString()
    }
// Criando a função escolhaOperação, permite que o usuário selecione a operação realizada
    escolhaOperacao(operacao) {
      if (this.atualOperacao === '') return
      if (this.anteriorOperacao !== '') {
        this.calcular()
      }
      this.operacao = operacao
      this.anteriorOperacao = this.atualOperacao
      this.atualOperacao = ''
    }
//   Criando a função calcular, que calcula o que o usuário seleciona
    calcular() {
      let resultado
      const anterior = parseFloat(this.anteriorOperacao)
      const atual = parseFloat(this.atualOperacao)
      if (isNaN(anterior) || isNaN(atual)) return
// utilizando switch ao invés de if's
      switch (this.operacao) {
        case '+':
          resultado = anterior + atual
          break
        case '-':
          resultado = anterior - atual
          break
        case '*':
          resultado = anterior * atual
          break
        case '÷':
          resultado = anterior / atual
          break
        default:
          return
      }
      this.atualOperacao = resultado
      this.operacao = undefined
      this.anteriorOperacao = ''
    }
// Recebe numeros inteiros e decimais com o uso do "." e mostra no atualOperação  
    receberNumeroDisplay(numero) {
      const numeroString = numero.toString()
      const digitosInteiros = parseFloat(numeroString.split('.')[0])
      const digitosDecimais = numeroString.split('.')[1]
      let displayInteiro
      if (isNaN(digitosInteiros)) {
        displayInteiro = ''
      } else {
        displayInteiro = digitosInteiros.toLocaleString('pt-br', { maximumFractionDigits: 0 })
      }
      if (digitosDecimais != null) {
        return `${displayInteiro}.${digitosDecimais}`
      } else {
        return displayInteiro
      }
    }
// criando a função atualizarDisplay que mostra o que foi selecionado no display
    atualizarDisplay() {
      this.operacaoAtual.innerText =
        this.receberNumeroDisplay(this.atualOperacao)
      if (this.operacao != null) {
        this.operacaoAnterior.innerText =
          `${this.receberNumeroDisplay(this.anteriorOperacao)} ${this.operacao}`
      } else {
        this.operacaoAnterior.innerText = ''
      }
    }
  }
  
// Criando as variáveis 
  const numeroBotoes = document.querySelectorAll('[data-numero]')
  const operacaoBotao = document.querySelectorAll('[data-operacao]')
  const igualBotao = document.querySelector('[data-igual]')
  const deleteBotao = document.querySelector('[data-delete]')
  const botaoLimparTudo = document.querySelector('[data-limpar-tudo]')
  const operacaoAnterior = document.querySelector('[data-operacao-anterior]')
  const operacaoAtual = document.querySelector('[data-operacao-atual]')
// Criando o obj
  const calculadora = new Calculadora(operacaoAnterior, operacaoAtual)



// ATUALIZANDO O DISPLAY COM BASE NO BOTÃO SELECIONADO
// Recebendo o número selecionado e mostrando no display
  numeroBotoes.forEach(botao => {
    botao.addEventListener('click', () => {
      calculadora.acrescentarNumero(botao.innerText)
      calculadora.atualizarDisplay()
    })
  })
// Recebendo a operação e mostrando no display
  operacaoBotao.forEach(botao => {
    botao.addEventListener('click', () => {
      calculadora.escolhaOperacao(botao.innerText)
      calculadora.atualizarDisplay()
    })
  })
// Recebendo o botão igual e mostrando o resultado no display
  igualBotao.addEventListener('click', botao => {
    calculadora.calcular()
    calculadora.atualizarDisplay()
  })
// Limppando o display
  botaoLimparTudo.addEventListener('click', botao => {
    calculadora.limpar()
    calculadora.atualizarDisplay()
  })
// Deletando um numero do display
  deleteBotao.addEventListener('click', botao => {
    calculadora.delete()
    calculadora.atualizarDisplay()
  })