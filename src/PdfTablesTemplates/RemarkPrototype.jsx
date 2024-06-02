import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

import font from "../Assets/Roboto/Roboto/Roboto-Regular.ttf";

Font.register({
  family: "Roboto",
  src: font,
});

const styles = StyleSheet.create({
  page: { padding: "10px" },
  textHeader: { fontFamily: "Roboto", fontSize: "14px", textAlign: "center" },
  header: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: "18px",
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "auto",
    marginTop: "20px",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { margin: "auto", flexDirection: "row" },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableTitle: { fontFamily: "Roboto", fontSize: "10px" },
  footerValues: {
    display: "flex",
    flexDirection: "column",
  },
  footerText: { fontFamily: "Roboto", fontSize: "14px" },
});

const RemarkTemplate = ({ data, contractId }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>АКТ ПЕРЕОЦЕНКИ</Text>

        <Text style={styles.textHeader}>
          На основании договора: {contractId}
        </Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableTitle}>Наименование</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableTitle}>Количество</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableTitle}>Единица измерения</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableTitle}>Стоимость</Text>
          </View>
        </View>

        {data.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text style={styles.tableTitle}>{item.name}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableTitle}>{item.amount}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableTitle}>{item.unit}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableTitle}>{item.price}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default RemarkTemplate;
