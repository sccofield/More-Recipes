
import React from 'react';
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme';
import history from 'history/createBrowserHistory';
import Pagination from 
'../../main/src/components/recipes/Pagination';

const props = {
  recipesPagination: jest.fn(),
  recipesCount: 4
};

const generateEvent = (name = '') => {
    return {
      preventDefault: jest.fn(),
      target: {
        name: name,
        id: 1
      }
    }
}

describe('# Pagination', () => {
  const wrapper = shallow(<Pagination {...props} />);
  it('should render successfully', (done) => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper).toMatchSnapshot();
    done();
  });

  // it('should call click Previous', (done) => {
  //   const event = generateEvent()
  //   const previous = wrapper.find('#previous').get(1)
  //   // console.log('previous', previous.get(0))
  //   previous.simulate('click', event);
  //   done();
  // });

});
