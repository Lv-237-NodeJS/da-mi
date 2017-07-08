import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel,
} from 'react-bootstrap';
import './editGift.scss';

const FieldGroup = ({ id, label, ...props }) => (
  <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...props} />
  </FormGroup>
);

export default class EditGift extends React.Component {
  constructor (props) {
    super(props);

    this.state = {...this.props.gift, showModal: false};
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
      value={this.state[param] || ''}
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
    this.props.actions.updateGift(this.props.id, this.props.gift.id, this.state);
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

  render () {

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
          Save changes
        </Button>
      </div>
    );

    return (
      <div>
        <Button bsSize='small' bsStyle='info' onClick={this.toggleModal}>Edit</Button>
        <Modal className='modal-dialog' show={this.state.showModal} onHide={this.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit {this.props.gift.name}</Modal.Title>
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
