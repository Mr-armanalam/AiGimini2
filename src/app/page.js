"use client";
import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PiUserBold } from "react-icons/pi";
import { SiGooglebard } from "react-icons/si";
import { BsArrowReturnLeft } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { Navbar } from "./components/navbar.jsx";

export default function Home() {

  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [usersubmit, setUsersubmit] = useState(false);
  const [storeQuestion, setStoreQuestion] = useState([]);
  const [selectedQuestion, setSlectedQuestion] = useState([]);
  const [userClick, setUserClick] = useState(false);

  const Question = [
    "Syntax Errors",
    "Logical Errors",
    " Debugging of code",
    "Reference Errors",
  ];

  const inputHandle = (e) => {
    setUserInput(e.target.value);
    setUserClick(true);
  };

  const optionalQhandler = (indx) => {
    setSlectedQuestion(selectedQuestion.push(Question[indx]));
    console.log(selectedQuestion);
    aiResponse();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    aiResponse();
  };

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);
  const aiResponse = async () => {
    if (userClick) {
      setStoreQuestion([...storeQuestion, userInput]);
    } else {
      setUserClick(true);
      setStoreQuestion([...storeQuestion, selectedQuestion]);
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: "Coding Assistant : please Provides explanations and code examples for programming languages",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Coding Assistant, code prediction, Error detection and correction Code",
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 100,
      },
    });

    const msg = selectedQuestion ? userInput : storeQuestion;
    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();
    setChatHistory([...chatHistory, text]);
    setSlectedQuestion([]);
    setUsersubmit(true);
  };

  return (
    <>
      <Navbar />
      <div className="container h-screen relative mx-auto md:w-[44rem] sm:w-[100%] pt-20">
        {userClick ? (
          <>
            <div className="overflow-auto flex flex-col-reverse scrollbar max-h-[60vh]">
              {usersubmit && (
                <>
                  <div>
                    {chatHistory.map((msg, index) => (
                      <>
                        <div
                          key={index}
                          className="flex flex-row border-b pb-4 border-zinc-800 mb-4"
                        >
                          <PiUserBold size={32} />
                          <p className="text-slate-100 w-[92%] ps-4 text-wrap">
                            {storeQuestion[index]}
                          </p>
                        </div>
                        <div
                          key={index}
                          className="flex border-b pb-4 border-zinc-800 mb-4"
                        >
                          <SiGooglebard size={30} />
                          <p className="text-slate-100 w-[92%] ps-4 text-wrap">
                            {msg}
                          </p>
                        </div>
                      </>
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="general_q_container relative">
              <div className="bg-[#09090B] p-8 sm:w-full rounded-lg border border-gray-800 mb-2 ">
                <p className="text-white text-lg font-semibold pb-4 ">
                  Welcome to AI Code Assistant Chatbot!
                </p>
                <p className="pb-2 text-zinc-400">
                  This is an innovative tool designed to enhance and correct the
                  code & provide better coding experience for developers.
                </p>
                <p className="text-zinc-400 ">
                  Intelligent Code Suggestions, Code Generation Learning Mode
                  this chatbot assists programmers in various ways, from
                  answering coding queries to suggesting code snippets
                </p>
              </div>
              <div className="flex flex-row sm:justify-center md:justify-between flex-wrap overflow-auto scrollbar max-h-[40vh] ">
                <div
                  onClick={() => optionalQhandler(0)}
                  className="bg-[#09090B] p-4 cursor-pointer rounded-lg border border-gray-800 mb-2 w-[348px] "
                >
                  <p className=" text-white text-base font-semibold ">
                    What are the
                  </p>
                  <p className="text-zinc-400">Syntax Errors in programming</p>
                </div>
                <div
                  onClick={() => optionalQhandler(1)}
                  className="bg-[#09090B] p-4 cursor-pointer rounded-lg border border-gray-800 mb-2 w-[348px]  "
                >
                  <p className=" text-white text-base font-semibold ">
                    What are the
                  </p>
                  <p className="text-zinc-400">Logical Errors in programming</p>
                </div>
                <div
                  onClick={() => optionalQhandler(2)}
                  className="bg-[#09090B] cursor-pointer p-4 rounded-lg border border-gray-800 mb-2 w-[348px] "
                >
                  <p className=" text-white text-base font-semibold ">
                    What are the
                  </p>
                  <p className="text-zinc-400">
                    debuging of code in programming
                  </p>
                </div>
                <div
                  onClick={() => optionalQhandler(3)}
                  className="bg-[#09090B] cursor-pointer p-4 rounded-lg border border-gray-800 mb-2 w-[348px] "
                >
                  <p className=" text-white text-base font-semibold ">
                    What are the
                  </p>
                  <p className="text-zinc-400">
                    Reference Errors in programming
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="aigen w-full p-4 absolute bottom-0 bg-[#09090B] rounded-lg border border-gray-800 mt-4 ">
          <div className="px-4 flex items-center h-[4rem] rounded-md border border-gray-800 ">
            <form className="flex flex-row justify-self-end justify-between">
              <label htmlFor="question">
                <div className="rounded-full flex items-center justify-center border border-gray-800 w-[36px] h-[36px] ">
                  <FaPlus className="text-zinc-400" />
                </div>
              </label>
              <input
                type="text"
                id="question"
                className="w-[30rem]  me-16 px-4 bg-transparent py-2 text-white border-none rounded-md focus:outline-none focus:border-zinc-500"
                placeholder="Type your message..."
                value={userInput}
                onChange={inputHandle}
              />
              <button
                className="w-[36px] flex h-[36px] items-center justify-center  text-white bg-transparent rounded-lg border border-gray-800 hover:bg-zinc-600 focus:outline-none"
                type="submit"
                onClick={handleSubmit}
              >
                <BsArrowReturnLeft className=" font-md" />
              </button>
            </form>
          </div>
          <p className=" text-zinc-400 text-sm text-center pt-2">
            AI Chatbox build in Next.js
          </p>
        </div>
      </div>
    </>
  );
}
