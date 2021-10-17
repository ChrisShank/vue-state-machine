import * as wait from "@/state-machines/stop-light/wait"
// @ponicode
describe("wait.wait", () => {
    test("0", () => {
        let callFunction: any = () => {
            wait.wait(2000)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            wait.wait(2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            wait.wait(20)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            wait.wait(5.0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            wait.wait(1000)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            wait.wait(-Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})
