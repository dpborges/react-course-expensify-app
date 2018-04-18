import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';
import { start } from 'repl';



// test case using Enzyme
test('should render LoginPage correctly', () => {
    const wrapper = shallow(<LoginPage />);        // Render page
    expect(wrapper).toMatchSnapshot();             // Add a snapshot
});

test('should call startLogout on button click', () => {
    const startLogin = jest.fn();
    const wrapper = shallow(<LoginPage startLogin={startLogin} />); // pass in spy
                                                                
    wrapper.find('button').simulate('click');
        // expect(wrapper).find('h1').length).toBe(1);
        // expect(toJSON(wrapper)).toMatchSnapshot();
    expect(startLogin).toHaveBeenCalled();
});

