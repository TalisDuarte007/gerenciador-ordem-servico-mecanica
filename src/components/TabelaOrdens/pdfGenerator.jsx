import React from "react";
import {
  pdf,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo from "../../views/logo.jpg";
import iconPDF from '../../views/pdf-icon.png'

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

const DownloadPDF = ({ order }) => {
  const handleDownloadPDF = async () => {
    if (!order || !order.nome || !order.veiculo || !order.placa || !order.lista_servicos) {
      return;
    }

    const { nome, veiculo, placa, lista_servicos } = order;
    const servicos = JSON.parse(lista_servicos);

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
                <Text style={styles.info}>{nome}</Text>
              </View>
              <View style={styles.subContainer}>
                <Text style={styles.info}>Veículo:</Text>
                <Text style={styles.info}>{veiculo}</Text>
              </View>
              <View style={styles.subContainer}>
                <Text style={styles.info}>Placa:</Text>
                <Text style={styles.info}>{placa}</Text>
              </View>
              <View style={styles.subContainer}>
                <Text style={styles.info}>Data:</Text>
                <Text style={styles.info}>
                  {new Date().toLocaleDateString()} {/* Alterei para pegar a data atual */}
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
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "ordem_de_servico.pdf";
      link.click();
    }
  };

  return (
    <button className="button-pdf" onClick={handleDownloadPDF}>
      <img className="image-icon" src={iconPDF} alt="Ícone de PDF" />
    </button>
  );
};

export default DownloadPDF;
