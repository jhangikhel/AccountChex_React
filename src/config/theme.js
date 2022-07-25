import { createMuiTheme } from "@material-ui/core/styles";

export const quillgreen = createMuiTheme({
  palette: {
    primary: {
      main: "#049AB8",
      dark: "#0dbfe2",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#D8FEFA",
      contrastText: "#707070",
    },

    headIcon: {
      color: "#919C9B",
    },

    textcolor: {
      color: "#797979",
    },
  },

  appBar: {},

  /* global css clasess */

  root: {
    background: "#f1f1f1",
  },

  /* button classes */

  typography: {
    h2: {
      fontSize: "3.85rem",
      marginBottom: "15px",
      lineHeight: "normal",
      fontWeight: 400,
    },

    h3: {
      fontSize: "1.68rem",
      marginBottom: "15px",
      lineHeight: "normal",
    },
  },

  MuiFormControl: {
    height: "35px",
    padding: "2px 5px",
  },

  overrides: {
    root: {
      background: "#f2f2f2",
    },

    MuiDrawer: {
      root: {
        paddingTop: "90px",
      },
    },

    MuiOutlinedInput: {
      padding: "2px 0px 2px 10px",
      root: {
        padding: "2px 0px 2px 10px",
        "& input[type='text']": {
          padding: "2px 0px 2px 10px",
        },
      },
    },

    MuiAutocomplete: {
      root: {
        padding: "0px 0px",
        "& input": {
          background: "#fff",
          padding: "2px 0px 2px 10px !important",
          lineHeight: "normal",
        },
      },
    },

    MuiContainer: {
      root: {
        marginBottom: "30px",
        background: "#F5F5F5",
        padding: "0px 15px",
      },
    },
    /* button css overrides */
    MuiButton: {
      root: {
        height: "35px",
        margin: "0px 10px",
        minWidth: "120px",
        textAlign: "center",
        borderRadius: 2,
      },
      contained: {
        boxShadow: "1px 1px 2px #ddd",
      },
    },

    MuiSelect: {
      root: {
        background: "#fff",
        height: "35px",
        padding: "2px 0px 2px 10px",
        lineHeight: "normal",
      },
    },

    MuiInputBase: {
      root: {
        background: "#fff",
        height: "35px",
        lineHeight: "normal",
      },
    },

    MuiOutlinedInput: {
      root: {
        padding: "2px 0px 2px 10px",
      },
    },

    MuiInputLabel: {
      outlined: {
        transform: "translate(14px, 10px)",
      },
      root: {
        color: "#000",
      },
    },

    MuiTextField: {
      root: {
        background: "white",
        position: "relative",
        padding: "0px 0px",
        "& input[type='text']": {
          background: "#fff",
          padding: "2px 10px",
          lineHeight: "normal",
        },
      },
    },
    MuiFormHelperText: {
      root: {
        position: "absolute",
        right: 0,
        bottom: "-21px",
        marginRight: "0px !important",
        marginLeft: "0px !important",
      },
    },

    MuiAccordion: {
      root: {
        marginBottom: "30px",
        boxShadow: "none",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#049AB8",
      },
    },
    MuiAccordionActions: {
      root: {
        background: "#049AB8",
        color: "#ffffff",
        minHeight: "30px !important",
      },
    },
    MuiAccordionSummary: {
      root: {
        background: "#049AB8",
        color: "#ffffff",
        padding: "0px 10px",
        fontSize: "1.5rem",
        margin: "0px 0px",
        minHeight: "30px !important",
        "& div": {
          margin: "0px 10px !important",
        },
      },
      expandIcon: {
        color: "#fff",
        fontSize: "25px",
      },
    },
    MuiAccordionDetails: {
      root: {
        paddingTop: "30px",
      },
    },

    /* ============ table css ============= */
    MuiTableHead: {
      root: {
        backgroundColor: "#dedede !important",
        // borderTop: "1px #ccc solid",
      },
    },

    MuiTablePagination: {
      root: {
        justifyContent: "flex-end",
        textAlign: "right",
      },
      toolbar: {
        paddingLeft: 5,
        justifyContent: "flex-end",
      },
      spacer: {
        display: "none",
      },
      actions: {},
    },

    /* stickyHeader: {
      backgroundColor: "#ff0 !important",
      borderTop: "1px #ccc solid",
      MuiTableCell: {
        root: {
          borderTop: "1px #ccc solid",
        },
        //padding: "10px 10px",
        fontWeight: 500,
        fontSize: 18,
      },
    },*/
    MuiTableCell: {
      root: {
        padding: "5px 10px",
        borderRight: "1px #ccc solid",
        bordertop: "1px #ccc solid",
        color: "#707070",
        "&:nth-child(1)": {
          borderLeft: "0px #ccc solid",
        },
        "&:last-child": {
          borderRight: "0px #ccc solid",
        },
      },
    },

    /* ============ tab css ============ */
    MuiTabs: {
      root: {
        borderBottom: "1px #ccc solid",

        MuiSelect: {
          root: {
            background: "#049AB8",
            color: "#fff",
          },
        },
      },
    },

    MuiTab: {
      root: {
        fontSize: "16px !important",
        color: "#707070",
        fontWeight: "300 !important",
      },
      MuiSelect: {
        background: "#049AB8",
        color: "#fff",
      },
    },
  },
});

export default quillgreen;
