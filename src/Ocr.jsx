import { Link } from "react-router-dom/cjs/react-router-dom.min"

 

function Ocr() {
  return (
   
      <div className="h-screen w-full bg-gray-100 flex items-center justify-center  pt-20">
    <div className="w-[500px] h-fit py-[16px] bg-white rounded-3xl border-2 border-gray-300 p-8  ">
      <h1 className="text-[50px] font-medium">OCR </h1>
      <div className="mb-3">
  <label htmlFor="formFile" className="form-label">Default file input example</label>
  <input className="form-control" type="file" id="formFile"/>
</div>
 <Link to="/login2"> <button type="button" className="btn btn-outline-primary">Next</button></Link>
 
    
    
    </div>
 </div>
  )
}

export default Ocr
