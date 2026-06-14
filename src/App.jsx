import { useState, useCallback, useRef } from "react";
import "./App.css";

export default function App() {
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [length, setLength] = useState(4);

  const generatePassword = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (char) string += "!@#$%^&*";
    if (number) string += "0123456789";
    for (let i = 0; i < length; i++) {
      let random = Math.floor(Math.random() * string.length);
      pass += string.charAt(random);
    }
    setPassword(pass);
  }, [length, char, number]);

  const passwordRef = useRef(null);

  const passwordCopied = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="bg-gray-700 p-4 rounded-2xl shadow-2xl flex flex-col justify-center items-center">
          <h1 className="text-white text-center text-xl">password generator</h1>
          <div className="flex justify-center items-center">
            <input
              type="text"
              value={password}
              placeholder="generate password"
              readOnly
              className="bg-yellow-50 px-3 py-2 m-2 rounded-lg outline-none border-none text-2xl"
              ref={passwordRef}
            />
            <button
              className="bg-blue-700 p-1 cursor-pointer text-center outline-none shrink-0 rounded-xl text-white"
              onClick={passwordCopied}
            >
              copy
            </button>
          </div>
          <div>
            <div className="flex justify-center items-center gap-x-2">
              <input
                type="range"
                min={4}
                max={20}
                value={length}
                onChange={(e) => {
                  setLength(e.target.value);
                }}
                id="rangeInput"
              />
              <label htmlFor="rangeInput" className="text-white mx-2">
                length: {length}
              </label>
            </div>
            <div className="cursor-pointer flex justify-center items-center gap-x-2">
              <label htmlFor="checkboxNumber" className="text-white">
                Number Allowed
              </label>
              <input
                type="checkbox"
                defaultChecked={number}
                onClick={() => {
                  setNumber((prev) => !prev);
                }}
                id="checkboxNumber"
              />
            </div>
            <div className="cursor-pointer flex justify-center items-center gap-x-2">
              <label htmlFor="checkboxcharacter" className="text-white">
                character Allowed
              </label>
              <input
                type="checkbox"
                defaultChecked={char}
                onClick={() => {
                  setChar((prev) => !prev);
                }}
                id="checkboxcharacter"
              />
            </div>
          </div>
          <div className="">
            <button
              className="text-white px-5 py-2 bg-blue-700 rounded-xl mt-3 cursor-pointer"
              onClick={generatePassword}
            >
              generate password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
