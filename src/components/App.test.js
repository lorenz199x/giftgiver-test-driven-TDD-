import React from 'react';
import { shallow, configure } from 'enzyme';
import App from './App';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter(), disableLifecycleMethods: true });

describe('App', () => {
  const app = shallow(<App />);
  // render giftgiver
  it('renders correctly', () => {
    expect(app).toMatchSnapshot();
  });
  //check state 'gifts'
  it('initializes the `state` with an empty list of gifts', () => {
    expect(app.state().gifts).toEqual([]);
  });

  // step2 // check button onclick
  describe('when clicking the `add-gift` button', () => {
    const id = 1;

    //before each use if there's a duplicate function for button
    beforeEach(() => {
      app.find('.btn-add').simulate('click');
    });

    afterEach(() => {
      app.setState({ gifts: [] })
    });
    // check button onclick
    it('adds a new gift to `state`', () => {
      expect(app.state().gifts).toEqual([{ id }]);
    });
    //add and check the gift list
    it('adds a new gift to the rendered list', () => {
      expect(app.find('.gift-list').children().length).toEqual(1);
    });

    it('creates a Gift component', () => {
      expect(app.find('Gift').exists()).toBe(true);
    })

    describe('and the user wants to remove the added gift', () => {
      beforeEach(() => {
        app.instance().removeGift(id);
      });

      it('removes the gifts from the `state`', () => {
        expect(app.state().gifts).toEqual([]);
      });
    })
  });

})

