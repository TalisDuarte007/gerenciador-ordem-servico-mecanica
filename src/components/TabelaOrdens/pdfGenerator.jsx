import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Registrar as fontes do pdfMake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function generatePDF (order) {
  const listaServicosArray = JSON.parse(order.lista_servicos);
  // Definir o conteúdo do documento PDF
  const docDefinition = {
    content: [
      { text: 'Oficina XXXXXXX', style: 'header' },
      { text: 'Ordem de Serviço', style: 'header' },
      { text: `Nome: ${order.nome}`, style: 'info' },
      { text: `Carro: ${order.veiculo}`, style: 'info' },
      { text: `Data: ${new Date(order.data).toLocaleDateString()}`, style: 'info' },
      { text: 'Serviços:', style: 'subheader' },
      { ul: listaServicosArray.map(servico => `${servico.descricao}: R$ ${servico.preco}`), style: 'listItems' }
    ],
    styles: {
      header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
      subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
      info: { fontSize: 12, margin: [0, 5, 0, 5] },
      listItems: { fontSize: 12, margin: [0, 5, 0, 5] }
    }
  };
  

  // Gerar o PDF
  const pdfDocGenerator = pdfMake.createPdf(docDefinition);
  pdfDocGenerator.download(`Ordem_${order.nome}.pdf`); // Baixar o PDF com um nome específico
};

