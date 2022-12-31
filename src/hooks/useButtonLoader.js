import { useRef, useState, useEffect } from "react";
import LoopIcon from '@material-ui/icons/Loop'; 
const useButtonLoader = (defaultText = "Load", loadingText = "Loading...") => {
    const [isLoading, setLoading] = useState(false);
    const element = useRef(null);

    useEffect(() => {
        if (isLoading) {
            element.current.disabled = true;
            element.current.innerHTML =
                <LoopIcon /> + loadingText;
        } else {
            element.current.disabled = false;
            element.current.innerHTML = defaultText;
        }
    }, [isLoading]);

    return [element, setLoading];
};

export default useButtonLoader;
