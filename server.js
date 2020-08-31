/*
    express = pct para criar as rotas do app
    ejs = pct responsável pela engine ejs
    express-ejs-layout = Usamos ele para conseguirmos enviar dados para nossas páginas ejs pelo express.
    faker = Usamos ele para gerar algumas informações aleatórias como Nome, email, imagens. (Útil para testes)
    nodemon = atualização automatica a cada vez que salva o projeto
*/

//declaração das variáveis
const express = require('express')
const faker = require('faker')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = process.env.PORT || 8000

//configuração do servidor 
app.set('view engine', 'ejs')     // Setamos que nossa engine será o ejs
app.use(expressLayouts)           // Definimos que vamos utilizar o express-ejs-layouts na nossa aplicação
app.use(bodyParser.urlencoded())  // Com essa configuração, vamos conseguir parsear o corpo das requisições

app.use(express.static(__dirname + '/public'))

app.listen(port, () => {
    console.log(`A mágica acontece em http://localhost:${port}`)
})

//criando as rotas
//Aqui o server recebeu uma requisição do client e devolveu o arquivo home.ejs,
//com isso o EJS renderiza em forma de uma página html.
app.get('/', (req, res) => {
    res.render('pages/home')
  })

//O que o server faz aqui é praticamente a mesma coisa que foi feita na rota anterior, 
//porém aqui, devolvemos para o client além da página about, uma variável chamada usuarios.
app.get('/about', (req, res) => {
    var users = [{
        name: faker.name.findName(),
        email: faker.internet.email(),
        avatar: 'http://placebear.com/300/300'
    }, {
        name: faker.name.findName(),
        email: faker.internet.email(),
        avatar: 'http://placebear.com/400/300'
    }, {
        name: faker.name.findName(),
        email: faker.internet.email(),
        avatar: 'http://placebear.com/500/300'
    }]

    res.render('pages/about', {
        usuarios: users
    })
}) 

app.get('/contact', (req, res) => {
    res.render('pages/contact')
  })

//Aqui o server recepciona o conteúdo da requisição e devolve uma mensagem para o client
//aproveitando o nome da pessoa que enviou a mensagem para nós. Essa mensagem que vem no 
//corpo da requisição, só é possível ser manipulada utilizando o pacote body-parser  
app.post('/contact', (req, res) => {
    res.send('Obrigado por entrar em contato conosco, ' + req.body.name + '! Responderemos em breve!')
})
