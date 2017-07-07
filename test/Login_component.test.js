import React from 'react';
import renderer from 'react-test-renderer';
import { Login } from './../app/src/components/Login/Login';
import { loginUser } from './../app/src/redux/login';

describe('React component <Login />', () => {
  it('should render a Login with typed data' +
    ', especially checked out a correct work onChange and onSubmit functions', () => {
    const user = {
      actions: {
        loginUser
      }
    };
    const component = renderer.create(
      <Login {...user} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    const form = tree.children.filter(child => child.type === 'form')[0];
    const email = form.children[0].children[1].children.filter(child => child.props.type ===
     'email')[0];
    email.props.onChange({
      target: {
        value: 'ivan.yarymovych@gmail.com'
      }
    });
    const password = form.children[1].children[1].children.filter(child => child.props.type ===
     'password')[0];
    password.props.onChange({
      target: {
        value: 'P!assword!1'
      }
    });
    form.props.onSubmit({
      preventDefault: () => {},
    });
    tree = component.toJSON();
    
    expect(tree).toMatchSnapshot();
  });
});
