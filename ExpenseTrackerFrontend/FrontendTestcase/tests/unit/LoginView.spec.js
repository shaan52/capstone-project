import { shallowMount } from '@vue/test-utils';
import LoginView from '@/views/LoginView.vue';
import Vuex from 'vuex';

describe('LoginView.vue', () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      login: jest.fn(() => Promise.resolve()),
    };
    store = new Vuex.Store({
      actions,
    });
  });

  it('renders login form', () => {
    const wrapper = shallowMount(LoginView, { global: { plugins: [store] } });
    expect(wrapper.find('form').exists()).toBe(true);
  });

  it('calls login action on form submit', async () => {
    const wrapper = shallowMount(LoginView, { global: { plugins: [store] } });

    await wrapper.setData({ username: 'testuser', password: 'password' });
    await wrapper.find('form').trigger('submit.prevent');

    expect(actions.login).toHaveBeenCalled();
    expect(actions.login.mock.calls[0][1]).toEqual({
      username: 'testuser',
      password: 'password',
    });
  });
});
