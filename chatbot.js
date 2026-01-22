const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// leitor de qr code
const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js'); // Mudança Buttons
const client = new Client();
// serviço de leitura do qr code
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});
// apos isso ele diz que foi tudo certo
client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});
// E inicializa tudo 
client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms)); // Função que usamos para criar o delay entre uma ação e outra

// Funil

client.on('message', async msg => {


    async function proximaMensagem() {
        const chat = await msg.getChat();
        await delay(1500);

        await chat.sendStateTyping(); // Simulando Digitação

        await delay(1500);

       await client.sendMessage(msg.from, 'Ajudo em algo mais? ');
    }

    if (msg.body.match(/(menu|Menu|dia|tarde|noite|OI|oi|Oi|Olá|olá|ola|Ola|ajuda|Ajuda|Informações|Informação|Gostaria|gostaria|poderia|Poderia|poderiam|Poderiam|\.|\..|\...)/i) && msg.from.endsWith('@c.us')) {

        const chat = await msg.getChat();

        await delay(1500); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1500); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        const contact = await msg.getContact(); //Pegando o contato
        const name = contact.pushname; //Pegando o nome do contato
        await client.sendMessage(msg.from,'Olá, '+ name.split(" ")[0] + '! O Centro Acadêmico está aqui pra te ajudar! \n\nPor favor, escolha uma das opções abaixo:\n\n1  - Apoio ao Aluno\n2  - Apoio ao Calouro\n3  - Apoio ao Bolsista\n4  - Diretoria Científica\n5  - Diretoria Social - Clown\n6  - Solicitação de Armários e Salas \n7  - Diretoria de Saúde \n8  - Diretoria de Parcerias e Patrocínios\n9  - Diretoria de Ligas Acadêmicas\n10 - Diretoria de Produtos\n11 - Solicitação de Crachás \n12 - Coordenação\n13 - Emissão de Certificados\n14 - Sugestões e Reclamações  '); //Primeira mensagem de texto
        //await delay(1500); //delay de 3 segundos
        //await chat.sendStateTyping(); // Simulando Digitação
        //await delay(5000); //Delay de 5 segundos
            
    }

    if (msg.body !== null && msg.body === '1' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();


        await delay(1500); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1500);
        await client.sendMessage(msg.from, 'A Diretoria de Apoio ao Aluno do Centro Acadêmico pode te ajudar a tirar dúvidas gerais e pode te dar suporte. Chame a Giovanna (21) 97590-5069 ou a Taymara (31) 8601-9298 e elas vão te ajudar!');
        proximaMensagem();
    }
   
    if (msg.body !== null && msg.body === '2' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(1500); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1500);
        await client.sendMessage(msg.from, 'Você é Calouro? Seja muito bem vindo ao nosso Campus!');


        await delay(1500); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1500);
        await client.sendMessage(msg.from, 'Quem pode te ajudar nesta fase do curso é o Antônio! Chama ele aqui (45) 9146-4636 e ele vai te ajudar!');
        proximaMensagem();

    }

    if (msg.body !== null && msg.body === '3' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(1500); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1500);
        await client.sendMessage(msg.from, 'Se você é bolsista e precisa de ajuda, você precisa falar com a Esthefany. Chama aqui (35) 9177-0533 e ela vai te ajudar!');
        proximaMensagem();

    }

    if (msg.body !== null && msg.body === '4' && msg.from.endsWith('@c.us')) {
    const chat = await msg.getChat();

    await delay(1500); //Delay de 3000 milisegundos mais conhecido como 3 segundos
    await chat.sendStateTyping(); // Simulando Digitação
    await delay(1500);
    await client.sendMessage(msg.from, 'O Lucas é a responsável pela Diretoria Científica! Pode chamar aqui (34) 9251-7571 e ele vai te ajudar! ');
    proximaMensagem();
}  

    if (msg.body !== null && msg.body === '5' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(1500); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1500);
        await client.sendMessage(msg.from, 'Quer ficar por dentro das ações sociais do CA? \n\nChama a Gabi (24) 98173-9202! \n\nSe precisa tirar dúvidas sobre o Clown chama o Arthur aqui (31) 9716-2284 . \n\nEles podem te ajudar! ');
        proximaMensagem();
      
    }
    if (msg.body !== null && msg.body === '6' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(1500); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1500);
        await client.sendMessage(msg.from, 'Precisa solicitar um armário ? \n\nClique no link e faça sua solicitação:  https://forms.gle/oNCyJeaFcQTWTDWL7 . \n\nSe ainda precisar de ajuda, chama a Laura aqui (16) 99774-6903 e ela vai te ajudar!');

        await delay(1000); 
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1500);
        await client.sendMessage(msg.from, 'Precisa reservar uma sala para alguma atividade? \n\nEnvie um e-mail para reservasalas.camed9sbc@gmail.com');
        proximaMensagem();
   
    }
    if (msg.body !== null && msg.body === '7' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(1500); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1500);
        await client.sendMessage(msg.from, 'Se você precisa de apoio psicológico na jornada acadêmica, a Uninove te oferece suporte! \n\nAcesse https://www.uninove.br/nasmu2 , faça seu cadastro e aguarde retorno da equipe de atendimento');
        proximaMensagem();
    
    }
    if (msg.body !== null && msg.body === '8' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(1500); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1500);
        await client.sendMessage(msg.from, 'Se você precisa falar sobre Parcerias e Patrocínios do Centro Acadêmico, clique aqui e fale com a Taynara (34) 9197-6755 , ela vai te ajudar!');
        proximaMensagem();
    
    }

    if (msg.body !== null && msg.body === '9' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(1500); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1500);
        await client.sendMessage(msg.from, 'Tem dúvidas sobre as Ligas Acadêmicas? \n\nVocê pode falar com a Iara aqui (79) 9153-0100 e também com o Félix (13) 99159-7983. \n\nEles podem te ajudar! ');
       
        await delay(1500); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1500);
        await client.sendMessage(msg.from, 'Você gostaria de fazer alguma reclamação, sugestão ou comentário sobre uma Liga Acadêmica? \n\nClique no link a seguir e compartilhe conosco:  https://shre.ink/bXIZ ');
        proximaMensagem();
    }

    if (msg.body !== null && msg.body === '10' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(1500); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1500);
        await client.sendMessage(msg.from, 'Você tem dúvida sobre nossos produtos, sobre entrega e compras? \n\nChama a Vitória aqui (11) 94174-0491 e ela vai te ajudar!');
        proximaMensagem();
    
    }

    if (msg.body !== null && msg.body === '11' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(1500); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1500);
        await client.sendMessage(msg.from, 'Precisa solicitar seu crachá para realizar atividades externas? \n\nClique neste link https://forms.gle/RDvep4CwN2igmr8j6 . \n\nQuando o crachá estiver pronto a coordenação avisa no grupo de lideranças. Cobre seu representante.');
        proximaMensagem();

    }

    if (msg.body !== null && msg.body === '12' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

                
        await delay(2000); //
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(2000);
        await client.sendMessage(msg.from, 'Se você tem pendências financeiras ou pendências de documentação, precisa ir até o Campus Vergueiro resolver pessoalmente. O Campus SBC não oferece suporte administrativo.');
            
        await delay(2000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(2000);
        await client.sendMessage(msg.from, 'Você gostaria de mudar de turma? Clique no link e faça sua solicitação:  https://forms.gle/pmtNXomf92wx8hEw5');
            
        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Se você precisa falar com a coordenação do Campus, chame a Tatiane (Assistente da Coordenação) no número (11) 93097-3464 e agende um horário. Ou envie um email para karlapp@uninove.br');
        proximaMensagem();
    }
          
    if (msg.body !== null && msg.body === '14' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(1500); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1500);
        await client.sendMessage(msg.from, 'Tem alguma reclamação, sugestão ou elogio? Você pode enviar sua mensagem para o Vinícius (13) 99135-5635. Ele vai te responder em breve!');
        proximaMensagem();
      
    }
    if (msg.body !== null && msg.body === '13' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(1500); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1500);
        await client.sendMessage(msg.from, 'Você participou de atividades acadêmicas e precisa emitir um Certificado? Clique no link e faça sua solicitação:  https://forms.gle/pLeWTXhyo8wx9qTHA');
               
        await delay(1500); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1500);
        await client.sendMessage(msg.from, 'Se ainda tiver dúvidas, pode enviar sua mensagem pra Gabi Melo (16) 98171-8410. Ela vai te responder em breve!');
        proximaMensagem();
    }
   
});



