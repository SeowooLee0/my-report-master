import { tree } from "next/dist/build/templates/app-page";
import Link from "next/link";
import { useState } from "react";

export default function CreatePrompt() {
  const [system, setSystem] = useState("");
  const [age, setAge] = useState(20);
  const [topic, setTopic] = useState("");
  const [length, setLength] = useState("1");
  const [emphasis, setEmphasis] = useState("");
  const [language, setLanguage] = useState("Korean");
  const [customLanguage, setCustomLanguage] = useState("");
  const [customLength, setCustomLength] = useState("");
  const [prompt, setPrompt] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!topic) {
      alert("주제를 작성해주세요!");
      return;
    }
    setPrompt(true);
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
              <option value="1">1장</option>
              <option value="2">2장</option>
              <option value="3">3장</option>
              <option value="직접입력">직접입력</option>
            </select>{" "}
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
              <option value="Other">기타</option>
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
          {prompt && (
            <div>
              <br />
              <p>
                지금부터 레포트 작성을 도와주는 조수가 될거야.아래에 내가 정해준
                양식대로 작성해줘.
              </p>
              <br />
              <p>주제: {topic}</p>
              <p>제공자의 연령: {age}</p>
              <p>분량: A4기준 {customLength !== "" ? customLength : length}</p>
              <p>언어 : {customLanguage !== "" ? customLanguage : language}</p>
              <p>요청사항 : {emphasis}</p>
              <br />
              다음은 각각 구조에 따라 원하는 구성을 작성해두었으니 이를 참고해서
              작성해줘. <br />
              <p>1.서론</p> {topic}에 대한 간단한 소개와 정의를 제공하고 또한
              본문에서 논의할 내용을 설명해줘 <br />
              <p>2.본론</p>
              현재 상황 및 문제점: 연구 및 데이터를 기반으로 {topic}에 대한
              상세한 설명을 제공하고 통계 및 사실적 증거를 포함하여 현재 상황과
              문제점을 논의해줘. <br />
              전문가 의견:{topic}과 관련하여 전문가 의견을 인용하며, 외부 자료를
              참조할 때 축약 설명과 함께 소스를 제공해줘. <br />
              영향 및 시사점: {topic}의 영향과 시사점을 논의해줘. <br />
              <p>3.결론</p>
              주요 요점 및 시사점 요약: 본문에서 다룬 주요 내용과 시사점을
              요약합니다. <br />
              독자에게 제안하는 태도 또는 조치: 독자에게 제안하는 태도나 조치를
              제시합니다. <br />
              다양한 의견 제시:{topic}에 대한 다양한 의견을 제시합니다. <br />
              <p>
                다음은 레포트를 작성할때 참고 사항이야: 애매한 표현과 추상적인
                표현을 피해줘.
              </p>
              가독성을 위해 자연스러운 문맥을 만들어줘. 대상 독자의 나이가 15세
              이상이라면, 제출용으로 작성되는 것이므로 진중하고 무거운 톤으로
              작성해줘. <br />
              <button className="w-full text-center bg-gray-200 m-1 p-2 rounded-xl hover:bg-blue-300">
                <Link href="https://chatgpt.com/" prefetch={false}>
                  chatGPT에게 물어보러 가기
                </Link>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
