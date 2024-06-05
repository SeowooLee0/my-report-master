import Link from "next/link";
import { useState } from "react";

export default function CreatePrompt() {
  const [system, setSystem] = useState("");
  const [age, setAge] = useState(20);
  const [topic, setTopic] = useState("");
  const [length, setLength] = useState("1장");
  const [emphasis, setEmphasis] = useState("");
  const [language, setLanguage] = useState("Korean");
  const [customLanguage, setCustomLanguage] = useState("");
  const [customLength, setCustomLength] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!topic) {
      alert("주제를 작성해주세요!");
      return;
    }

    const response = await fetch("/api/generateReportPrompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        age,
        topic,
        length: length === "직접입력" ? customLength : length,
        emphasis,
        language: language === "기타" ? customLanguage : language,
      }),
    });

    const data = await response.json();

    console.log(data);
    setPrompt(data.prompt);
    setIsLoading(false);
  };

  return (
    <div className="text-black min-h-screen bg-gray-100 py-6 flex flex-col justify-center relative overflow-hidden sm:py-12">
      <div className="relative px-6 pt-10 pb-8 bg-white shadow-xl ring-1 ring-gray-900/5 max-w-lg mx-auto rounded-lg sm:px-10">
        <div className="w-full">
          <h1 className="text-3xl font-semibold text-center">
            📝 Report Master
          </h1>
        </div>
        <p className=" text-red-400 p-3 w-full text-center">
          질문을 생성후 chatGPT 사이트에 물어보세요!
        </p>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">연령대를 입력해주세요</label>
            <input
              type="number"
              className="mt-1 p-2 w-full border rounded-md"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              min="10"
              max="100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">주제를 입력해주세요</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              작성할 레포트의 분량을 선택해주세요(A4기준)
            </label>
            <select
              className="mt-1 p-2 w-full border rounded-md"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            >
              <option value="1장">1장</option>
              <option value="2장">2장</option>
              <option value="3장">3장</option>
              <option value="직접입력">직접입력</option>
            </select>
            {length === "직접입력" && (
              <input
                type="text"
                className="mt-2 p-2 w-full border rounded-md"
                placeholder="분량을 입력해주세요(예시. 5장)"
                value={customLength}
                onChange={(e) => setCustomLength(e.target.value)}
              />
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              레포트 작성시 강조하고 싶거나 요청사항이 있다면 알려주세요
            </label>
            <textarea
              placeholder="예시) 본론에 해당 주제에 대한 예시를 2가지 이상 넣어줘"
              className="mt-1 p-2 w-full border rounded-md"
              value={emphasis}
              onChange={(e) => setEmphasis(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              사용할 언어를 선택해주세요
            </label>
            <select
              className="mt-1 p-2 w-full border rounded-md"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="한글">한글</option>
              <option value="영어">영어</option>
              <option value="일본어">일본어</option>
              <option value="중국어">중국어</option>
              <option value="기타">기타</option>
            </select>
            {language === "기타" && (
              <input
                type="text"
                className="mt-2 p-2 w-full border rounded-md"
                placeholder="사용할 언어를 적어주세요"
                value={customLanguage}
                onChange={(e) => setCustomLanguage(e.target.value)}
              />
            )}
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
          <div dangerouslySetInnerHTML={{ __html: prompt }} />
        </form>
      </div>
    </div>
  );
}
