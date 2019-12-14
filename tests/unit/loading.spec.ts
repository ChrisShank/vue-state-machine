import { mount } from '@vue/test-utils'
import { StateMachine } from '@/lib/types'
import { useStateMachine } from '@/lib'
import { VNode } from 'vue'

export type StateTransitions = {
	on: 'switch'
	off: 'switch'
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
				switch: 'off',
			},
			action: () => ({ event: 'switch' }),
		},
		off: {
			component: {
				render(h): VNode {
					return h('div', 'off')
				},
			},
			transitions: {
				switch: 'on',
			},
			action: () => ({ event: 'switch' }),
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
		wrapper.vm.$children[0].$emit('transition')
		expect(wrapper.text()).toContain('on')
	})
})
