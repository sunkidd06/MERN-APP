import React from 'react';
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ActionButton from "./ActionButton"

function SinglePost(props) {
    const { post: { _id, status, title, description, url } } = props;
    return (
        <Card className="shadow" border={status === "LEARNED" ? 'success' : status === "LEARNING" ? "warning" : "danger"}>
            <Card.Body>
                <Card.Title>
                    <Row>
                        <Col>
                            <p className="post-title">{title}</p>
                            <Badge pill bg={status === "LEARNED" ? 'success' : status === "LEARNING" ? "warning" : "danger"}>
                                {status}
                            </Badge>
                        </Col>
                        <Col className="text-right" style={{ textAlign: "right" }}>
                            <ActionButton url={url} _id={_id} status={status === "LEARNED" ? 'success' : status === "LEARNING" ? "warning" : "danger"} />
                        </Col>
                    </Row>
                    <Card.Text>
                        {description}
                    </Card.Text>
                </Card.Title>
            </Card.Body>
        </Card>
    );
}

export default SinglePost; 