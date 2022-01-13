import React, { Fragment } from "react";
import { Row, Col } from "reactstrap";

const Footer = () => {
    const thisYear = () => {
        const year = new Date().getFullYear();
        return year;
    }

    return (
        <Fragment>
            <footer>
                <div className="inner">
                    <ul className="address">
                        <li>Copyright &copy; <span>{thisYear()}</span></li>
                    </ul>
                </div>
            </footer>
        </Fragment>
    )
};

export default Footer;
