import { Component } from 'vue'

type Key = string | number | symbol

export type StateMachine<T extends Record<string, string> = any> = {
	initialState: keyof T
	states: {
		[K in keyof T]: State<T[K], keyof T>
	}
}

export type State<T extends Key = string, N = string> = {
	component: Component
	transitions: Record<T, N>
	action: () => Promise<Transition<T>>
}

export type Transition<E extends Key = string> = {
	event: E
	payload?: unknown
}
