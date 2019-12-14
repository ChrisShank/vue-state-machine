import Vue, { VNode } from 'vue'
import { StateMachine } from './types'

export function useStateMachine<T extends Record<string, string> = any>({
	states,
	initialState,
}: StateMachine<T>) {
	return Vue.extend({
		data: () => ({
			currentStateName: initialState,
		}),

		computed: {
			currentState() {
				const state = states[this.currentStateName]
				if (!state) {
					throw new Error('Invalid state transition')
				}
				return state
			},
		},

		render(h): VNode {
			return h(this.currentState.component)
		},
	})
}
