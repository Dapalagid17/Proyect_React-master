// useRef permite acceder al DOM o guardar valores que no causan renderizados.
// En este ejemplo, enfoca el input automáticamente al hacer clic en el botón.

import { useRef } from 'react';

function UseRefPlay() {
    const inputRef = useRef(null);

    const enfocar = () => {
        inputRef.current.focus();
    };

    return (
        <div>
            <input ref={inputRef} placeholder="Escribe algo..." />
            <button onClick={enfocar}>Enfocar input</button>
        </div>
    );
}

export default UseRefPlay;
