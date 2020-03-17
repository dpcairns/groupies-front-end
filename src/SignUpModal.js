// is this file used? if not, it should be deleted, or else it will confuse future developers
import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

export function SignUpModal(props) {
    return (
    // nice reaching for a library!
    <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Sign Up!
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h4>Centered Modal</h4>
        <p>

        </p>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
    </Modal>
    );
}

function MakeButtonAppear() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
    <ButtonToolbar>
        <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
        </Button>

        <SignUpModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        />
    </ButtonToolbar>
    );
}

// render(<App />);

// export class SignUpModal extends Component {
//     render() {
//         return(
//             <div>
//                 <Modal
//         {...props}
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//     >
//         <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//             Sign Up!
//         </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//         <h4>Centered Modal</h4>
//         <p>

//         </p>
//         </Modal.Body>
//         <Modal.Footer>
//         <Button onClick={props.onHide}>Close</Button>
//         </Modal.Footer>
//     </Modal>
//             </div>
//     );
//     }
// }