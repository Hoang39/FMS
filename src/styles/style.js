import { StyleSheet } from "react-native";

export default StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
        width: 3,
        height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,

    elevation: 7,
    zIndex: 50
  },

  text: { 
    textAlign: 'center', 
    fontSize: 11,
    paddingHorizontal: 6,
    paddingVertical: 20,
  },

  textTitle: { 
    textAlign: 'center', 
    fontSize: 12,
    paddingVertical: 10,
    fontWeight: 700,
    borderBottomWidth: 1,
  },

})