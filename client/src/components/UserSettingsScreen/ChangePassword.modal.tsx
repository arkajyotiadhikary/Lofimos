import React from "react";
import {
    Modal,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles/UserSettings.style";
import { RootStackNavigationProp } from "../../../types";
import { FC } from "react";

interface ChangePasswordProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangePassword: FC<ChangePasswordProps> = ({
    modalVisible,
    setModalVisible,
}) => {
    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <Modal
            visible={modalVisible}
            transparent
            animationType="slide"
            onRequestClose={closeModal}
        >
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.modalContainer}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Change Password</Text>
                        <Text style={styles.modalInputTitle}>
                            Current Password
                        </Text>
                        <View style={styles.modalInputContainer}>
                            <TextInput
                                secureTextEntry
                                style={styles.modalInput}
                            />
                        </View>
                        <Text style={styles.modalInputTitle}>New Password</Text>
                        <View style={styles.modalInputContainer}>
                            <TextInput
                                secureTextEntry
                                style={styles.modalInput}
                            />
                        </View>
                        <TouchableOpacity style={styles.modalBtn}>
                            <Text style={styles.modalBtnText}>
                                Change Password
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default ChangePassword;
