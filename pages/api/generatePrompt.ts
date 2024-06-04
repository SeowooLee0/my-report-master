import { OpenAI } from "openai";

export default async function handler(
  req: {
    body: {
      system: string;
      age: number;
      topic: string;
      length: string;
      emphasis: string;
      language: string;
    };
  },
  res: any
) {
  const { system, age, topic, length, emphasis, language } = req.body;

  try {
    const prompt = `
    지금부터 ${system}를 도와주는 조수가 될거야.아래에 내가 정해준 양식대로 작성해줘,
    토픽 : ${topic},
    독자의 연령 : ${age}살,
    분량: A4분량으로 ${length}정도 작성해줘,
    요청사항 : ${emphasis},
  
    다음은 각각 구조에 따라 원하는 구성을 작성해두었으니 이를 참고해서 작성해줘. 
    
    1.서론:
    
    ${topic}에 대한 간단한 소개와 정의를 제공하고 또한 본문에서 논의할 내용을 설명해줘

    2. 본문:

    현재 상황 및 문제점: 연구 및 데이터를 기반으로 ${topic}에 대한 상세한 설명을 제공하고 통계 및 사실적 증거를 포함하여 현재 상황과 문제점을 논의해줘.
    전문가 의견: ${topic}과 관련하여 전문가 의견을 인용하며, 외부 자료를 참조할 때 축약 설명과 함께 소스를 제공해줘.
    영향 및 시사점: ${topic}의 영향과 시사점을 논의해줘.

    3. 결론:

    주요 요점 및 시사점 요약: 본문에서 다룬 주요 내용과 시사점을 요약합니다.
    독자에게 제안하는 태도 또는 조치: 독자에게 제안하는 태도나 조치를 제시합니다.
    다양한 의견 제시: ${topic}에 대한 다양한 의견을 제시합니다.


    다음은 레포트를 작성할때 참고 사항이야:

    애매한 표현과 추상적인 표현을 피해줘.
    가독성을 위해 자연스러운 문맥을 만들어줘.
    대상 독자의 나이가 15세 이상이라면, 제출용으로 작성되는 것이므로 진중하고 무거운 톤으로 작성해줘.

    `;

    res.status(200).json({ prompt });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
