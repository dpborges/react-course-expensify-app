import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
// import ReactShallowRenderer from 'react-test-renderer/shallow';
import Header from '../../components/Header';



// test case using ReactShallowRender
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
    const wrapper = shallow(<Header />);
    // expect(wrapper).find('h1').length).toBe(1);          // Sample use Enzyme
    // expect(toJSON(wrapper)).toMatchSnapshot();
    expect(wrapper).toMatchSnapshot();
});