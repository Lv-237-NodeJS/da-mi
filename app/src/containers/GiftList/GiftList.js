import React from 'react';
import { Accordion, Panel, Button, ButtonToolbar, Modal } from 'react-bootstrap';
import './giftList.scss';

export default class GiftList extends React.Component {
  render() {

    const giftNode = this.props.gifts.map((gift, id) => {
      return (
        <Panel header={gift.name} eventKey={gift.id} key={gift.id}>
          <p><strong>Description: </strong>{gift.description}</p>
          <p><strong>Link: </strong>{gift.link}</p>
          <ButtonToolbar>
            <Button bsStyle="info" bsSize="small">Edit</Button>
            <Button bsStyle="danger" bsSize="small">Delete</Button>
            {gift.is_available === true && <Button bsStyle="success" bsSize="small">Choose</Button>}
          </ButtonToolbar>
        </Panel>
      );
    });

    return (
      <div>
        <Accordion>
          {giftNode}
        </Accordion>
      </div>
    );
  }
}
