import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#E4E4E4'
    },
    section: {
        // textAlign:'center',
        margin: 10,
        padding: 10,
        fontSize:'10px'
    },
    heading:{
        fontSize:"25px",
        fontWeight:900,
        textAlign:'center'
    }
});

function Pdf() {
    return (
        <>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text style={styles.heading}>A Simple PDF File </Text>
                    </View>
                    <View style={styles.section}>
                        <Text>This is a small demonstration .pdf file -  just for use in the Virtual Mechanics tutorials. More text. And more
                            text. And more text. And more text. And more text.
                            And more text. And more text. And more text. And more text. And more
                            text. And more text. Boring, zzzzz. And more text. And more text. And
                            more text. And more text. And more text. And more text. And more text.
                            And more text. And more text.
                            And more text. And more text. And more text. And more text. And more
                            text. And more text. And more text. Even more. Continued on page 2 ...</Text>
                    </View>
                    <Text>
                        
                    </Text>
                </Page>
            </Document>
        </>
    )
}

export default Pdf;