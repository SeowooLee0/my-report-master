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
              Report Master는 chatGPT를 좀 더 편리하게 사용하기 위해 만들어진
              툴입니다.
              <br />
              원하는 결과값을 얻기위해서 자세한 프롬포트를 만들어 chatGPT에게
              물어보세요!
            </p>
            <div className="p-3 mt-5 ">
              <button className="mr-20  bg-gray-500 text-white rounded-lg p-3 ml-2 hover:bg-pink-400">
                <Link href="/createReport" prefetch={false}>
                  chatGPT로 레포트 생성하기
                </Link>
              </button>
              <button className=" bg-gray-500 text-white rounded-lg p-3 ml-2 hover:bg-blue-400">
                <Link href="/createPrompt" prefetch={false}>
                  프롬포트만 생성하기
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
