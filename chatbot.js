/**
 * Chatbot WhatsApp - Centro Acadêmico
 * Com retorno ao menu principal
 * Pronto para Railway
 */

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// ================= EXPRESS =================
app.get('/', (req, res) => {
  res.send('🤖 WhatsApp Bot rodando com sucesso!');
});

app.listen(PORT, () => {
  console.log(`🌐 Servidor ativo na porta ${PORT}`);
});

// ================= WHATSAPP =================
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, Buttons, List } = require('whatsapp-web.js');

const delay = ms => new Promise(res => setTimeout(res, ms));

// ================= CLIENT =================
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage'
    ]
  }
});

// ================= QR CODE =================
client.on('qr', qr => {
  console.log('📲 Escaneie o QR Code abaixo:');
  qrcode.generate(qr, { small: true });
});

// ================= READY =================
client.on('ready', () => {
  console.log('✅ WhatsApp conectado com sucesso!');
});

// ================= MENU PRINCIPAL =================
async function enviarMenuPrincipal(msg) {
  const contact = await msg.getContact();
  const name = contact.pushname || 'Aluno';

  const buttons = new Buttons(
    `Olá, ${name.split(' ')[0]}! 👋\n\n` +
    `O Centro Acadêmico está aqui pra te ajudar!\n\n` +
    `Escolha uma categoria:`,
    [
      { body: '🎓 Acadêmico' },
      { body: '🏢 Diretoria' },
      { body: '📋 Serviços' }
    ],
    '🤖 Centro Acadêmico',
    'Menu principal'
  );

  await msg.reply(buttons);
}

// ================= MENU PÓS RESPOSTA =================
async function menuPosResposta(msg) {
  const buttons = new Buttons(
    'Deseja fazer mais alguma coisa?',
    [
      { body: '🏠 Menu principal' },
      { body: '❌ Encerrar atendimento' }
    ],
    '🤖 Centro Acadêmico',
    'Escolha uma opção'
  );

  await delay(1000);
  await msg.reply(buttons);
}

// ================= RESPOSTAS =================
const respostas = {
  '1': '📚 *Apoio ao Aluno*\n\nGiovanna (21) 97590-5069\nTaymara (31) 8601-9298',
  '2': '🎓 *Apoio ao Calouro*\n\nAntônio (45) 9146-4636',
  '3': '💼 *Apoio ao Bolsista*\n\nEsthefany (35) 9177-0533',
  '4': '🔬 *Diretoria Científica*\n\nLucas (34) 9251-7571',
  '5': '🤡 *Diretoria Social - Clown*\n\nGabi (24) 98173-9202\nArthur (31) 9716-2284',
  '6': '🗄 *Armários e Salas*\n\nArmários:\nhttps://forms.gle/oNCyJeaFcQTWTDWL7\n\nSalas:\nreservasalas.camed9sbc@gmail.com',
  '7': '🧠 *Diretoria de Saúde*\n\nhttps://www.uninove.br/nasmu2',
  '8': '🤝 *Parcerias e Patrocínios*\n\nTaynara (34) 9197-6755',
  '9': '📚 *Ligas Acadêmicas*\n\nIara (79) 9153-0100\nFélix (13) 99159-7983',
  '10': '🛍 *Produtos*\n\nVitória (11) 94174-0491',
  '11': '🪪 *Solicitação de Crachás*\n\nhttps://forms.gle/RDvep4CwN2igmr8j6',
  '12': '🏢 *Coordenação*\n\nTatiane (11) 93097-3464\nkarlapp@uninove.br',
  '13': '📜 *Emissão de Certificados*\n\nhttps://forms.gle/pLeWTXhyo8wx9qTHA',
  '14': '📢 *Sugestões e Reclamações*\n\nVinícius (13) 99135-5635'
};

// ================= MESSAGE HANDLER =================
client.on('message', async msg => {

  if (!msg.from.endsWith('@c.us')) return;

  const texto = msg.body?.trim();

  // ===== MENU UNIVERSAL =====
  if (/^(menu|oi|olá|ola|ajuda|\.)$/i.test(texto)) {
    await enviarMenuPrincipal(msg);
    return;
  }

  // ===== BOTÃO MENU =====
  if (texto === '🏠 Menu principal') {
    await enviarMenuPrincipal(msg);
    return;
  }

  // ===== ENCERRAR =====
  if (texto === '❌ Encerrar atendimento') {
    await msg.reply('🙏 O Centro Acadêmico agradece seu contato!');
    return;
  }

  // ===== LISTA =====
  if (
    texto === '🎓 Acadêmico' ||
    texto === '🏢 Diretoria' ||
    texto === '📋 Serviços'
  ) {

    const list = new List(
      'Escolha uma opção:',
      'Ver opções',
      [
        {
          title: 'Atendimento',
          rows: [
            { id: '1', title: '🎓 Apoio ao Aluno' },
            { id: '2', title: '🧑‍🎓 Apoio ao Calouro' },
            { id: '3', title: '💼 Apoio ao Bolsista' }
          ]
        },
        {
          title: 'Diretorias',
          rows: [
            { id: '4', title: '🔬 Diretoria Científica' },
            { id: '5', title: '🤡 Diretoria Social - Clown' },
            { id: '7', title: '🧠 Diretoria de Saúde' }
          ]
        },
        {
          title: 'Serviços',
          rows: [
            { id: '6', title: '🗄 Armários e Salas' },
            { id: '8', title: '🤝 Parcerias e Patrocínios' },
            { id: '9', title: '📚 Ligas Acadêmicas' },
            { id: '10', title: '🛍 Produtos' },
            { id: '11', title: '🪪 Solicitação de Crachás' },
            { id: '12', title: '🏢 Coordenação' },
            { id: '13', title: '📜 Emissão de Certificados' },
            { id: '14', title: '📢 Sugestões e Reclamações' }
          ]
        }
      ],
      '🤖 Centro Acadêmico',
      'Selecione'
    );

    await msg.reply(list);
    return;
  }

  // ===== RESPOSTA DA LISTA =====
  if (msg.selectedRowId && respostas[msg.selectedRowId]) {
    await delay(1200);
    await client.sendMessage(msg.from, respostas[msg.selectedRowId]);
    await menuPosResposta(msg);
    return;
  }

});

// ================= START =================
client.initialize();