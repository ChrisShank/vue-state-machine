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
					throw new Error(`${this.currentStateName} is an invalid state name.`)
				}
				return state
			},
		},

		methods: {
			async runAction(): Promise<void> {
				const result = this.currentState.action()
				const { event } = result instanceof Promise ? await result : result
				const nextStateName = this.currentState.transitions[event]
				if (!nextStateName) {
					throw new Error(`${event} is an invalid event.`)
				}
				this.currentStateName = nextStateName
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
