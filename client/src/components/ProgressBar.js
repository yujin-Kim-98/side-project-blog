import React, { Fragment } from "react";
import { Modal, ModalBody, Progress, Spinner } from "reactstrap";

const ProgressBar = () => {
    return (
        <Fragment>
            <Spinner/>
            <div className="spinner-backdrop"></div>
        </Fragment>
    );
};

export default ProgressBar;