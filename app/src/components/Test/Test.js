import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as itemActions from '../../actions/actions';

class Test extends React.Component {
  constructor (props, context) {
    super(props, context);

    this.state = {
      item: {title: ''}
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  onTitleChange(event) {
    const item = this.state.item;
    item.title = event.target.value;
    this.setState({item: item});
  }

  onClickSave() {
    this.props.actions.createItem(this.state.item);
  }

  itemRow(item, index) {
    return <div key={index}>{item.title}</div>;
  }

  render () {
    return (
      <div>
        <h1>Redux demonstration</h1>
        {this.props.items.map(this.itemRow)}
        <h2>Add something!</h2>
        <input
          type='text'
          onChange={this.onTitleChange}
          value={this.state.item.title}
        />
        <input
          type='submit'
          value='Save'
          onClick={this.onClickSave}
        />
      </div>
    );
  }
}

function mapStatetoProps(state, ownProps) {
  return {
    items: state.items
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(itemActions, dispatch)
  };
}

export default connect(mapStatetoProps, mapDispatchToProps)(Test);
