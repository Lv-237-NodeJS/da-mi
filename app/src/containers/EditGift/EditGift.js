import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel, Checkbox
} from 'react-bootstrap';
import { ModalWindow } from 'src/components';
import './editGift.scss';

const FieldGroup = ({ id, label, ...props }) => (
  <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...props} />
  </FormGroup>
);

export default class EditGift extends React.Component {
  constructor(props) {
    super(props);

    this.state = {...this.props.gift,
      showModal: false,
      checked: this.props.gift.status === 'hasOneDonor'
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

  handleCheck = () => {
    this.setState({checked: !this.state.checked});
  };

  handleCheckbox = e => {
    this.setState(!this.state.checked && {status: 'hasOneDonor'} ||
      {status: 'hasMultipleDonors'});
    this.handleCheck();
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
    const {actions, id, gift} = this.props;
    e.preventDefault();
    actions.updateGift(id, gift.id, this.state);
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
        <div className='gift-checkbox'>
          <Checkbox
            checked={this.state.checked}
            inline
            onChange={this.handleCheckbox}>
              Only one person can check this gift
          </Checkbox>
        </div>
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
      <ModalWindow
        title = {`Edit ${this.props.gift.name}`} bsStyle = {'info'}
        buttonName = {'Edit'} styleName = {'modal-dialog'}
        buttonClassName = {'btn-sm'}
        toggleModal = {this.toggleModal} showModal = {this.state.showModal}
        body = {
          <form onSubmit={this.handleButtonClick}>
            {inputForm}
          </form>
        }
      />
    );
  }
}
