import { mount } from '@vue/test-utils'
import { StateMachine } from '@/lib/types'
import { useStateMachine } from '@/lib'

export type StateTransitions = {
	on: 'switch'
	off: 'switch'
}

const stateMachine: StateMachine<StateTransitions> = {
	initialState: 'off',
	states: {
		on: {
			component: {
				render(h) {
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
				render(h) {
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
	it('should render the correct state after transitions', () => {
		const component = useStateMachine(stateMachine)
		const wrapper = mount(component)
		expect(wrapper.text()).toContain('off')

		wrapper.vm.executeAction()
		expect(wrapper.text()).toContain('on')

		wrapper.vm.executeAction()
		expect(wrapper.text()).toContain('off')
	})
})
