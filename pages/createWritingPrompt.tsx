// pages/index.js
import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [purpose, setPurpose] = useState("");
  const [usage, setUsage] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [backgroundInfo, setBackgroundInfo] = useState("");
  const [examples, setExamples] = useState("");
  const [tone, setTone] = useState("");
  const [feeling, setFeeling] = useState("");
  const [length, setLength] = useState("");
  const [structure, setStructure] = useState("");
  const [formatting, setFormatting] = useState("");
  const [undesiredTasks, setUndesiredTasks] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch("/api/generateWritingPrompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic,
        purpose,
        usage,
        targetAudience,
        backgroundInfo,
        examples,
        tone,
        feeling,
        length,
        structure,
        formatting,
        undesiredTasks,
      }),
    });
    const data = await response.json();
    setPrompt(data.prompt);
    setIsLoading(false);
  };

  return (
    <div className="text-black min-h-screen bg-gray-100 py-6 flex flex-col justify-center relative overflow-hidden sm:py-12">
      <div className="relative px-6 pt-10 pb-8 bg-white shadow-xl ring-1 ring-gray-900/5 max-w-lg mx-auto rounded-lg sm:px-10">
        <div className="w-full">
          <h1 className="text-3xl font-semibold text-center">
            📝 Writing Master
          </h1>
        </div>
        <p className=" text-red-400 p-3 w-full text-center">
          질문을 생성후 chatGPT 사이트에 물어보세요!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">토픽</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">목적</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">쓰임새</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={usage}
              onChange={(e) => setUsage(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">정보제공(대상)</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">배경정보</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={backgroundInfo}
              onChange={(e) => setBackgroundInfo(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">예제</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={examples}
              onChange={(e) => setExamples(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">어조</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">느낌</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={feeling}
              onChange={(e) => setFeeling(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">분량</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">구조, 서식 지정</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={structure}
              onChange={(e) => setStructure(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">원하지 않는 작업</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={undesiredTasks}
              onChange={(e) => setUndesiredTasks(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">연령대를 입력해주세요</label>
            <input
              type="number"
              className="mt-1 p-2 w-full border rounded-md"
              value={usage}
              onChange={(e) => setUsage(e.target.value)}
              min="10"
              max="100"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "작성중..." : "시작하기"}
            </button>
            {/* <button className=" bg-gray-500 text-white rounded-lg p-2 ml-2">
              <Link href="/createReport" prefetch={false}>
                chatGPT 사용하기
              </Link>
            </button> */}
          </div>
        </form>
        <div className="mt-8">
          <h2 className="text-lg font-semibold">생성된 프롬프트:</h2>
          <div className="mt-2 p-4 border rounded-md bg-gray-100">
            <div dangerouslySetInnerHTML={{ __html: prompt }} />
          </div>
        </div>
      </div>
    </div>
  );
}
