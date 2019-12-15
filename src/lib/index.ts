import Vue, { VNode } from 'vue'
import { StateMachine } from './types'

export function useStateMachine<T extends Record<string, string> = any>({
	states,
	initialState,
	replaceComponent,
}: StateMachine<T>) {
	if (!states || Object.keys(states).length === 0) {
		throw new Error('Invalid state machine: No states were given.')
	}

	if (!initialState || !states.hasOwnProperty(initialState)) {
		throw new Error(`${initialState} is not a valid initial state.`)
	}

	return Vue.extend({
		data: () => ({
			currentStateName: initialState,
			inAcceptedState: false,
		}),

		computed: {
			currentState() {
				return states[this.currentStateName]
			},
		},

		methods: {
			async executeAction(): Promise<void> {
				if (this.inAcceptedState) return

				const result = this.currentState.action()
				const transition = result instanceof Promise ? await result : result
				if (transition) {
					const { event } = transition
					const nextStateName = this.currentState.transitions[event]
					if (!nextStateName) {
						throw new Error(`${event} is not a valid event.`)
					}

					if (!states.hasOwnProperty(nextStateName)) {
						throw new Error(`${nextStateName} is not a valid next state.`)
					}
					this.currentStateName = nextStateName
				} else {
					this.inAcceptedState = true
					this.$emit('accepted')
				}
			},
		},

		watch: {
			currentState: {
				immediate: true,
				handler(): void {
					if (this.currentState.immediate) {
						this.executeAction()
					}
				},
			},
		},

		render(h): VNode {
			return h(this.currentState.component, {
				props: this.currentState.propsData,
				key: replaceComponent ? (this.currentStateName as string) : undefined,
				on: {
					transition: this.executeAction,
				},
			})
		},
	})
}
