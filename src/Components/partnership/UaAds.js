import React, {useState} from "react";

let UaAds = () => {
    // let history = useHistory();

    const [qtyHeld, setQtyHeld] = React.useState('')


    React.useEffect(() => {

        ((w, d, s, f, js, fjs) => {

            // w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) };


            // fjs = d.getElementsByTagName(s)[0];

            js = d.createElement(s)

            // js.id = o;
            js.src = f; js.async = 1;

            // // fjs.appendChild(js);
            // fjs.parentNode.insertBefore(js, fjs);

            var scr = d.getElementsByClassName('uaiframeinserter-01')[0];
            scr.parentNode.insertBefore(js, scr);

        })(window, document, 'script', 'http://localhost:8080/widget.js');

        // _hw('init', { debug: true });

    }, []);


    return (
        <div className="uaiframeinserter-01"></div>
    );
};

export default UaAds;
