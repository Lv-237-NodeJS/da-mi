import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

export default class updateGiftForm extends React.Component {

  render () {
    const {gift} = this.props;

    const FieldGroup = ({label, ...props}) => (
      <div>
        <FormGroup>
          <ControlLabel>{label}</ControlLabel>
          <FormControl {...props} />
        </FormGroup>
      </div>
    );

    const fields = {
      name: 'Name',
      description: 'Description',
      link: 'Link',
    };

    const form = (
      <Form horizontal>
        <Row>
          { Object.keys(fields, gift).map(param =>
            <FieldGroup
              key={param}
              label={fields[param]}
              name={param}
              placeholder={fields[param]}
              value={gift[param]}
            />
          )}
        </Row>
        <Row>
          <hr/>
          <ButtonToolbar>
            <Button type='submit' bsStyle='primary'>
              Save Changes
            </Button>
            <span> </span>
            <Button type='reset' bsStyle='default'>
              Cancel
            </Button>
          </ButtonToolbar>
        </Row>
      </Form>
    );
  }
}
