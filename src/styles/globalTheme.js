// global theme setup for Application
import { createMuiTheme } from "@material-ui/core";

// theme colors for app
// docs: https://material-ui.com/customization/theming/
// generated via https://in-your-saas.github.io/material-ui-theme-editor/
export const appTheme = createMuiTheme({
    palette: {
        common: {
            black: "#000",
            white: "#fff",
        },
        background: {
            paper: "#fff",
            "default": "#fafafa",
        },
        primary: {
            light: "rgba(77, 184, 169, 1)",
            main: "rgba(0, 136, 122, 1)",
            dark: "rgba(0, 90, 78, 1)",
            contrastText: "#fff",
        },
        secondary: {
            light: "rgba(255, 199, 102, 1)",
            main: "rgba(214, 150, 55, 1)",
            dark: "rgba(160, 104, 0, 1)",
            contrastText: "#fff",
        },
        error: {
            light: "rgba(241, 109, 109, 1)",
            main: "rgba(247, 28, 12, 1)",
            dark: "rgba(153, 22, 22, 1)",
            contrastText: "#fff",
        },
        text: {
            primary: "rgba(0, 0, 0, 0.87)",
            secondary: "rgba(0, 0, 0, 0.54)",
            disabled: "rgba(0, 0, 0, 0.38)",
            hint: "rgba(0, 0, 0, 0.38)",
        },
    },
});

// export const appTheme = createMuiTheme({
//     palette: {
//         common: {
//             black: "#000",
//             white: "#fff",
//         },
//         background: {
//             paper: "#fff",
//             default: "#fafafa",
//         },
//         primary: {
//             light: "#7986cb",
//             main: "#3f51b5",
//             dark: "#303f9f",
//             contrastText: "#fff",
//         },
//         secondary: {
//             light: "#ff4081",
//             main: "#f50057",
//             dark: "#c51162",
//             contrastText: "#fff",
//         },
//         error: {
//             light: "#e57373",
//             main: "#f44336",
//             dark: "#d32f2f",
//             contrastText: "#fff",
//         },
//         text: {
//             primary: "rgba(0, 0, 0, 0.87)",
//             secondary: "rgba(0, 0, 0, 0.54)",
//             disabled: "rgba(0, 0, 0, 0.38)",
//             hint: "rgba(0, 0, 0, 0.38)",
//         },
//     },
// });
