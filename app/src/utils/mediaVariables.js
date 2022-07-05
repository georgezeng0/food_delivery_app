
const ScreenSizes = {
    "breakpoint_sm": getComputedStyle(document.documentElement)
    .getPropertyValue('--breakpoint-sm'),
    "breakpoint_md":     getComputedStyle(document.documentElement)
    .getPropertyValue('--breakpoint-md'),
    "breakpoint_lg": getComputedStyle(document.documentElement)
    .getPropertyValue('--breakpoint-lg'),
    "breakpoint_xl": getComputedStyle(document.documentElement)
    .getPropertyValue('--breakpoint-xl')
  };
  
  export default ScreenSizes;