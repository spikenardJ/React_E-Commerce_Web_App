import { TextEncoder, TextDecoder } from 'util'
import '@testing-library/jest-dom'


global.TextEncoder = TextEncoder
// @ts-expect-error
global.TextDecoder = TextDecoder