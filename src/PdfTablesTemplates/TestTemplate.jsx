import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { margin: "auto", flexDirection: "row" },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    fontSize: 10,
  },
  tableCell: { fontSize: "10px" },
});

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>ПРИХОДНОЙ ОРДЕР</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Наименование</Text>
          </View>
          <View style={styles.tableCol}>
            <Text>Количество</Text>
          </View>
          <View style={styles.tableCol}>
            <Text>единица измерения</Text>
          </View>
          <View style={styles.tableCol}>
            <Text>Стоимость</Text>
          </View>
          <View style={styles.tableCol}>
            <Text>габариты</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
