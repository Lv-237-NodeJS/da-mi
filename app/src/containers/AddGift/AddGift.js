import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel
} from 'react-bootstrap';
import './addGift.scss';

const FieldGroup = ({ id, label, ...props }) => (
  <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...props} />
  </FormGroup>
);

export default class AddGift extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: null,
      link: null,
      image: null,
      showModal: false
    };
  }

  inputs = {
    name: 'Name',
    link: 'Link',
    description: 'Description'
  };

  handleChange = stateName => e => {
    this.setState({
      [stateName]: e.target.value
    });
  };

  textFields = (param, inputs) => (
    <FieldGroup 
      key={param}
      id={param}
      label={this.inputs[param]}
      type='text'
      placeholder={this.inputs[param]}
      onChange={this.handleChange(param)}
      required={(param === 'name') && true || false}
    />
  );

  toggleModal = () => {
    this.setState({showModal: !this.state.showModal});
  };

  handleButtonClick = e => {
    e.preventDefault();
    this.props.actions.createGift(this.props.id, this.state);
    this.toggleModal();
  };

  handleChangeImage = e => {
    const self = this;
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = upload => {
      self.setState({
        image: upload.target.result
      });
    };
    reader.readAsDataURL(file);
  };

  render() {
    const inputForm = (
      <div className='gift-input'>
        {Object.keys(this.inputs).map(param =>
          this.textFields(param, this.inputs)
        )}
        <FieldGroup
          id="image"
          type="file"
          label="Image"
          onChange={this.handleChangeImage} 
          encType='multipart/form-data'
        />
        <Button type="submit" bsSize="large" block>
          Submit
        </Button>
      </div>
    );

    return (
      <div className='add-gift-button'>
        <Button bsSize="large" block onClick={this.toggleModal}>Add gift</Button>
        <Modal className='modal-dialog' show={this.state.showModal} onHide={this.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add gift</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleButtonClick}>
              {inputForm}
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
