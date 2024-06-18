import axios from 'axios';



// import { URL } from "../../URL";

export const multipleFilesUpload = async (data) => {
    alert(data)
    // try {
        await axios.post(`http://localhost:4000/api/user`, data)
        .then(result => {
            // console.log(result);
            if(result.data === "Already registered"){
                alert("E-mail already registered! Please Login to proceed.");
            }
            else{
                alert("Registered successfull")
            }
            
        })
     
    // } catch (error) {
    //     throw error;
    // }
}
export const updateUpload = async (data) => {
    alert(data)
    // try {
        await axios.put(`http://localhost:4000/api/user`, data)
        .then(result => {
            // console.log(result);
            if(result.data === "Already registered"){
                alert("E-mail already registered! Please Login to proceed.");
            }
            else{
                alert("Registered successfull")
            }
            
        })
     
    // } catch (error) {
    //     throw error;
    // }
}

//updateUpload
