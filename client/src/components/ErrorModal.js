import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import { CLEAR_ERROR_REQUEST } from "../redux/types";

const ErrorModal = (props) => {
    const { isModal, errorMsg } = props;

    const dispatch = useDispatch();

    const [modal, setModal] = useState(false);
    const [modalMsg, setModalMsg] = useState("");

    useEffect(() => {
        try {
            setModal(isModal);
            setModalMsg(errorMsg);
        } catch(e) {
            console.error(e);
        }
    });

    const handleToggle = () => {
        dispatch({
            type: CLEAR_ERROR_REQUEST,
        });
    };

    return (
        <Fragment>
            <Modal
                isOpen={modal}
            >
                <ModalBody>
                    {modalMsg}
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={handleToggle}
                    >
                        확인
                    </Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    )
};

export default ErrorModal;