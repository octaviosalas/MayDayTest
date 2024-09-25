import { toast } from "react-toastify";

export const shootErrorToast = (data: string) => { 
    if(data === "city not found") { 
       return toast.error("La ciudad no ha sido encontrada", {
            style: { backgroundColor: 'white', color: 'red' },
            pauseOnHover: false,
            autoClose: 2500
        });
    }  
     return toast.error(data, {
        style: { backgroundColor: 'white', color: 'red' },
        pauseOnHover: false,
        autoClose: 2500
    });
}