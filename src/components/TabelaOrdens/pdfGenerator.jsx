import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Registrar as fontes do pdfMake
pdfMake.vfs = pdfFonts.pdfMake.vfs;



export default function generatePDF (order) {

  
  const listaServicosArray = JSON.parse(order.lista_servicos);

  // Definir o tamanho fixo para a descrição do serviço
const tamanhoDescricao = 150;

// Montar a lista de serviços com o espaçamento adequado
const listaServicosFormatada = listaServicosArray.map(servico => ({
  columns: [
    { width: tamanhoDescricao, text: servico.descricao, style: 'listItemDescription' },
    { text: `R$ ${servico.preco}`, style: 'listItemValue' }
  ],
}));

  // Definir o conteúdo do documento PDF
  const docDefinition = {
    content: [
      { text: 'Oficina XXXXXXX', style: 'header' },
      { text: 'Ordem de Serviço', style: 'header' },
      {
        columns: [
          { text: `Nome: ${order.nome}`, style: 'info' },
          { text: `Carro: ${order.veiculo}`, style: 'info' },
          { text: `Data: ${new Date(order.data).toLocaleDateString()}`, style: 'info' }
        ]
      },
      { text: 'Serviços Executados:', style: 'subheader' },
      { ul: listaServicosFormatada, style: 'listItems' }
    ],
    styles: {
      header: { fontSize: 18, bold: true, margin: [15, 30, 15, 30],  alignment: 'center', },
      subheader: { fontSize: 14, bold: true, margin: [30, 10, 30, 5] },
      info: { fontSize: 12, margin: [30, 30, 30, 30], alignment: 'center' },
      listItems: { fontSize: 12, margin: [30, 30, 30, 30], widths: ['*', 'auto'] }
    }
  };
  

  // Gerar o PDF
  const pdfDocGenerator = pdfMake.createPdf(docDefinition);
  pdfDocGenerator.open()
  // pdfDocGenerator.download(`Ordem_${order.nome}.pdf`); // Baixar o PDF com um nome específico
};