client.on('message', async msg1 => {

    if (msg1.body.match(/(sim|Sim|SIM)/i) && msg1.from.endsWith('@c.us')) {

        const chat = await msg1.getChat();

        await delay(1500); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1500); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        const contact = await msg1.getContact(); //Pegando o contato
        const name = contact.pushname; //Pegando o nome do contato
        await client.sendMessage(msg1.from,'Olá, '+ name.split(" ")[0] + '! O Centro Acadêmico está aqui pra te ajudar! \n\nPor favor, escolha uma das opções abaixo:\n\n1  - Apoio ao Bolsista\n2  - Apoio ao Calouro\n3  - Apoio ao Interno\n4  - Diretoria Científica\n5  - Diretoria de Comunicação\n6  - Diretoria de Currículo e Certificação\n7  - Diretoria de Educação e Saúde\n8  - Diretoria de Eventos\n9  - Diretoria de Ligas Acadêmicas\n10 - Diretoria de Produtos\n11 - Diretoria Social\n12 - Financeiro\n13 - Reclamações e Sugestões\n14 - Emissão de Certificados  '); //Primeira mensagem de texto
        //await delay(1500); //delay de 3 segundos
        //await chat.sendStateTyping(); // Simulando Digitação
        //await delay(5000); //Delay de 5 segundos
            
    }

    if (msg1.body.match(/(nao|Nao|não|Não|NAO|NÃO)/i) && msg1.from.endsWith('@c.us')) {

        const chat = await msg1.getChat();

        await delay(1500); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1500); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        const contact = await msg1.getContact(); //Pegando o contato
        const name = contact.pushname; //Pegando o nome do contato
        await client.sendMessage(msg1.from,'O Centro Acadêmico agradece pelo seu contato.'); //Primeira mensagem de texto
        //await delay(1500); //delay de 3 segundos
        //await chat.sendStateTyping(); // Simulando Digitação
        //await delay(5000); //Delay de 5 segundos
    }
});
