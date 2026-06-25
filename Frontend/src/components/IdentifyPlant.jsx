import { useState, useRef, useEffect } from "react"

const IdentificarPlanta = ({ imagen, setImagen, onIdentificar, loading}) => {
    const[isDragging, setIsDragging] = useState(false)
    const[preview, setPreview] = useState(null)
    const inputRef = useRef(null)

    const handlerDragOver = (e) =>{
        e.preventDefault()
        setIsDragging(true)
    }
    const handlerDragLeave = () => {
        setIsDragging(false)
    }
    const handlerDrop = (e) =>{
        e.preventDefault()
        setIsDragging(false)

        const file = e.dataTransfer.files[0]
        cargarImagen(file)
    }

    const cargarImagen = (file) => {
        if (!file?.type.startsWith("image/")) return
        if (preview) URL.revokeObjectURL(preview)

        const nuevaPreview = URL.createObjectURL(file)
        setImagen(file)
        setPreview(URL.createObjectURL(file))
    }
    const handlerFileChange = (e) => {
        const file = e.target.files[0]
        cargarImagen(file)
        e.target.value = null
    }
    const abrirSelector = () => {
        inputRef.current.click()
    }

    const eliminarImagen = () => {
        if(preview) URL.revokeObjectURL(preview)
        setImagen(null)
        setPreview(null)
    }

    useEffect(()=> {
        return() => {
            if(preview) URL.revokeObjectURL(preview)
        }
    }, [preview])

    return(
        <>
            <h3>Busqueda por Imagen</h3>     
            <div className="d-flex flex-column flex-md-row gap-2">   
                <div
                    onClick={abrirSelector}
                    onDragOver={handlerDragOver}
                    onDragLeave={handlerDragLeave}
                    onDrop={handlerDrop} 
                    className={`position-relative d-flex justify-content-center align-items-center border border-2 flex-grow-1 text-center mx-auto ${isDragging ? "bg-secondary" : ""}`}
                    style={{
                        cursor: "pointer",
                        height: "250px",
                        borderRadius: "10px"
                        }}>
                    {preview && (
                        <button
                            type="button"
                            className="btn btn-sm position-absolute top-0 end-0 m-2"
                            onClick={ (e) => {
                                e.stopPropagation()
                                eliminarImagen()
                            }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </button>
                    )}
                    {preview ? (
                        <img 
                            src={preview} 
                            alt="Vista previa" 
                            style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                borderRadius: "10px"
                                }}/>
                        ): <div>
                            <p>Arrastra una imagen</p>
                            <p>o click aqui</p>
                        </div>
                    }
                </div>
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handlerFileChange}
                />
                <button 
                    className="btn btn-success col-md-2 my-auto"
                    disabled= {loading || !imagen}
                    onClick={onIdentificar}
                    >{loading ? "..." : "Identificar"}
                </button>
            </div>
        </>
    )
}

export default IdentificarPlanta