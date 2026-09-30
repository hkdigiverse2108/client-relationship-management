import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Use remote fonts since local /public/fonts don't exist yet
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmWUlvAx05IsDqlA.ttf', fontWeight: 'bold' },
  ],
});
// Stop words like "Office" / "Amazon" being split with hyphens
Font.registerHyphenationCallback((word) => [word]);

const C = {
  brand: '#718d52',
  brandDark: '#4f6538',
  brandSoft: '#f3f6ef',
  ink: '#1f2937',
  muted: '#6b7280',
  line: '#e5e7eb',
  zebra: '#fafbfa',
  green: '#1e8e3e',
  greenBg: '#e6f4ea',
  red: '#d93025',
  redBg: '#fce8e6',
  navy: '#264653',
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 0,
    paddingHorizontal: 32,
    paddingBottom: 48,
    fontSize: 9,
    fontFamily: 'Roboto',
    color: C.ink,
  },
  topBar: { height: 6, backgroundColor: C.brand, marginHorizontal: -32, marginBottom: 22 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: C.line,
    marginBottom: 18,
  },
  logoSection: { flexDirection: 'row', alignItems: 'flex-start' },
  logoBox: {
    width: 46,
    height: 46,
    borderRadius: 8,
    backgroundColor: C.brand,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoText: { fontSize: 20, fontWeight: 'bold', color: '#ffffff', letterSpacing: 0.5 },
  companyName: { fontSize: 15, fontWeight: 'bold', color: C.ink, marginBottom: 4 },
  companyAddress: { fontSize: 8, color: C.muted, lineHeight: 1.5 },
  companyMeta: { fontSize: 8, color: C.ink, lineHeight: 1.5, marginTop: 2 },

  docBadge: {
    backgroundColor: C.navy,
    color: '#ffffff',
    paddingVertical: 6,
    paddingHorizontal: 14,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    borderRadius: 4,
    textAlign: 'center',
  },

  summarySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginBottom: 18,
  },
  summaryLeft: { width: '32%', justifyContent: 'center' },
  summaryTitle: {
    fontSize: 8,
    color: C.muted,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 5,
  },
  summaryDate: { fontSize: 12, fontWeight: 'bold', marginBottom: 4 },
  summarySubtitle: { fontSize: 9, color: C.muted },

  cards: { width: '66%', flexDirection: 'row', justifyContent: 'space-between' },
  card: {
    width: '32%',
    paddingVertical: 9,
    paddingHorizontal: 9,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: C.line,
    backgroundColor: '#ffffff',
  },
  cardAccent: { backgroundColor: C.brandSoft, borderColor: C.brand },
  summaryLabel: {
    fontSize: 7.5,
    color: C.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 5,
  },
  summaryValue: { fontSize: 11, fontWeight: 'bold' },
  inflow: { color: C.green },
  outflow: { color: C.red },

  table: { width: '100%', borderWidth: 1, borderColor: C.line, borderRadius: 4 },
  tableHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.brand,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  th: {
    color: '#ffffff',
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: C.line,
  },
  rowAlt: { backgroundColor: C.zebra },

  colWhen: { width: '26%', paddingRight: 6 },
  colWho: { width: '25%', paddingRight: 6 },
  colRef: { width: '26%', paddingRight: 6 },
  colType: { width: '8%', alignItems: 'center' },
  colAmount: { width: '15%', textAlign: 'right', fontWeight: 'bold' },
  entryId: { fontWeight: 'bold', fontSize: 8.5 },
  subText: { fontSize: 7.5, color: C.muted, marginTop: 2 },
  clientText: { fontWeight: 'bold', fontSize: 8.5 },
  descText: { fontSize: 8, marginTop: 2 },
  refText: { fontSize: 7, color: C.muted },

  badge: {
    fontSize: 7,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 8,
    textAlign: 'center',
  },
  badgeCredit: { backgroundColor: C.greenBg, color: C.green },
  badgeDebit: { backgroundColor: C.redBg, color: C.red },

  footer: {
    position: 'absolute',
    bottom: 20,
    left: 32,
    right: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: C.line,
    paddingTop: 6,
    fontSize: 7.5,
    color: C.muted,
  },
});

