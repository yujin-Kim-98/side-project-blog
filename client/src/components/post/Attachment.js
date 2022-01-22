import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Col, FormGroup, Label } from "reactstrap";
import { S3_UPLOAD_REQUEST } from "../../redux/types";

const Attachment = () => {
    const dispatch = useDispatch();

    const fileType = 'ATTACHMENT';

    const uploadHandle = (e) => {
        const file = {
            data: e.target.files[0],
            fileType: fileType,
        }

        dispatch({
            type: S3_UPLOAD_REQUEST,
            payload: file,
        });
    };

    return (
        <Fragment>
            <FormGroup row>
                <Label
                    sm={2}
                >
                    File
                </Label>
                <Col
                    sm={10}
                >
                    <input
                        className="form-control"
                        type="file"
                        onChange={uploadHandle}
                    />
                </Col>
            </FormGroup>
        </Fragment>
    );
};

export default Attachment;