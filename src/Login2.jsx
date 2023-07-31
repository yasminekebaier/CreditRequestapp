 

function Login2() {
  return (
    <div className="h-screen w-full bg-gray-100 flex items-center justify-center  pt-20">
    <div className="w-[500px] h-fit py-[16px] bg-white rounded-3xl border-2 border-gray-300 p-8  ">
      <h1 className="text-[50px] font-medium">Login </h1>
      <p className="text-[18px]">Employment and Income Details:</p>
      <form >
      <div className="mb-3">
  <label htmlFor=" Input1" className="form-label">Employment status</label>
  <input type="text" className="form-control" id=" Input1" placeholder="Employment status"/>
</div>
  <div className="mb-3">
  <label htmlFor="Input2" className="form-label">Current employer s name and address</label>
  <input type="text" className="form-control" id="Input2" placeholder=" Current employer's name and address"/>
</div>
  <div className="mb-3">
  <label htmlFor=" Input3" className="form-label">Job title and position</label>
  <input type="text" className="form-control" id="Input3" placeholder="Job title and position"/>
</div>
  <div className="mb-3">
  <label htmlFor="Input4" className="form-label">Monthly or annual income</label>
  <input type="text" className="form-control" id="Input4" placeholder="Monthly or annual income"/>
</div>
    <p className="text-[18px]">Purpose of Credit:</p>

    <div className="mb-3">
  <label htmlFor=" Input5" className="form-label">Reason for the credit request</label>
  <input type="text" className="form-control" id=" Input5" placeholder="Reason for the credit request"/>
</div>
  <div className="mb-3">
  <label htmlFor="Input6" className="form-label">Amount of credit requested</label>
  <input type="text" className="form-control" id="Input6" placeholder="Amount of credit requested"/>
</div>
 <p className="text-[18px]">Collateral (if applicable):</p>

 <div className="mb-3">
  <label htmlFor="formFile" className="form-label">Details of any assets offered as collateral for the credit</label>
  <input className="form-control" type="file" id="formFile"/>
</div>
<div className="btn-group" role="group" aria-label="Basic example">
  <button type="button" className="btn btn-outline-primary">Next</button>
   
 
</div>




      </form>

      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      </div></div>
  )
}

export default Login2
