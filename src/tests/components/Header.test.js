import React from 'react';
import { shallow } from 'enzyme';
// import toJSON from 'enzyme-to-json';
// import ReactShallowRenderer from 'react-test-renderer/shallow';
import { Header } from '../../components/Header';



// test case using ReactShallowRenderer
// test('should render Header correctly', () => {
//     const renderer = new ReactShallowRenderer();
//     renderer.render(<Header />);
//     expect(renderer.getRenderOutput()).toMatchSnapshot();  // need to run one time to capture snapshot
//     // console.log(renderer.getRenderOutput());            // Any future changes to component will be flagged
//                                                            // as errors can can fixed or snapshot updated
//                                                            // to reflect change (by typing the "u" key)
// })

// test case using Enzyme
test('should render Header correctly', () => {
    const wrapper = shallow(<Header startLogout={() => {}} />); // pass in function that does nothing
    // expect(wrapper).find('h1').length).toBe(1);          // Sample use of Enzyme
    // expect(toJSON(wrapper)).toMatchSnapshot();
    expect(wrapper).toMatchSnapshot();
});

test('should call startLogout on button click', () => {
    const startLogout = jest.fn();
    const wrapper = shallow(<Header startLogout={startLogout} />); // pass in function that does nothing
                                                                // Sample use of Enzyme
    wrapper.find('button').simulate('click');
        // expect(wrapper).find('h1').length).toBe(1);
        // expect(toJSON(wrapper)).toMatchSnapshot();
    expect(startLogout).toHaveBeenCalled();
});

