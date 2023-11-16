import React from "react";
import { Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
   } from "@chakra-ui/react";
type Props = {
    user: any;
    showHexathonModal: boolean;
    onClose: () => void;
    appliedHexathons: any[];
}
const HexathonModal: React.FC<Props> = (props: Props) => {
    return (
        <>
        <Modal isOpen={props.showHexathonModal} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{props.user.name.first} {props.user.name.last}'s Hexathons</ModalHeader>
            <ModalCloseButton onClick={props.onClose} />
            <ModalBody>
                {props.appliedHexathons.map((hexathon: any) => {
                    return (
                        <Text>{hexathon.name}</Text>
                    )
                })}
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
            </ModalContent>
            </Modal>
        </>
    );
}
export default HexathonModal;