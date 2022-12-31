import React from 'react';

function passid() {
    const testMe = (event, value) => {
        // // console.log(value);
      };
  return <>
  {fltr.map((result, id) => (
          <>
            <ul style={{ margin: "0.1rem" }}>
              <li key={result.id}>
                <a
                  href="#"
                  onClick={(event) => testMe(event, result.id)} showid={result.id}
                
                >
      <button >Get Id</button>

                  <h5>{result.employee}</h5>
                </a>
              </li>
            </ul>
          </>
        ))}
  </>;
}

export default passid;
