import { put } from "@redux-saga/core/effects";
import { push } from "connected-react-router";
import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import { CLEAR_ERROR_REQUEST } from "../redux/types";

const ErrorModal = () => {
    const dispatch = useDispatch()

    const { isModal, errorMsg, directLink } = useSelector((state) => state.error)

    const handleToggle = () => {
        dispatch({
            type: CLEAR_ERROR_REQUEST,
            payload: directLink,
        })
    }

    return (
        <Fragment>
            <Modal
                isOpen={isModal}
            >
                <ModalBody>
                    {errorMsg}
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
}

export default ErrorModal