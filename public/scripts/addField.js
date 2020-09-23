// Procurar o botão
//Quando clicar no Botão
document.querySelector("#add-time").addEventListener('click', cloneField)

//Executar uma ação
function cloneField() {
  //Duplicar os campos. Quais campos?
  const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true) // Serve para duplicar elementos HTML
  
  //Pegar os campos. Quais campos?
  const fields = newFieldContainer.querySelectorAll('input')
  
  //Para cada campo limpar
  fields.forEach(function(field) {
    // pegar o field do momento e limpa ele
    field.value = ""
  })
  
  //Colocar na página. Em qual lugar da página?
  document.querySelector('#schedule-items').appendChild(newFieldContainer)
}