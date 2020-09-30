import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';

class Signup extends Component {

    id = 0;

    constructor(props) {
        super(props);
        this.state = {
            code: 0,
            selectRole: 0,
            username: '',
            email: '',
            password: '',
            id_card: '',
            cellphone: '',
            created_by: '',
            modified_by: ''
        }
    }

    componentDidMount() {
    }

    render() {

        return (
            <div className="container">
                User Form
                <Modal>

                    <ModalHeader>
                        <h4>Mantenimineto de Usuarios</h4>
                    </ModalHeader>

                    <ModalBody>

                        <FormGroup>
                            <Label> ID:</Label>
                            <Input type="text" name="code" value={this.state.code}></Input>
                        </FormGroup>

                    </ModalBody>

                    <ModalFooter>

                    </ModalFooter>

                </Modal>
            </div>
        );
    }

}

export default Signup;