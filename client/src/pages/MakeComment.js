import React, { useState, Component } from 'react';
import { Button, Collapse, Form } from 'react-bootstrap';

function MakeComment(props) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button
                className="btn-sm"
                variant="outline-primary"
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
            >
                Show Comments
            </Button>
            <Collapse in={open}>
                <div id="example-collapse-text">
                    {props.notes}

                    <Form action="/api/savecomment/" method="POST">
                        <Form.Group controlId="newComment">
                            <Form.Label>Make a comment: </Form.Label>
                            <Form.Control as="textarea" rows="3" name="comment" />
                            <Form.Control value={props.postId} name="postId" style={{display: "none"}} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </Collapse>
        </>
    );
}


export default MakeComment;