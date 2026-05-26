

function Modal ({children}:any) {
    return(
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.18)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
        }}>
            {children}
        </div>
    );
}

export default Modal