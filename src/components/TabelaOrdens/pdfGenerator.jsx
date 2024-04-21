import React, { useState, useEffect } from "react";
import {
  pdf,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import logo from "../../views/logo.jpg";

// Estilos personalizados
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    alignItems: "center",
    padding: 30,
    width: 100,
  },
  section: {
    textAlign: "center",
    marginBottom: 10,
  },
  infoMecanica: {
    gap: 10,
    marginRight: 80,
    fontSize: 14,
  },
  container: {
    flexDirection: "row", // Direção de linha para colocar os itens lado a lado
    alignItems: "center", // Centraliza os itens verticalmente
    justifyContent: "space-between", // Distribui o espaço entre os itens
    width: "100%", // Ocupa toda a largura disponível
    maxWidth: "100%", // Largura máxima igual à largura disponível
    margin: 10,
    borderWidth: 1, // Adicione um border para visualização
    borderColor: "black", // Cor do border
  },
  subContainer: {
    gap: 6,
    margin: 20,
    width: "100%", // Ocupa toda a largura disponível
  },

  headerContainer: {
    marginTop: 40,
    width: "100%",
    textAlign: "center",
    marginBottom: 10,
  },
  header: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  info: {
    fontSize: 12,
    marginBottom: 5,
  },
  listItem: {
    fontSize: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0,
    padding: 5, // Espaçamento para a borda
  },
  listItemWithBorder: {
    borderBottomWidth: 1, // Borda na parte inferior
    borderBottomColor: "#000000", // Cor da borda
  },
  listItemDescription: {
    width: "50%", // Largura para a descrição
    textAlign: "left"
  },
  listItemValue: {
    width: "50%", // Largura para o valor
    textAlign: "right",
  },

  logoContainer: {
    width: 140, // Largura do container do logo
    marginRight: 20,
    padding: 20, // Espaçamento à direita do logo
    borderRight: 1,
    borderRightColor: "#000000",
  },
  logo: {
    width: 100, // Largura do logo
    height: 100, // Altura do logo
  },
});

// Componente para renderizar o PDF
const MyDocument = () => {
  const [data, setData] = useState({});
  const [servicos, setServicos] = useState([]);
  const { state } = useLocation();
  const order = state?.item;

  useEffect(() => {
    setData(order);
    try {
      let dadosArray = JSON.parse(order.lista_servicos);
      setServicos(dadosArray);
    } catch (error) {
      console.error("Erro ao fazer parse da string JSON:", error);
    }
  }, [order]);

  console.log(data);
  console.log(servicos);

  const handleDownloadPDF = async () => {
    if (!data || !servicos || servicos.length === 0) {
      return; // Não faz download se os dados estiverem ausentes
    }

    const filteredServicos = servicos.filter(
      (servico) => servico.descricao !== null && servico.preco !== null
    );

    const blob = await pdf(
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <View style={styles.headerContainer}>
              <Text style={styles.header}>Macedo Car</Text>
            </View>

            <View style={styles.container}>
              <View style={styles.logoContainer}>
                <Image style={styles.logo} src={logo} />
              </View>
              <View style={styles.infoMecanica}>
                <Text style={styles.info}>
                  Endereço: Avenida Sao Jose, 2748, Centro, Jaquirana/RS
                </Text>
                <Text style={styles.info}>CEP: 95420-000</Text>
                <Text style={styles.info}>Telefone: (54) 99943-7302</Text>
                <Text style={styles.info}>CNPJ: 08.852.813/0001-11</Text>
              </View>
            </View>

            <View style={styles.container}>
              <View style={styles.subContainer}>
                <Text style={styles.info}>Cliente:</Text>
                <Text style={styles.info}>{data.nome}</Text>
              </View>
              <View style={styles.subContainer}>
                <Text style={styles.info}>Veículo:</Text>
                <Text style={styles.info}>{data.veiculo}</Text>
              </View>
              <View style={styles.subContainer}>
                <Text style={styles.info}>Placa:</Text>
                <Text style={styles.info}>{data.placa}</Text>
              </View>
              <View style={styles.subContainer}>
                <Text style={styles.info}>Data:</Text>
                <Text style={styles.info}>
                  {new Date(data.data).toLocaleDateString()}
                </Text>
              </View>
            </View>

            <View style={styles.headerContainer}>
              <Text style={styles.header}>Serviços Executados:</Text>
            </View>

            <View style={styles.container}>
              <View>
                {filteredServicos.map((servico, index) => (
                  <View
                    key={index}
                    style={[
                      styles.listItem,
                      index !== filteredServicos.length - 1 &&
                        styles.listItemWithBorder,
                    ]}
                  >
                    <Text style={styles.listItemDescription}>
                      {servico.descricao}
                    </Text>
                    <Text style={styles.listItemValue}>R$ {servico.preco}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </Page>
      </Document>
    ).toBlob();

    if (blob) {
      // Cria um URL temporário para o blob
      const url = URL.createObjectURL(blob);
      // Cria um link para iniciar o download
      const link = document.createElement("a");
      link.href = url;
      link.download = "ordem_de_servico.pdf"; // Nome do arquivo
      // Simula o clique no link para iniciar o download
      link.click();
    }
  };

  return (
    <div>
      <button onClick={handleDownloadPDF}>Baixar PDF</button>
    </div>
  );
};

export default MyDocument;
