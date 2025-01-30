import { useState } from "react";
import React from "react";

import "./App.css";

function App() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [models, setModels] = useState("gpt-3.5-turbo"); //default value 3.5 turbo
  const Clear = () => {
    setText1(""); // Clear text1
    setText2(""); // Clear text2
  };

  const handleSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer " //{ enter your key here}
    );

    const raw = JSON.stringify({
      model: models,
      messages: [
        {
          role: "system",
          content:
            "helpful assistant that provide brief summary in bullet point",
        },
        {
          role: "user",
          content: text2, // Pass text2 as the user message
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://api.openai.com/v1/chat/completions", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // Set the response in text1
        const assistantResponse =
          result.choices && result.choices[0].message.content
            ? result.choices[0].message.content
            : "No response received";
        setText1(assistantResponse);
      })
      .catch((error) => {
        console.error("Error:", error);
        setText1("An error occurred while fetching the response.");
      });
  };

  return (
    <>
      <div
        className="text-center bg-no-repeat bg-cover bg-center h-screen w-screen content-center  bg-red-300"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1604079628040-94301bb21b91?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3JhZGllbnR8ZW58MHx8MHx8fDA%3D)`,
        }}
      >
        <p className="  bg-gradient-to-r from-amber-50 to-amber-50 bg-clip-text text-5xl font-extrabold text-transparent">
          Ask AI
        </p>
        <div className="bg-white/20 backdrop-blur-md inset-shadow-sm inset-shadow-orange-700 shadow-xl  rounded-sm text-wrap grid xs:grid-cols-2 3xl:grid-cols-6  mt-5 ml-50 mr-50">
          <textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Magic "
            readOnly // Makes the first textarea read-only to display fetched response
            className=" caret-emerald-400 font-sans text-2xl  text-center p-10 m-10 h-40 max-h-96 overflow-auto resize-none "
          ></textarea>
        </div>
        <div className="bg-white/20 inset-shadow-sm inset-shadow-orange-700 shadow-xl rounded-sm text-wrap grid xs:grid-cols-2 3xl:grid-cols-6  m-5 ml-50 mr-50">
          <textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Message the AI"
            className="font-sans text-2xl  text-center p-10 m-10 h-40 max-h-96 overflow-auto resize-none"
          ></textarea>
        </div>

        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="bg-orange-950 rounded-full hover:bg-emerald-100 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700 text-center hover:text-black text-emerald-100
             dark:hover:text-blue-400  p-3 m-"
          >
            Submit
          </button>
        </div>
        <div className="text-center">
          <div className="p-2 m-2">
            <label htmlFor="models"> Models: </label>
            <select
              id="models"
              value={models}
              onChange={(e) => setModels(e.target.value)}
            >
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="gpt-4">GPT-4</option>
            </select>
          </div>
          <div className="p-2 m-2">
            <label htmlFor="languages">Language: </label>
            <select>
              <option value="english">English</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>

          <button
            onClick={Clear}
            className="bg-orange-950 rounded-full hover:bg-emerald-100 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700 text-center hover:text-black text-emerald-100
             dark:hover:text-blue-400  p-3 m-2"
          >
            Clear
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
