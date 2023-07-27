import { Checkbox, Label, TextInput, FileInput } from "flowbite-react";

import { BsArrowRightShort } from "react-icons/bs";
function Login(){
    return(<div className="h-screen w-full bg-gray-100 flex items-center justify-center  pt-20">
    <div className="w-[500px] h-fit py-[16px] bg-white rounded-3xl border-2 border-gray-300 p-8  ">
      <h1 className="text-[50px] font-medium">Login </h1>
      <p className="text-[18px]">to start learning</p>

      <form className="flex max-w-md flex-col gap-4 mt-[20px]">
        <Label htmlFor="name" value="Your name" />
        <TextInput placeholder="Your name" id="name" shadow type="text" />

        <Label htmlFor="lastname" value="Your lastname" />
        <TextInput placeholder="Your lastname" id="lastname" shadow type="text" />

        <Label htmlFor="email2" value="Your email" />
        <TextInput
          id="email2"
          placeholder="name@flowbite.com"
          required
          shadow
          type="email"
        />
        <Label htmlFor="password2" value="Your password" />
        <TextInput id="password2" required shadow type="password" />
        <Label htmlFor="repeat-password" value="Repeat password" />
        <TextInput id="repeat-password" required shadow type="password" />

        <div className="max-w-md" id="fileUpload">
          <div className="mb-2 block">
            <Label htmlFor="file" value="Upload file" />
          </div>
          <FileInput
            helperText="A profile picture is useful to confirm your are logged into your account"
            id="file"
          />
        </div>
        <div className="flex items-center gap-2 ">
          <Checkbox id="agree" />
          <Label className="flex" htmlFor="agree">
            <p>I agree with the</p>
            <a
              className=" text-cyan-600 hover:underline dark:text-cyan-500"
              href="/forms"
            >
              <p className="ms-1"> terms and conditions</p>
            </a>
          </Label>
        </div>
        <button className="bg-blue-600 rounded-md py-2 text-white ">
          <div className="flex items-center text-lg gap-[10px] justify-center">
            Login
            <BsArrowRightShort size={40} />
          </div>
        </button>
      </form>
    </div>
  </div>);


}
export default Login;