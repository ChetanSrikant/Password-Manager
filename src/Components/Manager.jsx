import React, { useEffect, useRef, useState } from "react";
import eye from "../assets/eye.svg";
import closed from "../assets/eyeclosed.svg";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async() => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json()
    console.log(passwords)
    setPasswordArray(passwords)
  }
  

  // Load passwords from localStorage on mount
  useEffect(() => {
    getPasswords()
    
  }, []);

  // Function to copy text to clipboard
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast("🦄 Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  // Function to toggle password visibility
  const showPassword = () => {
    if (passwordRef.current.type === "password") {
      ref.current.src = eye;
      passwordRef.current.type = "text";
    } else {
      ref.current.src = closed;
      passwordRef.current.type = "password";
    }
  };

  // Save new password to the array and localStorage
  const savePassword = async() => {
    const updatedPasswords = [...passwordArray, { ...form, id: uuidv4() }];
    setPasswordArray(updatedPasswords);
    // localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    let res = await fetch("http://localhost:3000/", {method :"POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({...form, id: uuidv4()})})
    setForm({ site: "", username: "", password: "" }); // Clear form after saving
    
    toast("Successfully saved 💾 password", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const deletePassword = async(id) => {
    console.log("Deleting password with id", id);

    let c = confirm("Do you really wanna delete this password?");
    if (c) {
      const updatedPasswords = passwordArray.filter(
        (password) => password.id !== id
      );
      setPasswordArray(updatedPasswords);
      // localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      let res = await fetch("http://localhost:3000/", {method :"DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({...form, id})})
    

      toast("Successfully deleted 🗑️ Password", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const editPassword = (id) => {
    setForm(passwordArray.filter((i) => i.id === id)[0]);
    const updatedPasswords = passwordArray.filter(
      (password) => password.id !== id
    );
    setPasswordArray(updatedPasswords);
    // localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    // setForm({ site: "", username: "", password: "" }); // Clear form after saving
  };

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full ">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="p-2 md:p-0 md:mycontainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/ &gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own Password Manager
        </p>

        <div className="flex flex-col p-4 gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative w-full">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1.5"
                  src={closed}
                  alt="Toggle Eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 text-black rounded-full bg-green-500 border border-green-900 px-8 py-2 w-fit hover:bg-green-400"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>

        {/* Password Table */}
        <div className="passwords">
          <h2 className="font-bold text-xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length > 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 border border-white text-center">
                      <div className="flex items-center justify-center gap-2">
                        <a href={item.site} target="_blank" rel="noreferrer">
                          {item.site}
                        </a>
                        <div
                          className="cursor-pointer"
                          onClick={() => copyText(item.site)}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "6px",
                            }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 border border-white text-center">
                      <div className="flex items-center justify-center gap-2">
                        {item.username}
                        <div
                          className="cursor-pointer"
                          onClick={() => copyText(item.username)}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "6px",
                            }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 border border-white text-center">
                      <div className="flex items-center justify-center gap-2">
                        {item.password}
                        <div
                          className="cursor-pointer"
                          onClick={() => copyText(item.password)}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "6px",
                            }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 border border-white text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "6px",
                            }}
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                          ></lord-icon>
                        </span>

                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "6px",
                            }}
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                          ></lord-icon>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
