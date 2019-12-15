import { useStateMachine } from '@/lib'
import { wait } from './wait'

export const RedLight = useStateMachine({
	initialState: 'walk',
	states: {
		walk: {
			component: { render: h => h('div', 'Walk!') },
			transitions: { timer: 'yield' },
			immediate: true,
			async action() {
				await wait()
				return { event: 'timer' }
			},
		},
		yield: {
			component: { render: h => h('div', 'Dont walk! (flashing)') },
			transitions: { timer: 'stop' },
			immediate: true,
			async action() {
				await wait()
				return { event: 'timer' }
			},
		},
		stop: {
			component: { render: h => h('div', 'Dont walk!') },
			transitions: {},
			immediate: true,
			async action() {
				await wait()
			},
		},
	},
})
