import { PDFViewer, Document, Page, Text } from '@react-pdf/renderer';

const generatePDFContent = (order) => (
    <Document>
      <Page>
        <Text>{`Nome: ${order.nome}`}</Text>
        <Text>{`Carro: ${order.veiculo}`}</Text>
        <Text>{`Data: ${order.data}`}</Text>
        <Text>Serviços:</Text>
        {order.lista_servicos.map((servico, index) => (
          <Text key={index}>{`${servico.descricao}: R$ ${servico.preco}`}</Text>
        ))}
      </Page>
    </Document>
  );
  
  function OrderPDF({ order }) {
    const handleSavePDF = () => {
      const pdfContent = generatePDFContent(order);
      // Lógica para salvar o PDF, usando pdfContent como conteúdo do PDF
    };
    return (
        <div>
          <PDFViewer width="1000" height="600">
            {generatePDFContent(order)}
          </PDFViewer>
          <button onClick={handleSavePDF}>Salvar PDF</button>
          {/* <button onClick={handlePrintPDF}>Imprimir PDF</button> */}
        </div>
      );
    }
    
    export default OrderPDF;
      