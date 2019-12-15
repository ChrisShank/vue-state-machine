import Vue, { Component } from 'vue'

type Key = string | number | symbol

export type StateMachine<T extends Record<string, string> = any> = {
	initialState: keyof T
	states: {
		[K in keyof T]: State<T[K], keyof T>
	}
	replaceComponent?: boolean
}

export type State<T extends Key = string, N = string> = {
	action: () => void | Transition<T> | Promise<Transition<T> | void>
	component: Component
	transitions: Record<T, N>
	immediate?: boolean
	propsData?: Record<string, any>
}

export type Transition<E extends Key = string> = {
	event: E
	payload?: unknown
}
