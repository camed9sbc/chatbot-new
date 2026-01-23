const express = require('express');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, Buttons } = require('whatsapp-web.js');

const app = express();
const PORT = process.env.PORT || 3000;

/* ===============================
   EXPRESS (Railway precisa disso)
================================ */
app.get('/', (req, res) => {
  res.send('WhatsApp Bot rodando 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

/* ===============================
   WHATSAPP CLIENT
================================ */
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--single-process'
    ]
  }
});

/* ===============================
   QR CODE
================================ */
client.on('qr', qr => {
  console.log('Escaneie o QR Code abaixo:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('✅ WhatsApp conectado com sucesso!');
});

client.initialize();

/* ===============================
   FUNÇÕES AUXILIARES
================================ */
const delay = ms => new Promise(res => setTimeout(res, ms));

async function enviarMenu(msg) {
  const contact = await msg.getContact();
  const name = contact.pushname || 'Tudo bem';

  const buttons = new Buttons(
    `Olá, ${name.split(' ')[0]}! 👋\n\nEscolha uma opção abaixo:`,
    [
      { body: '🎓 Apoio ao Aluno', id: '1' },
      { body: '🆕 Apoio ao Calouro', id: '2' },
      { body: '💰 Apoio ao Bolsista', id: '3' },
      { body: '🔬 Diretoria Científica', id: '4' },
      { body: '❤️ Diretoria Social', id: '5' }
    ],
    'Centro Acadêmico',
    'Menu Principal'
  );

  await client.sendMessage(msg.from, buttons);
}

async function botaoVoltar(msg) {
  const buttons = new Buttons(
    'Deseja voltar ao menu principal?',
    [
      { body: '🔙 Voltar ao Menu', id: 'menu' },
      { body: '❌ Encerrar', id: 'sair' }
    ],
    'Centro Acadêmico',
    ''
  );

  await client.sendMessage(msg.from, buttons);
}

/* ===============================
   RESPOSTAS
================================ */
const respostas = {
  '1': '🎓 *Apoio ao Aluno*\n\nEntre em contato com a Giovanna (21) 97590-5069 ou Taymara (31) 8601-9298.',
  '2': '🆕 *Apoio ao Calouro*\n\nFale com o Antônio (45) 9146-4636.',
  '3': '💰 *Apoio ao Bolsista*\n\nFale com a Esthefany (35) 9177-0533.',
  '4': '🔬 *Diretoria Científica*\n\nFale com o Lucas (34) 9251-7571.',
  '5': '❤️ *Diretoria Social*\n\nFale com Gabi (24) 98173-9202 ou Arthur (31) 9716-2284.'
};

/* ===============================
   MENSAGENS
================================ */
client.on('message', async msg => {
  if (!msg.from.endsWith('@c.us')) return;

  const texto = msg.body.toLowerCase();

  // Menu inicial
  if (
    texto.includes('menu') ||
    texto.includes('oi') ||
    texto.includes('olá') ||
    texto.includes('ola') ||
    texto.includes('ajuda')
  ) {
    await enviarMenu(msg);
    return;
  }

  // Respostas das opções
  if (respostas[msg.body]) {
    await delay(1000);
    await client.sendMessage(msg.from, respostas[msg.body]);
    await delay(1000);
    await botaoVoltar(msg);
    return;
  }

  // Voltar ao menu
  if (texto === 'menu') {
    await enviarMenu(msg);
    return;
  }

  // Encerrar
  if (texto === 'sair') {
    await client.sendMessage(msg.from, 'Obrigado pelo contato! 👋');
    return;
  }
});
