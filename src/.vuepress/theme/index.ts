import { DefaultThemeOptions, Theme } from "vuepress";
import { path } from '@vuepress/utils'
import {defaultTheme as baseTheme} from "@vuepress/theme-default/lib/index"
import {assignDefaultLocaleOptions} from "@vuepress/theme-default/lib/node"

export const defaultTheme: Theme<DefaultThemeOptions> = (options, app) => {
    assignDefaultLocaleOptions(options)
    
    return {
        ...(<any>baseTheme)(options, app),
        
        name: "custom-theme",
        layouts: path.resolve(__dirname, "./layouts"),
    }
}

export default defaultTheme