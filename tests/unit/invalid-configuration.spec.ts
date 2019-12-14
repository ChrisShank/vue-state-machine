import { useStateMachine } from '@/lib'

describe('Invalid configuration', () => {
	it('should throw an error when given no congifuration', () => {
		expect(() => useStateMachine({} as any)).toThrow()
	})

	it('should throw an error when given no states', () => {
		expect(() => useStateMachine({ states: {} } as any)).toThrow()
	})

	it('should throw an error when given no initial state', () => {
		expect(() =>
			useStateMachine({
				states: {
					idle: {},
				},
			} as any),
		).toThrow()
	})

	it('should throw an error when given an invalid initial state', () => {
		expect(() =>
			useStateMachine({
				initialState: '',
				states: {
					idle: {},
				},
			} as any),
		).toThrow()
	})
})
