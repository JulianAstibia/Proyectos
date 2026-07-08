import { useEffect, useState } from "react"

const IniciandoServidorToast = () => {
    const [show, setShow] = useState(true)

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setShow(false)
        }, 15000)
        return ()=> clearTimeout(timer)
    },[])
    if (!show)return null

    return(
        <div
            className="toast show position-fixed bottom-0 start-0 m-3 shadow"
            role="alert"
            style={{ zIndex: 1050, maxWidth: "350px" }}
        >
            <div className="toast-header">
                <strong className="me-auto">Información</strong>
                <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShow(false)}
                />
            </div>

            <div className="toast-body">
                ⏳ La primer petición al Backend puede tardar alrededor de 50 segundos hasta que se inicie.
            </div>
        </div>
    )
}

export default IniciandoServidorToast