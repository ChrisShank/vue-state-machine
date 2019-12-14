import { mount } from '@vue/test-utils'
import { StateMachine } from '@/lib/types'
import { useStateMachine } from '@/lib'
import { VNode } from 'vue'

export type StateTransitions = {
	on: 'submit'
	off: 'error' | 'end'
}

const stateMachine: StateMachine<StateTransitions> = {
	initialState: 'off',
	states: {
		on: {
			component: {
				render(h): VNode {
					return h('div', 'on')
				},
			},
			transitions: {
				submit: 'on',
			},
			action: async () => ({ event: 'submit' }),
		},
		off: {
			component: {
				render(h): VNode {
					return h('div', 'off')
				},
			},
			transitions: {
				error: 'on',
				end: 'off',
			},
			action: async () => ({ event: 'end' }),
		},
	},
}

describe('On/Off States', () => {
	it('should render the initial state', () => {
		const component = useStateMachine(stateMachine)
		const wrapper = mount(component)
		expect(wrapper.text()).toContain('off')
	})

	it('should render the correct state after a transition', () => {
		const component = useStateMachine(stateMachine)
		const wrapper = mount(component)
		wrapper.trigger
		expect(wrapper.text()).toContain('on')
	})
})
