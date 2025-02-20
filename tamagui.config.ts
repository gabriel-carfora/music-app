import { config as configBase } from '@tamagui/config/v3'
import { createTamagui } from 'tamagui'

const customConfig = {
 ...configBase,
 themes: {
   ...configBase.themes,
   toast_error: {
     background: '#FF4444',
     color: 'white' 
   },
   toast_info: {
     background: '#3B82F6',
     color: 'white'
   }, 
   toast_warning: {
     background: '#F59E0B',
     color: 'white'
   },
   toast_success: {
    background: '#AFE1AF',
    color: 'white'
   }
 }
}

export const config = createTamagui(customConfig)
export default config
export type Conf = typeof config

declare module 'tamagui' {
 interface TamaguiCustomConfig extends Conf {}
}