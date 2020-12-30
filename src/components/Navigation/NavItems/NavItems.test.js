import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import React from 'react';
import NavItems from './NavItems';
import NavItem from './NavItem/NavItem';

configure({adapter: new Adapter()})

describe('<NavItems />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavItems />);
    })
    it('should render 2 links - NavigationItem - if not authenticated', () => {
        expect(wrapper.find(NavItem)).toHaveLength(2)
    })
    it('should render 3 links - NavigationItem - if  authenticated', () => {
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.find(NavItem)).toHaveLength(3)
    })
    it('should render navItems - logout - if  authenticated', () => {
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.contains(<NavItem link='/logout' >Log Out</NavItem>)).toEqual(true);
    })
})