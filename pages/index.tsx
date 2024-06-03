import { useState } from "react";

export default function Home() {
  const [age, setAge] = useState(20);
  const [topic, setTopic] = useState("");
  const [length, setLength] = useState("3");
  const [emphasis, setEmphasis] = useState("");
  const [language, setLanguage] = useState("English");
  const [customLanguage, setCustomLanguage] = useState("");
  const [report, setReport] = useState("");
  const [openaiApiKey, setOpenaiApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!openaiApiKey) {
      alert("OpenAI API key를 입력해주세요");
      return;
    }
    if (!topic) {
      alert("주제를 작성해주세요!");
      return;
    }
    setIsLoading(true);
    const response = await fetch("/api/generateReport", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        age,
        topic,
        length,
        emphasis,
        language: language === "Other" ? customLanguage : language,
        openaiApiKey,
      }),
    });

    const data = await response.json();
    setReport(data.report);
    setReport(data.report.choices[0].message.content);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center relative overflow-hidden sm:py-12">
      <div className="relative px-6 pt-10 pb-8 bg-white shadow-xl ring-1 ring-gray-900/5 max-w-lg mx-auto rounded-lg sm:px-10">
        <div className="w-full">
          <h1 className="text-3xl font-semibold text-center">
            📝 Report Master
          </h1>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">OpenAI API Key</label>
              <input
                type="password"
                className="mt-1 p-2 w-full border rounded-md"
                value={openaiApiKey}
                onChange={(e) => setOpenaiApiKey(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                연령대를 입력해주세요
              </label>
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
              <label className="block text-gray-700">분량을 선택해주세요</label>
              <select
                className="mt-1 p-2 w-full border rounded-md"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                강조하고 싶거나 요청사항이 있다면 알려주세요
              </label>
              <textarea
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
                <option value="Korean">Korean</option>
                <option value="English">English</option>
                <option value="Japanese">Japanese</option>
                <option value="Chinese">Chinese</option>
                <option value="Other">Other</option>
              </select>
              {language === "Other" && (
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
            </div>
          </form>

          {report && (
            <div className="mt-6 p-4 bg-gray-100 rounded-md">
              <h2 className="text-xl font-semibold">Generated Report</h2>
              {report}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
