module.exports = async function(db, {proffyValue, classValue, classScheduleValues}) {
  // Inserir dados na tabela proffys
  
  // O 'await' informa ao JS que ele só poderá ir para a próxima linha quando todos so comandos e execuções estiverem concluídos
  // O 'await' só funcionará se na frente da função estiver a palavra reservada 'async'
  // A variável está recebendo a resposta dada pelo 'await', pois precisaremos recuperar o 'id' do 'proffy'. Se não precisássemos recuperar nada, isso não seria necessário
  const insertedProffy = await db.run(`
    INSERT INTO proffys (
      name,
      avatar,
      whatsapp,
      bio
    ) VALUES (
      "${proffyValue.name}",
      "${proffyValue.avatar}",
      "${proffyValue.whatsapp}",
      "${proffyValue.bio}"
    );
  `)

  const proffy_id = insertedProffy.lastID // Estamos pegando o último ID do Proffy (que é gerado automaticamente pelo banco de dados) para usar na proxima tabela
  
  // Inserir dados na tabela classes
  const insertedClass = await db.run(`
      INSERT INTO classes (
        subject,
        cost,
        proffy_id
      ) VALUES (
        "${classValue.subject}",
        "${classValue.cost}",
        "${proffy_id}"
      );
  `)
  
  const class_id = insertedClass.lastID

  // Inserir dados na tabela classSchedule
  // Como há a possibilidade do proffy escolher vários horários, teremos um vetor de horários através da função 'map', que vai executar o comando sql para cada um dos horários fornecidos
  const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
    return db.run(`
      INSERT INTO class_schedule (
        class_id,
        weekday,
        time_from,
        time_to
      ) VALUES (
        "${class_id}",
        "${classScheduleValue.weekday}",
        "${classScheduleValue.time_from}",
        "${classScheduleValue.time_to}"
      );
    `)
  })

  // Aqui vou executar todos os 'db.runs()' das class_schedules
  // Como não há como executar todas as posições do array ao mesmo tempo, é preciso usar o 'Promise', que executará respeitará o tempo de cada posição (com o 'all') do novo array (de instruções de inserção para cada objeto do array) ser afetada
  await Promise.all(insertedAllClassScheduleValues)
}