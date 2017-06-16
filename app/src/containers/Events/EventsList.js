import React from 'react';
import { Link } from 'react-router';
import { ListGroup,ListGroupItem} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventsActions from '../../redux/EventsReducers';

class EventsList extends React.Component {

  constructor (props, context) {
    super(props, context);
    this.state = {
      events: []
    };
  }

  componentWillMount() {
    this.props.actions.retrieveEvents(this.state.events);
    const data = this.props.eventsList;
    this.setState({ eventsList: data.events });
  }

  render() {
    const id = this.props.id;
    const eventNode = this.props.eventsList.events.map((item) => {
      return (
        <Link
          to={'/events/' + item.id}
          className='list-group-item'
          key={item.id}>
          {item.name}
        </Link>
      );
    });

    return (
      <div>
        <h2>Events</h2>
        <ListGroup>
          <ListGroupItem>{eventNode}</ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  eventsList: state.eventsList
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(eventsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
