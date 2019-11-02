import React, { useState, Component } from 'react';
import { Button, Collapse, Form } from 'react-bootstrap';
import Axios from 'axios';

function MakeComment(props) {

    function handleOnClick (event) {
        event.preventDefault();
        let data = {
            comment: document.getElementById(props.postId).value,
            postId: props.postId,
            user: props.user
        }
        Axios
            .post("/api/savecomment/", data)
            .then(resp => {
                console.log(resp);
                window.location.replace("/");
            })
            .catch(err => {
                console.log(err);
            });
        
    }

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
                <div id="example-collapse-text" style={{marginTop: "15px"}}>
                    {props.comment.map((item, index) => (
                        <div key={index}>{item.user}: {item.comment}</div>
                    ))}

                    <Form>
                        <Form.Group controlId={props.postId}>
                            <Form.Label>Make a comment: </Form.Label>
                            <Form.Control as="textarea" rows="3" name="comment" />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleOnClick}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </Collapse>
        </>
    );
}


export default MakeComment;