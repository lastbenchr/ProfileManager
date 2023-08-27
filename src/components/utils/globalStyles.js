import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Poppins", sans-serif !important;
    
  }

  
  /* width */
::-webkit-scrollbar {
  width: 3px;
}

/* Track */
::-webkit-scrollbar-track {
//  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}

.lock-scroll {
  overflow: hidden;
}
   

  /* Add more global styles as needed */

  /* chatbot styling */
  // .chat_footer svg {
  //   border-radius: 0px;
  // }

  // .widget_button svg {
  //   margin: 0px;
  // }
  // .header_title {
  //   padding: 7px 12px;
  // }
  // .chat_header svg {
  //   margin: 0px;
  // }
  }
`;
