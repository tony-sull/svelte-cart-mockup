import { toDateString } from '../toDateString'

test('should return a string', () => {
    const result = toDateString(new Date())
    expect(typeof result).toBe('string')
})