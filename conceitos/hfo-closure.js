//HOF (Higher-Order Functions) são funções que podem receber outras funções como argumentos ou retornar funções como resultado. Elas permitem criar abstrações e reutilizar código de forma mais eficiente.
// Exemplo de HOF
function somar({ a, b }) {
  return a + b;
}

function subtrair({ a, b }) {
  return a - b;
}

function operacao({ numero1, numero2, operacao }) {
  return operacao({ a: numero1, b: numero2 });
}

console.log(operacao({ numero1: 10, numero2: 5, operacao: somar })); // 15
console.log(operacao({ numero1: 10, numero2: 5, operacao: subtrair })); // 5

//Closures são funções que têm acesso ao escopo de uma função externa mesmo após essa função ter sido executada. Isso significa que a função interna pode acessar variáveis e parâmetros da função externa, mesmo depois que a função externa já retornou.
// Isso é útil para criar funções que "lembram" de valores ou para criar funções que têm um estado interno.
// Exemplo de Closure
function criarMultiplicador(fator) {
  return function (numero) {
    return numero * fator;
  };
}
const dobro = criarMultiplicador(2);
const triplo = criarMultiplicador(3);
console.log(dobro(5)); // 10
console.log(triplo(5)); // 15
