import { shallowMount } from '@vue/test-utils'

const stateMachine: StateMachine<StateTransitions> = {
	initialState: 'off',
	states: {
		on: {
			component: {},
			transitions: {
				submit: 'on'
			},
			action: async () => ({ event: 'submit' })
		},
		off: {
			component: {},
			transitions: {
				error: 'on',
				end: 'off'
			},
			action: async () => ({ event: 'end' })
		}
	}
}

describe('', () => {})
