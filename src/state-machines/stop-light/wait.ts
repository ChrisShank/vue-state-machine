export function wait(time: number = 2000): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, time))
}
