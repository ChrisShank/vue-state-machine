import { mount } from '@vue/test-utils'
import { useStateMachine } from '@/lib'
import { VNode } from 'vue'

describe('Invalid Transitions', () => {
	it('should throw an error because the event is invalid', () => {
		const component = useStateMachine({
			initialState: 'off',
			states: {
				off: {
					component: {
						render(h): VNode {
							return h('div', 'off')
						},
					},
					transitions: {} as any,
					action: () => ({ event: '' }),
				},
			},
		})

		const wrapper = mount(component)
		wrapper.vm.executeAction()

		// TODO: test that running this action will throw an error
	})
})
