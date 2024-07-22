"use client";
import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PiUserBold } from "react-icons/pi";
import { SiGooglebard } from "react-icons/si";
import { BsArrowReturnLeft } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { CgFormatSlash } from "react-icons/cg";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [usersubmit, setUsersubmit] = useState(false);
  const [storeQuestion, setStoreQuestion] = useState([]);
  const [userClick, setUserClick] = useState(false);
  // const Question = [
  //   "Syntax Errors",
  //   "Logical Errors",
  //   " Debugging of code",
  //   "Reference Errors",
  // ];

  const inputHandle = (e) => {
    setUserInput(e.target.value);
    setUserClick(true);
  };

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userInput) return;
    setStoreQuestion([...storeQuestion, userInput]);
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

    const msg = userInput;
    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    setChatHistory([...chatHistory, text]);
    //setUserInput("");
    setUsersubmit(true);
  };

  return (
    <>
      <div className="flex fixed z-50 justify-between w-full h-[64px] items-center bg-[#09090B] border pl-2 border-zinc-800 rounded">
        <div className="flex items-center">
          <Link href="/">
            <RiNextjsFill size={36} />
          </Link>
          <CgFormatSlash size={36} color="gray" />
          <button className="text-zinc-100 font-bold">Login</button>
        </div>

        <div className="flex">
          <Link href="https://github.com/Mr-armanalam">
            <button className="bg-black flex flex-row justify-center items-center rounded-md border border-zinc-800 w-[150px] font-bold text-sm h-[42px] mr-2">
              <FaGithub style={{ marginRight: "14px" }} />
              Github
            </button>
          </Link>

          <button className="rounded-md border border-zinc-800 w-[150px] h-[42px] bg-white text-sm font-bold mr-4 text-zinc-800">
            My AiChatbot
          </button>
        </div>
      </div>

      <div className="container h-screen relative mx-auto w-[44rem] pt-20">
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
            <div className="general_q_container  ">
              <div className="bg-[#09090B] p-8 rounded-lg border border-gray-800 mb-2 ">
                <p className="text-white text-lg font-semibold pb-4 ">
                  Welcome to Next.js AI Chatbot!
                </p>
                <p className="pb-2 text-zinc-400">
                  This is an open source AI chatbot app template built with
                  Next.js , the Vercel AI SDK , and Vercel KV .
                </p>
                <p className="text-zinc-400 ">
                  It uses React Server Components to combine text with
                  generative UI as output of the LLM. The UI state is synced
                  through the SDK so the model is aware of your interactions as
                  they happen.
                </p>
              </div>
              <div className="flex flex-row justify-between flex-wrap ">
                <div
                  // onClick={setStoreQuestion([...storeQuestion, Question[0]])}
                  className="bg-[#09090B] p-4 rounded-lg border border-gray-800 mb-2 w-[348px] "
                >
                  <p className=" text-white text-base font-semibold ">
                    What are the
                  </p>
                  <p className="text-zinc-400">Syntax Errors in programming</p>
                </div>
                <div className="bg-[#09090B] p-4 rounded-lg border border-gray-800 mb-2 w-[348px]  ">
                  <p className=" text-white text-base font-semibold ">
                    What are the
                  </p>
                  <p className="text-zinc-400">Logical Errors in programming</p>
                </div>
                <div className="bg-[#09090B]  p-4 rounded-lg border border-gray-800 mb-2 w-[348px] ">
                  <p className=" text-white text-base font-semibold ">
                    What are the
                  </p>
                  <p className="text-zinc-400">
                    debuging of code in programming
                  </p>
                </div>
                <div className="bg-[#09090B]  p-4 rounded-lg border border-gray-800 mb-2 w-[348px] ">
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

        <div className="aigen p-4 absolute bottom-0 bg-[#09090B] rounded-lg border border-gray-800 mt-4 ">
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
                className="w-[500px]  me-16 px-4 bg-transparent py-2 text-white border-none rounded-md focus:outline-none focus:border-zinc-500"
                placeholder="Type your message..."
                value={userInput}
                onChange={inputHandle}
              />
              <button
                className="w-[36px] flex h-[36px] items-center justify-center text-base text-white bg-transparent rounded-lg border border-gray-800 hover:bg-zinc-600 focus:outline-none"
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
