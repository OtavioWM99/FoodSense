import { TouchableOpacity, StyleSheet, Text, Alert } from "react-native"

export const ButtonItens = (props) => {

    return (
         <TouchableOpacity style={styles.styleButton} 
         onPress={props.handleSave}
         activeOpacity={0.6}
         >
            <Text style={styles.textButton}>Clique aqui</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    styleButton: {
        backgroundColor: '#D9D9D9',
        width: '70%',
        height: 55,
        marginVertical: 10,
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'center',
    },
    textButton: {
        color: '#000000',
        paddingLeft: 10,
        fontWeight: 'medium',
        fontSize: 16,
    },
})