import { useStateMachine } from '@/lib'
import Light from './light.vue'
import { wait } from './wait'

export const StopLight = useStateMachine({
	initialState: 'green',
	states: {
		green: {
			component: Light,
			propsData: { activeLight: 'green' },
			transitions: { yield: 'yellow' },
			immediate: true,
			async action() {
				await wait()
				return { event: 'yield' }
			},
		},
		yellow: {
			component: Light,
			propsData: { activeLight: 'yellow' },
			transitions: { stop: 'red' },
			immediate: true,
			async action() {
				await wait()
				return { event: 'stop' }
			},
		},
		red: {
			component: Light,
			propsData: { activeLight: 'red' },
			transitions: { go: 'green' },
			action: () => ({ event: 'go' }),
		},
	},
})