const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const formatCurrency = (val) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val || 0);

const LedgerPDF = ({ data, metrics }) => {
  const currentDate = new Date().toLocaleDateString('en-IN');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.topBar} fixed />

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoSection}>
            <View style={styles.logoBox}>
              <Text style={styles.logoText}>HK</Text>
            </View>
            <View>
              <Text style={styles.companyName}>Harikrushn DigiVerse LLP</Text>
              <Text style={styles.companyAddress}>FLAT-204, 2nd FLOOR, RS NO-67/1, WING-A, HARIKRUSHANA COMPLEX, OPP.</Text>
              <Text style={styles.companyAddress}>BHAGAT NAGAR, VED, GURUKULROAD, KATARGAM, SURAT- 395004,</Text>
              <Text style={styles.companyAddress}>GUJARAT, INDIA.</Text>
              <Text style={styles.companyMeta}>Ph: +91 87805 64463 | sales@hkdigiverse.com</Text>
              <Text style={styles.companyMeta}>GSTIN: 24APQPN3916P1Z4 | PAN: AAXFN3372M</Text>
            </View>
          </View>
          <View>
            <Text style={styles.docBadge}>GENERAL LEDGER</Text>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.summarySection}>
          <View style={styles.summaryLeft}>
            <Text style={styles.summaryTitle}>Ledger Summary</Text>
            <Text style={styles.summaryDate}>Statement generated on {currentDate}</Text>
            <Text style={styles.summarySubtitle}>Contains {data.length} entries based on current filters.</Text>
          </View>
          <View style={styles.cards}>
            <View style={[styles.card, styles.cardAccent]}>
              <Text style={styles.summaryLabel}>Net Balance</Text>
              <Text style={styles.summaryValue}>{formatCurrency(metrics.net_balance)}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.summaryLabel}>Total Inflow</Text>
              <Text style={[styles.summaryValue, styles.inflow]}>{formatCurrency(metrics.total_inflow)}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.summaryLabel}>Total Outflow</Text>
              <Text style={[styles.summaryValue, styles.outflow]}>{formatCurrency(metrics.total_outflow)}</Text>
            </View>
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableHeaderRow} fixed>
            <Text style={[styles.th, styles.colWhen]}>Date / Entry ID</Text>
            <Text style={[styles.th, styles.colWho]}>Client / Description</Text>
            <Text style={[styles.th, styles.colRef]}>Reference</Text>
            <Text style={[styles.th, styles.colType, { textAlign: 'center' }]}>Type</Text>
            <Text style={[styles.th, styles.colAmount]}>Amount</Text>
          </View>

          {data.map((row, i) => {
            const isCredit = (row.type || '').toLowerCase() === 'credit';
            const prefix = isCredit ? '+' : '-';
            return (
              <View style={[styles.tableRow, i % 2 === 1 && styles.rowAlt]} key={i} wrap={false}>
                <View style={styles.colWhen}>
                  <Text style={styles.entryId}>{row.entry_id}</Text>
                  <Text style={styles.subText}>{formatDate(row.date)}</Text>
                </View>
                <View style={styles.colWho}>
                  <Text style={styles.clientText}>{row.client_name || '-'}</Text>
                  <Text style={styles.descText}>{row.description || '-'}</Text>
                </View>
                <Text style={[styles.colRef, styles.refText]}>{row.reference_id || '-'}</Text>
                <View style={styles.colType}>
                  <Text style={[styles.badge, isCredit ? styles.badgeCredit : styles.badgeDebit]}>{row.type}</Text>
                </View>
                <Text style={[styles.colAmount, isCredit ? styles.inflow : styles.outflow]}>
                  {prefix} {formatCurrency(row.amount)}
                </Text>
              </View>
            );
          })}

          {data.length === 0 && (
            <View style={[styles.tableRow, { justifyContent: 'center', padding: 15 }]}>
              <Text style={{ color: C.muted }}>No entries found.</Text>
            </View>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text>Harikrushn DigiVerse LLP · General Ledger</Text>
          <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
};

export default LedgerPDF;
