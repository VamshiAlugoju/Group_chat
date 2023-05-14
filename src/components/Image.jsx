import React from 'react'

function Image() {
  return (
    <div>
        <input 
        type="file"
        ref={imageref}
        style={{display:"none"}}
        onClick={pickFile}
        onChange={handleChange}
        />
        
    </div>
  )
}

export default Image