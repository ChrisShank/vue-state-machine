import Vue, { VNode } from 'vue'
import { StateMachine } from './types'

export function useStateMachine<T extends Record<string, string> = any>({
	states,
	initialState,
}: StateMachine<T>) {
	if (!states.hasOwnProperty(initialState)) {
		throw new Error(`${initialState} is not a valid initial state.`)
	}

	return Vue.extend({
		data: () => ({
			currentState: states[initialState],
		}),

		methods: {
			async runAction(): Promise<void> {
				const result = this.currentState.action()
				const { event } = result instanceof Promise ? await result : result
				const nextStateName = this.currentState.transitions[event]
				if (!nextStateName) {
					throw new Error(`${event} is not a valid event.`)
				}

				const nextState = states[nextStateName]
				if (!nextState) {
					throw new Error(`${nextState} is not a valid next state.`)
				}
				this.currentState = nextState
			},
		},

		watch: {
			currentState(): void {
				if (this.currentState.immediate) {
					this.runAction()
				}
			},
		},

		render(h): VNode {
			return h(this.currentState.component, {
				on: {
					transition: this.runAction,
				},
			})
		},
	})
}
