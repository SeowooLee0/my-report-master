import Link from "next/link";
import { useState } from "react";

export default function Home() {
  return (
    <div className=" text-black min-h-screen min-w-screen items-center bg-gray-100 py-6 flex flex-col justify-center sm:py-12 ">
      <div className=" w-full shadow-xl rounded-3xl bg-white py-24 ">
        <div className="w-full px-6 lg:px-8">
          <div className="  w-full text-center ">
            <h2 className="text-4xl font-bold tracking-tight sm:text-6xl pb-10">
              📝 Report Master
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              Report Master는 ChatGPT를 쉽게 활용할 수 있도록 도와주는
              도구입니다.
              <br />
              내가 원하는 조건을 선택하고 시작하기 버튼을 눌러 구체적인 질문을
              작성해서 chatGPT에게 물어보세요!
            </p>
            <div className="p-3 mt-5 ">
              <button className=" bg-gray-400 text-white rounded-lg p-3 ml-2 hover:bg-blue-400">
                <Link href="/createPrompt" prefetch={false}>
                  질문 생성하기
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
