import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import DirectionItems from './DirectionItems';
import DirectionItem from './DirectionItem/DirectionItem';

configure({adapter : new Adapter()})

let wrapper = null;
beforeEach(() => {
    return wrapper = shallow(<DirectionItems />)
})

describe('<DirectionItems/>',() => {
    it("from Test file",() => {
        expect(wrapper.find(DirectionItem)).toHaveLength(2)
    })
})

describe('<DirectionItems/>',() => {
    it("from Test file",() => {
        wrapper.setProps({isOk : true})
        expect(wrapper.find(DirectionItem)).toHaveLength(3)
    })
})