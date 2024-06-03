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

const convertStatusToString = (value) => {
  if (value === "accepted") {
    return "Принят";
  } else if (value === "writeoff") {
    return "Списан";
  } else if (value === "nonverified") {
    return "Не обработан";
  }
};

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
    width: "50%",
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

const ReportPrototype = ({ data, accepted, writeoff, nonverified }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>АКТ СПИСАНИЯ</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableTitle}>Наименование</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableTitle}>Статус</Text>
          </View>
        </View>

        {accepted ? (
          data
            .filter((item) => item.status === "accepted")
            .map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableTitle}>{item.name}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableTitle}>
                    {convertStatusToString(item.status)}
                  </Text>
                </View>
              </View>
            ))
        ) : (
          <></>
        )}

        {writeoff ? (
          data
            .filter((item) => item.status === "writeoff")
            .map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableTitle}>{item.name}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableTitle}>
                    {convertStatusToString(item.status)}
                  </Text>
                </View>
              </View>
            ))
        ) : (
          <></>
        )}

        {nonverified ? (
          data
            .filter((item) => item.status === "nonverified")
            .map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableTitle}>{item.name}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableTitle}>
                    {convertStatusToString(item.status)}
                  </Text>
                </View>
              </View>
            ))
        ) : (
          <></>
        )}
      </View>
    </Page>
  </Document>
);

export default ReportPrototype;
