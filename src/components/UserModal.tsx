import React from "react";
import { Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
   } from "@chakra-ui/react";
//Create a new modal component <UserModal> that
// pops up when the card is clicked. In this modal, list all the user's information including name, email, phoneNumber,
// and userId. 
type Props = {
    user: any;
    showUserModal: boolean;
    onClose: () => void;
}
const UserModal: React.FC<Props> = (props: Props) => {
    return (
        <>
        <Modal isOpen={props.showUserModal} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{props.user.name.first} {props.user.name.last}</ModalHeader>
            <ModalCloseButton onClick={props.onClose} />
            <ModalBody>
                Email: {props.user.email}
                <br />
                Phone Number: {props.user.phoneNumber}
                <br />
                User Id: {props.user.userId}
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
            </ModalContent>
            </Modal>
        </>
    );
}
export default UserModal;